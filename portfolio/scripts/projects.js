(() => {
  const P = [...(window.PROJECTS || [])].reverse();
  const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  const rich = (t) => { const f = document.createDocumentFragment(); t.split('`').forEach((s, i) => f.append(i % 2 ? el('code', null, s) : document.createTextNode(s))); return f; };
  const pix = (p, i) => { const s = el('span', 'pixel ' + (i % 2 ? 'pixel-alabaster' : 'pixel-tuscan')); const m = new Image(); m.src = 'images/' + p.icon + '.png'; m.alt = ''; s.append(m); return s; };
  const chips = (p) => { const u = el('ul', 'tech-list'); u.setAttribute('aria-label', 'Tools used'); p.tech.forEach((t) => u.append(el('li', null, t))); return u; };

  const wl = document.getElementById('work-list');
  if (wl) {
    const LIMIT = 4, more = document.getElementById('work-more');
    P.forEach((p, i) => {
      const d = el('details', 'work-item'); d.hidden = i >= LIMIT;
      const s = el('summary', 'work-row'), t = el('span');
      t.append(el('strong', null, p.title), el('span', 'row-description', p.summary));
      const a = el('span', 'row-arrow'); a.setAttribute('aria-hidden', 'true');
      s.append(pix(p, i), t, a);
      const b = el('div', 'work-detail'), l = el('a', 'text-link', 'Open full project'); l.href = 'projects.html#' + p.id;
      b.append(el('p', null, p.brief), chips(p), l);
      d.append(s, b); wl.append(d);
    });
    if (P.length > LIMIT) {
      more.hidden = false;
      const show = (all) => {
        more.setAttribute('aria-expanded', String(all));
        more.textContent = all ? 'Show fewer projects' : 'Show all ' + P.length + ' projects';
        [...wl.children].forEach((d, i) => { d.hidden = !all && i >= LIMIT; if (d.hidden) d.open = false; });
      };
      more.addEventListener('click', () => show(more.getAttribute('aria-expanded') !== 'true'));
      show(false);
    }
  }

  const pl = document.getElementById('project-list');
  if (pl) {
    P.forEach((p, i) => {
      const art = el('article', 'project'); art.id = p.id; art.dataset.tags = p.tags.join('|');
      const idx = el('div', 'project-index'); idx.append(pix(p, i), el('span', null, p.tags.join(' / ')));
      const body = el('div'); body.append(el('h2', null, p.title));
      p.body.forEach((t) => { const q = el('p'); q.append(rich(t)); body.append(q); });
      body.append(chips(p));
      if (p.image) {
        const f = el('figure', 'evidence'), a = el('a'), m = new Image();
        a.href = m.src = p.image.src; m.alt = p.image.alt; m.loading = 'lazy'; a.append(m);
        f.append(a, el('figcaption', null, p.image.caption)); body.append(f);
      }
      if (p.links) {
        const w = el('div', 'project-links');
        p.links.forEach((k) => { const a = el('a', k.primary ? 'button' : 'text-link', k.label); a.href = k.href; w.append(a); });
        body.append(w);
      }
      art.append(idx, body); pl.append(art);
    });
    const bar = document.getElementById('project-filters');
    const tags = [...new Set(P.flatMap((p) => p.tags))].sort();
    const count = el('span'); count.id = 'note-count'; count.setAttribute('role', 'status');
    const btns = ['All', ...tags].map((t) => {
      const n = t === 'All' ? P.length : P.filter((p) => p.tags.includes(t)).length;
      const b = el('button', null, t + ' (' + n + ')'); b.type = 'button'; b.dataset.tag = t;
      b.addEventListener('click', () => filter(t)); bar.append(b); return b;
    });
    bar.append(count);
    function filter(tag) {
      let n = 0;
      [...pl.children].forEach((a) => { a.hidden = tag !== 'All' && !a.dataset.tags.split('|').includes(tag); if (!a.hidden) n++; });
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tag === tag)));
      count.textContent = n + (n === 1 ? ' project' : ' projects');
    }
    bar.hidden = false; filter('All');
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  }
})();
