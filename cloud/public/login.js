const form = document.querySelector("#login"),
  message = document.querySelector("#error"),
  send = document.querySelector("#send-code"),
  submit = document.querySelector("#submit"),
  methods = [...document.querySelectorAll("[data-method]")];
let method = "email", busy = false, nextSend = 0;
function refresh() {
  const seconds = Math.max(0, Math.ceil((nextSend - Date.now()) / 1000));
  send.disabled = busy || seconds > 0;
  send.textContent = seconds ? seconds + " 秒后重发" : "获取验证码";
  submit.disabled = busy;
  methods.forEach((button) => { button.disabled = busy; });
}
setInterval(refresh, 1000);
methods.forEach((button) => {
  button.onclick = () => {
    if (busy) return;
    method = button.dataset.method;
    methods.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    for (const name of ["email", "phone"]) {
      document.querySelector("#" + name + "-field").hidden = name !== method;
      form.elements[name].disabled = name !== method;
    }
    form.elements.otp.value = "";
    message.textContent = "";
    form.elements[method].focus();
  };
});
function identity() {
  const input = form.elements[method];
  input.setCustomValidity("");
  let value = input.value.trim();
  if (method === "phone") {
    value = value.replace(/[\s-]/g, "");
    if (/^1[3-9]\d{9}$/.test(value)) value = "+86" + value;
    else if (/^861[3-9]\d{9}$/.test(value)) value = "+" + value;
    if (!/^\+861[3-9]\d{9}$/.test(value)) input.setCustomValidity("请输入正确的中国大陆手机号");
  }
  return input.reportValidity() ? value : null;
}
form.elements.phone.oninput = () => form.elements.phone.setCustomValidity("");
async function auth(path, body) {
  const response = await fetch("/api/auth/" + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(response.status === 429 ? "操作过于频繁，请稍后再试" : {
      INVALID_OTP: "验证码错误或已过期",
      OTP_EXPIRED: "验证码已过期，请重新获取",
      OTP_NOT_FOUND: "请先获取验证码",
      INVALID_PHONE_NUMBER: "请输入正确的中国大陆手机号",
      TOO_MANY_ATTEMPTS: "验证次数过多，请重新获取验证码",
      FAILED_TO_SEND_OTP: "验证码发送失败，请稍后重试",
    }[data.code] || "操作失败，请检查账号和验证码后重试");
  return data;
}
send.onclick = async () => {
  const value = identity();
  if (!value || busy || nextSend > Date.now()) return;
  busy = true; refresh();
  message.textContent = "正在发送验证码…";
  try {
    await auth(method === "phone" ? "phone-number/send-otp" : "email-otp/send-verification-otp",
      method === "phone" ? { phoneNumber: value } : { email: value, type: "sign-in" });
    message.textContent = "验证码已发送，请查收" + (method === "phone" ? "短信" : "邮件") + "（有效期 5 分钟）。";
    nextSend = Date.now() + 60000;
  } catch (error) { message.textContent = error.message; }
  finally { busy = false; refresh(); }
};
form.onsubmit = async (event) => {
  event.preventDefault();
  const value = identity();
  if (!value || busy) return;
  busy = true; refresh();
  message.textContent = "正在验证…";
  try {
    const code = form.elements.otp.value.trim();
    await auth(method === "phone" ? "phone-number/verify" : "sign-in/email-otp",
      method === "phone" ? { phoneNumber: value, code } : { email: value, otp: code });
    location.replace("/");
  } catch (error) { message.textContent = error.message; busy = false; refresh(); }
};
