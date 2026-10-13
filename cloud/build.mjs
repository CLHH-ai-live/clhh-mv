import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
const cloud = path.dirname(fileURLToPath(import.meta.url)),
  root = path.resolve(cloud, "..");
// Desktop build remains untouched. Server and browser use separate output trees.
execFileSync(
  process.execPath,
  [path.join(root, "scripts/build-renderer.cjs")],
  { cwd: root, stdio: "inherit" },
);
execFileSync(process.execPath, [path.join(root, "scripts/verify.cjs")], {
  cwd: root,
  stdio: "inherit",
});
const serverEntry = path.join(root, "dist/assets/index.js");
const original = fs.readFileSync(serverEntry, "utf8");
fs.appendFileSync(
  serverEntry,
  "\n" + fs.readFileSync(path.join(cloud, "engine-api.js"), "utf8"),
);
const target = path.join(cloud, ".public-app");
fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(path.join(root, "dist"), target, { recursive: true });
let code = original.replace(
  /^const CLHH_SERVICE=Object.freeze\(.*?\);/,
  () =>
    `const CLHH_SERVICE=Object.freeze(${JSON.stringify({ apiKey: "server-managed", apiKeyOverseas: "", apiRegion: "cn", baseUrl: "/api/provider" })});`,
);
const config = JSON.parse(
  /^const CLHH_SERVICE=Object.freeze\((.*?)\);/.exec(original)[1],
);
// Remove the application access password from the browser build as well.
const password = JSON.parse(
  /accessPassword:("(?:[^"\\]|\\.)*")/.exec(
    original.slice(original.indexOf("Ot={")),
  )[1],
);
code = code.replace(
  "accessPassword:" + JSON.stringify(password),
  'accessPassword:"server-managed"',
);
const replace = (start, end, text) => {
  const a = code.indexOf(start),
    b = code.indexOf(end, a);
  if (a < 0 || b < a) throw new Error("Missing adapter boundary: " + start);
  code = code.slice(0, a) + text + "\n" + code.slice(b);
};
const adapters = JSON.parse(
  fs.readFileSync(path.join(cloud, "adapters.json"), "utf8"),
);
for (const a of adapters)
  replace(a.start, a.end, fs.readFileSync(path.join(cloud, a.file), "utf8"));
code = code.replace(
  "const q0=Op(()=>({getItem:()=>null,setItem:()=>{},removeItem:()=>{}}))",
  "const q0=Op(()=>window.CLHH_WEB.storage)",
);
for (const [before, after] of [
  ["getStorage:()=>localStorage", "getStorage:()=>window.CLHH_WEB.storage"],
  ["storage:Op(()=>localStorage)", "storage:Op(()=>window.CLHH_WEB.storage)"],
]) {
  if (!code.includes(before)) throw new Error("Missing browser storage adapter boundary");
  code = code.replace(before, after);
}
const desktopSettings = fs
  .readFileSync(
    path.join(root, "renderer/components/settings-panel.js"),
    "utf8",
  )
  .trimEnd();
if (!code.includes(desktopSettings))
  throw new Error("Missing settings adapter boundary");
code = code.replace(desktopSettings, () =>
  fs.readFileSync(path.join(cloud, "adapters/settings.js"), "utf8"),
);
const folderButton =
  'className:"morph-btn-circle h-8 w-8 text-morph-muted",title:"打开结果文件夹",children:i.jsx(Nr,{className:"h-4 w-4"})';
if (!code.includes(folderButton))
  throw new Error("Missing cloud results button");
code = code.replace(
  folderButton,
  'className:"morph-btn-circle h-8 px-3 text-morph-muted",title:"我的视频",children:"我的视频"',
);
code = code.replaceAll('title:"打开结果文件夹"', 'title:"预览与下载"');
code = code.replace(
  'title:"我的视频",children:"我的视频"}),',
  'title:"我的视频",children:"我的视频"}),i.jsx("button",{type:"button",className:"morph-btn-circle h-8 px-3 text-morph-muted",title:"余额与充值",onClick:()=>window.CLHH_WEB.showWallet(),children:i.jsx("span",{id:"web-wallet-balance",children:"余额 / 充值"})}),',
);
code +=
  "\nwindow.CLHH_WEB.bindStore(ee,po);window.CLHH_WEB.bindQueue(Be);window.CLHH_WEB.bindStyles(fa,K0);\n";
if (code.includes(config.apiKey) || code.includes(JSON.stringify(password)))
  throw new Error("Private configuration leaked into browser bundle");
fs.writeFileSync(path.join(target, "assets/index.js"), code);
const html = fs
  .readFileSync(path.join(target, "index.html"), "utf8")
  .replace(
    '<script type="module" crossorigin src="./assets/index.js"></script>',
    '<script type="module" src="/web/start.js"></script>',
  );
fs.writeFileSync(path.join(target, "index.html"), html);
console.log("Built native browser interface and private background engine.");

function verifyPublic(folder) {
  for (const item of fs.readdirSync(folder, { withFileTypes: true })) {
    const file = path.join(folder, item.name);
    if (item.isDirectory()) verifyPublic(file);
    else {
      const bytes = fs.readFileSync(file);
      if (
        bytes.includes(Buffer.from(config.apiKey)) ||
        bytes.includes(Buffer.from(password))
      )
        throw new Error("Private configuration found in browser output");
    }
  }
}
verifyPublic(target);
