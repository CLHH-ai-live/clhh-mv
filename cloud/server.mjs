import { preview } from "./media-response.mjs";
import templatePack from "../electron/templatePack.cjs";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { parseEnv } from "node:util";
import { createAuth } from "./account.mjs";
import { openDatabase } from "./database.mjs";
import { Billing } from "./billing.mjs";
import { PaymentService } from "./payment-service.mjs";
import { user as userTable, topups } from "./schema.mjs";
import { eq, and, desc } from "drizzle-orm";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import QRCode from "qrcode";
import { Engine } from "./engines.mjs";
const cloud = path.dirname(fileURLToPath(import.meta.url)),
  project = path.resolve(cloud, "..");
const runtime = path.resolve(
    process.env.CLHH_RUNTIME || path.join(cloud, ".runtime"),
  ),
  dataRoot = path.resolve(process.env.CLHH_DATA || path.join(cloud, ".data"));
const envFile = process.env.CLHH_ENV_FILE || path.join(project, ".env.local");
const webEnv = path.join(runtime, "web.env");
const secrets = {
  ...parseEnv(fs.readFileSync(envFile, "utf8")),
  ...(fs.existsSync(webEnv) ? parseEnv(fs.readFileSync(webEnv, "utf8")) : {}),
  ...process.env,
};
if (!secrets.CLHH_API_KEY || !secrets.CLHH_APP_PASSWORD)
  throw new Error("Missing service configuration");
const origin = secrets.PUBLIC_ORIGIN || "http://localhost:8080",
  secure = new URL(origin).protocol === "https:";
if (
  !secure &&
  !["localhost", "127.0.0.1", "[::1]"].includes(new URL(origin).hostname)
)
  throw new Error("Public origin must use HTTPS");
fs.mkdirSync(dataRoot, { recursive: true });
const { db, sqlite } = openDatabase(
  secrets.DATABASE_PATH || path.join(dataRoot, "accounts.sqlite"),
);
const auth = createAuth({ db, config: { ...secrets, PUBLIC_ORIGIN: origin } }),
  authHandler = toNodeHandler(auth),
  billing = new Billing(db),
  payments = new PaymentService({ ...secrets, PUBLIC_ORIGIN: origin });
const engines = new Map(),
  jobs = new Map(),
  merges = new Set(),
  paymentFlights = new Map(),
  paymentQueries = new Map(),
  maxUpload = 256 * 1024 * 1024;
const users = db
  .select()
  .from(userTable)
  .all()
  .map((u) => ({ ...u, username: u.id }));
const userRoot = (u) => path.join(dataRoot, u.username);
function ensureUser(user) {
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(user.username))
    throw new Error("Invalid account id");
  for (const d of ["assets", "results", "jobs"])
    fs.mkdirSync(path.join(userRoot(user), d), { recursive: true });
}
for (const u of users) {
  const r = userRoot(u);
  for (const d of ["assets", "results", "jobs"])
    fs.mkdirSync(path.join(r, d), { recursive: true });
  for (const f of fs.readdirSync(path.join(r, "jobs"))) {
    if (!f.endsWith(".json")) continue;
    try {
      const j = JSON.parse(fs.readFileSync(path.join(r, "jobs", f), "utf8"));
      if (["queued", "running"].includes(j.status)) {
        j.status = "failed";
        j.error = "服务重启，任务已中断，请检查结果后重试";
      }
      jobs.set(j.id, j);
    } catch {}
  }
}
billing.reconcileJobs(jobs);
async function paymentOrder(order) {
  if (["paid", "closed"].includes(order.status)) return order;
  if (paymentFlights.has(order.id)) return paymentFlights.get(order.id);
  const task = (async () => {
    let current = order;
    if (!current.paymentId) {
      const payment = await payments.create(current);
      current = billing.attachPayment(current.id, payment);
      if (payment.status === "success")
        billing.credit(payment, "query:" + payment.paymentId);
    } else if (Date.now() - (paymentQueries.get(order.id) || 0) > 4000) {
      paymentQueries.set(order.id, Date.now());
      const payment = await payments.query(current.paymentId);
      if (payment.status === "success")
        billing.credit(payment, "query:" + payment.paymentId);
      else if (payment.status === "failed") billing.closeTopup(order.id);
    }
    return billing.order(order.id);
  })();
  paymentFlights.set(order.id, task);
  try {
    return await task;
  } finally {
    paymentFlights.delete(order.id);
  }
}
async function cancelPaymentOrder(order) {
  if (paymentFlights.has(order.id)) {
    await paymentFlights.get(order.id).catch(() => {});
    return cancelPaymentOrder(billing.order(order.id));
  }
  if (["paid", "closed"].includes(order.status)) return order;
  const task = (async () => {
    if (order.paymentId) {
      let payment = await payments.query(order.paymentId);
      if (payment.status === "pending") {
        try {
          payment = await payments.request("POST", "/internal/payments/" + encodeURIComponent(order.paymentId) + "/close", {});
        } catch (error) {
          payment = await payments.query(order.paymentId);
          if (payment.status === "pending") throw error;
        }
      }
      if (payment.status === "success") {
        billing.credit(payment, "query:" + payment.paymentId);
        return billing.order(order.id);
      }
      if (payment.status !== "failed") throw new Error("订单状态更新中，请稍后重试");
    }
    billing.closeTopup(order.id);
    return billing.order(order.id);
  })();
  paymentFlights.set(order.id, task);
  try { return await task; } finally { paymentFlights.delete(order.id); }
}
async function publicOrder(order) {
  return {
    id: order.id,
    status: order.status,
    amountFen: order.amountFen,
    createdAt: order.createdAt,
    qrCode:
      order.status === "pending" && order.codeUrl
        ? await QRCode.toDataURL(order.codeUrl, { width: 280, margin: 2 })
        : null,
  };
}
function engine(user) {
  if (!engines.has(user.username)) {
    const limit = Math.max(
      1,
      Math.min(4, Number(secrets.MAX_ACTIVE_ENGINES || 2)),
    );
    if (engines.size >= limit) {
      const idle = [...engines.entries()].find(
        ([id, e]) => e.activeCalls === 0,
      );
      if (idle) {
        idle[1].close();
        engines.delete(idle[0]);
      } else {
        const error = new Error("当前创作任务较多，请稍后重试");
        error.status = 503;
        throw error;
      }
    }

    const e = new Engine(userRoot(user), project);
    e.on("progress", ({ progress, data }) => {
      const job = jobs.get(progress);
      if (job) {
        job.progress = data;
        if (data.taskId) job.taskId = data.taskId;
        saveJob(job);
      }
    });
    engines.set(user.username, e);
  }
  return engines.get(user.username);
}
function writeAtomic(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = file + ".tmp";
  fs.writeFileSync(temp, JSON.stringify(data), { mode: 0o600 });
  fs.renameSync(temp, file);
}
function saveJob(j) {
  j.updated = Date.now();
  writeAtomic(path.join(dataRoot, j.owner, "jobs", j.id + ".json"), j);
}
const json = (res, status, body) => {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(
    JSON.stringify(body)
      .split(secrets.CLHH_API_KEY)
      .join("[redacted]")
      .split(secrets.CLHH_APP_PASSWORD)
      .join("[redacted]"),
  );
};
async function readJSON(req) {
  let size = 0;
  const parts = [];
  for await (const b of req) {
    size += b.length;
    if (size > 4 * 1024 * 1024) throw new Error("请求过大");
    parts.push(b);
  }
  return JSON.parse(Buffer.concat(parts).toString() || "{}");
}
const assetPattern = /^[0-9a-f-]{36}\.[a-z0-9]{1,8}$/;
function assetRef(user, ref) {
  if (!ref) return null;
  const id = ref.id || String(ref.cachePath || "").replace(/^\/assets\//, "");
  if (
    !assetPattern.test(id) ||
    !fs.existsSync(path.join(userRoot(user), "assets", id))
  )
    throw new Error("素材不存在或不属于当前账号");
  const meta = JSON.parse(
    fs.readFileSync(path.join(userRoot(user), "assets", id + ".json"), "utf8"),
  );
  return { id, name: meta.name, mime: meta.mime };
}
function relative(value) {
  if (
    typeof value !== "string" ||
    !value ||
    value.startsWith("/") ||
    value.split(/[\\/]/).includes("..") ||
    value.includes("\0")
  )
    throw new Error("文件路径无效");
  return value;
}
function snapshot(user, input) {
  if (!input || !Array.isArray(input.panels) || input.panels.length > 100)
    throw new Error("工作台数据无效");
  return {
    maxConcurrentTasks: Math.min(
      4,
      Math.max(1, Number(input.maxConcurrentTasks) || 2),
    ),
    panels: input.panels.map((p, i) => {
      if (
        !/^[a-zA-Z0-9_-]{1,100}$/.test(p.id) ||
        (p.audioBatchId && !/^[a-zA-Z0-9_-]{1,100}$/.test(p.audioBatchId))
      )
        throw new Error("工作台标识无效");
      return {
        ...p,
        id: p.id,
        image1: assetRef(user, p.image1),
        image2: null,
        audio: assetRef(user, p.audio),
        audioSource: assetRef(user, p.audioSource),
        lastResults: (p.lastResults || []).map((r) => ({
          filename: String(r.filename || "video.mp4"),
          relative: relative(
            r.relative || String(r.path || "").replace(/^\/results\//, ""),
          ),
        })),
      };
    }),
  };
}
function stateFile(user) {
  return path.join(userRoot(user), "workspace.json");
}
function state(user) {
  let s = {};
  try {
    s = JSON.parse(fs.readFileSync(stateFile(user), "utf8"));
  } catch {}
  const panels = s["rh-simple-tool-settings"]?.state?.panels;
  if (panels) {
    for (const p of panels) {
      const job = [...jobs.values()]
        .filter((j) => j.owner === user.username && j.panelId === p.id)
        .sort((a, b) => b.created - a.created)[0];
      if (!job) continue;
      if (
        job.updated < s._savedAt &&
        !["queued", "running"].includes(job.status)
      )
        continue;
      if (["queued", "running"].includes(job.status)) {
        p.isRunning = job.status === "running";
        p.isQueued = job.status === "queued";
        p.statusText = (job.progress?.detail ? `${job.progress.stage} · ${job.progress.detail}` : job.progress?.stage) || (job.status === "queued" ? "排队中" : "生成中");
      } else if (job.status === "done") {
        p.isRunning = false;
        p.isQueued = false;
        p.statusText = "完成 · 已保存视频";
        p.lastTaskId = job.taskId;
        p.lastResults = (
          job.batchResult
            ? job.batchResult.panels.find((x) => x.id === p.id)?.lastResults ||
              job.result.saved
            : job.result.saved
        ).map((r) => ({
          filename: r.filename,
          path: "/results/" + r.relative,
        }));
        if (job.batchResult) p.statusText = "批次完成 · 已合并视频";
      } else if (["failed", "cancelled"].includes(job.status)) {
        p.isRunning = false;
        p.isQueued = false;
        p.statusText =
          job.status === "cancelled" ? "已取消" : "失败 · " + job.error;
      }
    }
  }
  return s;
}
function publicJob(j) {
  return {
    id: j.id,
    panelId: j.panelId,
    status: j.status,
    taskId: j.taskId,
    progress: j.progress,
    result: j.result,
    error: j.error,
    updated: j.updated,
    batchResult: j.batchResult,
  };
}
async function pump(user) {
  const list = [...jobs.values()].filter((j) => j.owner === user.username),
    running = list.filter((j) => j.status === "running").length;
  const next = list
    .filter((j) => j.status === "queued")
    .sort((a, b) => a.created - b.created);
  const slots = Math.max(
    0,
    Number(secrets.MAX_RUNNING_JOBS || 2) -
      [...jobs.values()].filter((j) => j.status === "running").length,
  );
  const max = Math.min(
    next[0]?.snapshot.maxConcurrentTasks || 2,
    running + slots,
  );
  for (const j of next.slice(0, Math.max(0, max - running))) {
    j.status = "running";
    j.progress = { stage: "准备执行…" };
    saveJob(j);
    Promise.resolve()
      .then(() =>
        engine(user).call("generate", {
          jobId: j.id,
          options: j.options,
          snapshot: j.snapshot,
        }),
      )
      .then((result) => {
        j.status = j.cancelRequested ? "cancelled" : "done";
        j.result = result;
        j.taskId = result.taskId;
      })
      .catch((error) => {
        j.status = j.cancelRequested ? "cancelled" : "failed";
        j.error = error.message;
      })
      .finally(() => {
        saveJob(j);
        billing.finish(j.id, j.status === "done");
        for (const owner of new Set(
          [...jobs.values()]
            .filter((j) => j.status === "queued")
            .map((j) => j.owner),
        ))
          pump({ username: owner });
        void autoMerge(user, j).catch(() => {});
      });
  }
}
async function mergeBatch(user, input, batchId, force) {
  const group = input.panels.filter((p) => p.audioBatchId === batchId),
    key = user.username + ":" + batchId;
  if (
    [...jobs.values()].some(
      (j) =>
        j.owner === user.username &&
        group.some((p) => p.id === j.panelId) &&
        ["queued", "running"].includes(j.status),
    )
  )
    return { ok: false, skipped: true, error: "同组仍有工作台在生成或排队" };
  if (merges.has(key))
    return { ok: false, skipped: true, error: "该组正在合并中" };
  const signature = JSON.stringify([
    group.map((p) => [p.id, p.audioTrim, p.audio?.id, p.audioSource?.id]),
    listFiles(user)
      .filter((f) => f.path.includes("/"))
      .map((f) => [f.path, f.size, f.modified]),
  ]);
  const cacheFile = path.join(userRoot(user), "batch-" + batchId + ".json");
  let cached;
  try {
    cached = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
  } catch {}
  if (
    cached?.signature === signature &&
    cached.result.relative &&
    fs.existsSync(path.join(userRoot(user), "results", cached.result.relative))
  )
    return cached.result;
  merges.add(key);
  try {
    const result = await engine(user).call("merge", {
      snapshot: input,
      batchId,
      force,
    });
    if (result.ok) {
      writeAtomic(cacheFile, { signature, result });
      for (const j of jobs.values())
        if (
          j.owner === user.username &&
          group.some((p) => p.id === j.panelId) &&
          j.status === "done"
        ) {
          j.batchResult = result;
          saveJob(j);
        }
    }
    return result;
  } finally {
    merges.delete(key);
  }
}
async function autoMerge(user, job) {
  const batchId = job.options.timelineMerge?.batchId;
  if (!batchId || job.status !== "done") return;
  const group = job.snapshot.panels.filter((p) => p.audioBatchId === batchId);
  if (group.length < 2) return;
  const latest = group.map(
    (p) =>
      [...jobs.values()]
        .filter((j) => j.owner === user.username && j.panelId === p.id)
        .sort((a, b) => b.created - a.created)[0],
  );
  if (latest.some((j) => !j || j.status !== "done")) return;
  const input = {
    ...job.snapshot,
    panels: job.snapshot.panels.map((p) => {
      const j = latest.find((j) => j.panelId === p.id);
      return j
        ? {
            ...p,
            isRunning: false,
            isQueued: false,
            lastResults: j.result.saved,
          }
        : p;
    }),
  };
  await mergeBatch(user, input, batchId, false);
}
function listFiles(user) {
  const root = path.join(userRoot(user), "results"),
    files = [];
  function visit(folder) {
    for (const e of fs.readdirSync(folder, { withFileTypes: true })) {
      if (e.isSymbolicLink() || e.name.startsWith(".")) continue;
      const file = path.join(folder, e.name);
      if (e.isDirectory()) visit(file);
      else if (e.isFile()) {
        const st = fs.statSync(file);
        files.push({
          path: path.relative(root, file),
          name: e.name,
          size: st.size,
          modified: st.mtimeMs,
        });
      }
      if (files.length > 3000) return;
    }
  }
  visit(root);
  return files.sort((a, b) => b.modified - a.modified);
}
function stream(res, file, type = "application/octet-stream") {
  const stat = fs.statSync(file);
  res.writeHead(200, {
    "content-type": type,
    "content-length": stat.size,
    "cache-control": "no-store",
  });
  fs.createReadStream(file).pipe(res);
}
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".ico": "image/x-icon",
};
const server = http.createServer(async (req, res) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self' blob:; frame-ancestors 'none'",
  );
  try {
    const url = new URL(req.url, "http://server");
    if (url.pathname === "/health") return json(res, 200, { ok: true });
    if (
      url.pathname === "/api/billing/pay-service-callback" &&
      req.method === "POST"
    ) {
      let raw = "";
      for await (const chunk of req) {
        raw += chunk;
        if (Buffer.byteLength(raw) > 65536)
          throw new Error("Callback too large");
      }
      let payment;
      try {
        payment = payments.verify(req.headers, raw, url.pathname);
      } catch {
        return json(res, 403, { error: "Invalid payment callback" });
      }
      billing.credit(payment, payment.eventId);
      return json(res, 200, { ok: true });
    }
    if (url.pathname.startsWith("/api/auth/")) {
      const allowed = [
        "/api/auth/email-otp/send-verification-otp",
        "/api/auth/sign-in/email-otp",
        "/api/auth/phone-number/send-otp",
        "/api/auth/phone-number/verify",
        "/api/auth/sign-out",
        "/api/auth/get-session",
      ];
      if (!allowed.includes(url.pathname))
        return json(res, 404, { error: "Not found" });
      if (
        req.method === "POST" &&
        (req.headers.origin !== origin ||
          Number(req.headers["content-length"] || 0) > 8192)
      )
        return json(res, 403, { error: "Invalid request" });
      if (secrets.TRUST_PROXY !== "true")
        req.headers["x-real-ip"] = req.socket.remoteAddress;
      return authHandler(req, res);
    }
    if (["/login", "/web/login.js", "/web/login.css"].includes(url.pathname)) {
      const name =
        url.pathname === "/login" ? "login.html" : path.basename(url.pathname);
      return stream(
        res,
        path.join(cloud, "public", name),
        mime[path.extname(name)] || "text/plain",
      );
    }
    const signed = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    const session = signed && (signed.user.emailVerified || (signed.user.phoneNumberVerified && signed.user.phoneNumber))
      ? {
          user: { ...signed.user, username: signed.user.id },
          csrf: crypto
            .createHmac("sha256", secrets.BETTER_AUTH_SECRET)
            .update("csrf:" + signed.session.token)
            .digest("hex"),
        }
      : null;
    if (!session) {
      if (!url.pathname.startsWith("/api/")) {
        res.writeHead(302, { Location: "/login" });
        return res.end();
      }
      return json(res, 401, { error: "请登录" });
    }
    const user = session.user;
    ensureUser(user);
    if (
      !["GET", "HEAD"].includes(req.method) &&
      (req.headers.origin !== origin ||
        req.headers["x-csrf-token"] !== session.csrf)
    )
      return json(res, 403, { error: "Invalid request" });
    if (url.pathname === "/api/me")
      return json(res, 200, {
        username: user.username,
        email: user.emailVerified ? user.email : null,
        phoneNumber: user.phoneNumberVerified ? user.phoneNumber : null,
        name: user.name,
        csrf: session.csrf,
      });
    if (url.pathname === "/api/billing/wallet" && req.method === "GET")
      return json(res, 200, billing.summary(user.username));
    if (url.pathname === "/api/billing/quote" && req.method === "POST") {
      const body = await readJSON(req),
        asset = assetRef(user, body.asset);
      if (!asset) throw new Error("请选择音频");
      const probe = await engine(user).call("probe", { asset });
      if (!probe.success) throw new Error("无法读取音频时长");
      return json(
        res,
        200,
        billing.quote(user.username, asset.id, Number(probe.duration)),
      );
    }
    if (url.pathname === "/api/billing/topups" && req.method === "POST") {
      const body = await readJSON(req),
        order = billing.createTopup(
          user.username,
          body.amountFen,
          body.requestId,
        );
      return json(res, 200, await publicOrder(await paymentOrder(order)));
    }
    if (url.pathname === "/api/billing/topups" && req.method === "GET")
      return json(
        res,
        200,
        db
          .select({
            id: topups.id,
            status: topups.status,
            amountFen: topups.amountFen,
            createdAt: topups.createdAt,
          })
          .from(topups)
          .where(eq(topups.userId, user.username))
          .orderBy(desc(topups.createdAt))
          .limit(20)
          .all(),
      );
    const cancelTopupRoute = /^\/api\/billing\/topups\/([0-9a-f-]{36})\/cancel$/.exec(url.pathname);
    if (cancelTopupRoute && req.method === "POST") {
      const order = billing.order(cancelTopupRoute[1], user.username);
      if (!order) return json(res, 404, { error: "订单不存在" });
      return json(res, 200, await publicOrder(await cancelPaymentOrder(order)));
    }
    const topupRoute = /^\/api\/billing\/topups\/([0-9a-f-]{36})$/.exec(
      url.pathname,
    );
    if (topupRoute && req.method === "GET") {
      const order = billing.order(topupRoute[1], user.username);
      if (!order) return json(res, 404, { error: "订单不存在" });
      return json(res, 200, await publicOrder(await paymentOrder(order)));
    }
    if (url.pathname === "/api/assets" && req.method === "POST") {
      const name = path
          .basename(url.searchParams.get("name") || "file")
          .slice(0, 150),
        ext = path.extname(name).toLowerCase();
      if (
        ![
          ".png",
          ".jpg",
          ".jpeg",
          ".webp",
          ".gif",
          ".bmp",
          ".mp3",
          ".wav",
          ".m4a",
          ".aac",
          ".ogg",
          ".opus",
          ".flac",
          ".aiff",
        ].includes(ext)
      )
        return json(res, 400, { error: "不支持这个文件格式" });
      const id = crypto.randomUUID() + ext,
        dest = path.join(userRoot(user), "assets", id);
      const length = Number(req.headers["content-length"]);
      if (!length || length > maxUpload)
        return json(res, 413, { error: "单个文件最大 256 MB" });
      const output = fs.createWriteStream(dest, { flags: "wx", mode: 0o600 });
      let size = 0;
      try {
        for await (const b of req) {
          size += b.length;
          if (size > maxUpload) throw new Error("文件过大");
          if (!output.write(b))
            await new Promise((r) => output.once("drain", r));
        }
        await new Promise((resolve, reject) => {
          output.on("error", reject);
          output.end(resolve);
        });
        const meta = {
          id,
          name,
          mime: {
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".webp": "image/webp",
            ".gif": "image/gif",
            ".bmp": "image/bmp",
            ".mp3": "audio/mpeg",
            ".wav": "audio/wav",
            ".m4a": "audio/mp4",
            ".aac": "audio/aac",
            ".ogg": "audio/ogg",
            ".opus": "audio/ogg",
            ".flac": "audio/flac",
            ".aiff": "audio/aiff",
          }[ext],
        };
        writeAtomic(dest + ".json", meta);
        return json(res, 200, meta);
      } catch (error) {
        output.destroy();
        fs.rmSync(dest, { force: true });
        throw error;
      }
    }
    if (url.pathname.startsWith("/api/assets/") && req.method === "GET") {
      const id = decodeURIComponent(url.pathname.slice(12));
      const a = assetRef(user, { id });
      return stream(res, path.join(userRoot(user), "assets", a.id), a.mime);
    }
    if (url.pathname === "/api/state") {
      if (req.method === "GET") return json(res, 200, state(user));
      if (req.method === "PUT") {
        const s = await readJSON(req);
        const allowed = [
          "rh-simple-tool-settings",
          "rh-ui-mode-v1",
          "rh-brand-preview-v1",
          "rh-user-guide-v1",
          "rh-style-catalog-v1",
          "clhh-web-style-overrides",
        ];
        const clean = Object.fromEntries(
          Object.entries(s).filter(([k]) => allowed.includes(k)),
        );
        if (clean["rh-simple-tool-settings"]) {
          const saved = clean["rh-simple-tool-settings"].state;
          delete saved.apiKey;
          delete saved.apiKeyOverseas;
          delete saved.accessPassword;
          delete saved.baseUrl;
          saved.resultFolder = "/results";
          if (!Array.isArray(saved.panels) || saved.panels.length > 100)
            throw new Error("工作台数据无效");
        }
        clean._savedAt = Date.now();
        writeAtomic(stateFile(user), clean);
        return json(res, 200, { ok: true });
      }
    }
    if (url.pathname === "/api/files")
      return json(res, 200, { files: listFiles(user) });
    if (
      ["/api/download", "/api/preview"].includes(url.pathname) &&
      ["GET", "HEAD"].includes(req.method)
    ) {
      const root = path.join(userRoot(user), "results"),
        file = path.join(root, relative(url.searchParams.get("path")));
      if (
        !fs.existsSync(file) ||
        !fs.realpathSync(file).startsWith(root + path.sep) ||
        !fs.statSync(file).isFile()
      )
        return json(res, 404, { error: "文件不存在" });
      if (url.pathname === "/api/preview") return preview(req, res, file);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename*=UTF-8''${encodeURIComponent(path.basename(file))}`,
      );
      return stream(res, file);
    }
    if (url.pathname === "/api/jobs" && req.method === "GET")
      return json(
        res,
        200,
        [...jobs.values()]
          .filter((j) => j.owner === user.username)
          .map(publicJob),
      );
    if (url.pathname === "/api/jobs" && req.method === "POST") {
      const b = await readJSON(req),
        s = snapshot(user, b.snapshot);
      const panel = s.panels.find((p) => p.id === b.options?.panelId);
      if (!panel) throw new Error("工作台不存在");
      const existing = [...jobs.values()].find(
        (j) =>
          j.owner === user.username &&
          j.panelId === panel.id &&
          ["queued", "running"].includes(j.status),
      );
      if (existing) return json(res, 200, { id: existing.id });
      if (
        [...jobs.values()].filter(
          (j) =>
            j.owner === user.username &&
            ["queued", "running"].includes(j.status),
        ).length >= 100
      )
        throw new Error("任务队列已满");
      const input = b.options.inputs || {};
      const options = {
        panelId: panel.id,
        styleName: String(b.options.styleName || "MV").slice(0, 100),
        panelIndex: Math.max(
          0,
          s.panels.findIndex((p) => p.id === panel.id),
        ),
        skipStartFrames: Math.max(
          0,
          Math.min(999, Number(b.options.skipStartFrames) || 0),
        ),
        inputs: {
          image1: assetRef(user, input.image1),
          audio: assetRef(user, input.audio),
          text: String(input.text || "").slice(0, 30000),
          documentText: String(input.documentText || "").slice(0, 100000),
          floatValue: String(input.floatValue || "0.5"),
          integerValue: input.integerValue === 2 ? 2 : 1,
        },
        timelineMerge:
          panel.audioBatchId && panel.audioTrim
            ? {
                markerStart: panel.audioTrim.start,
                markerEnd: panel.audioTrim.end,
                batchId: panel.audioBatchId,
                segmentIndex: panel.audioSegmentIndex,
                batchSize: s.panels.filter(
                  (p) => p.audioBatchId === panel.audioBatchId,
                ).length,
              }
            : null,
      };
      if (!options.inputs.image1 || !options.inputs.audio)
        throw new Error("请先上传图片和音频");
      const j = {
        id: crypto.randomUUID(),
        owner: user.username,
        panelId: panel.id,
        created: Date.now(),
        status: "queued",
        snapshot: s,
        options,
      };
      billing.reserve(user.username, j.id, b.quoteId, options.inputs.audio.id);
      jobs.set(j.id, j);
      try {
        saveJob(j);
      } catch (error) {
        jobs.delete(j.id);
        billing.finish(j.id, false);
        throw error;
      }
      pump(user);
      return json(res, 200, { id: j.id });
    }
    const jobRoute = /^\/api\/jobs\/([0-9a-f-]{36})(\/cancel)?$/.exec(
      url.pathname,
    );
    if (jobRoute) {
      const j = jobs.get(jobRoute[1]);
      if (!j || j.owner !== user.username)
        return json(res, 404, { error: "任务不存在" });
      if (jobRoute[2] && req.method === "POST") {
        j.cancelRequested = true;
        if (j.status === "queued") {
          j.status = "cancelled";
          billing.finish(j.id, false);
        } else if (j.status === "running")
          await engine(user).call("cancel", { panelId: j.panelId });
        saveJob(j);
        return json(res, 200, { ok: true });
      }
      return json(res, 200, publicJob(j));
    }
    if (url.pathname === "/api/merge" && req.method === "POST") {
      const b = await readJSON(req),
        s = snapshot(user, b.snapshot);
      if (!/^[a-zA-Z0-9_-]{1,100}$/.test(b.batchId))
        throw new Error("分组标识无效");
      return json(res, 200, await mergeBatch(user, s, b.batchId, !!b.force));
    }
    if (
      ["/api/media/trim", "/api/media/probe"].includes(url.pathname) &&
      req.method === "POST"
    ) {
      const b = await readJSON(req),
        a = assetRef(user, b.asset);
      if (!a) throw new Error("缺少音频");
      const method = url.pathname.endsWith("trim") ? "trim" : "probe";
      if (
        method === "trim" &&
        (!Array.isArray(b.segments) ||
          b.segments.length > 100 ||
          b.segments.some(
            (s) =>
              !Number.isFinite(s.start) ||
              !Number.isFinite(s.end) ||
              s.start < 0 ||
              s.end - s.start < 14.95 ||
              s.end - s.start > 45.05,
          ))
      )
        throw new Error("音频分段范围无效");
      const result = await engine(user).call(method, {
        asset: a,
        segments: b.segments,
      });
      if (method === "trim")
        for (const a of result)
          writeAtomic(path.join(userRoot(user), "assets", a.id + ".json"), a);
      return json(res, 200, result);
    }
    if (
      url.pathname === "/api/provider/uc/openapi/accountStatus" &&
      req.method === "POST"
    ) {
      const r = await fetch(
        "https://www.runninghub.cn/uc/openapi/accountStatus",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey: secrets.CLHH_API_KEY,
            apikey: secrets.CLHH_API_KEY,
          }),
          signal: AbortSignal.timeout(20000),
        },
      );
      const b = await r.json();
      return json(res, 200, { code: b.code === 0 ? 0 : 1 });
    }
    if (url.pathname.startsWith("/api/template/") && req.method === "POST") {
      const { payload } = await readJSON(req),
        method = url.pathname.slice(14);
      if (method === "seal")
        return json(res, 200, {
          success: true,
          sealed: templatePack.sealSecret(payload),
        });
      if (method === "unseal")
        return json(res, 200, {
          success: true,
          secret: templatePack.unsealSecret(payload),
        });
      if (method === "export") {
        const pack = templatePack.encryptPayload(payload),
          parts = templatePack.splitPublicAndSecret(pack.payload);
        return json(res, 200, {
          success: true,
          ...parts,
          sealed: templatePack.sealSecret(parts.secret),
          download: pack.buffer.toString("base64"),
          name:
            String(pack.payload.name || "template").replace(
              /[^a-zA-Z0-9_-]/g,
              "_",
            ) + ".rhpack",
        });
      }
      throw new Error("未知模板操作");
    }
    if (url.pathname.startsWith("/web/")) {
      const name = url.pathname.slice(5);
      if (!["start.js", "bootstrap.js", "web.css", "billing.js"].includes(name))
        return json(res, 404, { error: "Not found" });
      return stream(
        res,
        path.join(cloud, "public", name),
        mime[path.extname(name)],
      );
    }
    const base = path.join(cloud, ".public-app"),
      target =
        url.pathname === "/"
          ? path.join(base, "index.html")
          : path.resolve(base, "." + decodeURIComponent(url.pathname));
    if (
      !target.startsWith(base + path.sep) ||
      !fs.existsSync(target) ||
      !fs.statSync(target).isFile()
    )
      return json(res, 404, { error: "Not found" });
    return stream(
      res,
      target,
      mime[path.extname(target)] || "application/octet-stream",
    );
  } catch (error) {
    if (!res.headersSent)
      json(res, error.status || 400, { error: error.message || "请求失败" });
    else res.destroy();
  }
});
server.requestTimeout = 15 * 60 * 1000;
server.listen(
  Number(process.env.PORT || 8080),
  process.env.HOST || "127.0.0.1",
  () => console.log("CLHH Web ready at " + origin),
);

process.on("SIGTERM", () => {
  for (const e of engines.values()) e.close();
  server.close(() => process.exit());
});
