const { app, BrowserWindow, ipcMain, dialog, shell, Menu } = require('electron')
const path = require('path')
const fs = require('fs').promises
const fsSync = require('fs')
const { spawn } = require('child_process')
const templatePack = require('./templatePack.cjs')
const license = require('./license.cjs')

ipcMain.handle('import-image-as-png', async (_event, payload) => {
  let tempDir
  try {
    const bytes = Buffer.from(payload?.bytes || [])
    if (!bytes.length || bytes.length > 100 * 1024 * 1024) return { success: false }
    const native = require('electron').nativeImage.createFromBuffer(bytes)
    if (!native.isEmpty()) return { success: true, bytes: native.toPNG() }
    if (process.platform !== 'darwin') return { success: false }
    tempDir = await fs.mkdtemp(path.join(app.getPath('temp'), 'clhh-image-'))
    const input = path.join(tempDir, 'incoming-image')
    const output = path.join(tempDir, 'normalized.png')
    await fs.writeFile(input, bytes)
    await new Promise((resolve, reject) => {
      require('child_process').execFile('/usr/bin/sips', ['-s', 'format', 'png', input, '--out', output],
        { timeout: 15000, maxBuffer: 1024 * 1024 }, error => error ? reject(error) : resolve())
    })
    return { success: true, bytes: await fs.readFile(output) }
  } catch { return { success: false } }
  finally { if (tempDir) await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {}) }
})

function loadRuntimeBrand() {
  try {
    const raw = fsSync.readFileSync(path.join(__dirname, 'runtime-brand.json'), 'utf8')
    const data = JSON.parse(raw)
    if (data && data.displayName) return data
  } catch {
    // ignore
  }
  return {
    id: 'morph',
    label: '风格一',
    displayName: 'CLHH MV 创作',
    mark: 'CLHH',
    appId: 'com.morph.tool',
  }
}

const runtimeBrand = loadRuntimeBrand()
const APP_NAME = String(runtimeBrand.displayName || 'CLHH MV 创作')
app.setName(APP_NAME)
// Keep existing workspaces and preferences after the display-name change.
if (!process.argv.some(arg => arg.startsWith('--user-data-dir'))) {
  app.setPath('userData', path.join(app.getPath('appData'), 'CLHH 晶体动态透明版'))
}

const packMakerOnly = process.argv.includes('--pack-maker')
const isDev =
  !packMakerOnly &&
  (process.env.NODE_ENV === 'development' ||
    (!app.isPackaged && process.env.NODE_ENV !== 'production'))

let mainWindow = null

function getFfmpegPath() {
  const exeName = process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg'
  const candidates = [
    process.resourcesPath ? path.join(process.resourcesPath, 'ffmpeg', exeName) : '',
    path.join(__dirname, '..', 'resources', 'ffmpeg', exeName),
    path.join(process.cwd(), 'resources', 'ffmpeg', exeName),
  ].filter(Boolean)

  for (const candidate of candidates) {
    try {
      if (fsSync.existsSync(candidate)) return candidate
    } catch {
      // ignore
    }
  }
  return exeName
}

const SKIP_START_FRAMES = 0

function normalizeSkipStartFrames(value) {
  if (value === undefined || value === null || value === '') return SKIP_START_FRAMES
  const n = Number(value)
  if (!Number.isFinite(n)) return SKIP_START_FRAMES
  return Math.min(999, Math.max(0, Math.floor(n)))
}

function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      windowsHide: true,
      shell: false,
    })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (d) => {
      stdout += d.toString()
    })
    child.stderr.on('data', (d) => {
      stderr += d.toString()
    })
    child.on('error', (err) => reject(err))
    child.on('close', (code) => {
      if (code === 0) resolve({ stdout, stderr })
      else reject(new Error(stderr || stdout || `命令退出码 ${code}`))
    })
  })
}

function runCommandCapture(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      windowsHide: true,
      shell: false,
    })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (d) => {
      stdout += d.toString()
    })
    child.stderr.on('data', (d) => {
      stderr += d.toString()
    })
    child.on('error', (err) => reject(err))
    child.on('close', (code) => {
      resolve({ code, stdout, stderr })
    })
  })
}

function parseFpsFromText(text) {
  const src = String(text || '')
  const frac = src.match(/(\d+)\s*\/\s*(\d+)\s*fps/)
  if (frac && Number(frac[2])) {
    const fps = Number(frac[1]) / Number(frac[2])
    if (fps > 0 && fps < 240) return fps
  }
  const fpsMatch = src.match(/,\s*([\d.]+)\s*fps/)
  if (fpsMatch) {
    const fps = Number(fpsMatch[1])
    if (fps > 0 && fps < 240) return fps
  }
  const tbr = src.match(/([\d.]+)\s*tbr/)
  if (tbr) {
    const fps = Number(tbr[1])
    if (fps > 0 && fps < 240) return fps
  }
  return 24
}

async function probeVideoFps(ffmpegBin, inputPath) {
  const probeBin = String(ffmpegBin).replace(/ffmpeg(\.exe)?$/i, 'ffprobe$1')
  if (probeBin !== ffmpegBin) {
    try {
      const probed = await runCommandCapture(probeBin, [
        '-v',
        'error',
        '-select_streams',
        'v:0',
        '-show_entries',
        'stream=avg_frame_rate,r_frame_rate',
        '-of',
        'default=noprint_wrappers=1',
        inputPath,
      ])
      const text = `${probed.stdout}\n${probed.stderr}`
      const avg = text.match(/avg_frame_rate=(\d+)\/(\d+)/)
      if (avg && Number(avg[2])) {
        const fps = Number(avg[1]) / Number(avg[2])
        if (fps > 0 && fps < 240) return fps
      }
      const rate = text.match(/r_frame_rate=(\d+)\/(\d+)/)
      if (rate && Number(rate[2])) {
        const fps = Number(rate[1]) / Number(rate[2])
        if (fps > 0 && fps < 240) return fps
      }
    } catch {
      // fall through to ffmpeg -i
    }
  }

  const probed = await runCommandCapture(ffmpegBin, ['-hide_banner', '-i', inputPath])
  return parseFpsFromText(`${probed.stderr}\n${probed.stdout}`)
}

async function trimSkipStartFrames(ffmpegBin, inputPath, outputPath, skipFrames) {
  const fps = await probeVideoFps(ffmpegBin, inputPath)
  const skipSec = (skipFrames / fps).toFixed(6)
  const commonOut = [
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-crf',
    '18',
    '-movflags',
    '+faststart',
    outputPath,
  ]
  try {
    await runCommand(
      ffmpegBin,
      [
        '-y',
        '-i',
        inputPath,
        '-vf',
        `trim=start_frame=${skipFrames},setpts=PTS-STARTPTS`,
        '-af',
        `atrim=start=${skipSec},asetpts=PTS-STARTPTS`,
        '-c:a',
        'aac',
        ...commonOut,
      ],
      path.dirname(outputPath)
    )
  } catch {
    await runCommand(
      ffmpegBin,
      [
        '-y',
        '-i',
        inputPath,
        '-vf',
        `trim=start_frame=${skipFrames},setpts=PTS-STARTPTS`,
        '-an',
        ...commonOut,
      ],
      path.dirname(outputPath)
    )
  }
}

function getAppIconPath() {
  const brandIcon = path.join(
    __dirname,
    '..',
    'build',
    'brands',
    String(runtimeBrand.id || 'morph'),
    'icon.ico'
  )
  const candidates = [
    path.join(__dirname, '..', 'dist', 'icon.png'),
    brandIcon,
    path.join(__dirname, 'icon.ico'),
    path.join(__dirname, '..', 'build', 'icon.ico'),
    process.resourcesPath ? path.join(process.resourcesPath, 'icon.ico') : '',
  ].filter(Boolean)
  for (const candidate of candidates) {
    try {
      if (fsSync.existsSync(candidate)) return candidate
    } catch {
      // ignore
    }
  }
  return undefined
}

function createWindow() {
  // 默认窗口：音乐播放器式适中尺寸，非全屏
  const defaultWidth = packMakerOnly ? 760 : 1024
  const defaultHeight = packMakerOnly ? 820 : 720

  mainWindow = new BrowserWindow({
    width: defaultWidth,
    height: defaultHeight,
    minWidth: packMakerOnly ? 640 : 900,
    minHeight: packMakerOnly ? 640 : 620,
    center: true,
    title: packMakerOnly ? '制作模板包' : APP_NAME,
    icon: getAppIconPath(),
    frame: false,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      spellcheck: false,
      experimentalFeatures: true,
    },
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
    if (isDev && !packMakerOnly) {
      setTimeout(() => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.openDevTools({ mode: 'detach' })
        }
      }, 800)
    }
  })

  if (packMakerOnly) {
    const distHtml = path.join(__dirname, '../dist/index.html')
    if (!fsSync.existsSync(distHtml)) {
      dialog.showErrorBox(
        '制作模板包',
        '还没有构建界面文件。请先在项目目录运行 npm run build，或直接使用制作模板包.bat（会自动构建）。'
      )
      app.quit()
      return
    }
    mainWindow.loadFile(distHtml, { hash: 'pack-maker' })
  } else if (isDev) {
    const ports = ['5173', '5174', '5175', '5176']
    let index = 0
    const tryLoad = () => {
      if (index >= ports.length) return
      const url = `http://localhost:${ports[index++]}`
      mainWindow.loadURL(url)
      mainWindow.webContents.once('did-fail-load', (_e, code) => {
        if (code === -105 || code === -106) {
          setTimeout(tryLoad, 400)
        }
      })
    }
    tryLoad()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
      { role: 'appMenu' },
      { role: 'editMenu' },
      { role: 'viewMenu' },
      { role: 'windowMenu' },
    ]))
  } else {
    Menu.setApplicationMenu(null)
  }
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('license-status', async () => {
  try {
    return {
      success: true,
      ...license.inspectLicense(app.getPath('userData'), { packaged: app.isPackaged }),
    }
  } catch (error) {
    return { success: false, licensed: false, error: error.message || String(error) }
  }
})

ipcMain.handle('license-activate', async (_event, activationCode) => {
  try {
    const result = license.activateLicense(app.getPath('userData'), activationCode)
    if (!result.success) return result
    return {
      success: true,
      ...license.inspectLicense(app.getPath('userData'), { packaged: app.isPackaged }),
    }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

ipcMain.handle('app-confirm', async (_event, message) => {
  const result = await dialog.showMessageBox(mainWindow, {
    type: 'question',
    buttons: ['确定', '取消'],
    defaultId: 0,
    cancelId: 1,
    title: APP_NAME,
    message: String(message || '请确认'),
    noLink: true,
  })
  return result.response === 0
})

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'createDirectory'],
    title: '选择结果保存文件夹',
  })
  if (result.canceled || !result.filePaths?.length) {
    return { success: false }
  }
  return { success: true, path: result.filePaths[0] }
})

ipcMain.handle('read-markdown-file', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: '选择 Markdown 文档',
      properties: ['openFile'],
      filters: [
        { name: 'Markdown / 文本', extensions: ['md', 'markdown', 'txt'] },
        { name: '所有文件', extensions: ['*'] },
      ],
    })
    if (result.canceled || !result.filePaths?.length) {
      return { success: false, canceled: true }
    }
    const filePath = result.filePaths[0]
    const content = await fs.readFile(filePath, 'utf8')
    return {
      success: true,
      path: filePath,
      name: path.basename(filePath),
      content,
    }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

function stylePromptsDir() {
  return path.join(__dirname, '..', 'src', 'data', 'style-prompts')
}

function styleManifestPath() {
  return path.join(__dirname, '..', 'src', 'data', 'style-manifest.json')
}

async function readStyleManifest() {
  const filePath = styleManifestPath()
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(raw)
    if (data && Array.isArray(data.styles)) return data
  } catch {
    // ignore
  }
  return { styles: [] }
}

async function writeStyleManifest(data) {
  const filePath = styleManifestPath()
  const normalized = {
    styles: Array.isArray(data?.styles) ? data.styles : [],
  }
  await fs.writeFile(filePath, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8')
  return filePath
}

ipcMain.handle('style-prompt-save', async (_event, payload) => {
  try {
    if (app.isPackaged) {
      return { success: false, error: '正式打包版不允许修改风格提示词' }
    }
    const styleId = String(payload?.styleId || '').trim()
    if (!/^[a-z0-9-]+$/i.test(styleId)) {
      return { success: false, error: '风格 ID 不合法' }
    }
    const allowCreate = Boolean(payload?.allowCreate)
    const content = String(payload?.content ?? '').replace(/\r\n/g, '\n')
    const filePath = path.join(stylePromptsDir(), `${styleId}.md`)
    const dir = path.dirname(filePath)
    if (!fsSync.existsSync(dir)) {
      await fs.mkdir(dir, { recursive: true })
    }
    if (!fsSync.existsSync(filePath) && !allowCreate) {
      return { success: false, error: `找不到风格文件：${styleId}.md` }
    }
    await fs.writeFile(filePath, content.endsWith('\n') ? content : `${content}\n`, 'utf8')
    return { success: true, path: filePath }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

ipcMain.handle('style-prompt-create', async (_event, payload) => {
  try {
    if (app.isPackaged) {
      return { success: false, error: '正式打包版不允许添加风格' }
    }
    const styleId = String(payload?.styleId || '').trim()
    const name = String(payload?.name || '').trim()
    const accent = String(payload?.accent || '#1A365D').trim()
    if (!styleId || !/^[a-z0-9-]+$/i.test(styleId)) {
      return { success: false, error: '风格 ID 不合法' }
    }
    if (!name) {
      return { success: false, error: '风格名称不能为空' }
    }
    const content = String(payload?.content ?? '').replace(/\r\n/g, '\n')
    const filePath = path.join(stylePromptsDir(), `${styleId}.md`)
    const dir = path.dirname(filePath)
    if (!fsSync.existsSync(dir)) {
      await fs.mkdir(dir, { recursive: true })
    }
    if (!fsSync.existsSync(filePath)) {
      await fs.writeFile(
        filePath,
        content.endsWith('\n') ? content : `${content}\n`,
        'utf8'
      )
    }
    const manifest = await readStyleManifest()
    const exists = manifest.styles.some((item) => item.id === styleId)
    if (!exists) {
      manifest.styles.push({ id: styleId, name, accent })
      await writeStyleManifest(manifest)
    }
    return { success: true, path: filePath }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

ipcMain.handle('style-prompt-delete', async (_event, payload) => {
  try {
    if (app.isPackaged) {
      return { success: false, error: '正式打包版不允许删除风格' }
    }
    const styleId = String(payload?.styleId || '').trim()
    if (!styleId || !/^[a-z0-9-]+$/i.test(styleId)) {
      return { success: false, error: '风格 ID 不合法' }
    }
    const manifest = await readStyleManifest()
    const nextStyles = manifest.styles.filter((item) => item.id !== styleId)
    if (nextStyles.length === 0 && manifest.styles.length > 0) {
      return { success: false, error: '至少保留一个风格模板' }
    }
    if (nextStyles.length !== manifest.styles.length) {
      await writeStyleManifest({ styles: nextStyles })
    }
    const filePath = path.join(stylePromptsDir(), `${styleId}.md`)
    if (fsSync.existsSync(filePath)) {
      await fs.unlink(filePath)
    }
    return { success: true, path: filePath }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

ipcMain.handle('style-prompt-rename', async (_event, payload) => {
  try {
    if (app.isPackaged) {
      return { success: false, error: '正式打包版不允许修改风格名称' }
    }
    const styleId = String(payload?.styleId || '').trim()
    const name = String(payload?.name || '').trim()
    if (!styleId || !/^[a-z0-9-]+$/i.test(styleId)) {
      return { success: false, error: '风格 ID 不合法' }
    }
    if (!name) {
      return { success: false, error: '风格名称不能为空' }
    }
    const manifest = await readStyleManifest()
    let found = false
    const styles = manifest.styles.map((item) => {
      if (item.id !== styleId) return item
      found = true
      return { ...item, name }
    })
    if (!found) {
      return { success: false, error: '清单中找不到该风格' }
    }
    await writeStyleManifest({ styles })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

ipcMain.handle('open-folder', async (_event, folderPath) => {
  if (!folderPath) return { success: false, error: '未设置文件夹' }
  try {
    await fs.mkdir(folderPath, { recursive: true })
    await shell.openPath(folderPath)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

ipcMain.handle('open-external', async (_event, rawUrl) => {
  try {
    const url = String(rawUrl || '').trim()
    if (!/^https?:\/\//i.test(url)) {
      return { success: false, error: '仅支持 http/https 链接' }
    }
    await shell.openExternal(url)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

function userGuidePath() {
  return path.join(__dirname, '..', 'src', 'data', 'user-guide.json')
}

ipcMain.handle('user-guide-save', async (_event, payload) => {
  try {
    if (app.isPackaged) {
      return { success: false, error: '正式打包版不允许修改使用说明' }
    }
    const title = String(payload?.title || '').trim() || '使用说明'
    const content = String(payload?.content ?? '')
    const filePath = userGuidePath()
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(
      filePath,
      `${JSON.stringify({ title, content }, null, 2)}\n`,
      'utf8'
    )
    return { success: true, path: filePath }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

function safeFileName(name) {
  return String(name || 'template')
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, '_')
    .slice(0, 40) || 'template'
}

ipcMain.handle('template-pack-export', async (_event, input) => {
  try {
    const { payload, buffer } = templatePack.encryptPayload(input)
    const result = await dialog.showSaveDialog(mainWindow, {
      title: '导出加密模板包',
      defaultPath: `${safeFileName(payload.name)}.rhpack`,
      filters: [{ name: 'RH 模板包', extensions: ['rhpack'] }],
    })
    if (result.canceled || !result.filePath) {
      return { success: false, canceled: true }
    }
    const target = result.filePath.toLowerCase().endsWith('.rhpack')
      ? result.filePath
      : `${result.filePath}.rhpack`
    await fs.writeFile(target, buffer)
    const { publicInfo, secret } = templatePack.splitPublicAndSecret(payload)
    const sealed = templatePack.sealSecret(secret)
    return { success: true, path: target, publicInfo, sealed, secret }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

ipcMain.handle('template-pack-import', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: '上传加密模板包',
      properties: ['openFile'],
      filters: [{ name: 'RH 模板包', extensions: ['rhpack'] }],
    })
    if (result.canceled || !result.filePaths?.length) {
      return { success: false, canceled: true }
    }
    const buffer = await fs.readFile(result.filePaths[0])
    const payload = templatePack.decryptBuffer(buffer)
    const { publicInfo, secret } = templatePack.splitPublicAndSecret(payload)
    const sealed = templatePack.sealSecret(secret)
    return { success: true, publicInfo, sealed, secret }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

ipcMain.handle('template-pack-seal', async (_event, secret) => {
  try {
    const sealed = templatePack.sealSecret(secret)
    return { success: true, sealed }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

ipcMain.handle('template-pack-unseal', async (_event, sealed) => {
  try {
    const secret = templatePack.unsealSecret(sealed)
    return { success: true, secret }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

ipcMain.handle('toggle-maximize', async () => {
  if (!mainWindow) return { success: false }
  if (mainWindow.isMaximized()) mainWindow.unmaximize()
  else mainWindow.maximize()
  return { success: true, maximized: mainWindow.isMaximized() }
})

ipcMain.handle('window-minimize', async () => {
  mainWindow?.minimize()
  return { success: true }
})

ipcMain.handle('window-close', async () => {
  mainWindow?.close()
  return { success: true }
})

ipcMain.handle('save-files-to-path', async (_event, { folderPath, files }) => {
  try {
    if (!folderPath) {
      return { success: false, error: '未设置结果文件夹' }
    }
    await fs.mkdir(folderPath, { recursive: true })

    const saved = []
    for (const file of files || []) {
      const safeName = String(file.filename || `file_${Date.now()}`).replace(/[<>:"/\\|?*]/g, '_')
      const target = path.join(folderPath, safeName)
      const buffer = Buffer.from(file.data)
      await fs.writeFile(target, buffer)
      saved.push(target)
    }

    return { success: true, saved }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

/**
 * 将多个视频按顺序合并为一个 mp4。
 * 合并前按 skipStartFrames 去掉每段视频开头若干帧，再拼接；0 表示不去掉。
 */
ipcMain.handle('merge-videos', async (_event, { folderPath, inputPaths, outputName, skipStartFrames }) => {
  const licenseState = license.inspectLicense(app.getPath('userData'), { packaged: app.isPackaged })
  if (!licenseState.licensed) {
    return { success: false, error: '未激活：请先使用本机激活码激活后再生成' }
  }
  const skipFrames = normalizeSkipStartFrames(skipStartFrames)
  const tmpDir = path.join(
    folderPath || require('os').tmpdir(),
    `_merge_trim_${Date.now()}`
  )
  try {
    if (!folderPath) return { success: false, error: '未设置结果文件夹' }
    if (!Array.isArray(inputPaths) || inputPaths.length === 0) {
      return { success: false, error: '没有可合并的视频' }
    }

    await fs.mkdir(folderPath, { recursive: true })
    await fs.mkdir(tmpDir, { recursive: true })

    const outName = String(outputName || `视频_${Date.now()}.mp4`).replace(
      /[<>:"/\\|?*]/g,
      '_'
    )
    const outputPath = path.join(folderPath, outName.endsWith('.mp4') ? outName : `${outName}.mp4`)
    const ffmpegBin = getFfmpegPath()

    const trimmedPaths = []
    for (let i = 0; i < inputPaths.length; i++) {
      if (skipFrames <= 0) {
        trimmedPaths.push(inputPaths[i])
        continue
      }
      const trimmed = path.join(tmpDir, `trim_${i}.mp4`)
      await trimSkipStartFrames(ffmpegBin, inputPaths[i], trimmed, skipFrames)
      trimmedPaths.push(trimmed)
    }

    if (trimmedPaths.length === 1) {
      await fs.copyFile(trimmedPaths[0], outputPath)
      return { success: true, path: outputPath }
    }

    const listFile = path.join(tmpDir, `_concat.txt`)
    const listContent = trimmedPaths
      .map((p) => {
        const normalized = String(p).replace(/\\/g, '/')
        const escaped = normalized.replace(/'/g, `'\\''`)
        return `file '${escaped}'`
      })
      .join('\n')
    await fs.writeFile(listFile, listContent, 'utf8')

    try {
      await runCommand(
        ffmpegBin,
        ['-y', '-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', outputPath],
        tmpDir
      )
    } catch {
      await runCommand(
        ffmpegBin,
        [
          '-y',
          '-f',
          'concat',
          '-safe',
          '0',
          '-i',
          listFile,
          '-c:v',
          'libx264',
          '-c:a',
          'aac',
          '-movflags',
          '+faststart',
          outputPath,
        ],
        tmpDir
      )
    }
    return { success: true, path: outputPath }
  } catch (error) {
    return {
      success: false,
      error:
        error.message ||
        String(error) ||
        '视频合并失败：未找到内置 ffmpeg',
    }
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {})
  }
})

/**
 * 去掉合并视频原音轨，再与上传音频从第 0 秒对齐融合，写出最终成片。
 * 以较短一侧为准（-shortest），保证画面与音频同步起止。
 */
ipcMain.handle('replace-video-audio', async (_event, payload) => {
  const videoPath = String(payload?.videoPath || '').trim()
  const audioPath = String(payload?.audioPath || '').trim()
  const outputPathRaw = String(payload?.outputPath || '').trim()
  if (!videoPath || !fsSync.existsSync(videoPath)) {
    return { success: false, error: '找不到合并后的视频文件' }
  }
  if (!audioPath || !fsSync.existsSync(audioPath)) {
    return { success: false, error: '找不到上传的音频文件' }
  }
  if (!outputPathRaw) {
    return { success: false, error: '未指定输出路径' }
  }

  const outputPath = outputPathRaw.toLowerCase().endsWith('.mp4')
    ? outputPathRaw
    : `${outputPathRaw}.mp4`
  const tmpDir = path.join(
    require('os').tmpdir(),
    `rh-replace-audio-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  )

  try {
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.mkdir(tmpDir, { recursive: true })
    const ffmpegBin = getFfmpegPath()
    const silentPath = path.join(tmpDir, 'silent.mp4')

    // 1) 去掉原视频音轨，只保留画面
    try {
      await runCommand(
        ffmpegBin,
        ['-y', '-i', videoPath, '-an', '-c:v', 'copy', silentPath],
        tmpDir
      )
    } catch {
      await runCommand(
        ffmpegBin,
        [
          '-y',
          '-i',
          videoPath,
          '-an',
          '-c:v',
          'libx264',
          '-preset',
          'veryfast',
          '-crf',
          '18',
          '-movflags',
          '+faststart',
          silentPath,
        ],
        tmpDir
      )
    }

    // 2) 用上传音频替换音轨，从头对齐到较短一侧结束
    try {
      await runCommand(
        ffmpegBin,
        [
          '-y',
          '-i',
          silentPath,
          '-i',
          audioPath,
          '-map',
          '0:v:0',
          '-map',
          '1:a:0',
          '-c:v',
          'copy',
          '-c:a',
          'aac',
          '-b:a',
          '192k',
          '-shortest',
          '-movflags',
          '+faststart',
          outputPath,
        ],
        tmpDir
      )
    } catch {
      await runCommand(
        ffmpegBin,
        [
          '-y',
          '-i',
          silentPath,
          '-i',
          audioPath,
          '-map',
          '0:v:0',
          '-map',
          '1:a:0',
          '-c:v',
          'libx264',
          '-preset',
          'veryfast',
          '-crf',
          '18',
          '-c:a',
          'aac',
          '-b:a',
          '192k',
          '-shortest',
          '-movflags',
          '+faststart',
          outputPath,
        ],
        tmpDir
      )
    }

    if (!fsSync.existsSync(outputPath)) {
      return { success: false, error: '音视频融合失败：未生成输出文件' }
    }
    return { success: true, path: outputPath }
  } catch (error) {
    return {
      success: false,
      error:
        error.message ||
        String(error) ||
        '音视频融合失败：未找到内置 ffmpeg',
    }
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {})
  }
})

/**
 * 上传前把音频转成云端 LoadAudio 更稳的标准 MP3。
 * 采样率 44100、128kbps；声道数与源文件一致（探测不到则单声道）。
 */
function parseAudioChannels(text) {
  const src = String(text || '')
  if (/\bmono\b/i.test(src) || /\b1\s*channels?\b/i.test(src)) return 1
  if (/\bstereo\b/i.test(src) || /\b2\s*channels?\b/i.test(src)) return 2
  const channelsEq = src.match(/channels=(\d+)/i)
  if (channelsEq) {
    const n = Number(channelsEq[1])
    if (n === 1 || n === 2) return n
    if (n > 2) return 2
  }
  const layout = src.match(/channel_layout=([^\s,]+)/i)
  if (layout) {
    const name = layout[1].toLowerCase()
    if (name === 'mono') return 1
    if (name.includes('stereo') || name === '2.0') return 2
  }
  return 1
}

async function probeAudioChannels(ffmpegBin, inputPath) {
  const probeBin = String(ffmpegBin).replace(/ffmpeg(\.exe)?$/i, 'ffprobe$1')
  if (probeBin !== ffmpegBin) {
    try {
      const probed = await runCommandCapture(probeBin, [
        '-v',
        'error',
        '-select_streams',
        'a:0',
        '-show_entries',
        'stream=channels,channel_layout',
        '-of',
        'default=noprint_wrappers=1',
        inputPath,
      ])
      if (probed.code === 0 || probed.stdout || probed.stderr) {
        return parseAudioChannels(`${probed.stdout}\n${probed.stderr}`)
      }
    } catch {
      // fall through
    }
  }
  const probed = await runCommandCapture(ffmpegBin, ['-hide_banner', '-i', inputPath])
  return parseAudioChannels(`${probed.stderr}\n${probed.stdout}`)
}

function parseDurationSeconds(text) {
  const src = String(text || '')
  const plain = src.match(/^\s*([\d.]+)\s*$/m)
  if (plain) {
    const n = Number(plain[1])
    if (Number.isFinite(n) && n > 0) return n
  }
  const key = src.match(/duration=([\d.]+)/i)
  if (key) {
    const n = Number(key[1])
    if (Number.isFinite(n) && n > 0) return n
  }
  const hms = src.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/i)
  if (hms) {
    const n = Number(hms[1]) * 3600 + Number(hms[2]) * 60 + Number(hms[3])
    if (Number.isFinite(n) && n > 0) return n
  }
  return 0
}

async function probeAudioDurationSeconds(ffmpegBin, inputPath) {
  const probeBin = String(ffmpegBin).replace(/ffmpeg(\.exe)?$/i, 'ffprobe$1')
  if (probeBin !== ffmpegBin) {
    try {
      const probed = await runCommandCapture(probeBin, [
        '-v',
        'error',
        '-show_entries',
        'format=duration',
        '-of',
        'default=noprint_wrappers=1:nokey=1',
        inputPath,
      ])
      const n = parseDurationSeconds(`${probed.stdout}\n${probed.stderr}`)
      if (n > 0) return n
    } catch {
      // fall through
    }
  }
  const probed = await runCommandCapture(ffmpegBin, ['-hide_banner', '-i', inputPath])
  return parseDurationSeconds(`${probed.stderr}\n${probed.stdout}`)
}

/** 探测音频时长（秒），供裁切前判断是否超过 45s */
ipcMain.handle('probe-audio-duration', async (_event, payload) => {
  const inputPath = String(payload?.inputPath || '').trim()
  if (!inputPath) return { success: false, error: '未提供音频文件路径' }
  if (!fsSync.existsSync(inputPath)) return { success: false, error: '音频文件不存在' }
  try {
    const ffmpegBin = getFfmpegPath()
    const duration = await probeAudioDurationSeconds(ffmpegBin, inputPath)
    if (!(duration > 0)) {
      return { success: false, error: '无法读取音频时长' }
    }
    return { success: true, duration }
  } catch (error) {
    return {
      success: false,
      error: (error && error.message) || String(error) || '无法读取音频时长',
    }
  }
})

ipcMain.handle('prepare-audio-for-upload', async (_event, payload) => {
  const inputPath = String(payload?.inputPath || '').trim()
  const originalName = String(payload?.originalName || 'audio').trim() || 'audio'
  if (!inputPath) {
    return { success: false, error: '未提供音频文件路径' }
  }
  if (!fsSync.existsSync(inputPath)) {
    return { success: false, error: '音频文件不存在' }
  }

  const os = require('os')
  const tmpDir = path.join(os.tmpdir(), `morph-audio-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`)
  try {
    await fs.mkdir(tmpDir, { recursive: true })
    const ffmpegBin = getFfmpegPath()
    const channels = await probeAudioChannels(ffmpegBin, inputPath)
    const safeBase = originalName
      .replace(/\.[^.]+$/, '')
      .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_')
      .slice(0, 80) || 'audio'
    const mp3Path = path.join(tmpDir, `${safeBase}_rh.mp3`)
    const wavPath = path.join(tmpDir, `${safeBase}_rh.wav`)

    let outputPath = ''
    try {
      await runCommand(
        ffmpegBin,
        [
          '-y',
          '-i',
          inputPath,
          '-vn',
          '-ar',
          '44100',
          '-ac',
          String(channels),
          '-c:a',
          'libmp3lame',
          '-b:a',
          '128k',
          mp3Path,
        ],
        tmpDir
      )
      outputPath = mp3Path
    } catch {
      try {
        await runCommand(
          ffmpegBin,
          [
            '-y',
            '-i',
            inputPath,
            '-vn',
            '-ar',
            '44100',
            '-ac',
            String(channels),
            '-c:a',
            'pcm_s16le',
            wavPath,
          ],
          tmpDir
        )
        outputPath = wavPath
      } catch (error) {
        const detail = error instanceof Error ? error.message : String(error)
        await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {})
        return {
          success: false,
          error: `音频转码失败：该文件可能已损坏或格式异常。请换一段录音，或用电脑另存为标准 MP3 后再试。${detail ? `\n（${detail.slice(0, 240)}）` : ''}`,
        }
      }
    }

    if (!outputPath || !fsSync.existsSync(outputPath)) {
      await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {})
      return { success: false, error: '音频转码失败：未生成输出文件' }
    }

    return {
      success: true,
      path: outputPath,
      tmpDir,
      channels,
      converted: true,
    }
  } catch (error) {
    await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {})
    return {
      success: false,
      error:
        (error && error.message) ||
        String(error) ||
        '音频转码失败：未找到内置 ffmpeg',
    }
  }
})

/** 按起止时间裁切一段音频，输出标准 mp3 */
ipcMain.handle('trim-audio-segment', async (_event, payload) => {
  const inputPath = String(payload?.inputPath || '').trim()
  const originalName = String(payload?.originalName || 'audio').trim() || 'audio'
  const start = Number(payload?.start)
  const end = Number(payload?.end)
  if (!inputPath) return { success: false, error: '未提供音频文件路径' }
  if (!fsSync.existsSync(inputPath)) return { success: false, error: '音频文件不存在' }
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    return { success: false, error: '裁切时间无效' }
  }
  const duration = end - start
  if (duration > 45.05) {
    return { success: false, error: '单段不能超过 45 秒' }
  }

  const os = require('os')
  const tmpDir = path.join(
    os.tmpdir(),
    `morph-trim-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  )
  try {
    await fs.mkdir(tmpDir, { recursive: true })
    const ffmpegBin = getFfmpegPath()
    const channels = await probeAudioChannels(ffmpegBin, inputPath)
    const safeBase =
      originalName
        .replace(/\.[^.]+$/, '')
        .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_')
        .slice(0, 80) || 'audio'
    const outPath = path.join(tmpDir, `${safeBase}.mp3`)
    const ss = Math.max(0, start).toFixed(3)
    const t = Math.max(0.05, duration).toFixed(3)
    try {
      await runCommand(
        ffmpegBin,
        [
          '-y',
          '-ss',
          ss,
          '-i',
          inputPath,
          '-t',
          t,
          '-vn',
          '-ar',
          '44100',
          '-ac',
          String(channels),
          '-c:a',
          'libmp3lame',
          '-b:a',
          '192k',
          outPath,
        ],
        tmpDir
      )
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error)
      await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {})
      return {
        success: false,
        error: `音频裁切失败${detail ? `：${detail.slice(0, 240)}` : ''}`,
      }
    }
    if (!fsSync.existsSync(outPath)) {
      await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {})
      return { success: false, error: '音频裁切失败：未生成输出文件' }
    }
    return { success: true, path: outPath, tmpDir, channels }
  } catch (error) {
    await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {})
    return {
      success: false,
      error:
        (error && error.message) ||
        String(error) ||
        '音频裁切失败：未找到内置 ffmpeg',
    }
  }
})

ipcMain.handle('cleanup-temp-path', async (_event, targetPath) => {
  try {
    const raw = String(targetPath || '').trim()
    if (!raw) return { success: true }
    const resolved = path.resolve(raw)
    const tmpRoot = path.resolve(require('os').tmpdir())
    if (!resolved.startsWith(tmpRoot)) {
      return { success: false, error: '只能清理临时目录内的文件' }
    }
    await fs.rm(resolved, { recursive: true, force: true })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message || String(error) }
  }
})

/** 素材缓存目录：刷新/热更新后可从磁盘恢复图片与音频 */
async function probeVideoDurationSeconds(ffmpegBin, inputPath) {
  const probeBin = String(ffmpegBin).replace(/ffmpeg(\.exe)?$/i, 'ffprobe$1')
  if (probeBin !== ffmpegBin) {
    try {
      const probed = await runCommandCapture(probeBin, [
        '-v',
        'error',
        '-select_streams',
        'v:0',
        '-show_entries',
        'stream=duration',
        '-of',
        'default=noprint_wrappers=1:nokey=1',
        inputPath,
      ])
      const n = parseDurationSeconds(`${probed.stdout}\n${probed.stderr}`)
      if (n > 0) return n
    } catch {
      // fall through
    }
  }
  const probed = await runCommandCapture(ffmpegBin, ['-hide_banner', '-i', inputPath])
  return parseDurationSeconds(`${probed.stderr}\n${probed.stdout}`)
}

/** 片头 1 秒模板，在标记点 ±1 秒内做波形互相关，校正真实起点 */
const ALIGN_TEMPLATE_SEC = 1
const ALIGN_SEARCH_RADIUS_SEC = 1
const ALIGN_SAMPLE_RATE = 16000
const ALIGN_MIN_SCORE = 0.18

async function extractPcmF32Mono(
  ffmpegBin,
  inputPath,
  startSec,
  durationSec,
  tmpDir
) {
  const rawPath = path.join(
    tmpDir,
    `pcm_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.f32`
  )
  const ss = Math.max(0, Number(startSec) || 0)
  const dur = Math.max(0.05, Number(durationSec) || 0)
  await runCommand(
    ffmpegBin,
    [
      '-y',
      '-i',
      inputPath,
      '-ss',
      ss.toFixed(4),
      '-t',
      dur.toFixed(4),
      '-vn',
      '-ac',
      '1',
      '-ar',
      String(ALIGN_SAMPLE_RATE),
      '-f',
      'f32le',
      rawPath,
    ],
    tmpDir
  )
  const buf = await fs.readFile(rawPath)
  await fs.rm(rawPath, { force: true }).catch(() => {})
  const copy = Buffer.from(buf)
  return new Float32Array(
    copy.buffer,
    copy.byteOffset,
    Math.floor(copy.byteLength / 4)
  )
}

function pcmRms(samples) {
  if (!samples || samples.length === 0) return 0
  let sum = 0
  for (let i = 0; i < samples.length; i++) {
    const v = samples[i]
    sum += v * v
  }
  return Math.sqrt(sum / samples.length)
}

/** 归一化互相关：返回 haystack 内最佳起点（秒）与得分 [-1,1] */
function findBestAudioOffsetSec(template, haystack, sampleRate) {
  const tLen = template.length
  const hLen = haystack.length
  if (tLen < sampleRate * 0.25 || hLen < tLen) {
    return { offsetSec: 0, score: 0 }
  }

  let tMean = 0
  for (let i = 0; i < tLen; i++) tMean += template[i]
  tMean /= tLen
  const tNorm = new Float32Array(tLen)
  let tVar = 0
  for (let i = 0; i < tLen; i++) {
    const v = template[i] - tMean
    tNorm[i] = v
    tVar += v * v
  }
  if (tVar < 1e-10) {
    return { offsetSec: 0, score: 0 }
  }

  let bestLag = 0
  let bestScore = -Infinity
  const maxLag = hLen - tLen
  for (let lag = 0; lag <= maxLag; lag++) {
    let hMean = 0
    for (let i = 0; i < tLen; i++) hMean += haystack[lag + i]
    hMean /= tLen
    let dot = 0
    let hVar = 0
    for (let i = 0; i < tLen; i++) {
      const hv = haystack[lag + i] - hMean
      dot += tNorm[i] * hv
      hVar += hv * hv
    }
    if (hVar < 1e-10) continue
    const score = dot / Math.sqrt(tVar * hVar)
    if (score > bestScore) {
      bestScore = score
      bestLag = lag
    }
  }
  return {
    offsetSec: bestLag / sampleRate,
    score: Number.isFinite(bestScore) ? bestScore : 0,
  }
}

/**
 * 用 seg 片头 1s 音频，在母带标记点 ±1s 内匹配，得到真实起点。
 * 失败时回退到 markerStart。
 */
async function alignSegmentStartToMaster(
  ffmpegBin,
  segPath,
  masterPath,
  markerStart,
  tmpDir
) {
  const nominal = Math.max(0, Number(markerStart) || 0)
  const radius = ALIGN_SEARCH_RADIUS_SEC
  const templateSec = ALIGN_TEMPLATE_SEC
  const windowStart = Math.max(0, nominal - radius)
  const haystackDur = radius + templateSec + radius

  try {
    const template = await extractPcmF32Mono(
      ffmpegBin,
      segPath,
      0,
      templateSec,
      tmpDir
    )
    if (pcmRms(template) < 1e-4) {
      return { trueStart: nominal, delta: 0, score: 0, fallback: true }
    }
    const haystack = await extractPcmF32Mono(
      ffmpegBin,
      masterPath,
      windowStart,
      haystackDur,
      tmpDir
    )
    const { offsetSec, score } = findBestAudioOffsetSec(
      template,
      haystack,
      ALIGN_SAMPLE_RATE
    )
    let trueStart = windowStart + offsetSec
    trueStart = Math.min(nominal + radius, Math.max(nominal - radius, trueStart))
    if (!(score >= ALIGN_MIN_SCORE)) {
      return { trueStart: nominal, delta: 0, score, fallback: true }
    }
    return {
      trueStart,
      delta: trueStart - nominal,
      score,
      fallback: false,
    }
  } catch {
    return { trueStart: nominal, delta: 0, score: 0, fallback: true }
  }
}

/** 对齐切割点：非末段 V>D 裁尾、V≤D 垫黑；末段不裁，保留真实片长。 */
function calcSegmentSlotPlanJS(videoDuration, markerDuration, isLastSegment) {
  const V = Math.max(0, videoDuration)
  const D = Math.max(0, markerDuration)
  if (isLastSegment) {
    if (V > 0.05) {
      return { contentTarget: V, blackPad: 0 }
    }
    return { contentTarget: Math.max(D, 0), blackPad: 0 }
  }
  if (!(D > 0)) {
    return { contentTarget: 0, blackPad: 0 }
  }
  if (V > D + 0.001) {
    return { contentTarget: D, blackPad: 0 }
  }
  if (V + 0.001 < D) {
    return { contentTarget: V, blackPad: D - V }
  }
  return { contentTarget: D, blackPad: 0 }
}

async function padVideoWithTrailingBlack(ffmpegBin, inputPath, outputPath, blackSeconds) {
  const tmpDir = path.dirname(outputPath)
  if (!(blackSeconds > 0.001)) {
    await fs.copyFile(inputPath, outputPath)
    return
  }
  const encodeTail = [
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-crf',
    '18',
    '-an',
    '-movflags',
    '+faststart',
    outputPath,
  ]
  await runCommand(
    ffmpegBin,
    [
      '-y',
      '-i',
      inputPath,
      '-vf',
      `tpad=stop_mode=add:stop_duration=${blackSeconds.toFixed(6)}`,
      ...encodeTail,
    ],
    tmpDir
  )
}

/** 去音轨；若 maxDuration 小于片长则裁尾，否则尽量 copy */
async function writeSilentVideoClip(ffmpegBin, inputPath, outputPath, maxDuration) {
  const tmpDir = path.dirname(outputPath)
  await fs.mkdir(tmpDir, { recursive: true })
  const V = await probeVideoDurationSeconds(ffmpegBin, inputPath)
  const encodeRe = [
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-crf',
    '18',
    '-an',
    '-movflags',
    '+faststart',
    outputPath,
  ]

  if (maxDuration > 0 && V > maxDuration + 0.02) {
    await runCommand(
      ffmpegBin,
      ['-y', '-i', inputPath, '-t', maxDuration.toFixed(3), ...encodeRe],
      tmpDir
    )
    return
  }

  try {
    await runCommand(
      ffmpegBin,
      ['-y', '-i', inputPath, '-an', '-c:v', 'copy', outputPath],
      tmpDir
    )
  } catch {
    await runCommand(ffmpegBin, ['-y', '-i', inputPath, ...encodeRe], tmpDir)
  }
}

/**
 * 按标记槽位对齐：非末段超切割点裁尾、不足垫黑；末段保留真实片长。不做拉伸/叠化。
 */
async function fitSegmentToMarkerSlot(
  ffmpegBin,
  inputPath,
  outputPath,
  markerDuration,
  isLastSegment = false
) {
  const tmpDir = path.dirname(outputPath)
  await fs.mkdir(tmpDir, { recursive: true })
  const V = await probeVideoDurationSeconds(ffmpegBin, inputPath)
  const slot = calcSegmentSlotPlanJS(V, markerDuration, isLastSegment)

  if (!(slot.contentTarget > 0)) {
    throw new Error('标记时长或视频时长无效')
  }

  const contentPath =
    slot.blackPad > 0.001
      ? path.join(
          tmpDir,
          `_content_${Date.now()}_${Math.random().toString(36).slice(2, 6)}.mp4`
        )
      : outputPath

  // 末段：不传裁切上限（写满真实片长）；非末段按 contentTarget
  await writeSilentVideoClip(
    ffmpegBin,
    inputPath,
    contentPath,
    isLastSegment ? 0 : slot.contentTarget
  )

  if (slot.blackPad > 0.001) {
    await padVideoWithTrailingBlack(
      ffmpegBin,
      contentPath,
      outputPath,
      slot.blackPad
    )
    await fs.rm(contentPath, { force: true }).catch(() => {})
  }
}

/** 按标记槽位对齐各段（先做片头 1s 波形匹配校正起点），再拼接并 mux 母带 */
ipcMain.handle('merge-batch-timeline', async (_event, payload) => {
  const licenseState = license.inspectLicense(app.getPath('userData'), { packaged: app.isPackaged })
  if (!licenseState.licensed) {
    return { success: false, error: '未激活：请先使用本机激活码激活后再生成' }
  }

  const masterAudioPath = String(payload?.masterAudioPath || '').trim()
  const outputPathRaw = String(payload?.outputPath || '').trim()
  const segments = Array.isArray(payload?.segments) ? payload.segments : []
  // 段文件在生成时已处理片头；合并阶段不再二次 skip / 拉伸
  void normalizeSkipStartFrames(payload?.skipStartFrames)
  void payload?.tailSlowPercent
  const masterAudioStart = Math.max(0, Number(payload?.masterAudioStart) || 0)

  if (!masterAudioPath || !fsSync.existsSync(masterAudioPath)) {
    return { success: false, error: '找不到母带音频文件' }
  }
  if (!outputPathRaw) {
    return { success: false, error: '未指定输出路径' }
  }
  if (segments.length === 0) {
    return { success: false, error: '没有可合并的分段' }
  }

  const outputPath = outputPathRaw.toLowerCase().endsWith('.mp4')
    ? outputPathRaw
    : `${outputPathRaw}.mp4`
  const tmpDir = path.join(
    require('os').tmpdir(),
    `morph-batch-merge-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  )

  try {
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.mkdir(tmpDir, { recursive: true })
    const ffmpegBin = getFfmpegPath()
    const fittedPaths = []
    const trueStarts = []

    // 1) 每段用片头 1s 与母带标记点 ±1s 波形匹配，得到真实起点
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i]
      const videoPath = String(seg?.videoPath || '').trim()
      const targetDuration = Number(seg?.targetDuration)
      if (!videoPath || !fsSync.existsSync(videoPath)) {
        return { success: false, error: `找不到第 ${i + 1} 段视频` }
      }
      if (!(targetDuration > 0)) {
        return { success: false, error: `第 ${i + 1} 段标记时长无效` }
      }
      let markerStart = Number(seg?.markerStart)
      if (!Number.isFinite(markerStart)) {
        markerStart =
          masterAudioStart +
          segments
            .slice(0, i)
            .reduce((sum, s) => sum + Number(s?.targetDuration || 0), 0)
      }
      const aligned = await alignSegmentStartToMaster(
        ffmpegBin,
        videoPath,
        masterAudioPath,
        markerStart,
        tmpDir
      )
      trueStarts.push(aligned.trueStart)
    }

    // 保证时间轴单调（匹配噪声导致后段起点早于前段时，微推）
    for (let i = 1; i < trueStarts.length; i++) {
      if (trueStarts[i] <= trueStarts[i - 1] + 0.05) {
        trueStarts[i] = trueStarts[i - 1] + 0.05
      }
    }

    // 2) 按真实起点装槽：非末段槽长 = 下一段真实起点 - 本段真实起点；末段保留真实片长
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i]
      const videoPath = String(seg?.videoPath || '').trim()
      const outSeg = path.join(tmpDir, `seg_${i}.mp4`)
      const isLast =
        seg?.isLast === true ||
        seg?.isLast === 1 ||
        i === segments.length - 1
      const slotDuration = isLast
        ? Number(seg?.targetDuration) || 0.1
        : Math.max(0.05, trueStarts[i + 1] - trueStarts[i])
      await fitSegmentToMarkerSlot(
        ffmpegBin,
        videoPath,
        outSeg,
        slotDuration,
        isLast
      )
      fittedPaths.push(outSeg)
    }

    let mergedSilent = fittedPaths[0]
    if (fittedPaths.length > 1) {
      mergedSilent = path.join(tmpDir, 'merged_silent.mp4')
      const listFile = path.join(tmpDir, '_concat.txt')
      const listContent = fittedPaths
        .map((p) => {
          const normalized = String(p).replace(/\\/g, '/')
          const escaped = normalized.replace(/'/g, `'\\''`)
          return `file '${escaped}'`
        })
        .join('\n')
      await fs.writeFile(listFile, listContent, 'utf8')
      try {
        await runCommand(
          ffmpegBin,
          ['-y', '-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', mergedSilent],
          tmpDir
        )
      } catch {
        await runCommand(
          ffmpegBin,
          [
            '-y',
            '-f',
            'concat',
            '-safe',
            '0',
            '-i',
            listFile,
            '-c:v',
            'libx264',
            '-preset',
            'veryfast',
            '-crf',
            '18',
            '-an',
            '-movflags',
            '+faststart',
            mergedSilent,
          ],
          tmpDir
        )
      }
    }

    // 总长跟拼接后的真实画面轨走（末段可能长于标记，需带上真实片尾）
    const timelineDuration = await probeVideoDurationSeconds(
      ffmpegBin,
      mergedSilent
    )
    const markerSum = segments.reduce(
      (sum, seg) => sum + Number(seg?.targetDuration || 0),
      0
    )
    const totalDuration =
      timelineDuration > 0.05 ? timelineDuration : markerSum
    if (!(totalDuration > 0)) {
      return { success: false, error: '标记总时长无效' }
    }

    // 母带从「第一段匹配到的真实起点」切入
    const audioStart = Math.max(0, trueStarts[0] || masterAudioStart)
    const audioArgs = ['-ss', audioStart.toFixed(3), '-i', masterAudioPath]

    try {
      await runCommand(
        ffmpegBin,
        [
          '-y',
          '-i',
          mergedSilent,
          ...audioArgs,
          '-map',
          '0:v:0',
          '-map',
          '1:a:0',
          '-c:v',
          'copy',
          '-c:a',
          'aac',
          '-b:a',
          '192k',
          '-t',
          totalDuration.toFixed(3),
          '-movflags',
          '+faststart',
          outputPath,
        ],
        tmpDir
      )
    } catch {
      await runCommand(
        ffmpegBin,
        [
          '-y',
          '-i',
          mergedSilent,
          ...audioArgs,
          '-map',
          '0:v:0',
          '-map',
          '1:a:0',
          '-c:v',
          'libx264',
          '-preset',
          'veryfast',
          '-crf',
          '18',
          '-c:a',
          'aac',
          '-b:a',
          '192k',
          '-t',
          totalDuration.toFixed(3),
          '-shortest',
          '-movflags',
          '+faststart',
          outputPath,
        ],
        tmpDir
      )
    }

    if (!fsSync.existsSync(outputPath)) {
      return { success: false, error: '批次合并失败：未生成最终成片文件' }
    }

    return { success: true, path: outputPath }
  } catch (error) {
    return {
      success: false,
      error: error.message || String(error) || '批次时间轴合并失败',
    }
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {})
  }
})

ipcMain.handle('media-cache-dir', async () => {
  try {
    const dir = path.join(app.getPath('userData'), 'media-cache')
    await fs.mkdir(dir, { recursive: true })
    return { success: true, path: dir }
  } catch (error) {
    return {
      success: false,
      error: (error && error.message) || String(error),
    }
  }
})
