const form = document.querySelector("#login"),
  message = document.querySelector("#error"),
  send = document.querySelector("#send-code");
async function auth(path, body) {
  const response = await fetch("/api/auth/" + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      response.status === 429
        ? "操作过于频繁，请稍后再试"
        : {
            INVALID_OTP: "验证码错误或已过期",
            OTP_EXPIRED: "验证码已过期，请重新获取",
            TOO_MANY_ATTEMPTS: "验证次数过多，请重新获取验证码",
            FAILED_TO_SEND_OTP: "验证码发送失败，请稍后重试",
          }[data.code] || "操作失败，请检查邮箱和验证码后重试",
    );
  return data;
}
send.onclick = async () => {
  const email = form.elements.email;
  if (!email.reportValidity()) return;
  send.disabled = true;
  message.textContent = "正在发送验证码…";
  try {
    await auth("email-otp/send-verification-otp", {
      email: email.value.trim(),
      type: "sign-in",
    });
    message.textContent = "验证码已发送，请查收邮件（有效期 5 分钟）。";
    let remaining = 60;
    send.textContent = remaining + " 秒后重发";
    const timer = setInterval(() => {
      remaining--;
      send.textContent = remaining + " 秒后重发";
      if (remaining <= 0) {
        clearInterval(timer);
        send.disabled = false;
        send.textContent = "重新发送";
      }
    }, 1000);
  } catch (error) {
    message.textContent = error.message;
    send.disabled = false;
  }
};
form.onsubmit = async (event) => {
  event.preventDefault();
  const button = document.querySelector("#submit");
  button.disabled = true;
  message.textContent = "正在验证…";
  try {
    await auth("sign-in/email-otp", {
      email: form.elements.email.value.trim(),
      otp: form.elements.otp.value.trim(),
    });
    location.replace("/");
  } catch (error) {
    message.textContent = error.message;
    button.disabled = false;
  }
};
