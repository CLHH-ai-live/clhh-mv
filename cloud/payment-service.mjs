import crypto from "node:crypto";
export const canonical = (method, path, timestamp, nonce, body) =>
  [
    method,
    path,
    timestamp,
    nonce,
    crypto.createHash("sha256").update(body).digest("hex"),
  ].join("\n");
export const sign = (secret, message) =>
  crypto.createHmac("sha256", secret).update(message).digest("hex");
export class PaymentService {
  constructor(config) {
    this.config = config;
  }
  async request(method, path, payload) {
    const c = this.config;
    if (
      !c.PAY_SERVICE_APP_SECRET ||
      !c.PAY_SERVICE_URL ||
      !c.PAY_SERVICE_APP_KEY
    )
      throw new Error("充值服务尚未配置");
    const body = payload === undefined ? "" : JSON.stringify(payload),
      timestamp = String(Math.floor(Date.now() / 1000)),
      nonce = crypto.randomUUID();
    const response = await fetch(c.PAY_SERVICE_URL + path, {
      method,
      headers: {
        "content-type": "application/json",
        "x-pay-app-key": c.PAY_SERVICE_APP_KEY,
        "x-pay-timestamp": timestamp,
        "x-pay-nonce": nonce,
        "x-pay-signature": sign(
          c.PAY_SERVICE_APP_SECRET,
          canonical(method, path, timestamp, nonce, body),
        ),
      },
      body: body || undefined,
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw new Error("支付服务暂不可用，请稍后重试");
    const data = await response.json();
    if (data.appKey !== c.PAY_SERVICE_APP_KEY)
      throw new Error("支付应用不匹配");
    return data;
  }
  create(order) {
    return this.request("POST", "/internal/payments", {
      provider: "wechat",
      businessOrderId: order.id,
      amountFen: order.amountFen,
      currency: "CNY",
      subject: "CLHH MV 创作余额充值",
      method: "native",
      clientNotifyUrl:
        this.config.PUBLIC_ORIGIN + "/api/billing/pay-service-callback",
    });
  }
  query(id) {
    return this.request(
      "POST",
      "/internal/payments/" + encodeURIComponent(id) + "/query",
      {},
    );
  }
  verify(headers, body, path) {
    const timestamp = headers["x-pay-service-timestamp"],
      nonce = headers["x-pay-service-nonce"],
      signature = headers["x-pay-service-signature"];
    if (
      typeof timestamp !== "string" ||
      !/^\d{10}$/.test(timestamp) ||
      Math.abs(Date.now() / 1000 - Number(timestamp)) > 300 ||
      typeof nonce !== "string" ||
      nonce.length > 100 ||
      typeof signature !== "string" ||
      !/^[0-9a-f]{64}$/i.test(signature) ||
      !this.config.PAY_SERVICE_APP_SECRET
    )
      throw new Error("Invalid payment signature");
    const expected = sign(
      this.config.PAY_SERVICE_APP_SECRET,
      canonical("POST", path, timestamp, nonce, body),
    );
    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature, "hex"),
        Buffer.from(expected, "hex"),
      )
    )
      throw new Error("Invalid payment signature");
    const data = JSON.parse(body);
    if (
      data.appKey !== this.config.PAY_SERVICE_APP_KEY ||
      data.eventType !== "payment.success" ||
      typeof data.eventId !== "string"
    )
      throw new Error("Invalid payment event");
    return data;
  }
}
