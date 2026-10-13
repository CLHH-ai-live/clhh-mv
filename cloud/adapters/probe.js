async function bv(slot) {
  const saved = await window.CLHH_WEB.asset(slot);
  const response = await window.CLHH_WEB.api("/api/media/probe", {
    method: "POST",
    body: { asset: window.CLHH_WEB.ref(saved) },
  });
  if (!response.success) throw new Error(response.error || "无法读取音频时长");
  return Number(response.duration);
}
