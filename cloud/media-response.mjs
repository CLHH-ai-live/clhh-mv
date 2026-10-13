import fs from "node:fs";
import path from "node:path";
export function preview(req, res, file) {
  const type = {
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".mov": "video/quicktime",
    ".mkv": "video/x-matroska",
    ".avi": "video/x-msvideo",
  }[path.extname(file).toLowerCase()];
  if (!type) {
    res.writeHead(415);
    return res.end();
  }
  const size = fs.statSync(file).size;
  let start = 0,
    end = size - 1,
    code = 200;
  res.setHeader("Accept-Ranges", "bytes");
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("Content-Type", type);
  if (req.headers.range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
    if (match && (match[1] || match[2])) {
      if (match[1]) {
        start = Number(match[1]);
        end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
      } else {
        start = Math.max(0, size - Number(match[2]));
      }
      code = 206;
    }
    if (
      code !== 206 ||
      !Number.isSafeInteger(start) ||
      !Number.isSafeInteger(end) ||
      start < 0 ||
      start >= size ||
      end < start
    ) {
      res.writeHead(416, { "Content-Range": `bytes */${size}` });
      return res.end();
    }
    res.setHeader("Content-Range", `bytes ${start}-${end}/${size}`);
  }
  res.setHeader("Content-Length", Math.max(0, end - start + 1));
  res.writeHead(code);
  if (req.method === "HEAD" || size === 0) return res.end();
  const stream = fs.createReadStream(file, { start, end });
  res.on("close", () => stream.destroy());
  stream.on("error", () => res.destroy()).pipe(res);
}
