function Fv({ open, onClose }) {
  const settings = ee();
  const [folder, setFolder] = S.useState(settings.resultFolder);
  const [concurrency, setConcurrency] = S.useState(
    String(settings.maxConcurrentTasks || 2),
  );
  const [testing, setTesting] = S.useState(false);
  const [result, setResult] = S.useState(null);
  const request = S.useRef(null);
  S.useEffect(() => {
    if (!open) return;
    setFolder(settings.resultFolder);
    setConcurrency(String(settings.maxConcurrentTasks || 2));
    setResult(null);
    setTesting(false);
    return () => {
      request.current?.abort();
      request.current = null;
    };
  }, [open]);
  if (!open) return null;
  const chooseFolder = async () => {
    try {
      const selected = await bt().invoke("select-folder");
      if (selected?.success && selected.path) setFolder(selected.path);
    } catch {
      setResult({ ok: false, message: "选择文件夹失败，请重试" });
    }
  };
  const testConnection = async () => {
    const controller = new AbortController();
    request.current = controller;
    setTesting(true);
    setResult(null);
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(
        CLHH_SERVICE.baseUrl + "/uc/openapi/accountStatus",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apikey: CLHH_SERVICE.apiKey,
            apiKey: CLHH_SERVICE.apiKey,
          }),
          signal: controller.signal,
        },
      );
      const data = await response.json();
      const ok = response.ok && data.code === 0;
      if (request.current === controller)
        setResult({ ok, message: ok ? "连接成功" : "连接失败，请联系管理员" });
    } catch {
      if (request.current === controller)
        setResult({ ok: false, message: "连接失败，请检查网络后重试" });
    } finally {
      clearTimeout(timeout);
      if (request.current === controller) {
        request.current = null;
        setTesting(false);
      }
    }
  };
  const save = () => {
    settings.setSettings({
      resultFolder: folder.trim(),
      maxConcurrentTasks: jc(concurrency),
    });
    Be.notifyConcurrencyChanged();
    onClose();
  };
  return Rt.createPortal(
    i.jsx("div", {
      className:
        "morph-dialog-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4",
      onMouseDown: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      children: i.jsxs("div", {
        className: "morph-card morph-bg w-full max-w-xl overflow-hidden",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "设置",
        onMouseDown: (e) => e.stopPropagation(),
        children: [
          i.jsxs("div", {
            className: "flex items-start justify-between gap-3 px-5 pt-5 pb-3",
            children: [
              i.jsxs("div", {
                children: [
                  i.jsx("div", {
                    className:
                      "text-lg font-semibold tracking-wide text-morph-accent-deep",
                    children: "设置",
                  }),
                  i.jsx("div", {
                    className: "mt-1 text-xs leading-5 text-morph-muted",
                    children: "设置保存位置、并发任务数量，并测试连接。",
                  }),
                ],
              }),
              i.jsx("button", {
                type: "button",
                onClick: onClose,
                className: "morph-btn-circle h-9 w-9 shrink-0 text-morph-muted",
                "aria-label": "关闭",
                children: i.jsx(Re, { className: "h-4 w-4" }),
              }),
            ],
          }),
          i.jsxs("div", {
            className: "max-h-[70vh] space-y-4 overflow-y-auto px-5 pb-2",
            children: [
              i.jsxs("section", {
                className: "morph-card-inset space-y-3 p-4",
                children: [
                  i.jsxs("button", {
                    type: "button",
                    onClick: testConnection,
                    disabled: testing,
                    className:
                      "morph-btn-primary inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60",
                    children: [
                      i.jsx(testing ? gr : fo, {
                        className: testing ? "h-4 w-4 animate-spin" : "h-4 w-4",
                      }),
                      testing ? "测试中…" : "测试连接",
                    ],
                  }),
                  result &&
                    i.jsx("div", {
                      role: "status",
                      "aria-live": "polite",
                      className:
                        "morph-card-inset rounded-2xl px-3 py-2.5 text-sm " +
                        (result.ok ? "text-emerald-700" : "text-red-700"),
                      children: result.message,
                    }),
                ],
              }),
              i.jsxs("section", {
                className: "morph-card-inset space-y-3 p-4",
                children: [
                  i.jsx("label", {
                    htmlFor: "settings-result-folder",
                    className: "text-xs font-semibold text-morph-muted",
                    children: "结果文件夹",
                  }),
                  i.jsxs("div", {
                    className: "flex gap-2",
                    children: [
                      i.jsx("input", {
                        id: "settings-result-folder",
                        value: folder,
                        onChange: (e) => setFolder(e.target.value),
                        placeholder: "选择或输入本地路径",
                        className:
                          "morph-input min-w-0 flex-1 px-3 py-2.5 font-mono text-sm",
                        ...Ce(),
                      }),
                      i.jsx("button", {
                        type: "button",
                        onClick: chooseFolder,
                        className:
                          "morph-btn-circle px-3.5 py-2 text-sm text-morph-accent-deep",
                        children: "选择",
                      }),
                    ],
                  }),
                ],
              }),
              i.jsxs("section", {
                className: "morph-card-inset space-y-3 p-4",
                children: [
                  i.jsx("label", {
                    htmlFor: "settings-concurrency",
                    className: "block text-xs text-morph-muted",
                    children: "同时可跑任务数（1–100，默认 2）",
                  }),
                  i.jsx("input", {
                    id: "settings-concurrency",
                    type: "number",
                    min: 1,
                    max: 100,
                    step: 1,
                    value: concurrency,
                    onChange: (e) => setConcurrency(e.target.value),
                    className: "morph-input w-40 px-3 py-2.5 font-mono text-sm",
                    ...Ce(),
                  }),
                ],
              }),
            ],
          }),
          i.jsxs("div", {
            className: "flex justify-end gap-2 px-5 py-4",
            children: [
              i.jsx("button", {
                type: "button",
                onClick: onClose,
                className:
                  "morph-btn-circle px-5 py-2.5 text-sm text-morph-muted",
                children: "取消",
              }),
              i.jsx("button", {
                type: "button",
                onClick: save,
                className:
                  "morph-btn-primary px-5 py-2.5 text-sm font-semibold text-white",
                children: "保存",
              }),
            ],
          }),
        ],
      }),
    }),
    document.body,
  );
}
