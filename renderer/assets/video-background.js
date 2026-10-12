(() => {
  const video = document.getElementById('clhh-background-video');
  if (!video) return;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const sync = () => {
    video.muted = true;
    if (document.hidden || reduceMotion.matches) video.pause();
    else video.play().catch(() => {});
  };
  document.addEventListener('visibilitychange', sync);
  reduceMotion.addEventListener('change', sync);
  video.addEventListener('loadeddata', sync, { once: true });
  sync();
})();
