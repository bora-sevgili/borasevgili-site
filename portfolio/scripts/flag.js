(() => {
  const el = document.getElementById('flag');
  if (!el) return;
  const g = ['###############', '####oooo#######', '###oo####**####', '###oo####**####', '####oooo#######', '###############'];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function draw(t) {
    const rows = Array.from({ length: 8 }, () => Array(15).fill(' '));
    for (let x = 0; x < 15; x++) {
      const w = Math.sin(x * .55 + t * 2.4), dy = Math.round(w) + 1;
      for (let r = 0; r < 6; r++) rows[r + dy][x] = g[r][x] === '#' ? (w > .35 ? '@' : w > -.35 ? '#' : '%') : g[r][x];
    }
    el.innerHTML = rows.map((r) => r.map((c) => (c === 'o' ? '<i>0</i>' : c === '*' ? '<i>*</i>' : c)).join('')).join('\n');
  }
  draw(0);
  if (reduced) return;
  let last = 0;
  (function loop(now) {
    if (now - last > 90 && !document.hidden && !document.body.classList.contains('motion-paused')) { last = now; draw(now / 1000); }
    requestAnimationFrame(loop);
  })(0);
})();
