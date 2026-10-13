async function fm(batchId, options) {
  const web = window.CLHH_WEB;
  const response = await web.api("/api/merge", {
    method: "POST",
    body: {
      batchId,
      force: !!options?.force,
      snapshot: await web.snapshot(ee.getState()),
    },
  });
  if (response.panels)
    for (const panel of response.panels)
      ee.getState().updatePanel(panel.id, {
        statusText: panel.statusText,
        lastResults: panel.lastResults.map(web.result),
        resultUnread: panel.resultUnread,
      });
  await web.refreshFiles();
  return {
    ...response,
    path: response.relative ? "/results/" + response.relative : undefined,
  };
}
