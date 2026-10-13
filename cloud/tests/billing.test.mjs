import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { openDatabase } from "../database.mjs";
import { Billing, priceForDuration, yuan } from "../billing.mjs";
import { user, topups, wallets, charges } from "../schema.mjs";
import { PaymentService, canonical, sign } from "../payment-service.mjs";
function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "clhh-billing-"));
  const { db, sqlite } = openDatabase(path.join(dir, "db.sqlite"));
  for (const id of ["alice", "bob"])
    db.insert(user)
      .values({
        id,
        email: id + "@example.test",
        name: id,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .run();
  return {
    db,
    billing: new Billing(db),
    close() {
      sqlite.close();
      fs.rmSync(dir, { recursive: true, force: true });
    },
  };
}
function pay(billing, id = "alice", fen = 3000) {
  const order = billing.createTopup(id, fen, crypto.randomUUID());
  const payment = {
    businessOrderId: order.id,
    amountFen: fen,
    paymentId: crypto.randomUUID(),
    provider: "wechat",
    status: "success",
  };
  billing.credit(payment, crypto.randomUUID());
  return payment;
}
test("price is exact at 3 minutes and preserves fractional cents", () => {
  assert.equal(priceForDuration(180).costUnits, 18000);
  assert.equal(yuan(priceForDuration(44).costUnits), "7.33");
  assert.equal(
    priceForDuration(22).costUnits * 2,
    priceForDuration(44).costUnits,
  );
  assert.throws(() => priceForDuration(NaN));
  assert.throws(() => priceForDuration(-1));
});
test("payment validation, repeated callbacks and polling credit only once", () => {
  const f = fixture();
  try {
    const p = pay(f.billing);
    f.billing.credit(p, "other-delivery");
    assert.equal(f.billing.wallet("alice").balanceUnits, 18000);
    assert.equal(f.billing.wallet("bob").balanceUnits, 0);
    assert.throws(() => f.billing.credit({ ...p, amountFen: 999 }, "bad"));
    assert.throws(() => f.billing.credit({ ...p, paymentId: "wrong" }, "bad2"));
    assert.equal(f.billing.wallet("alice").balanceUnits, 18000);
  } finally {
    f.close();
  }
});
test("reservations prevent overspending and failures refund once", () => {
  const f = fixture();
  try {
    pay(f.billing);
    const q = f.billing.quote("alice", "audio", 180);
    f.billing.reserve("alice", "j1", q.id, "audio");
    assert.equal(f.billing.wallet("alice").balanceUnits, 0);
    const q2 = f.billing.quote("alice", "audio", 1);
    assert.throws(
      () => f.billing.reserve("alice", "j2", q2.id, "audio"),
      /余额不足/,
    );
    f.billing.finish("j1", false);
    f.billing.finish("j1", false);
    assert.equal(f.billing.wallet("alice").balanceUnits, 18000);
    assert.equal(f.billing.wallet("alice").heldUnits, 0);
    assert.throws(() => f.billing.reserve("bob", "j3", q.id, "audio"));
  } finally {
    f.close();
  }
});
test("successful jobs settle without double deduction; orphan holds refunded on restart", () => {
  const f = fixture();
  try {
    pay(f.billing);
    const q = f.billing.quote("alice", "a", 44);
    f.billing.reserve("alice", "done", q.id, "a");
    f.billing.finish("done", true);
    f.billing.finish("done", false);
    assert.equal(f.billing.wallet("alice").balanceUnits, 13600);
    const q2 = f.billing.quote("alice", "a", 44);
    f.billing.reserve("alice", "orphan", q2.id, "a");
    f.billing.reconcileJobs(new Map());
    assert.equal(f.billing.wallet("alice").balanceUnits, 13600);
    assert.equal(f.billing.wallet("alice").heldUnits, 0);
  } finally {
    f.close();
  }
});
test("callback signatures bind the exact body, route and timestamp", () => {
  const config = {
      PAY_SERVICE_APP_SECRET: "test-secret-32-characters-long",
      PAY_SERVICE_APP_KEY: "clhh-mv",
    },
    service = new PaymentService(config),
    route = "/api/billing/pay-service-callback",
    timestamp = String(Math.floor(Date.now() / 1000)),
    nonce = crypto.randomUUID(),
    body = JSON.stringify({
      eventId: "event1",
      appKey: "clhh-mv",
      eventType: "payment.success",
    });
  const headers = {
    "x-pay-service-timestamp": timestamp,
    "x-pay-service-nonce": nonce,
    "x-pay-service-signature": sign(
      config.PAY_SERVICE_APP_SECRET,
      canonical("POST", route, timestamp, nonce, body),
    ),
  };
  assert.equal(service.verify(headers, body, route).eventId, "event1");
  assert.throws(() => service.verify(headers, body + " ", route));
  assert.throws(() => service.verify(headers, body, route + "/other"));
  assert.throws(() =>
    service.verify(
      { ...headers, "x-pay-service-timestamp": "1000000000" },
      body,
      route,
    ),
  );
});

test("one-cent test payment credits exactly one cent once", () => {
  const f = fixture();
  try {
    for (const amount of [0, -1, 0.01, 2])
      assert.throws(() => f.billing.createTopup("alice", amount, crypto.randomUUID()));
    const payment = pay(f.billing, "alice", 1);
    f.billing.credit(payment, "repeated-one-cent-callback");
    assert.equal(f.billing.wallet("alice").balanceUnits, 6);
    assert.equal(yuan(f.billing.wallet("alice").balanceUnits), "0.01");
    assert.equal(f.billing.wallet("bob").balanceUnits, 0);
  } finally { f.close(); }
});
