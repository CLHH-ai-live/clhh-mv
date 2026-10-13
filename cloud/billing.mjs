import crypto from "node:crypto";
import { eq, and, desc, sql } from "drizzle-orm";
import {
  wallets,
  ledger,
  quotes,
  charges,
  topups,
  paymentEvents,
} from "./schema.mjs";
export const yuan = (units) => (units / 600).toFixed(2);
export const priceForDuration = (seconds) => {
  if (!Number.isFinite(seconds) || seconds <= 0 || seconds > 3600)
    throw new Error("音频时长无效（最长 60 分钟）");
  const durationMs = Math.ceil(seconds * 1000);
  return { durationMs, costUnits: Math.ceil(durationMs / 10) };
};
export class Billing {
  constructor(db) {
    this.db = db;
  }
  wallet(userId) {
    this.db.insert(wallets).values({ userId }).onConflictDoNothing().run();
    return this.db
      .select()
      .from(wallets)
      .where(eq(wallets.userId, userId))
      .get();
  }
  summary(userId) {
    const w = this.wallet(userId);
    return {
      balanceUnits: w.balanceUnits,
      heldUnits: w.heldUnits,
      balance: yuan(w.balanceUnits),
      held: yuan(w.heldUnits),
      rate: "¥30 / 180 秒",
      ledger: this.db
        .select()
        .from(ledger)
        .where(eq(ledger.userId, userId))
        .orderBy(desc(ledger.createdAt))
        .limit(40)
        .all()
        .map((e) => ({ ...e, amount: yuan(e.amountUnits) })),
    };
  }
  quote(userId, assetId, seconds) {
    const price = priceForDuration(seconds),
      quote = {
        id: crypto.randomUUID(),
        userId,
        assetId,
        ...price,
        expiresAt: Date.now() + 15 * 60 * 1000,
      };
    this.db.insert(quotes).values(quote).run();
    return { ...quote, amount: yuan(quote.costUnits) };
  }
  reserve(userId, jobId, quoteId, assetId) {
    return this.db.transaction(
      (tx) => {
        const old = tx
          .select()
          .from(charges)
          .where(eq(charges.jobId, jobId))
          .get();
        if (old) {
          if (old.userId !== userId || old.quoteId !== quoteId)
            throw new Error("计费请求不匹配");
          return old;
        }
        const q = tx
          .select()
          .from(quotes)
          .where(and(eq(quotes.id, quoteId), eq(quotes.userId, userId)))
          .get();
        if (!q || q.assetId !== assetId || q.expiresAt < Date.now())
          throw new Error("费用预估已过期，请重新生成");
        tx.insert(wallets).values({ userId }).onConflictDoNothing().run();
        const w = tx
          .select()
          .from(wallets)
          .where(eq(wallets.userId, userId))
          .get();
        if (w.balanceUnits < q.costUnits) {
          const error = new Error("余额不足，请先充值");
          error.status = 402;
          throw error;
        }
        tx.update(wallets)
          .set({
            balanceUnits: w.balanceUnits - q.costUnits,
            heldUnits: w.heldUnits + q.costUnits,
          })
          .where(eq(wallets.userId, userId))
          .run();
        const charge = {
          jobId,
          userId,
          quoteId,
          costUnits: q.costUnits,
          status: "reserved",
          createdAt: Date.now(),
        };
        tx.insert(charges).values(charge).run();
        tx.insert(ledger)
          .values({
            id: crypto.randomUUID(),
            userId,
            kind: "reserve",
            amountUnits: -q.costUnits,
            reference: "reserve:" + jobId,
            createdAt: Date.now(),
          })
          .run();
        return charge;
      },
      { behavior: "immediate" },
    );
  }
  finish(jobId, success) {
    return this.db.transaction(
      (tx) => {
        const c = tx
          .select()
          .from(charges)
          .where(eq(charges.jobId, jobId))
          .get();
        if (!c || c.status !== "reserved") return;
        const w = tx
          .select()
          .from(wallets)
          .where(eq(wallets.userId, c.userId))
          .get();
        tx.update(wallets)
          .set({
            heldUnits: w.heldUnits - c.costUnits,
            balanceUnits: w.balanceUnits + (success ? 0 : c.costUnits),
          })
          .where(eq(wallets.userId, c.userId))
          .run();
        tx.update(charges)
          .set({ status: success ? "charged" : "refunded" })
          .where(eq(charges.jobId, jobId))
          .run();
        tx.insert(ledger)
          .values({
            id: crypto.randomUUID(),
            userId: c.userId,
            kind: success ? "charge" : "refund",
            amountUnits: success ? 0 : c.costUnits,
            reference: "finish:" + jobId,
            createdAt: Date.now(),
          })
          .run();
      },
      { behavior: "immediate" },
    );
  }
  reconcileJobs(jobs) {
    for (const c of this.db
      .select()
      .from(charges)
      .where(eq(charges.status, "reserved"))
      .all()) {
      const job = jobs.get(c.jobId);
      if (!job || !["running", "queued"].includes(job.status))
        this.finish(c.jobId, job?.status === "done");
    }
  }
  createTopup(userId, amountFen, requestId) {
    if (![1000, 3000, 5000, 10000, 30000].includes(amountFen))
      throw new Error("请选择有效的充值金额");
    if (!/^[a-zA-Z0-9_-]{16,80}$/.test(requestId))
      throw new Error("无效请求标识");
    const existing = this.db
      .select()
      .from(topups)
      .where(and(eq(topups.userId, userId), eq(topups.requestId, requestId)))
      .get();
    if (existing) {
      if (existing.amountFen !== amountFen) throw new Error("充值金额不匹配");
      return existing;
    }
    const recent = this.db
      .select()
      .from(topups)
      .where(
        and(
          eq(topups.userId, userId),
          sql`${topups.createdAt}>${Date.now() - 60000}`,
        ),
      )
      .all();
    if (recent.length >= 3) throw new Error("创建充值订单过于频繁，请稍后再试");
    const row = {
      id: crypto.randomUUID(),
      userId,
      requestId,
      amountFen,
      status: "creating",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.db.insert(topups).values(row).run();
    return row;
  }
  attachPayment(orderId, payment) {
    const row = this.db
      .select()
      .from(topups)
      .where(eq(topups.id, orderId))
      .get();
    if (
      !row ||
      payment.businessOrderId !== orderId ||
      payment.amountFen !== row.amountFen ||
      payment.provider !== "wechat" ||
      (payment.currency && payment.currency !== "CNY")
    )
      throw new Error("支付订单校验失败");
    this.db
      .update(topups)
      .set({
        paymentId: payment.paymentId,
        codeUrl: payment.codeUrl || row.codeUrl,
        status: row.status === "paid" ? "paid" : "pending",
        updatedAt: Date.now(),
      })
      .where(eq(topups.id, orderId))
      .run();
    return this.order(orderId);
  }
  closeTopup(id) {
    this.db
      .update(topups)
      .set({ status: "closed", updatedAt: Date.now() })
      .where(and(eq(topups.id, id), sql`${topups.status} != 'paid'`))
      .run();
  }
  order(id, userId) {
    return this.db
      .select()
      .from(topups)
      .where(
        userId
          ? and(eq(topups.id, id), eq(topups.userId, userId))
          : eq(topups.id, id),
      )
      .get();
  }
  credit(payment, eventId) {
    return this.db.transaction(
      (tx) => {
        const row = tx
          .select()
          .from(topups)
          .where(eq(topups.id, payment.businessOrderId))
          .get();
        if (
          !row ||
          payment.provider !== "wechat" ||
          payment.status !== "success" ||
          payment.amountFen !== row.amountFen ||
          (payment.currency && payment.currency !== "CNY") ||
          (row.paymentId && row.paymentId !== payment.paymentId) ||
          !payment.paymentId
        )
          throw new Error("支付回调与订单不匹配");
        if (row.status === "paid") return row;
        const units = row.amountFen * 6;
        tx.insert(wallets)
          .values({ userId: row.userId })
          .onConflictDoNothing()
          .run();
        tx.update(wallets)
          .set({ balanceUnits: sql`${wallets.balanceUnits}+${units}` })
          .where(eq(wallets.userId, row.userId))
          .run();
        tx.insert(ledger)
          .values({
            id: crypto.randomUUID(),
            userId: row.userId,
            kind: "topup",
            amountUnits: units,
            reference: "topup:" + row.id,
            createdAt: Date.now(),
          })
          .run();
        tx.insert(paymentEvents)
          .values({ id: eventId, orderId: row.id, createdAt: Date.now() })
          .onConflictDoNothing()
          .run();
        tx.update(topups)
          .set({
            status: "paid",
            paymentId: payment.paymentId,
            updatedAt: Date.now(),
          })
          .where(eq(topups.id, row.id))
          .run();
        return this.order(row.id);
      },
      { behavior: "immediate" },
    );
  }
}
