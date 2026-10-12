const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const assert = require("assert/strict");
const { execFileSync } = require("child_process");
const root = path.resolve(__dirname, "..");
const code = fs.readFileSync(path.join(root, "dist/assets/index.js"), "utf8");
for (const entry of require("../config/engine-integrity.json")) {
  const start = code.indexOf(entry.start);
  const end = code.indexOf(entry.end, start);
  assert(start >= 0 && end > start, `Missing engine range: ${entry.start}`);
  const hash = crypto
    .createHash("sha256")
    .update(code.slice(start, end))
    .digest("hex");
  assert.equal(
    hash,
    entry.sha256,
    `Generation/merge logic changed: ${entry.start}`,
  );
}
for (const file of ["electron/main.cjs", "dist/assets/index.js"]) {
  execFileSync(process.execPath, ["--check", path.join(root, file)], {
    stdio: "inherit",
  });
}
assert(
  !/apiKey\s*:\s*["'][a-f0-9]{32}["']/i.test(
    fs.readFileSync(path.join(root, "renderer/assets/index.js"), "utf8"),
  ),
);
console.log("Syntax and generation/merge integrity checks passed.");
