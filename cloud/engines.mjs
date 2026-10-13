import path from "node:path";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { createInterface } from "node:readline";
import { EventEmitter } from "node:events";
const require = createRequire(import.meta.url);
const electron = require("electron");
export class Engine extends EventEmitter {
  constructor(root, project) {
    super();
    this.root = root;
    this.project = project;
    this.sequence = 0;
    this.pending = new Map();
    this.ready = null;
    this.activeCalls = 0;
  }
  start() {
    if(this.closing)return new Promise(resolve=>this.once("exit",resolve)).then(()=>this.start());
    if (this.ready) return this.ready;
    this.ready = new Promise((resolve, reject) => {
      this.child = spawn(
        electron,
        [
          "--no-sandbox",
          path.join(this.project, "cloud/engine.cjs"),
          "--user-data-dir=" + path.join(this.root, "profile"),
        ],
        {
          cwd: this.project,
          env: {
            ...process.env,
            NODE_ENV: "production",
            CLHH_USER_ROOT: this.root,
          },
          stdio: ["pipe", "pipe", "pipe"],
        },
      );
      const timer = setTimeout(() => {
        reject(new Error("后台引擎启动超时"));
        this.child.kill();
      }, 60000);
      this.child.stderr.on("data", () => {});
      this.child.stdin.on("error",error=>{for(const p of this.pending.values())p.reject(error);this.pending.clear();});
      createInterface({ input: this.child.stdout }).on("line", (line) => {
        if (!line.startsWith("CLHH_RPC ")) return;
        let message;
        try {
          message = JSON.parse(line.slice(9));
        } catch {
          return;
        }
        if (message.error && message.id === undefined) {
          clearTimeout(timer);
          reject(new Error(message.error));
          this.child.kill();
          return;
        }
        if (message.ready) {
          clearTimeout(timer);
          resolve();
          return;
        }
        if (message.progress) {
          this.emit("progress", message);
          return;
        }
        const request = this.pending.get(message.id);
        if (request) {
          this.pending.delete(message.id);
          if (!this.pending.size) {
            clearTimeout(this.idleTimer);
            this.idleTimer = setTimeout(() => this.close(), 60000);
            this.idleTimer.unref();
          }
          if (message.error) request.reject(new Error(message.error));
          else request.resolve(message.result);
        }
      });
      this.child.on("error", (error) => {
        clearTimeout(timer);
        reject(error);
      });
      this.child.on("exit", () => {
        clearTimeout(timer);
        reject(new Error("后台引擎已退出"));
        for (const p of this.pending.values())
          p.reject(new Error("后台引擎已退出"));
        this.pending.clear();
        this.ready = null;
        this.closing=false;
        this.emit("exit");
      });
    });
    return this.ready;
  }
  async call(method, payload) {
    clearTimeout(this.idleTimer);
    this.activeCalls++;
    try {
      await this.start();
      return await new Promise((resolve, reject) => {
        const id = ++this.sequence;
        this.pending.set(id, { resolve, reject });
        this.child.stdin.write(JSON.stringify({ id, method, payload }) + "\n");
      });
    } finally {
      this.activeCalls--;
    }
  }
  close() {
    clearTimeout(this.idleTimer);
    if(this.child&&this.child.exitCode===null){this.closing=true;this.child.kill("SIGTERM");}
  }
}
