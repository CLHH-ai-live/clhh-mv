function clhhHasVideo(e) {
  const n = Ks();
  if (
    n &&
    Array.isArray(e.lastResults) &&
    e.lastResults.some(
      (r) =>
        r &&
        typeof r.path === "string" &&
        /\.(mp4|mov|mkv|webm|avi)$/i.test(r.path) &&
        n.fs.existsSync(r.path),
    )
  )
    return true;
  return Tx(e);
}
function dd(e) {
  if (e.isRunning) return "生成中";
  if (e.isQueued) return e.queuePosition ? `排队 ${e.queuePosition}` : "排队中";
  const t = String(e.statusText || "").trim();
  if (t.includes("失败")) return "失败";
  if (t.includes("中断")) return "已中断";
  if (t.includes("取消")) return "已取消";
  if (clhhHasVideo(e)) return "已完成";
  if (t.startsWith("完成")) return "文件缺失";
  if (t.includes("重试")) return "重试中";
  return "待生成";
}
function clhhStatusKind(t) {
  return t === "已完成"
    ? "done"
    : t === "失败" || t === "文件缺失" || t === "已中断"
      ? "error"
      : t === "生成中" || t === "重试中"
        ? "running"
        : t.startsWith("排队")
          ? "queued"
          : "idle";
}
