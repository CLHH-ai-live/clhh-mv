// Loaded explicitly by integration tests; never imported by the application.
const original = globalThis.fetch;
globalThis.fetch = (url, options) =>
  original(
    String(url) === "https://api.resend.com/emails"
      ? process.env.CLHH_FIXTURE_URL + "/email"
      : url,
    options,
  );
