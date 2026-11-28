(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const glyphs = '02#%!/\\<>=+*';
  const NS = 'http://www.w3.org/2000/svg';
  document.querySelectorAll('h1.kin').forEach((h1) => {
    h1.setAttribute('aria-label', h1.textContent);
    const letters = [];
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          for (const ch of n.textContent) {
            const s = document.createElement('span');
            s.className = 'k'; s.textContent = ch; s.dataset.c = ch;
            s.style.setProperty('--i', letters.length); s.setAttribute('aria-hidden', 'true');
            letters.push(s); frag.append(s);
          }
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.classList.contains('period')) {
          n.setAttribute('aria-hidden', 'true');
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(h1);
    if (!reduced) {
      const start = performance.now();
      const tick = (now) => {
        const p = (now - start) / 900;
        letters.forEach((s, i) => {
          if (s.dataset.c === ' ') return;
          s.textContent = p > i / letters.length + .25 ? s.dataset.c : glyphs[Math.floor(Math.random() * glyphs.length)];
        });
        if (p < 1.3) requestAnimationFrame(tick); else letters.forEach((s) => (s.textContent = s.dataset.c));
      };
      requestAnimationFrame(tick);
    }
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'brush'); svg.setAttribute('viewBox', '0 0 600 44'); svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = '<defs><filter id="ink" x="-5%" y="-40%" width="110%" height="180%"><feTurbulence type="fractalNoise" baseFrequency=".04 .18" numOctaves="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="14"/></filter></defs><g filter="url(#ink)" fill="none" stroke-linecap="round"><path class="b1" d="M8 26C90 8 190 38 310 20S510 30 592 12" stroke="#DB3A34" stroke-width="17"/><path class="b2" d="M20 30C120 18 230 36 330 26S520 22 580 20" stroke="#A7A2A9" stroke-width="4" opacity=".7"/></g>';
    h1.after(svg);
  });
})();
