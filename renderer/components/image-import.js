async function clhhDecodeImage(file) {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    if (!image.naturalWidth || !image.naturalHeight)
      throw new Error("Empty image");
    return file;
  } finally {
    URL.revokeObjectURL(url);
  }
}
async function Jp(input) {
  // Capture the native path before replacing the browser File with an in-memory File.
  let nativePath = "";
  try {
    nativePath = window.require("electron").webUtils.getPathForFile(input);
  } catch {}
  const name =
    input.name && input.name !== "blob" ? input.name : `图片-${Date.now()}.png`;
  const type = input.type || tm(name);
  let lastBytes = null;
  const read = async () => {
    try {
      const bytes = await input.arrayBuffer();
      if (bytes.byteLength) {
        lastBytes = bytes;
        try {
          return await clhhDecodeImage(new File([bytes], name, { type }));
        } catch {}
      }
    } catch {}
    if (nativePath) {
      try {
        const bytes = await window.require("fs").promises.readFile(nativePath);
        if (bytes.byteLength) {
          lastBytes = bytes;
          try {
            return await clhhDecodeImage(new File([bytes], name, { type }));
          } catch {}
        }
      } catch {}
    }
    return null;
  };
  // WeChat can hand over a promised temporary file before its bytes are available.
  for (const delay of [0, 150, 350, 700, 1200]) {
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
    const decoded = await read();
    if (decoded) return decoded;
  }
  // Convert formats such as TIFF/HEIC only after ordinary browser decoding fails.
  if (lastBytes?.byteLength) {
    try {
      const converted = await window
        .require("electron")
        .ipcRenderer.invoke("import-image-as-png", {
          bytes: new Uint8Array(lastBytes),
          name,
        });
      if (converted.success) {
        const pngName = name.replace(/\.[^.]+$/, "") + ".png";
        return await clhhDecodeImage(
          new File([converted.bytes], pngName, { type: "image/png" }),
        );
      }
    } catch {}
  }
  throw new Error(
    "无法读取这张图片。请先在微信中打开原图，再另存到下载文件夹后上传；也可以复制图片后在圆盘上粘贴。",
  );
}
