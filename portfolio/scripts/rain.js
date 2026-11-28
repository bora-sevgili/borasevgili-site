(() => {
  const cv = document.getElementById('rain');
  if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = cv.getContext('2d');
  const chars = 'ﾜﾝﾋﾟｰｽ';
  const fs = 15; let cols = 0, drops = [];
  function fit() {
    cv.width = cv.clientWidth; cv.height = cv.clientHeight;
    cols = Math.floor(cv.width / fs); drops = Array.from({ length: cols }, () => Math.random() * -40);
  }
  fit(); addEventListener('resize', fit);
  let last = 0;
  function loop(now) {
    if (now - last > 65 && !document.hidden && !document.body.classList.contains('motion-paused')) {
      last = now;
      ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.globalCompositeOperation = 'source-over'; ctx.font = '700 ' + fs + 'px ui-monospace, Consolas, monospace';
      for (let i = 0; i < cols; i++) {
        const y = drops[i] * fs;
        ctx.fillStyle = '#DB3A34'; ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y);
        ctx.fillStyle = 'rgba(142, 0, 0, 0.6)'; ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y - fs);
        if (y > cv.height && Math.random() > .975) drops[i] = 0; else drops[i] += 1;
      }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
