const crypto = require('crypto')

const MAGIC = Buffer.from('RHPK')
const VERSION = 1
const IV_LEN = 12
const TAG_LEN = 16
const KEY_PARTS = ['rh-simple-tool', 'pack-aes-gcm', 'v1', '7f3c9a2e18b64d0c']
const SALT = 'runninghub-rhpack-salt-v1'

let cachedKey = null

function getKey() {
  if (!cachedKey) {
    cachedKey = crypto.scryptSync(KEY_PARTS.join('/'), SALT, 32, {
      N: 16384,
      r: 8,
      p: 1,
    })
  }
  return cachedKey
}

function encryptUtf8(plain) {
  const iv = crypto.randomBytes(IV_LEN)
  const cipher = crypto.createCipheriv('aes-256-gcm', getKey(), iv)
  const encrypted = Buffer.concat([cipher.update(String(plain), 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return Buffer.concat([MAGIC, Buffer.from([VERSION]), iv, tag, encrypted])
}

function decryptToUtf8(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input)
  const minLen = MAGIC.length + 1 + IV_LEN + TAG_LEN + 1
  if (buf.length < minLen) {
    throw new Error('模板包损坏或不是有效文件')
  }
  if (!buf.subarray(0, MAGIC.length).equals(MAGIC)) {
    throw new Error('不是本软件的加密模板包')
  }
  const version = buf[MAGIC.length]
  if (version !== VERSION) {
    throw new Error(`不支持的模板包版本：${version}`)
  }
  const ivStart = MAGIC.length + 1
  const tagStart = ivStart + IV_LEN
  const dataStart = tagStart + TAG_LEN
  const iv = buf.subarray(ivStart, tagStart)
  const tag = buf.subarray(tagStart, dataStart)
  const data = buf.subarray(dataStart)
  const decipher = crypto.createDecipheriv('aes-256-gcm', getKey(), iv)
  decipher.setAuthTag(tag)
  try {
    return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8')
  } catch {
    throw new Error('模板包无法解密，可能已损坏或不是本软件生成')
  }
}

function normalizeBinding(raw, fallbackField) {
  const src = raw && typeof raw === 'object' ? raw : {}
  return {
    nodeId: String(src.nodeId || '').trim(),
    fieldName: String(src.fieldName || fallbackField || '').trim(),
  }
}

function extractAppId(raw) {
  const text = String(raw || '').trim()
  const fromDetail = text.match(/ai-detail\/(\d+)/i)
  if (fromDetail) return fromDetail[1]
  const fromRun = text.match(/\/(?:run\/)?ai-app\/(\d+)/i)
  if (fromRun) return fromRun[1]
  const onlyDigits = text.match(/^(\d{10,})$/)
  if (onlyDigits) return onlyDigits[1]
  return text
}

function normalizeBindings(raw) {
  const bindingsIn = raw && typeof raw === 'object' ? raw : {}
  return {
    image1: normalizeBinding(bindingsIn.image1, 'image'),
    image2: normalizeBinding(bindingsIn.image2, 'image'),
    audio: normalizeBinding(bindingsIn.audio, 'audio'),
    text: normalizeBinding(bindingsIn.text, 'text'),
    document: normalizeBinding(bindingsIn.document, 'text'),
    float: normalizeBinding(bindingsIn.float, 'value'),
    integer: normalizeBinding(bindingsIn.integer, 'value'),
  }
}

function buildPackPayload(input) {
  const name = String(input?.name || '').trim()
  if (!name) throw new Error('请填写模板名称')

  const webappId = extractAppId(input?.webappId || '')
  const workflowId = String(input?.workflowId || '').trim()
  const kindRaw = String(input?.kind || '').trim()
  const kind =
    kindRaw === 'workflow' || kindRaw === 'ai-app'
      ? kindRaw
      : webappId
        ? 'ai-app'
        : workflowId
          ? 'workflow'
          : 'ai-app'

  if (kind === 'ai-app' && !webappId && !workflowId) {
    throw new Error('请填写 AI 应用 ID（webappId）')
  }
  if (kind === 'workflow' && !workflowId && !webappId) {
    throw new Error('请填写 Workflow ID')
  }

  const resolvedWebappId = webappId || (kind === 'ai-app' ? workflowId : '')
  const resolvedWorkflowId = workflowId || (kind === 'workflow' ? webappId : '')

  return {
    v: 2,
    packId: String(input?.packId || crypto.randomUUID()),
    name,
    description: String(input?.description || '').trim(),
    accent: String(input?.accent || '#1A365D').trim() || '#1A365D',
    createdAt: String(input?.createdAt || new Date().toISOString()),
    kind,
    webappId: resolvedWebappId,
    workflowId: resolvedWorkflowId,
    bindings: normalizeBindings(input?.bindings),
  }
}

function parsePackPayload(raw) {
  const data = typeof raw === 'string' ? JSON.parse(raw) : raw
  if (!data || typeof data !== 'object') {
    throw new Error('模板包内容无效')
  }
  return buildPackPayload(data)
}

function splitPublicAndSecret(payload) {
  return {
    publicInfo: {
      packId: payload.packId,
      name: payload.name,
      description: payload.description,
      accent: payload.accent,
      createdAt: payload.createdAt,
    },
    secret: {
      kind: payload.kind,
      webappId: payload.webappId,
      workflowId: payload.workflowId,
      bindings: payload.bindings,
    },
  }
}

function encryptPayload(input) {
  const payload = buildPackPayload(input)
  const buffer = encryptUtf8(JSON.stringify(payload))
  return { payload, buffer }
}

function decryptBuffer(buffer) {
  const json = decryptToUtf8(buffer)
  const payload = parsePackPayload(json)
  return payload
}

function sealSecret(secret) {
  const kind =
    secret?.kind === 'workflow' || secret?.kind === 'ai-app'
      ? secret.kind
      : String(secret?.webappId || '').trim()
        ? 'ai-app'
        : 'workflow'
  const webappId = extractAppId(secret?.webappId || '')
  const workflowId = String(secret?.workflowId || '').trim()
  const id = kind === 'ai-app' ? webappId || workflowId : workflowId || webappId
  if (!id) throw new Error(kind === 'ai-app' ? '模板缺少 AI 应用 ID' : '模板缺少 Workflow ID')
  const packed = {
    kind,
    webappId: kind === 'ai-app' ? id : webappId,
    workflowId: kind === 'workflow' ? id : workflowId,
    bindings: normalizeBindings(secret?.bindings),
  }
  return encryptUtf8(JSON.stringify(packed)).toString('base64')
}

function unsealSecret(sealed) {
  const buf = Buffer.from(String(sealed || ''), 'base64')
  const json = decryptToUtf8(buf)
  const data = JSON.parse(json)
  const webappId = extractAppId(data?.webappId || '')
  const workflowId = String(data?.workflowId || '').trim()
  const kind =
    data?.kind === 'workflow' || data?.kind === 'ai-app'
      ? data.kind
      : webappId
        ? 'ai-app'
        : 'workflow'
  const id = kind === 'ai-app' ? webappId || workflowId : workflowId || webappId
  if (!id) throw new Error('模板数据不完整')
  return {
    kind,
    webappId: kind === 'ai-app' ? id : webappId,
    workflowId: kind === 'workflow' ? id : workflowId,
    bindings: normalizeBindings(data?.bindings),
  }
}

module.exports = {
  encryptPayload,
  decryptBuffer,
  sealSecret,
  unsealSecret,
  splitPublicAndSecret,
  buildPackPayload,
}
