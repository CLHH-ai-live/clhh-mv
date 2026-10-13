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
