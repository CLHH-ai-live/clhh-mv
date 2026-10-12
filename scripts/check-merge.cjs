const { _electron } = require("playwright");
const fs = require("fs"),
  path = require("path"),
  assert = require("assert/strict"),
  { execFileSync } = require("child_process");
const root = path.resolve("release"),
  out = path.join(root, "merge-check-" + Date.now());
fs.mkdirSync(out, { recursive: true });
const bundle = path.join(root, "mac-arm64/CLHH MV 创作.app"),
  ff = path.join(bundle, "Contents/Resources/ffmpeg/ffmpeg"),
  probe = process.env.FFPROBE_PATH || "ffprobe";
const checks = [];
const run = (args) =>
  execFileSync(ff, ["-hide_banner", "-loglevel", "error", "-y", ...args], {
    maxBuffer: 30e6,
  });
const info = (p) =>
  JSON.parse(
    execFileSync(probe, [
      "-v",
      "error",
      "-show_streams",
      "-show_format",
      "-of",
      "json",
      p,
    ]),
  );
const check = (n, b) => {
  assert.ok(b, n);
  checks.push(n);
  console.log("PASS " + n);
};
const master = path.join(out, "母带 44s.wav");
run([
  "-f",
  "lavfi",
  "-i",
  "anoisesrc=color=pink:amplitude=0.4:duration=44:seed=42",
  "-af",
  "lowpass=f=2000",
  "-ar",
  "48000",
  master,
]);
const durations = [15, 15, 14],
  starts = [0, 15, 30],
  colors = ["red", "green", "blue"],
  segments = [];
for (let k = 0; k < 3; k++) {
  const p = path.join(out, `seg_${String(k + 1).padStart(2, "0")}.mp4`);
  run([
    "-f",
    "lavfi",
    "-i",
    `color=c=${colors[k]}:s=160x90:r=25:d=${durations[k]}`,
    "-ss",
    String(starts[k]),
    "-i",
    master,
    "-t",
    String(durations[k]),
    "-c:v",
    "libx264",
    "-preset",
    "ultrafast",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    p,
  ]);
  segments.push(p);
}
function verify(p, duration) {
  const r = info(p);
  check(
    path.basename(p) + " duration " + duration,
    Math.abs(Number(r.format.duration) - duration) < 0.2,
  );
  check(
    path.basename(p) + " video and audio streams",
    r.streams.some((s) => s.codec_type === "video") &&
      r.streams.some((s) => s.codec_type === "audio"),
  );
  for (const [sec, channel] of [
    [2, 0],
    [17, 1],
    [32, 2],
  ]) {
    if (sec >= duration) continue;
    const rgb = run([
      "-ss",
      String(sec),
      "-i",
      p,
      "-frames:v",
      "1",
      "-vf",
      "scale=1:1",
      "-pix_fmt",
      "rgb24",
      "-f",
      "rawvideo",
      "pipe:1",
    ]);
    check(
      "segment color order " + sec,
      rgb[channel] > rgb[(channel + 1) % 3] + 30 &&
        rgb[channel] > rgb[(channel + 2) % 3] + 30,
    );
  }
  return r;
}
(async () => {
  const app = await _electron.launch({
    executablePath: path.join(bundle, "Contents/MacOS/CLHH MV 创作"),
    args: [`--user-data-dir=${out}/profile`],
  });
  try {
    const p = await app.firstWindow();
    await p.getByRole("button", { name: "9:16", exact: true }).click();
    const invoke = (name, payload) =>
      p.evaluate(
        ({ name, payload }) =>
          window.require("electron").ipcRenderer.invoke(name, payload),
        { name, payload },
      );
    let r = await invoke("merge-videos", {
      folderPath: out,
      inputPaths: segments,
      outputName: "普通合并.mp4",
      skipStartFrames: 0,
    });
    check("merge-videos IPC succeeds", r.success);
    verify(r.path, 44);
    r = await invoke("merge-videos", {
      folderPath: out,
      inputPaths: segments,
      outputName: "去片头合并.mp4",
      skipStartFrames: 5,
    });
    check("skip initial frames succeeds", r.success);
    verify(r.path, 43.4);
    r = await invoke("replace-video-audio", {
      videoPath: path.join(out, "普通合并.mp4"),
      audioPath: master,
      outputPath: path.join(out, "替换母带.mp4"),
    });
    check("replace-video-audio succeeds", r.success);
    verify(r.path, 44);
    const payload = {
      masterAudioPath: master,
      masterAudioStart: 0,
      segments: segments.map((videoPath, k) => ({
        videoPath,
        markerStart: starts[k],
        targetDuration: durations[k],
        isLast: k === 2,
      })),
      outputPath: path.join(out, "时间轴合并.mp4"),
    };
    r = await invoke("merge-batch-timeline", payload);
    check("timeline merge IPC succeeds", r.success);
    verify(r.path, 44);
    const pcm = (file) =>
      run([
        "-i",
        file,
        "-t",
        "43",
        "-ac",
        "1",
        "-ar",
        "8000",
        "-f",
        "f32le",
        "pipe:1",
      ]);
    const aa = pcm(master),
      bb = pcm(r.path),
      a = new Float32Array(aa.buffer, aa.byteOffset, aa.length / 4),
      b = new Float32Array(bb.buffer, bb.byteOffset, bb.length / 4);
    let dot = 0,
      as = 0,
      bs = 0;
    for (let k = 2000; k < Math.min(a.length, b.length); k++) {
      dot += a[k] * b[k];
      as += a[k] * a[k];
      bs += b[k] * b[k];
    }
    const corr = dot / Math.sqrt(as * bs);
    check(
      "merged audio matches master waveform " + corr.toFixed(4),
      corr > 0.9,
    );
    r = await invoke("merge-batch-timeline", {
      ...payload,
      segments: [
        { ...payload.segments[0], videoPath: path.join(out, "missing.mp4") },
      ],
      outputPath: path.join(out, "should-not-exist.mp4"),
    });
    check(
      "missing segment blocked",
      !r.success && !fs.existsSync(path.join(out, "should-not-exist.mp4")),
    );
    await p.evaluate(
      ({ out, master, segments, starts, durations }) => {
        const key = "rh-simple-tool-settings",
          j = JSON.parse(localStorage.getItem(key)),
          base = j.state.panels[0];
        j.state.resultFolder = out;
        j.state.panels = segments.map((file, k) => ({
          ...base,
          id: "merge-fixture-" + k,
          title: "工作台 " + (k + 1),
          audioBatchId: "audio-batch-1791801000000",
          audioSegmentIndex: k + 1,
          audioTrim: { start: starts[k], end: starts[k] + durations[k] },
          audioSource: {
            name: "母带 44s.wav",
            cachePath: master,
            mime: "audio/wav",
          },
          audio: null,
          statusText: "完成",
          lastResults: [{ filename: file.split("/").pop(), path: file }],
        }));
        localStorage.setItem(key, JSON.stringify(j));
      },
      { out, master, segments, starts, durations },
    );
    await p.reload();
    await p.getByRole("button", { name: "合并分段", exact: true }).click();
    await p.getByRole("button", { name: "开始合并", exact: true }).click();
    await p
      .getByRole("dialog")
      .filter({ hasText: "批次合并成功" })
      .waitFor({ timeout: 120000 });
    const saved = await p.evaluate(
      () =>
        JSON.parse(localStorage.getItem("rh-simple-tool-settings")).state
          .panels,
    );
    check(
      "UI merge records same final output for all panels",
      saved.every(
        (x) =>
          x.lastResults[0].path === saved[0].lastResults[0].path &&
          x.statusText.includes("已合并 3 段"),
      ),
    );
    verify(saved[0].lastResults[0].path, 44);
    await p.screenshot({ path: path.join(out, "ui-merge-success.png") });
    console.log("OUTPUT " + out);
  } finally {
    await app.close();
    fs.writeFileSync(
      path.join(out, "report.json"),
      JSON.stringify({ checks }, null, 2),
    );
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
