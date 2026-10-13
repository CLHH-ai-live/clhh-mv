import crypto from "node:crypto";
import { canonical, sign } from "../payment-service.mjs";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import assert from "node:assert/strict";
import { spawn, execFileSync, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
fs.mkdirSync(new URL("../.runtime/",import.meta.url),{recursive:true});
const require = createRequire(import.meta.url),
  root = process.cwd(),
  temp = fs.mkdtempSync(path.join(root, "cloud/.runtime/integration-"));
const ffmpeg = require("ffmpeg-static");
execFileSync(ffmpeg, [
  "-v",
  "error",
  "-f",
  "lavfi",
  "-i",
  "color=c=blue:s=160x90:r=24",
  "-t",
  "11",
  "-c:v",
  "libx264",
  "-pix_fmt",
  "yuv420p",
  path.join(temp, "video.mp4"),
]);
execFileSync(ffmpeg, [
  "-v",
  "error",
  "-f",
  "lavfi",
  "-i",
  "sine=frequency=440:sample_rate=16000",
  "-t",
  "44",
  path.join(temp, "source.wav"),
]);
const calls = [];
const codes = new Map(),
  mockPayments = new Map();
let task = 0;
const fixture = http.createServer(async (req, res) => {
  let data = [];
  for await (const c of req) data.push(c);
  const body = Buffer.concat(data);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.end();
    return;
  }
  if (req.url === "/sms") {
    const sms = JSON.parse(body);
    codes.set(sms.PhoneNumberSet[0], sms.TemplateParamSet[0]);
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ SendStatusSet: [{ Code: "Ok" }] }));
    return;
  }
  if (req.url === "/email") {
    const mail = JSON.parse(body);
    codes.set(mail.to[0], /验证码是 (\d{6})/.exec(mail.text)[1]);
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ id: "mock-email" }));
    return;
  }
  if (req.url === "/internal/payments") {
    const input = JSON.parse(body);
    const existing = [...mockPayments.values()].find(
      (p) => p.businessOrderId === input.businessOrderId,
    );
    const payment = existing || {
      ...input,
      paymentId: crypto.randomUUID(),
      appKey: "clhh-mv-test",
      status: "pending",
      codeUrl: "weixin://wxpay/mock",
    };
    mockPayments.set(payment.paymentId, payment);
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(payment));
    return;
  }
  if (req.url.startsWith("/internal/payments/")) {
    const id = req.url.split("/")[3];
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(mockPayments.get(id)));
    return;
  }
  calls.push(req.url);
  res.setHeader("content-type", "application/json");
  const base = "http://127.0.0.1:" + fixture.address().port;
  if (req.url.endsWith("/upload"))
    res.end(JSON.stringify({ code: 0, data: { fileName: "fixture-input" } }));
  else if (req.url.endsWith("/ai-app/run")) {
    const b = JSON.parse(body);
    assert.equal(
      b.nodeInfoList.find((n) => n.nodeId === "327").fieldValue,
      "2",
    );
    res.end(JSON.stringify({ code: 0, data: { taskId: "fixture-" + ++task } }));
  } else if (req.url.endsWith("/outputs"))
    res.end(
      JSON.stringify({
        code: 0,
        data: [
          { fileUrl: base + "/video.mp4", fileName: "part1.mp4" },
          { fileUrl: base + "/video.mp4", fileName: "part2.mp4" },
          { fileUrl: base + "/poster.png", fileName: "poster.png" },
        ],
      }),
    );
  else if (req.url === "/video.mp4") {
    res.setHeader("content-type", "video/mp4");
    res.end(fs.readFileSync(path.join(temp, "video.mp4")));
  } else if (req.url === "/poster.png") {
    res.setHeader("content-type", "image/png");
    res.end(fs.readFileSync("renderer/icon.png"));
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Unexpected mock request" }));
  }
});
await new Promise((r) => fixture.listen(0, "127.0.0.1", r));
const origin = "http://localhost:18080";
const testRuntime = path.join(temp, "config");
fs.mkdirSync(testRuntime, { recursive: true });
const fixtureURL = "http://127.0.0.1:" + fixture.address().port;
fs.writeFileSync(
  path.join(testRuntime, "web.env"),
  Object.entries({
    BETTER_AUTH_SECRET: "integration-secret-at-least-32-characters",
    RESEND_API_KEY: "mock",
    TENCENT_SMS_SECRET_ID: "mock",
    TENCENT_SMS_SECRET_KEY: "mock",
    TENCENT_SMS_SDK_APP_ID: "mock",
    TENCENT_SMS_SIGN_NAME: "mock",
    TENCENT_SMS_TEMPLATE_ID_LOGIN: "mock",
    AUTH_EMAIL_FROM: "test@example.test",
    PUBLIC_ORIGIN: origin,
    PAY_SERVICE_URL: fixtureURL,
    PAY_SERVICE_APP_KEY: "clhh-mv-test",
    PAY_SERVICE_APP_SECRET: "integration-payment-secret",
  })
    .map(([k, v]) => k + "=" + JSON.stringify(v))
    .join("\n"),
);
const child = spawn(
  process.execPath,
  ["--import", "./cloud/tests/network-fixture.mjs", "cloud/server.mjs"],
  {
    env: {
      ...process.env,
      PORT: "18080",
      CLHH_RUNTIME: testRuntime,
      CLHH_FIXTURE_URL: fixtureURL,
      PUBLIC_ORIGIN: origin,
      CLHH_DATA: path.join(temp, "users"),
      CLHH_TEST_PROVIDER: "http://127.0.0.1:" + fixture.address().port,
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
let errors = "";
child.stderr.on("data", (d) => (errors += d));
child.stdout.on("data", () => {});
try {
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch(origin + "/health")).ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  const email = "creator@example.test";
  const send = await fetch(
    origin + "/api/auth/email-otp/send-verification-otp",
    {
      method: "POST",
      headers: { origin, "content-type": "application/json" },
      body: JSON.stringify({ email, type: "sign-in" }),
    },
  );
  assert.equal(send.status, 200, await send.text());
  const response = await fetch(origin + "/api/auth/sign-in/email-otp", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify({ email, otp: codes.get(email) }),
  });
  assert.equal(response.status, 200, await response.clone().text());
  const cookie = response.headers
    .getSetCookie()
    .map((s) => s.split(";")[0])
    .join("; ");
  const me = await (
    await fetch(origin + "/api/me", { headers: { cookie } })
  ).json();
  const username = me.username;
  async function api(url, body, raw) {
    const r = await fetch(origin + url, {
      method: body === undefined ? "GET" : "POST",
      headers: {
        cookie,
        origin,
        "x-csrf-token": me.csrf,
        "content-type": raw ? "application/octet-stream" : "application/json",
      },
      body: body === undefined ? undefined : raw ? body : JSON.stringify(body),
    });
    const data = await r.json();
    assert.equal(r.status, 200, JSON.stringify(data));
    return data;
  }
  const topup = await api("/api/billing/topups", {
    amountFen: 3000,
    requestId: crypto.randomUUID(),
  });
  assert.ok(topup.qrCode.startsWith("data:image/png"));
  const payment = [...mockPayments.values()][0];
  payment.status = "success";
  const event = {
      ...payment,
      eventId: crypto.randomUUID(),
      eventType: "payment.success",
    },
    body = JSON.stringify(event),
    timestamp = String(Math.floor(Date.now() / 1000)),
    nonce = crypto.randomUUID(),
    callback = "/api/billing/pay-service-callback";
  for (let i = 0; i < 2; i++) {
    const r = await fetch(origin + callback, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-pay-service-timestamp": timestamp,
        "x-pay-service-nonce": nonce,
        "x-pay-service-signature": sign(
          "integration-payment-secret",
          canonical("POST", callback, timestamp, nonce, body),
        ),
      },
      body,
    });
    assert.equal(r.status, 200, await r.text());
  }
  assert.equal((await api("/api/billing/wallet")).balanceUnits, 18000);
  const image = await api(
      "/api/assets?name=test.png",
      fs.readFileSync("renderer/icon.png"),
      true,
    ),
    audio = await api(
      "/api/assets?name=test.wav",
      fs.readFileSync(path.join(temp, "source.wav")),
      true,
    );
  const trims = await api("/api/media/trim", {
    asset: audio,
    segments: [
      { start: 0, end: 22 },
      { start: 22, end: 44 },
    ],
  });
  const panels = trims.map((a, i) => ({
    id: "panel" + i,
    image1: image,
    audio: a,
    audioSource: audio,
    audioBatchId: "testbatch",
    audioSegmentIndex: i + 1,
    audioTrim: { start: i * 22, end: (i + 1) * 22 },
    lastResults: [],
  }));
  const snapshot = { panels, maxConcurrentTasks: 1 };
  const ids = [];
  for (const p of panels) {
    const quote = await api("/api/billing/quote", { asset: p.audio });
    const j = await api("/api/jobs", {
      quoteId: quote.id,
      options: {
        panelId: p.id,
        styleName: "test",
        inputs: {
          image1: image,
          audio: p.audio,
          integerValue: 2,
          floatValue: "0.2",
        },
      },
      snapshot,
    });
    ids.push(j.id);
  }
  const forbidden = await fetch(origin + "/api/jobs", {
    method: "POST",
    headers: { cookie, origin, "content-type": "application/json" },
    body: "{}",
  });
  assert.equal(forbidden.status, 403);
  const cancelledQuote = await api("/api/billing/quote", { asset: trims[0] });
  const cancelled = await api("/api/jobs", {
    quoteId: cancelledQuote.id,
    options: {
      panelId: "cancelled",
      inputs: { image1: image, audio: trims[0], integerValue: 2 },
    },
    snapshot: {
      panels: [{ id: "cancelled", image1: image, audio: trims[0] }],
      maxConcurrentTasks: 1,
    },
  });
  await api("/api/jobs/" + cancelled.id + "/cancel", {});
  assert.equal((await api("/api/jobs/" + cancelled.id)).status, "cancelled");
  const saved = await fetch(origin + "/api/state", {
    method: "PUT",
    headers: {
      cookie,
      origin,
      "x-csrf-token": me.csrf,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      "rh-simple-tool-settings": { state: { panels }, version: 0 },
    }),
  });
  assert.equal(saved.status, 200);
  console.log("Two jobs submitted; server continues independently of browser.");
  let jobs;
  for (let i = 0; i < 180; i++) {
    jobs = (await api("/api/jobs")).filter((j) => ids.includes(j.id));
    if (jobs.some((j) => j.status === "failed"))
      throw new Error(jobs.find((j) => j.status === "failed").error);
    if (jobs.every((j) => j.status === "done" && j.batchResult)) break;
    await new Promise((r) => setTimeout(r, 500));
  }
  assert.ok(
    jobs.every((j) => j.status === "done" && j.batchResult),
    "Jobs did not finish and auto merge: " + JSON.stringify(jobs),
  );
  const merged = jobs[0].batchResult;
  const state = await api("/api/state");
  assert.ok(
    state["rh-simple-tool-settings"].state.panels.every(
      (p) => p.lastResults[0].path === "/results/" + merged.relative,
    ),
  );
  const manual = await api("/api/merge", {
    snapshot,
    batchId: "testbatch",
    force: true,
  });
  assert.equal(
    manual.relative,
    merged.relative,
    "Merge must reuse the completed batch instead of creating duplicates",
  );
  const bytes = await fetch(
    origin + "/api/download?path=" + encodeURIComponent(merged.relative),
    { headers: { cookie } },
  );
  assert.equal(bytes.status, 200);
  assert.ok((await bytes.arrayBuffer()).byteLength > 1000);

  const file = path.join(temp, "users", username, "results", merged.relative);
  const info = spawnSync(ffmpeg, ["-hide_banner", "-i", file], {
    encoding: "utf8",
  });
  const duration = /Duration: (\d+):(\d+):([\d.]+)/.exec(info.stderr);
  assert.ok(duration);
  assert.ok(
    Math.abs(
      Number(duration[1]) * 3600 +
        Number(duration[2]) * 60 +
        Number(duration[3]) -
        44,
    ) < 0.5,
    "Expected approximately 44s after the original frame/audio processing: " +
      duration[0],
  );
  const wallet = await api("/api/billing/wallet");
  assert.equal(wallet.heldUnits, 0);
  assert.ok(wallet.balanceUnits > 13000 && wallet.balanceUnits < 14000);
  assert.equal(wallet.ledger.filter((x) => x.kind === "topup").length, 1);
  assert.equal(wallet.ledger.filter((x) => x.kind === "refund").length, 1);
  assert.ok(calls.filter((x) => x.endsWith("/ai-app/run")).length === 2);
  if (process.env.TEST_BROWSER === "1") {
    const { chromium } = require("playwright");
    const browser = await chromium.launch({
      headless: true,
      channel: "chrome",
    });
    try {
      const context = await browser.newContext({ acceptDownloads: true }),
        page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(origin);
      await page.getByLabel("邮箱", { exact: true }).fill(email);
      await page
        .getByRole("button", { name: "获取验证码", exact: true })
        .click();
      await page
        .getByText("验证码已发送，请查收邮件（有效期 5 分钟）。", {
          exact: true,
        })
        .waitFor();
      await page.getByLabel("验证码", { exact: true }).fill(codes.get(email));
      await page
        .getByRole("button", { name: "注册 / 登录", exact: true })
        .click();
      await page.getByTitle("我的视频", { exact: true }).waitFor();
      await page.getByTitle("设置", { exact: true }).click();
      const settings = page.getByRole("dialog", { name: "设置", exact: true });
      assert.equal(
        await settings.locator("#settings-result-folder").count(),
        0,
      );
      await settings.getByRole("button", { name: "取消", exact: true }).click();
      await page.getByTitle("我的视频", { exact: true }).click();
      await page
        .getByRole("button", {
          name: "预览 " + path.basename(merged.relative),
          exact: true,
        })
        .click();
      await page.waitForFunction(
        () => document.querySelector("#web-files video")?.readyState >= 2,
      );
      await page.locator("#web-files video").evaluate((v) => {
        v.currentTime = 10;
      });
      await page.waitForFunction(() => {
        const v = document.querySelector("#web-files video");
        return !v.seeking && v.currentTime >= 10;
      });
      const downloading = page.waitForEvent("download");
      await page
        .getByRole("link", { name: "下载当前视频", exact: true })
        .click();
      assert.equal(await (await downloading).failure(), null);
      await page
        .locator("#web-files")
        .getByRole("button", { name: "关闭", exact: true })
        .click();
      await page.evaluate(() => {
        window.chargeResult = window.CLHH_WEB.confirmCharge({
          costUnits: 100,
          durationMs: 1000,
        }).then(
          () => true,
          (e) => e.name,
        );
      });
      await page
        .getByRole("dialog", { name: "确认生成费用", exact: true })
        .getByRole("button", { name: "取消", exact: true })
        .click();
      assert.equal(
        await page.evaluate(() => window.chargeResult),
        "RunCancelledError",
      );
      await page.getByTitle("余额与充值", { exact: true }).click();
      await page.getByRole("button", { name: "测试充值 ¥0.01", exact: true }).click();
      await page.getByAltText("微信充值二维码").waitFor();
      const fresh = [...mockPayments.values()].find(
        (p) => p.amountFen === 1,
      );
      assert.ok(fresh);
      fresh.status = "success";
      await page
        .getByText("充值成功，余额已到账", { exact: true })
        .waitFor({ timeout: 15000 });
      assert.deepEqual(errors, []);
      await page.screenshot({ path: path.join(temp, "wallet-browser.png") });
      const phoneContext = await browser.newContext();
      const phonePage = await phoneContext.newPage();
      await phonePage.goto(origin);
      await phonePage.getByRole("button", { name: "手机登录", exact: true }).click();
      await phonePage.getByLabel("手机号（+86）", { exact: true }).fill("13800138000");
      await phonePage.getByRole("button", { name: "获取验证码", exact: true }).click();
      await phonePage.getByText("验证码已发送，请查收短信（有效期 5 分钟）。", { exact: true }).waitFor();
      await phonePage.getByLabel("验证码", { exact: true }).fill(codes.get("+8613800138000"));
      await phonePage.getByRole("button", { name: "注册 / 登录", exact: true }).click();
      await phonePage.getByTitle("我的视频", { exact: true }).waitFor();
      const phoneMe = await phonePage.evaluate(() => fetch("/api/me").then(r => r.json()));
      assert.equal(phoneMe.phoneNumber, "+8613800138000");
      assert.equal(phoneMe.email, null);
      const phoneWallet = await phonePage.evaluate(() => fetch("/api/billing/wallet").then(r => r.json()));
      assert.equal(phoneWallet.balanceUnits, 0);
      const otherUserMedia = await phoneContext.request.get(origin + "/api/download?path=" + encodeURIComponent(merged.relative));
      assert.notEqual(otherUserMedia.status(), 200);
      await phonePage.screenshot({ path: path.join(temp, "phone-browser.png") });
      await phoneContext.close();
      console.log("Browser phone OTP registration and verified-phone session access passed.");
      console.log(
        "Browser OTP registration, preview/seek/download, charge confirmation and QR top-up passed.",
      );
    } finally {
      await browser.close();
    }
  }
  console.log(
    "Original generation pipeline, two queued jobs, offline batch merge, 44s output and aspect-ratio value preservation passed.",
  );
} catch (error) {
  console.error(error.message);
  if (errors) console.error(errors);
  process.exitCode = 1;
} finally {
  child.kill("SIGTERM");
  await new Promise((r) => child.once("exit", r));
  await new Promise((r) => fixture.close(r));
}
