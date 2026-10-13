import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { openDatabase } from "../database.mjs";
import { createAuth } from "../account.mjs";
import { user, verification } from "../schema.mjs";
test("email OTP registers a verified user, rejects wrong codes, creates session and signs out", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "clhh-auth-"));
  const { db, sqlite } = openDatabase(path.join(dir, "db.sqlite"));
  let delivered;
  const auth = createAuth({
    db,
    config: {
      PUBLIC_ORIGIN: "http://localhost:18080",
      BETTER_AUTH_SECRET: "test-auth-secret-at-least-32-chars-long",
    },
    sendEmail: async (data) => {
      delivered = data;
    },
  });
  async function post(route, body, cookie) {
    return auth.handler(
      new Request("http://localhost:18080/api/auth/" + route, {
        method: "POST",
        headers: {
          origin: "http://localhost:18080",
          "content-type": "application/json",
          "x-real-ip": "127.0.0.1",
          ...(cookie ? { cookie } : {}),
        },
        body: JSON.stringify(body),
      }),
    );
  }
  try {
    const sent = await post("email-otp/send-verification-otp", {
      email: "creator@example.test",
      type: "sign-in",
    });
    assert.equal(sent.status, 200, await sent.text());
    assert.ok(delivered?.otp);
    assert.ok(
      !JSON.stringify(db.select().from(verification).all()).includes(
        delivered.otp,
      ),
    );
    const wrong = await post("sign-in/email-otp", {
      email: delivered.email,
      otp: "000000" === delivered.otp ? "111111" : "000000",
    });
    assert.notEqual(wrong.status, 200);
    const signed = await post("sign-in/email-otp", {
      email: delivered.email,
      otp: delivered.otp,
    });
    assert.equal(signed.status, 200, await signed.clone().text());
    const cookie = signed.headers
      .getSetCookie()
      .map((s) => s.split(";")[0])
      .join("; ");
    assert.ok(cookie);
    const session = await auth.api.getSession({
      headers: new Headers({ cookie }),
    });
    assert.equal(session.user.emailVerified, true);
    assert.equal(db.select().from(user).all().length, 1);
    const logout = await post("sign-out", {}, cookie);
    assert.equal(logout.status, 200);
    assert.equal(
      await auth.api.getSession({ headers: new Headers({ cookie }) }),
      null,
    );
    const replay = await post("sign-in/email-otp", {
      email: delivered.email,
      otp: delivered.otp,
    });
    assert.notEqual(replay.status, 200);
  } finally {
    sqlite.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("phone OTP normalizes numbers, registers once and rejects replay and exhausted attempts", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "clhh-phone-"));
  const { db, sqlite } = openDatabase(path.join(dir, "db.sqlite"));
  let delivered, sends = 0;
  const auth = createAuth({ db, config: {
    PUBLIC_ORIGIN: "http://localhost:18080",
    BETTER_AUTH_SECRET: "test-auth-secret-at-least-32-chars-long",
  }, sendSms: async (data) => { delivered = data; sends++; } });
  let requestId = 0;
  const post = (route, body) => auth.handler(new Request("http://localhost:18080/api/auth/" + route, {
    method: "POST", headers: { origin: "http://localhost:18080", "content-type": "application/json", "x-real-ip": `192.0.2.${++requestId}` }, body: JSON.stringify(body),
  }));
  try {
    const invalid = await post("phone-number/send-otp", { phoneNumber: "12345" });
    assert.equal(invalid.status, 400); assert.equal(sends, 0);
    const sent = await post("phone-number/send-otp", { phoneNumber: "138 0013 8000" });
    assert.equal(sent.status, 200, await sent.text());
    assert.equal(delivered.phoneNumber, "+8613800138000");
    assert.match(delivered.code, /^\d{6}$/);
    const wrong = await post("phone-number/verify", { phoneNumber: "13800138000", code: delivered.code === "000000" ? "111111" : "000000" });
    assert.equal(wrong.status, 400);
    const signed = await post("phone-number/verify", { phoneNumber: "8613800138000", code: delivered.code });
    assert.equal(signed.status, 200, await signed.clone().text());
    const cookie = signed.headers.getSetCookie().map(s => s.split(";")[0]).join("; ");
    const session = await auth.api.getSession({ headers: new Headers({ cookie }) });
    assert.equal(session.user.phoneNumberVerified, true);
    assert.equal(session.user.emailVerified, false);
    assert.equal(session.user.phoneNumber, "+8613800138000");
    const userId = session.user.id;
    const replay = await post("phone-number/verify", { phoneNumber: "+8613800138000", code: delivered.code });
    assert.notEqual(replay.status, 200);
    await post("phone-number/send-otp", { phoneNumber: "+8613800138000" });
    const again = await post("phone-number/verify", { phoneNumber: "13800138000", code: delivered.code });
    assert.equal(again.status, 200);
    assert.equal((await again.json()).user.id, userId);
    assert.equal(db.select().from(user).all().length, 1);
    await post("phone-number/send-otp", { phoneNumber: "13900139000" });
    const incorrect = delivered.code === "000000" ? "111111" : "000000";
    for (let i = 0; i < 3; i++) await post("phone-number/verify", { phoneNumber: "13900139000", code: incorrect });
    const locked = await post("phone-number/verify", { phoneNumber: "13900139000", code: delivered.code });
    assert.notEqual(locked.status, 200);
    assert.equal(db.select().from(user).all().length, 1);
  } finally { sqlite.close(); fs.rmSync(dir, { recursive: true, force: true }); }
});

test("Tencent SMS uses the trade-platform login template and sanitizes provider errors", async () => {
  const { createSmsSender } = await import("../sms.mjs");
  const config = Object.fromEntries(["SECRET_ID", "SECRET_KEY", "SDK_APP_ID", "SIGN_NAME", "TEMPLATE_ID_LOGIN"].map(key => ["TENCENT_SMS_" + key, "test-" + key]));
  let params;
  class Client { async SendSms(input) { params = input; return { SendStatusSet: [{ Code: "Ok" }] }; } }
  await createSmsSender(config, Client)({ phoneNumber: "13800138000", code: "123456" });
  assert.deepEqual(params.PhoneNumberSet, ["+8613800138000"]);
  assert.deepEqual(params.TemplateParamSet, ["123456"]);
  assert.equal(params.TemplateId, config.TENCENT_SMS_TEMPLATE_ID_LOGIN);
  class FailedClient { async SendSms() { throw new Error("private-provider-details"); } }
  await assert.rejects(createSmsSender(config, FailedClient)({ phoneNumber: "13800138000", code: "123456" }), error => error.body.code === "FAILED_TO_SEND_OTP" && !error.message.includes("private-provider-details"));
});

test("phone migration preserves existing email identity and wallet balance", async () => {
  const { default: Database } = await import("better-sqlite3");
  const { drizzle } = await import("drizzle-orm/better-sqlite3");
  const { migrate } = await import("drizzle-orm/better-sqlite3/migrator");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "clhh-migration-"));
  const file = path.join(dir, "db.sqlite");
  const previous = path.join(dir, "previous");
  fs.mkdirSync(path.join(previous, "meta"), { recursive: true });
  const journal = JSON.parse(fs.readFileSync(new URL("../migrations/meta/_journal.json", import.meta.url), "utf8"));
  journal.entries = journal.entries.slice(0, 1);
  fs.writeFileSync(path.join(previous, "meta/_journal.json"), JSON.stringify(journal));
  fs.copyFileSync(new URL("../migrations/0000_legal_warstar.sql", import.meta.url), path.join(previous, "0000_legal_warstar.sql"));
  const old = new Database(file);
  migrate(drizzle(old), { migrationsFolder: previous });
  old.prepare('INSERT INTO user (id,name,email,email_verified,created_at,updated_at) VALUES (?,?,?,?,?,?)').run("existing", "Creator", "creator@example.test", 1, Date.now(), Date.now());
  old.prepare('INSERT INTO wallets (user_id,balance_units) VALUES (?,?)').run("existing", 18000);
  old.close();
  const { sqlite } = openDatabase(file);
  try {
    const saved = sqlite.prepare('SELECT * FROM user WHERE id = ?').get("existing");
    assert.equal(saved.email_verified, 1);
    assert.equal(saved.phone_number, null);
    assert.equal(saved.phone_number_verified, 0);
    assert.equal(sqlite.prepare('SELECT balance_units FROM wallets WHERE user_id = ?').get("existing").balance_units, 18000);
  } finally { sqlite.close(); fs.rmSync(dir, { recursive: true, force: true }); }
});
