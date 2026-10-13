// Loaded explicitly by integration tests; never imported by the application.
const original = globalThis.fetch;
globalThis.fetch = (url, options) =>
  original(
    String(url) === "https://api.resend.com/emails"
      ? process.env.CLHH_FIXTURE_URL + "/email"
      : url,
    options,
  );

// Replace only the SDK transport in this explicitly loaded test process.
import sdk from "tencentcloud-sdk-nodejs-sms";
sdk.sms.v20210111.Client.prototype.SendSms = async (params) => {
  const response = await original(process.env.CLHH_FIXTURE_URL + "/sms", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(params),
  });
  return response.json();
};
