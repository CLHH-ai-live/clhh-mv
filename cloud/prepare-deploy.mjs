import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseEnv } from "node:util";
const cloud = path.dirname(fileURLToPath(import.meta.url)),
  root = path.resolve(cloud, ".."),
  dest = path.join(cloud, ".runtime/deploy");
const config = {
  ...parseEnv(fs.readFileSync(path.join(root, ".env.local"), "utf8")),
  ...parseEnv(fs.readFileSync(path.join(cloud, ".runtime/web.env"), "utf8")),
  PUBLIC_ORIGIN: "https://mv.staging.clhh.tech",
  PAY_SERVICE_URL: "http://pay-service-api:8080",
};
for (const key of [
  "CLHH_API_KEY",
  "CLHH_APP_PASSWORD",
  "BETTER_AUTH_SECRET",
  "RESEND_API_KEY",
  "AUTH_EMAIL_FROM",
  "PAY_SERVICE_APP_KEY",
  "PAY_SERVICE_APP_SECRET",
])
  if (!config[key]) throw new Error("Missing " + key);
if (/\\u[0-9a-f]{4}/i.test(config.TENCENT_SMS_SIGN_NAME || ""))
  throw new Error("TENCENT_SMS_SIGN_NAME must contain literal UTF-8 characters, not escaped Unicode");
fs.mkdirSync(dest, { recursive: true, mode: 0o700 });
fs.writeFileSync(
  path.join(dest, "service.env"),
  Object.entries(config)
    .map(([k, v]) => k + "=" + JSON.stringify(v))
    .join("\n") + "\n",
  { mode: 0o600 },
);
console.log(
  "Private deployment configuration prepared; no credentials printed.",
);
