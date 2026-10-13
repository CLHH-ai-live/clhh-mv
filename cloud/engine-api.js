// Local integration tests route provider traffic to a loopback fixture only.
const testProvider = window.require("process").env.CLHH_TEST_PROVIDER;
if (testProvider) {
  const base = new URL(testProvider);
  if (!["127.0.0.1", "localhost"].includes(base.hostname))
    throw new Error("Test provider must be loopback");
  const realFetch = window.fetch.bind(window);
  window.fetch = (input, options) => {
    const url = new URL(typeof input === "string" ? input : input.url);
    if (url.hostname === "www.runninghub.cn")
      return realFetch(base.origin + url.pathname + url.search, options);
    if (url.origin !== base.origin)
      throw new Error("External network disabled in integration test");
    return realFetch(input, options);
  };
}
window.__CLHH_ENGINE = {
  root() {
    return window.__CLHH_USER_ROOT;
  },
  slot(item) {
    if (!item) return null;
    const fs = window.require("fs"),
      path = window.require("path");
    const absolute = path.join(this.root(), "assets", item.id);
    const data = fs.readFileSync(absolute);
    const file = new File([data], item.name, {
      type: item.mime || "application/octet-stream",
    });
    return {
      name: item.name,
      file,
      previewUrl: URL.createObjectURL(file),
      cachePath: absolute,
    };
  },
  hydrate(snapshot) {
    const root = this.root(),
      path = window.require("path");
    const panels = (snapshot.panels || []).map((p, i) => ({
      ...p,
      image1: this.slot(p.image1),
      image2: null,
      audio: this.slot(p.audio),
      audioSource: this.slot(p.audioSource),
      isRunning: false,
      isQueued: false,
      lastResults: (p.lastResults || []).map((r) => ({
        ...r,
        path: path.join(root, "results", r.relative),
      })),
    }));
    ee.setState({
      panels,
      resultFolder: path.join(root, "results"),
      maxConcurrentTasks: Math.min(
        4,
        Math.max(1, snapshot.maxConcurrentTasks || 2),
      ),
    });
  },
  outputs(saved) {
    const path = window.require("path");
    return (saved || []).map((r) => ({
      filename: r.filename,
      relative: path.relative(path.join(this.root(), "results"), r.path),
    }));
  },
  async generate(payload) {
    this.hydrate(payload.snapshot);
    const o = payload.options;
    const panelId = o.panelId;
    const signal = Px(panelId);
    const report = (data) =>
      window
        .require("electron")
        .ipcRenderer.send("cloud-progress", { progress: payload.jobId, data });
    try {
      const result = await Yx({
        ...o,
        config: {
          ...Ot,
          baseUrl:
            window.require("process").env.CLHH_TEST_PROVIDER ||
            CLHH_SERVICE.baseUrl,
          apiKey: CLHH_SERVICE.apiKey,
        },
        bindings: Ot.bindings,
        resultFolder: window.require("path").join(this.root(), "results"),
        inputs: {
          ...o.inputs,
          image1: this.slot(o.inputs.image1),
          image2: null,
          audio: this.slot(o.inputs.audio),
        },
        signal,
        onTaskId: (taskId) => report({ taskId }),
        onProgress: report,
      });
      return { taskId: result.taskId, saved: this.outputs(result.saved) };
    } finally {
      Dx(panelId);
    }
  },
  async merge(payload) {
    this.hydrate(payload.snapshot);
    const result = await fm(payload.batchId, { force: payload.force });
    return {
      ...result,
      path: undefined,
      relative: result.path
        ? window
            .require("path")
            .relative(
              window.require("path").join(this.root(), "results"),
              result.path,
            )
        : undefined,
      panels: ee
        .getState()
        .panels.map((p) => ({
          id: p.id,
          statusText: p.statusText,
          lastResults: this.outputs(p.lastResults),
          resultUnread: p.resultUnread,
        })),
    };
  },
  async trim(payload) {
    const path = window.require("path"),
      fs = window.require("fs"),
      crypto = window.require("crypto");
    const input = path.join(this.root(), "assets", payload.asset.id);
    const output = [];
    for (let index = 0; index < payload.segments.length; index++) {
      const segment = payload.segments[index];
      const result = await bt().invoke("trim-audio-segment", {
        inputPath: input,
        start: segment.start,
        end: segment.end,
        originalName:
          payload.asset.name.replace(/\.[^.]+$/, "") + "_seg" + (index + 1),
      });
      if (!result.success) throw new Error(result.error);
      const id = crypto.randomUUID() + path.extname(result.path);
      fs.copyFileSync(result.path, path.join(this.root(), "assets", id));
      output.push({
        id,
        name: path.basename(result.path),
        mime: "audio/mpeg",
        index: index + 1,
        trim: segment,
      });
      if (result.tmpDir) await bt().invoke("cleanup-temp-path", result.tmpDir);
    }
    return output;
  },
  async probe(payload) {
    return bt().invoke("probe-audio-duration", {
      inputPath: window
        .require("path")
        .join(this.root(), "assets", payload.asset.id),
    });
  },
  async cancel(payload) {
    return zx(payload.panelId);
  },
  inspect() {
    return { panels: ee.getState().panels.length };
  },
};
