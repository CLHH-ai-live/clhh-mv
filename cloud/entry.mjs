import fs from "node:fs";
import { parseEnv } from "node:util";
const env = parseEnv(
  fs.readFileSync(process.env.CLHH_ENV_FILE || "/data/service.env", "utf8"),
);
for (const key of ["CLHH_API_KEY", "CLHH_APP_PASSWORD"]) {
  if (!env[key]) throw new Error("Missing " + key);
  process.env[key] = env[key];
}
await import("./build.mjs");
