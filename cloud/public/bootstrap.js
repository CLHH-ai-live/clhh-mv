// Workbench persistence is tab-local; only explicit saves reach the account's cloud state.
const tabValues = new Map();
const localStorage = {
  getItem: (key) => tabValues.get(key) ?? null,
  setItem: (key, value) => {
    tabValues.set(key, String(value));
    if (storageKeys.includes(key) && !hydrating) {
      clearTimeout(pendingSave);
      pendingSave = setTimeout(() => save().catch(console.error), 350);
    }
  },
  removeItem: (key) => tabValues.delete(key),
};
window.CLHH_BOOT?.update("正在读取账号…");
import { installBilling } from "/web/billing.js";
const response = await fetch("/api/me");
if (!response.ok) {
  location.replace("/login");
  throw new Error("Login required");
}
const me = await response.json();
const browserFetch = window.fetch.bind(window);
window.fetch = (input, options = {}) => {
  const url = new URL(
    typeof input === "string" ? input : input.url,
    location.href,
  );
  if (
    url.origin === location.origin &&
    url.pathname.startsWith("/api/provider/")
  ) {
    const headers = new Headers(options.headers);
    headers.set("X-CSRF-Token", me.csrf);
    return browserFetch(input, { ...options, headers });
  }
  return browserFetch(input, options);
};

const cache = new Map(),
  uploads = new WeakMap(),
  assetLoads = new Map();
let store,
  pendingSave,
  hydrating = true;
const storageKeys = [
  "rh-simple-tool-settings",
  "rh-ui-mode-v1",
  "rh-brand-preview-v1",
  "rh-user-guide-v1",
  "rh-style-catalog-v1",
  "clhh-web-style-overrides",
];
async function api(url, { body, headers = {}, ...options } = {}) {
  const r = await fetch(url, {
    ...options,
    headers: {
      "X-CSRF-Token": me.csrf,
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await r.json();
  if (!r.ok) {
    if (r.status === 401) location.replace("/login");
    throw new Error(data.error || "请求失败");
  }
  return data;
}
function ref(slot) {
  if (!slot) return null;
  return {
    id: slot.id || slot.cachePath?.replace("/assets/", ""),
    name: slot.name,
    mime: slot.file?.type || slot.mime || "application/octet-stream",
  };
}
async function loadAsset(item) {
  const id = item.id || item.cachePath?.replace("/assets/", "");
  if (cache.has(id)) return cache.get(id);
  if (assetLoads.has(id)) return assetLoads.get(id);
  const task = (async () => {
  const r = await fetch("/api/assets/" + encodeURIComponent(id), { signal: AbortSignal.timeout(90000) });
  if (!r.ok) throw new Error("素材文件不存在");
  const file = new File([await r.blob()], item.name, {
    type: item.mime || r.headers.get("content-type"),
  });
  const slot = {
    id,
    name: item.name,
    file,
    cachePath: "/assets/" + id,
    previewUrl: URL.createObjectURL(file),
  };
  cache.set(id, slot);
  return slot;
  })();
  assetLoads.set(id, task);
  try { return await task; } finally { assetLoads.delete(id); }
}
async function asset(slot) {
  if (!slot) return null;
  if (slot.id && cache.has(slot.id)) return slot;
  if (slot.cachePath?.startsWith("/assets/"))
    return { ...slot, id: slot.cachePath.slice(8) };
  if (uploads.has(slot.file)) return uploads.get(slot.file);
  const task = (async () => {
    const r = await fetch("/api/assets?name=" + encodeURIComponent(slot.name), {
      method: "POST",
      headers: {
        "X-CSRF-Token": me.csrf,
        "Content-Type": slot.file.type || "application/octet-stream",
      },
      body: slot.file,
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || "素材上传失败");
    const saved = { ...slot, ...data, cachePath: "/assets/" + data.id };
    cache.set(data.id, saved);
    return saved;
  })();
  uploads.set(slot.file, task);
  return task;
}
async function snapshot(state) {
  const panels = await Promise.all(
    state.panels.map(async (p) => ({
      ...p,
      image1: ref(await asset(p.image1)),
      image2: null,
      audio: ref(await asset(p.audio)),
      audioSource: ref(await asset(p.audioSource)),
      lastResults: (p.lastResults || []).map((r) => ({
        filename: r.filename,
        relative: r.path?.replace(/^\/results\//, ""),
      })),
    })),
  );
  return { panels, maxConcurrentTasks: state.maxConcurrentTasks };
}
function result(r) {
  return { filename: r.filename, path: "/results/" + r.relative };
}
async function refreshFiles() {
  const data = await api("/api/files");
  web.files = new Set(data.files.map((f) => "/results/" + f.path));
  return data.files;
}
async function showFiles() {
  let dialog = document.querySelector("#web-files");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "web-files";
    dialog.setAttribute("aria-label", "我的视频");
    dialog.innerHTML =
      '<div class="web-files-heading"><h2>我的视频</h2><button type="button" class="web-files-close">关闭</button></div><p>视频自动保存在云端，选择一个视频即可预览或下载。</p><div class="web-preview" hidden><h3></h3><video controls playsinline preload="metadata"></video><p role="status"></p><a class="web-download">下载当前视频</a></div><div class="web-files-list"></div>';
    dialog.querySelector(".web-files-close").onclick = () => dialog.close();
    dialog.addEventListener("close", () => {
      const video = dialog.querySelector("video");
      video.pause();
      video.removeAttribute("src");
      video.load();
    });
    document.body.append(dialog);
  }
  if (!dialog.open) dialog.showModal();
  const list = dialog.querySelector(".web-files-list"),
    preview = dialog.querySelector(".web-preview"),
    video = dialog.querySelector("video"),
    status = preview.querySelector("[role=status]");
  preview.hidden = true;
  video.pause();
  video.removeAttribute("src");
  video.load();
  list.textContent = "加载中…";
  try {
    const files = await refreshFiles();
    list.replaceChildren();
    for (const file of files) {
      const row = document.createElement("div");
      row.className = "web-file-row";
      const name = document.createElement("span");
      name.className = "web-file-name";
      name.textContent = file.path;
      const actions = document.createElement("div");
      actions.className = "web-file-actions";
      if (/\.(mp4|webm|mov|mkv|avi)$/i.test(file.name)) {
        const play = document.createElement("button");
        play.textContent = "预览";
        play.type = "button";
        play.setAttribute("aria-label", "预览 " + file.name);
        play.onclick = () => {
          preview.hidden = false;
          preview.querySelector("h3").textContent = file.name;
          status.textContent = "";
          video.onerror = () => {
            status.textContent = "此视频无法在当前浏览器播放，请下载后查看。";
          };
          video.src = "/api/preview?path=" + encodeURIComponent(file.path);
          const download = preview.querySelector("a");
          download.href = "/api/download?path=" + encodeURIComponent(file.path);
          download.download = file.name;
          video.load();
          preview.scrollIntoView({ block: "nearest", behavior: "smooth" });
        };
        actions.append(play);
      }
      const download = document.createElement("a");
      download.className = "web-download";
      download.textContent = "下载";
      download.setAttribute("aria-label", "下载 " + file.name);
      download.href = "/api/download?path=" + encodeURIComponent(file.path);
      download.download = file.name;
      actions.append(download);
      row.append(name, actions);
      list.append(row);
    }
    if (!files.length)
      list.textContent = "还没有生成的视频。生成完成后会显示在这里。";
  } catch (error) {
    list.textContent = error.message;
  }
}
async function logout() {
  await save();
  await api("/api/auth/sign-out", { method: "POST", body: {} });
  for (const key of storageKeys) localStorage.removeItem(key);
  location.replace("/login");
}
const ipc = {
  async invoke(method, payload) {
    if (method === "license-status")
      return { packaged: true, licensed: true, reason: "open", success: true };
    if (method === "select-folder")
      return {
        canceled: false,
        filePaths: ["/results"],
        success: true,
        path: "/results",
      };
    if (method === "open-folder") {
      await showFiles();
      return { success: true };
    }
    if (method === "toggle-maximize") {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
      return;
    }
    if (method === "window-close") return logout();
    if (method === "window-minimize") return;
    if (method === "app-confirm") return window.confirm(payload);
    if (method === "media-cache-dir") return { success: true, path: "/assets" };
    if (method === "open-external") {
      window.open(payload, "_blank", "noopener");
      return { success: true };
    }
    if (method === "import-image-as-png") return { success: false };
    if (method.startsWith("style-prompt-")) {
      const data = JSON.parse(
        localStorage.getItem("clhh-web-style-overrides") || "{}",
      );
      const id = payload.styleId;
      data[id] ??= {};
      if (method === "style-prompt-save" || method === "style-prompt-create")
        data[id].content = payload.content;
      if (method === "style-prompt-rename") data[id].name = payload.name;
      if (method === "style-prompt-delete") delete data[id];
      localStorage.setItem("clhh-web-style-overrides", JSON.stringify(data));
      return { success: true };
    }
    if (method === "user-guide-save") return { success: true };
    if (method.startsWith("template-pack-")) {
      const data = await api("/api/template/" + method.slice(14), {
        method: "POST",
        body: { payload },
      });
      if (data.download) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(
          new Blob([
            Uint8Array.from(atob(data.download), (c) => c.charCodeAt(0)),
          ]),
        );
        a.download = data.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      }
      return data;
    }
    throw new Error("网页端暂不支持此操作：" + method);
  },
};
const path = {
  join: (...parts) => parts.join("/").replace(/\/+/g, "/"),
  basename: (s) => s.split("/").pop(),
  dirname: (s) => s.slice(0, s.lastIndexOf("/")) || "/",
  extname: (s) => /\.[^/.]+$/.exec(s)?.[0] || "",
};
window.require = (name) => {
  if (name === "electron")
    return { ipcRenderer: ipc, webUtils: { getPathForFile: () => "" } };
  if (name === "path") return path;
  if (name === "os") return { tmpdir: () => "/tmp" };
  if (name === "fs")
    return {
      existsSync: (p) =>
        web.files.has(p) || cache.has(p?.replace("/assets/", "")),
    };
  throw new Error("仅在服务端可用：" + name);
};
const web = (window.CLHH_WEB = {
  api,
  storage: localStorage,
  asset,
  cached: (item) =>
    cache.get(item.id || item.cachePath?.replace("/assets/", "")) || null,
  ref,
  loadAsset,
  snapshot,
  result,
  files: new Set(),
  refreshFiles,
  bindStore: (s) => {
    store = s;
    hydrating = false;
    pollJobs();
  },
  bindQueue: (queue) => {
    queue.getMaxConcurrent = () => 100;
    const cancel = queue.cancel.bind(queue);
    queue.cancel = (panelId) => {
      void api("/api/jobs").then((jobs) =>
        Promise.all(
          jobs
            .filter(
              (j) =>
                j.panelId === panelId &&
                ["running", "queued"].includes(j.status),
            )
            .map((j) =>
              api("/api/jobs/" + j.id + "/cancel", {
                method: "POST",
                body: {},
              }),
            ),
        ),
      );
      return cancel(panelId);
    };
  },
  showFiles,
  bindStyles: (prompt, name) => {
    const data = JSON.parse(
      localStorage.getItem("clhh-web-style-overrides") || "{}",
    );
    for (const [id, value] of Object.entries(data)) {
      if (value.content !== undefined) prompt(id, value.content);
      if (value.name) name(id, value.name);
    }
  },
});
installBilling(web);
async function save() {
  if (hydrating) return;
  clearTimeout(pendingSave);
  const state = {};
  for (const key of storageKeys) {
    const value = localStorage.getItem(key);
    if (value) state[key] = JSON.parse(value);
  }
  await api("/api/state", { method: "PUT", body: state });
}
window.CLHH_BOOT?.update("正在恢复工作台…");
const persisted = await api("/api/state");
persisted["rh-simple-tool-settings"] ??= { state: {}, version: 0 };
persisted["rh-simple-tool-settings"].state.resultFolder = "/results";
for (const key of storageKeys) {
  localStorage.removeItem(key);
  if (persisted[key])
    localStorage.setItem(key, JSON.stringify(persisted[key]));
}
const panels = persisted["rh-simple-tool-settings"]?.state?.panels || [];
const assets = [...new Map(panels.flatMap(panel =>
  ["image1", "audio", "audioSource"].map(key => panel[key]).filter(Boolean)
).map(item => [item.id || item.cachePath, item])).values()];
let loaded = 0;
const pendingAssets = [...assets];
await Promise.all(Array.from({ length: Math.min(4, assets.length) }, async () => {
  while (pendingAssets.length) {
    const item = pendingAssets.shift();
    window.CLHH_BOOT?.update(`正在恢复素材 ${loaded}/${assets.length}…`);
    try { await loadAsset(item); } catch { /* Missing assets remain replaceable in the workbench. */ }
    loaded++;
  }
}));
// Result listing is optional for first paint and must not block the editor.
void refreshFiles().catch(() => {});
window.CLHH_BOOT?.update("正在打开工作台…");
const appliedJobs = new Map();
async function pollJobs() {
  try {
    const jobs = await api("/api/jobs");
    const latest = new Map();
    for (const job of jobs) latest.set(job.panelId, job);
    for (const job of latest.values()) {
      const panel = store.getState().panels.find((p) => p.id === job.panelId);
      if (!panel || appliedJobs.get(job.id) === job.updated) continue;
      if (job.status === "running" || job.status === "queued")
        store.getState().updatePanel(panel.id, {
          isRunning: job.status === "running",
          isQueued: job.status === "queued",
          statusText: (job.progress?.detail ? `${job.progress.stage} · ${job.progress.detail}` : job.progress?.stage) || (job.status === "queued" ? "排队中" : "生成中"),
        });
      else if (
        job.status === "done" &&
        (panel.isRunning || panel.isQueued || job.batchResult)
      ) {
        await refreshFiles();
        const saved =
          job.batchResult?.panels.find((p) => p.id === panel.id)?.lastResults ||
          job.result.saved;
        store.getState().updatePanel(panel.id, {
          isRunning: false,
          isQueued: false,
          statusText: job.batchResult
            ? "批次完成 · 已合并视频"
            : "完成 · 已保存视频",
          lastResults: saved.map(result),
          resultUnread: true,
        });
      } else if (
        ["failed", "cancelled"].includes(job.status) &&
        (panel.isRunning || panel.isQueued)
      )
        store.getState().updatePanel(panel.id, {
          isRunning: false,
          isQueued: false,
          statusText:
            job.status === "cancelled" ? "已取消" : "失败 · " + job.error,
        });
      appliedJobs.set(job.id, job.updated);
    }
  } catch {}
  setTimeout(pollJobs, 2000);
}

const css = document.createElement("link");
css.rel = "stylesheet";
css.href = "/web/web.css";
document.head.append(css);
await import("/assets/index.js");
// Window close becomes logout; all workbench controls continue using the same DOM.
const observer = new MutationObserver(() => {
  const close = document.querySelector('button[title="关闭"]');
  if (close) {
    close.title = "退出账号：" + (me.phoneNumber || me.email);
    close.setAttribute("aria-label", "退出账号");
  }
});
observer.observe(document.body, { childList: true, subtree: true });
