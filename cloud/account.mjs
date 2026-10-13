import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { emailOTP } from "better-auth/plugins";
import * as schema from "./schema.mjs";
export function createAuth({ db, config, sendEmail }) {
  if (!config.BETTER_AUTH_SECRET || config.BETTER_AUTH_SECRET.length < 32)
    throw new Error("Configure BETTER_AUTH_SECRET (32+ characters)");
  const deliver =
    sendEmail ||
    async function ({ email, otp }) {
      if (!config.RESEND_API_KEY || !config.AUTH_EMAIL_FROM)
        throw new Error("邮件服务尚未配置");
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + config.RESEND_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: config.AUTH_EMAIL_FROM,
          to: [email],
          subject: "CLHH MV 创作 · 登录验证码",
          text: `你的验证码是 ${otp}，5 分钟内有效。首次验证会创建账号。如非本人操作，请忽略此邮件。`,
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("验证码发送失败，请稍后再试");
    };
  return betterAuth({
    appName: "CLHH MV 创作",
    baseURL: config.PUBLIC_ORIGIN,
    secret: config.BETTER_AUTH_SECRET,
    trustedOrigins: [config.PUBLIC_ORIGIN],
    database: drizzleAdapter(db, { provider: "sqlite", schema }),
    emailAndPassword: { enabled: false },
    advanced: {
      cookiePrefix: "clhh-mv",
      useSecureCookies: config.PUBLIC_ORIGIN.startsWith("https:"),
      ipAddress: { ipAddressHeaders: ["x-real-ip"] },
      database: { generateId: () => crypto.randomUUID() },
    },
    session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24 },
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 30,
      customRules: {
        "/email-otp/send-verification-otp": { window: 60, max: 3 },
        "/sign-in/email-otp": { window: 60, max: 5 },
      },
    },
    plugins: [
      emailOTP({
        otpLength: 6,
        expiresIn: 300,
        allowedAttempts: 3,
        storeOTP: "hashed",
        sendVerificationOTP: deliver,
      }),
    ],
  });
}
