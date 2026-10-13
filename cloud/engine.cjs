// Background engine: executes the original desktop functions without streaming its window.
const { app, ipcMain } = require("electron");
const ownerRoot = process.env.CLHH_USER_ROOT;
if (!ownerRoot) throw new Error("Missing user storage root");
let win;
let ready = false;
const emit = (message) =>
  process.stdout.write("CLHH_RPC " + JSON.stringify(message) + "\n");
app.on("browser-window-created", (_e, w) => {
  win = w;
  w.show = () => {};
  w.focus = () => {};
  w.hide();
  w.webContents.once("did-finish-load", async () => {
    try {
      await w.webContents.executeJavaScript(
        `window.__CLHH_USER_ROOT=${JSON.stringify(ownerRoot)}`,
      );
      ready = true;
      emit({ ready: true });
    } catch (error) {
      emit({ error: error.message });
    }
  });
});
ipcMain.on("cloud-progress", (_event, payload) => emit(payload));
require("../electron/main.cjs");
const readline = require("readline").createInterface({ input: process.stdin });
readline.on("line", (line) => {
  let command;
  try {
    command = JSON.parse(line);
  } catch {
    return;
  }
  if (!ready) return emit({ id: command.id, error: "Engine not ready" });
  const method = command.method;
  if (
    !["generate", "merge", "trim", "probe", "cancel", "inspect"].includes(
      method,
    )
  )
    return emit({ id: command.id, error: "Unknown command" });
  const source = `window.__CLHH_ENGINE[${JSON.stringify(method)}](${JSON.stringify(command.payload)})`;
  win.webContents
    .executeJavaScript(source)
    .then((result) => emit({ id: command.id, result }))
    .catch((error) =>
      emit({ id: command.id, error: error.message, name: error.name }),
    );
});

readline.on("close", () => app.quit());
