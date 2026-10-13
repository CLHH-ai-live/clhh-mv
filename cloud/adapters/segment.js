function dm(panel, folder) {
  if (panel.audioBatchId) {
    const a = Ex(panel.audioBatchId, panel.audioSegmentIndex ?? 1, folder),
      b = Ix(panel.audioBatchId, panel.audioSegmentIndex ?? 1, folder);
    if (window.CLHH_WEB.files.has(a)) return a;
    if (window.CLHH_WEB.files.has(b)) return b;
  }
  const p = panel.lastResults?.[0]?.path;
  return p && Rx(p) && window.CLHH_WEB.files.has(p) ? p : null;
}
