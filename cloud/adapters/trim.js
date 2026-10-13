async function Sv(source, segments, onProgress) {
  if (!segments.length) throw new Error("请至少选择一段音频");
  for (const segment of segments) {
    const duration = segment.end - segment.start;
    if (duration <= 0.05) throw new Error("裁切区间过短");
    if (duration < Fe - 0.05) throw new Error(`每段不能短于 ${Fe} 秒`);
    if (duration > Me + 0.05) throw new Error(`每段不能超过 ${Me} 秒`);
  }
  const web = window.CLHH_WEB;
  onProgress?.("正在云端导出音频分段…");
  const saved = await web.asset(source);
  const results = await web.api("/api/media/trim", {
    method: "POST",
    body: { asset: web.ref(saved), segments },
  });
  return Promise.all(
    results.map(async (item) => ({
      index: item.index,
      trim: item.trim,
      slot: await web.loadAsset(item),
    })),
  );
}
