const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const root = path.resolve(__dirname, "..");
if (process.platform !== "darwin" || process.arch !== "arm64") {
  throw new Error(
    "This build configuration targets Apple Silicon and must run on macOS arm64.",
  );
}
const mediaDir = path.join(root, "resources/ffmpeg");
fs.mkdirSync(mediaDir, { recursive: true });
const ffmpeg = path.join(mediaDir, "ffmpeg");
fs.copyFileSync(require("ffmpeg-static"), ffmpeg);
fs.chmodSync(ffmpeg, 0o755);
const packageDir = path.dirname(require.resolve("ffmpeg-static/package.json"));
for (const name of ["LICENSE", "ffmpeg.LICENSE", "ffmpeg.README"]) {
  const source = path.join(packageDir, name);
  if (fs.existsSync(source)) fs.copyFileSync(source, path.join(mediaDir, name));
}
const binary = execFileSync("file", [ffmpeg], { encoding: "utf8" });
if (!binary.includes("arm64"))
  throw new Error(`Incorrect FFmpeg architecture: ${binary}`);
execFileSync(ffmpeg, ["-version"], { stdio: "inherit" });
const iconset = path.join(root, "build/icon.iconset");
fs.mkdirSync(iconset, { recursive: true });
for (const size of [16, 32, 128, 256, 512]) {
  for (const scale of [1, 2]) {
    execFileSync(
      "sips",
      [
        "-z",
        String(size * scale),
        String(size * scale),
        path.join(root, "dist/icon.png"),
        "--out",
        path.join(
          iconset,
          `icon_${size}x${size}${scale === 2 ? "@2x" : ""}.png`,
        ),
      ],
      { stdio: "ignore" },
    );
  }
}
execFileSync("iconutil", [
  "-c",
  "icns",
  iconset,
  "-o",
  path.join(root, "build/icon.icns"),
]);
