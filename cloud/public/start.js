const css = document.createElement("link");
css.rel = "stylesheet";
css.href = "/web/web.css";
document.head.append(css);
const panel = document.createElement("section");
panel.id = "web-startup";
panel.setAttribute("aria-live", "polite");
const title = document.createElement("h2");
title.textContent = "CLHH MV 创作";
const status = document.createElement("p");
status.textContent = "正在打开工作台…";
const retry = document.createElement("button");
retry.textContent = "重新加载";
retry.hidden = true;
retry.onclick = () => location.reload();
panel.append(title, status, retry);
document.body.append(panel);
window.CLHH_BOOT = { update: text => { if (!retry.hidden) return; status.textContent = text; } };
const slow = setTimeout(() => {
  status.textContent = "加载时间较长，请检查网络，或重新加载。";
  retry.hidden = false;
}, 30000);
try {
  await import("/web/bootstrap.js");
  await new Promise((resolve, reject) => {
    const ready = () => document.querySelector('#root button[title="我的视频"]');
    if (ready()) return resolve();
    const timer = setTimeout(() => { observer.disconnect(); reject(new Error("Workbench did not mount")); }, 15000);
    const observer = new MutationObserver(() => {
      if (ready()) { clearTimeout(timer); observer.disconnect(); resolve(); }
    });
    observer.observe(document.querySelector("#root"), { childList: true, subtree: true });
  });
  panel.remove();
} catch (error) {
  console.error("Workbench startup failed", error);
  status.textContent = "工作台加载失败，请检查网络后重试。";
  retry.hidden = false;
} finally { clearTimeout(slow); }
