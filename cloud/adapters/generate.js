async function Yx(options) {
  const web = window.CLHH_WEB;
  const image1 = await web.asset(options.inputs.image1),
    audio = await web.asset(options.inputs.audio);
  const snapshot = await web.snapshot(ee.getState());
  const quote = await web.api("/api/billing/quote", {
    method: "POST",
    body: { asset: web.ref(audio) },
  });
  await web.confirmCharge(quote);
  if (options.signal?.aborted) {
    const error = new Error("已取消生成");
    error.name = "RunCancelledError";
    throw error;
  }
  const response = await web.api("/api/jobs", {
    method: "POST",
    body: {
      quoteId: quote.id,
      options: {
        panelId: options.panelId,
        inputs: {
          ...options.inputs,
          image1: web.ref(image1),
          image2: null,
          audio: web.ref(audio),
        },
        skipStartFrames: options.skipStartFrames,
        styleName: options.styleName,
        panelIndex: options.panelIndex,
        timelineMerge: options.timelineMerge,
      },
      snapshot,
    },
  });
  const abort = () =>
    void web.api("/api/jobs/" + response.id + "/cancel", {
      method: "POST",
      body: {},
    });
  options.signal?.addEventListener("abort", abort, { once: true });
  if (options.signal?.aborted) abort();
  try {
    while (true) {
      const job = await web.api("/api/jobs/" + response.id);
      if (job.taskId) options.onTaskId?.(job.taskId);
      if (job.progress) options.onProgress?.(job.progress);
      if (job.status === "done") {
        await web.refreshFiles();
        return { taskId: job.taskId, saved: job.result.saved.map(web.result) };
      }
      if (job.status === "failed") throw new Error(job.error || "生成失败");
      if (job.status === "cancelled") {
        const error = new Error("已取消生成");
        error.name = "RunCancelledError";
        throw error;
      }
      await new Promise((r) => setTimeout(r, 1200));
    }
  } finally {
    options.signal?.removeEventListener("abort", abort);
    void web.refreshWallet().catch(() => {});
  }
}
