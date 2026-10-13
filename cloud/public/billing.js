export function installBilling(web) {
  const money = (units) => (units / 600).toFixed(2);
  let walletDialog,
    activeOrder,
    pollTimer,
    confirmationActive = false,
    waiting = [],
    flushTimer;
  const requestIds = new Map();
  web.refreshWallet = async () => {
    const data = await web.api("/api/billing/wallet");
    const label = document.querySelector("#web-wallet-balance");
    if (label) label.textContent = "余额 ¥" + data.balance + " / 充值";
    return data;
  };
  function renderOrder(order) {
    activeOrder = order;
    const region = walletDialog.querySelector(".web-payment");
    region.replaceChildren();
    const title = document.createElement("p");
    title.textContent =
      order.status === "paid"
        ? "充值成功，余额已到账"
        : order.status === "closed"
          ? "支付订单已关闭，请重新选择充值金额。"
          : "使用微信扫码充值 ¥" + (order.amountFen / 100).toFixed(2);
    region.append(title);
    if (order.qrCode && order.status !== "paid") {
      const image = document.createElement("img");
      image.src = order.qrCode;
      image.alt = "微信充值二维码";
      image.width = 280;
      image.height = 280;
      region.append(image);
    }
    if (["paid", "closed"].includes(order.status))
      requestIds.delete(order.amountFen);
  }
  async function updateWallet() {
    const data = await web.refreshWallet();
    walletDialog.querySelector(".web-balance").textContent =
      "可用余额 ¥" + data.balance + " · 任务预留 ¥" + data.held;
    const rows = walletDialog.querySelector(".web-ledger");
    rows.replaceChildren();
    const names = {
      topup: "充值到账",
      reserve: "生成预留",
      charge: "生成完成（已结算预留）",
      refund: "失败 / 取消退回",
    };
    for (const entry of data.ledger) {
      const row = document.createElement("p");
      row.textContent =
        new Date(entry.createdAt).toLocaleString() +
        " · " +
        (names[entry.kind] || entry.kind) +
        " · " +
        (entry.amountUnits > 0 ? "+" : "") +
        entry.amount +
        " 元";
      rows.append(row);
    }
    const orders = await web.api("/api/billing/topups");
    const pending = walletDialog.querySelector(".web-pending");
    pending.replaceChildren();
    for (const order of orders
      .filter((o) => ["creating", "pending"].includes(o.status))
      .slice(0, 5)) {
      const button = document.createElement("button");
      button.textContent = "继续充值 ¥" + (order.amountFen / 100).toFixed(2);
      button.onclick = async () => {
        try {
          renderOrder(await web.api("/api/billing/topups/" + order.id));
          pollOrder();
        } catch (e) {
          walletDialog.querySelector("[role=status]").textContent = e.message;
        }
      };
      pending.append(button);
    }
  }
  function pollOrder() {
    clearTimeout(pollTimer);
    if (
      !walletDialog.open ||
      !activeOrder ||
      ["paid", "closed"].includes(activeOrder.status)
    )
      return;
    pollTimer = setTimeout(async () => {
      try {
        renderOrder(await web.api("/api/billing/topups/" + activeOrder.id));
        if (activeOrder.status === "paid") await updateWallet();
      } catch (error) {
        walletDialog.querySelector("[role=status]").textContent = error.message;
      }
      pollOrder();
    }, 3000);
  }
  web.showWallet = async () => {
    if (!walletDialog) {
      walletDialog = document.createElement("dialog");
      walletDialog.id = "web-wallet";
      walletDialog.setAttribute("aria-label", "余额与充值");
      walletDialog.innerHTML =
        '<div class="web-files-heading"><h2>余额与充值</h2><button class="web-close">关闭</button></div><p class="web-balance">加载中…</p><p>每 180 秒 ¥30，按实际音频时长折算。生成前预留费用，失败或取消自动退回余额；合并、预览和下载免费。余额保留精确账目，界面显示到分。</p><div class="web-topup-amounts"></div><p role="status" aria-live="polite"></p><div class="web-payment"></div><div class="web-pending"></div><h3>最近账单</h3><div class="web-ledger"></div>';
      walletDialog.querySelector(".web-close").onclick = () =>
        walletDialog.close();
      walletDialog.onclose = () => clearTimeout(pollTimer);
      for (const amountFen of [1000, 3000, 5000, 10000, 30000]) {
        const button = document.createElement("button");
        button.textContent = "充值 ¥" + amountFen / 100;
        button.onclick = async () => {
          const status = walletDialog.querySelector("[role=status]");
          button.disabled = true;
          status.textContent = "正在创建支付二维码…";
          try {
            if (!requestIds.has(amountFen))
              requestIds.set(amountFen, crypto.randomUUID());
            renderOrder(
              await web.api("/api/billing/topups", {
                method: "POST",
                body: { amountFen, requestId: requestIds.get(amountFen) },
              }),
            );
            status.textContent = "请使用微信扫一扫，支付后自动到账。";
            pollOrder();
          } catch (error) {
            status.textContent = error.message;
          } finally {
            button.disabled = false;
          }
        };
        walletDialog.querySelector(".web-topup-amounts").append(button);
      }
      document.body.append(walletDialog);
    }
    if (!walletDialog.open) walletDialog.showModal();
    try {
      await updateWallet();
      pollOrder();
    } catch (error) {
      walletDialog.querySelector("[role=status]").textContent = error.message;
    }
  };
  web.confirmCharge = (quote) =>
    new Promise((resolve, reject) => {
      waiting.push({ quote, resolve, reject });
      clearTimeout(flushTimer);
      flushTimer = setTimeout(confirm, 250);
    });
  async function confirm() {
    if (confirmationActive || !waiting.length) return;
    confirmationActive = true;
    const batch = waiting.splice(0);
    let dialog;
    try {
      const total = batch.reduce((s, x) => s + x.quote.costUnits, 0),
        duration = batch.reduce((s, x) => s + x.quote.durationMs, 0),
        wallet = await web.refreshWallet();
      const accepted = await new Promise((resolve) => {
        dialog = document.createElement("dialog");
        dialog.id = "web-charge";
        dialog.setAttribute("aria-label", "确认生成费用");
        dialog.innerHTML =
          '<h2>确认生成费用</h2><p class="web-charge-description"></p><p>失败或取消会自动退回余额。合并、预览和下载免费。</p><div class="web-file-actions"><button class="cancel">取消</button><button class="accept"></button></div>';
        dialog.querySelector(".web-charge-description").textContent =
          `本次 ${batch.length} 个任务，共约 ${(duration / 1000).toFixed(2)} 秒，预计 ¥${money(total)}。可用余额 ¥${wallet.balance}。`;
        const enough = wallet.balanceUnits >= total;
        dialog.querySelector(".accept").textContent = enough
          ? "确认并生成"
          : "余额不足，去充值";
        dialog.querySelector(".accept").onclick = () => {
          resolve(enough);
          dialog.close();
          if (!enough) void web.showWallet();
        };
        dialog.querySelector(".cancel").onclick = () => dialog.close();
        dialog.onclose = () => resolve(false);
        document.body.append(dialog);
        dialog.showModal();
      });
      for (const item of batch)
        if (accepted) item.resolve();
        else {
          const error = new Error("已取消生成");
          error.name = "RunCancelledError";
          item.reject(error);
        }
    } catch (error) {
      for (const item of batch) item.reject(error);
    } finally {
      dialog?.remove();
      confirmationActive = false;
      if (waiting.length) void confirm();
    }
  }
  setInterval(() => {
    if (!document.hidden) void web.refreshWallet().catch(() => {});
  }, 15000);
  setTimeout(() => void web.refreshWallet().catch(() => {}), 500);
}
