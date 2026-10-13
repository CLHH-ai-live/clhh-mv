import { APIError } from "better-auth";
import sdk from "tencentcloud-sdk-nodejs-sms";

export function normalizePhoneNumber(input) {
  const compact = String(input ?? "").trim().replace(/[\s-]/g, "");
  if (/^1[3-9]\d{9}$/.test(compact)) return "+86" + compact;
  if (/^861[3-9]\d{9}$/.test(compact)) return "+" + compact;
  return compact;
}
export function isSupportedPhoneNumber(input) {
  return /^\+861[3-9]\d{9}$/.test(normalizePhoneNumber(input));
}
export function createSmsSender(config, Client = sdk.sms.v20210111.Client) {
  let client;
  return async ({ phoneNumber, code }) => {
    if (!isSupportedPhoneNumber(phoneNumber))
      throw APIError.from("BAD_REQUEST", { code: "INVALID_PHONE_NUMBER", message: "请输入中国大陆手机号" });
    for (const key of ["SECRET_ID", "SECRET_KEY", "SDK_APP_ID", "SIGN_NAME", "TEMPLATE_ID_LOGIN"])
      if (!config["TENCENT_SMS_" + key])
        throw APIError.from("SERVICE_UNAVAILABLE", { code: "FAILED_TO_SEND_OTP", message: "短信服务尚未配置" });
    client ??= new Client({
      credential: { secretId: config.TENCENT_SMS_SECRET_ID, secretKey: config.TENCENT_SMS_SECRET_KEY },
      region: config.TENCENT_SMS_REGION || "ap-guangzhou",
      profile: { httpProfile: { endpoint: "sms.tencentcloudapi.com", reqTimeout: 15 } },
    });
    try {
      const result = await client.SendSms({
        PhoneNumberSet: [normalizePhoneNumber(phoneNumber)],
        SmsSdkAppId: config.TENCENT_SMS_SDK_APP_ID,
        SignName: config.TENCENT_SMS_SIGN_NAME,
        TemplateId: config.TENCENT_SMS_TEMPLATE_ID_LOGIN,
        TemplateParamSet: [code],
      });
      const status = result.SendStatusSet?.[0];
      if (status?.Code !== "Ok") throw new Error(status?.Code || "SMS_FAILED");
    } catch (error) {
      const limited = String(error.code || error.message).startsWith("LimitExceeded.");
      throw APIError.from(limited ? "TOO_MANY_REQUESTS" : "BAD_GATEWAY", {
        code: limited ? "PHONE_DAILY_LIMIT" : "FAILED_TO_SEND_OTP",
        message: limited ? "短信发送次数已达限制，请稍后再试" : "短信发送失败，请稍后重试",
      });
    }
  };
}
