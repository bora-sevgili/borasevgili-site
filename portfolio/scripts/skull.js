(() => {
  const pre = document.querySelector('#skull pre');
  if (!pre) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const A = Math.abs, mx = Math.max, mn = Math.min, sq = Math.sqrt;
  const ell = (x, y, z, a, b, c) => { x /= a; y /= b; z /= c; return (sq(x * x + y * y + z * z) - 1) * mn(a, b, c); };
  const sm = (a, b, k) => { const h = mx(k - A(a - b), 0) / k; return mn(a, b) - h * h * k * .25; };
  function cap(x, y, z, ax, ay, az, bx, by, bz, r) {
    const px = x - ax, py = y - ay, pz = z - az, dx = bx - ax, dy = by - ay, dz = bz - az;
    const h = mn(1, mx(0, (px * dx + py * dy + pz * dz) / (dx * dx + dy * dy + dz * dz)));
    const qx = px - dx * h, qy = py - dy * h, qz = pz - dz * h;
    return sq(qx * qx + qy * qy + qz * qz) - r;
  }
  let jaw = .12;
  function sdf(x, y, z) {
    const ax = A(x);
    let d = ell(x, y - .3, z + .02, .8, .84, .92);
    d = sm(d, ell(ax, y + .38, z - .3, .5, .46, .5), .28);
    d = sm(d, ell(ax - .33, y - .08, z - .72, .3, .1, .16), .1);
    d = sm(d, ell(ax - .5, y + .2, z - .5, .17, .1, .2), .12);
    d = sm(d, cap(ax, y, z, .55, -.2, .45, .78, -.1, -.15, .05), .06);
    d = sm(d, ell(x, y + .08, z - .82, .07, .14, .1), .06);
    d = mx(d, -ell(ax - .88, y - .1, z - .15, .12, .22, .26));
    d = mx(d, -ell(ax - .32, y, z - .7, .2, .19, .32));
    d = mx(d, -ell(x, y + .32, z - .7, .1, .17, .3));
    d = mn(d, ell(x, y + .38, z - .72, .018, .12, .16));
    const tx = (((x + .0425) % .085) + .085) % .085 - .0425, rim = .66 - ax * ax * 1.1;
    d = mn(d, mx(mx(A(tx) - .034, A(y + .62) - .075), mx(A(z - rim) - .055, ax - .34)));
    const yy = y + .92 + jaw;
    let m = mx(ell(ax, yy, z - .18, .5, .2, .5), -ell(ax, yy - .12, z - .2, .4, .2, .4));
    m = sm(m, cap(ax, yy, z, .46, .1, -.04, .5, .55, -.06, .07), .08);
    m = mn(m, mx(mx(A(tx) - .034, A(yy - .08) - .07), mx(A(z - (rim - .02)) - .05, ax - .32)));
    return mn(d, m);
  }
  const ramp = ' .`,:;i1I7?SO$', bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  let W = 96, H = 52, ms = 0;
  const randomRotationRate = () => {
    const z = Math.random() * 2 - 1, angle = Math.random() * Math.PI * 2;
    const horizontal = sq(1 - z * z), speed = .45 + Math.random() * .4;
    return [Math.cos(angle) * horizontal * speed, z * speed, Math.sin(angle) * horizontal * speed];
  };
  let rotation = [0, 0, 0], rotationRate = randomRotationRate(), targetRotationRate = rotationRate.slice();
  let rotationUpdatedAt = .8, nextRotationChange = 3 + Math.random() * 3;
  function updateRotation(t) {
    if (t >= nextRotationChange) {
      targetRotationRate = randomRotationRate();
      nextRotationChange = t + 3 + Math.random() * 4;
    }
    const dt = Math.max(0, Math.min(.2, t - rotationUpdatedAt));
    rotationUpdatedAt = t;
    const blend = 1 - Math.exp(-dt * 1.4);
    for (let i = 0; i < 3; i++) {
      rotationRate[i] += (targetRotationRate[i] - rotationRate[i]) * blend;
      rotation[i] += rotationRate[i] * dt;
    }
    return rotation;
  }
  function frame(t) {
    const [a, b, r] = updateRotation(t);
    jaw = .04 + .3 * (.5 + .5 * Math.sin(t));
    const c = Math.cos(a), s = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b), cr = Math.cos(r), sr = Math.sin(r);
    const rot = (x, y, z) => {
      const x1 = x * c - z * s, z1 = x * s + z * c;
      const y1 = y * cb - z1 * sb, z2 = y * sb + z1 * cb;
      return [x1 * cr - y1 * sr, x1 * sr + y1 * cr, z2];
    };
    const L = rot(-.45, .5, .75), V = rot(0, 0, 1), R = 1.5, u = 1.74 / H;
    let out = '';
    for (let j = 0; j < H; j++) {
      const y = (H / 2 - j) * 2.9 / H;
      for (let i = 0; i < W; i++) {
        const x = (i - W / 2) * u, r2 = R * R - x * x - y * y;
        let ch = ' ';
        if (r2 > 0) {
          let z = sq(r2);
          for (let n = 0; n < 34 && z > -sq(r2); n++) {
            const [px, py, pz] = rot(x, y, z), d = sdf(px, py, pz);
            if (d < .008) {
              const e = .015, k0 = sdf(px + e, py - e, pz - e), k1 = sdf(px - e, py - e, pz + e), k2 = sdf(px - e, py + e, pz - e), k3 = sdf(px + e, py + e, pz + e);
              let nx = k0 - k1 - k2 + k3, ny = -k0 - k1 + k2 + k3, nz = -k0 + k1 - k2 + k3;
              const m = sq(nx * nx + ny * ny + nz * nz) || 1; nx /= m; ny /= m; nz /= m;
              let ao = 0;
              for (let q = 1; q <= 2; q++) { const h = q * .09; ao += (h - sdf(px + nx * h, py + ny * h, pz + nz * h)) / q; }
              const dif = mx(0, nx * L[0] + ny * L[1] + nz * L[2]), rimL = Math.pow(1 - mx(0, nx * V[0] + ny * V[1] + nz * V[2]), 3);
              let v = (.1 + .62 * dif + .22 * rimL) * mx(.05, 1 - ao * 2.2);
              v += (bayer[(i & 3) + ((j & 3) << 2)] / 16 - .5) * .05;
              ch = ramp[mx(1, mn(ramp.length - 1, Math.floor(v * ramp.length)))];
              break;
            }
            z -= d * .85;
          }
        }
        out += ch;
      }
      out += '\n';
    }
    pre.textContent = out;
  }
  function size() {
    const fs = mx(6, mn(innerHeight * .93 / H, innerWidth * .98 / (W * .6), 15));
    document.getElementById('skull').style.setProperty('--sk', fs + 'px');
  }
  size(); addEventListener('resize', size);
  let t = .8, last = 0;
  frame(t);
  if (reduced.matches) return;
  function loop(now) {
    if (now - last > 80 && !document.hidden && !document.body.classList.contains('motion-paused')) {
      const t0 = performance.now(); t += mn(now - last, 200) / 1000; last = now; frame(t);
      ms = ms * .8 + (performance.now() - t0) * .2;
      if (ms > 55 && W > 64) { W = Math.round(W * .88); H = Math.round(H * .88); size(); ms = 0; }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
