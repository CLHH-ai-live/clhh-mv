function clhhHasVideo(panel) {
  return (
    (panel.lastResults || []).some((r) => window.CLHH_WEB.files.has(r.path)) ||
    !!dm(panel)
  );
}
