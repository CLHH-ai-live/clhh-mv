const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const PRODUCT = 'morph'
const LICENSE_FILE = 'license.json'
const HMAC_SECRET = 'morph-local-bind-v1/7f3c9e2a1b84d06c5e91a47b2d08f63c'

function runSilent(command, args) {
  try {
    return execFileSync(command, args, {
      encoding: 'utf8',
      windowsHide: true,
      timeout: 5000,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
  } catch {
    return ''
  }
}

function readMachineGuid() {
  if (process.platform !== 'win32') return ''
  const out = runSilent('reg', [
    'query',
    'HKLM\\SOFTWARE\\Microsoft\\Cryptography',
    '/v',
    'MachineGuid',
  ])
  const match = String(out).match(/REG_SZ\s+([0-9A-Fa-f-]{8,})/)
  return match ? match[1].trim().toLowerCase() : ''
}

function readVolumeSerial() {
  if (process.platform !== 'win32') return ''
  const out = runSilent('cmd', ['/c', 'vol', 'C:'])
  const match = String(out).match(/([0-9A-Fa-f]{4}-[0-9A-Fa-f]{4})/)
  return match ? match[1].toUpperCase() : ''
}

function sha256Hex(text) {
  return crypto.createHash('sha256').update(String(text), 'utf8').digest('hex')
}

function toGroups(hex, groupSize = 4) {
  const compact = String(hex || '')
    .replace(/[^0-9A-Fa-f]/g, '')
    .toUpperCase()
  if (!compact) return ''
  return compact.match(new RegExp(`.{1,${groupSize}}`, 'g')).join('-')
}

function compactCode(value) {
  return String(value || '')
    .replace(/[^0-9A-Fa-f]/gi, '')
    .toUpperCase()
}

function getRawMachineFingerprint() {
  const guid = readMachineGuid()
  const volume = readVolumeSerial()
  return `${PRODUCT}|${guid}|${volume}`
}

function getMachineCode() {
  const raw = getRawMachineFingerprint()
  if (!readMachineGuid() && !readVolumeSerial()) {
    throw new Error('无法读取本机特征，请确认在 Windows 桌面版中运行')
  }
  return toGroups(sha256Hex(raw).slice(0, 16), 4)
}

function signMachineCode(machineCode) {
  const compact = compactCode(machineCode)
  if (compact.length < 16) {
    throw new Error('机器码无效')
  }
  const digest = crypto
    .createHmac('sha256', HMAC_SECRET)
    .update(`${PRODUCT}-v1|${compact}`, 'utf8')
    .digest('hex')
    .toUpperCase()
  return toGroups(digest.slice(0, 32), 4)
}

function timingSafeEqualHex(a, b) {
  const left = compactCode(a)
  const right = compactCode(b)
  if (!left || left.length !== right.length) return false
  try {
    return crypto.timingSafeEqual(Buffer.from(left, 'hex'), Buffer.from(right, 'hex'))
  } catch {
    return false
  }
}

function issueActivationCode(machineCode) {
  return signMachineCode(machineCode)
}

function verifyActivationCode(machineCode, activationCode) {
  try {
    const expected = signMachineCode(machineCode)
    return timingSafeEqualHex(expected, activationCode)
  } catch {
    return false
  }
}

function licensePath(userDataDir) {
  return path.join(userDataDir, LICENSE_FILE)
}

function readLicense(userDataDir) {
  try {
    const raw = fs.readFileSync(licensePath(userDataDir), 'utf8')
    const data = JSON.parse(raw)
    if (!data || typeof data !== 'object') return null
    return data
  } catch {
    return null
  }
}

function writeLicense(userDataDir, payload) {
  fs.mkdirSync(userDataDir, { recursive: true })
  fs.writeFileSync(licensePath(userDataDir), JSON.stringify(payload, null, 2), 'utf8')
}

function inspectLicense(userDataDir, options = {}) {
  const packaged = Boolean(options.packaged)
  let machineCode = ''
  try {
    machineCode = getMachineCode()
  } catch (error) {
    return {
      packaged,
      // 本产品不做激活加密：即使读机器码失败也视为已授权
      licensed: true,
      machineCode: '',
      reason: packaged ? 'open' : 'dev',
      error: error instanceof Error ? error.message : String(error),
    }
  }
  if (!packaged) {
    return {
      packaged: false,
      licensed: true,
      machineCode,
      reason: 'dev',
    }
  }
  // 正式包同样免激活（不启用加密授权）
  return {
    packaged: true,
    licensed: true,
    machineCode,
    reason: 'open',
  }
}

function activateLicense(userDataDir, activationCode) {
  const machineCode = getMachineCode()
  if (!verifyActivationCode(machineCode, activationCode)) {
    return {
      success: false,
      error: '激活码无效，或不是这台电脑的激活码',
      machineCode,
    }
  }
  const payload = {
    version: 1,
    product: PRODUCT,
    machineCode,
    signature: signMachineCode(machineCode),
    activatedAt: new Date().toISOString(),
  }
  writeLicense(userDataDir, payload)
  return {
    success: true,
    machineCode,
    activatedAt: payload.activatedAt,
  }
}

module.exports = {
  getMachineCode,
  issueActivationCode,
  verifyActivationCode,
  inspectLicense,
  activateLicense,
}
