const fs = require("fs");
const path = require("path");
const { parseEnv } = require("node:util");
const root = path.resolve(__dirname, "..");
const localFile = path.join(root, ".env.local");
const local = fs.existsSync(localFile)
  ? parseEnv(fs.readFileSync(localFile, "utf8"))
  : {};
const apiKey = String(
  process.env.CLHH_API_KEY || local.CLHH_API_KEY || "",
).trim();
if (!apiKey)
  throw new Error("Set CLHH_API_KEY in .env.local or the build environment.");
const accessPassword = String(
  process.env.CLHH_APP_PASSWORD || local.CLHH_APP_PASSWORD || "",
).trim();
if (!accessPassword)
  throw new Error("Set CLHH_APP_PASSWORD in .env.local or the build environment.");
const config = { ...require("../config/service.json"), apiKey };
const source = path.join(root, "renderer");
const target = path.join(root, "dist");
fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(source, target, {
  recursive: true,
  filter: (p) => p !== path.join(source, "components"),
});
const entry = path.join(target, "assets/index.js");
let code = fs.readFileSync(entry, "utf8");
code = code.replace("__CLHH_SERVICE_CONFIG__", () => JSON.stringify(config));
code = code.replace("__CLHH_APP_PASSWORD__", () => JSON.stringify(accessPassword));
code = code.replace(/\/\* @include ([a-z-]+\.js) \*\//g, (_, name) =>
  fs.readFileSync(path.join(source, "components", name), "utf8").trimEnd(),
);
if (code.includes("/* @include ") || code.includes("__CLHH_SERVICE_CONFIG__") || code.includes("__CLHH_APP_PASSWORD__")) {
  throw new Error("Unresolved renderer build placeholder.");
}
fs.writeFileSync(entry, code);
console.log("Renderer built with fixed service configuration.");
