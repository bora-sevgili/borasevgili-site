const menu = document.getElementById('menu');
const toggle = document.querySelector('.menu-toggle');
const mobile = matchMedia('(max-width: 760px)');
const setMenu = (open) => { menu.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); };
const syncMenu = () => { toggle.hidden = !mobile.matches; setMenu(!mobile.matches); };
toggle.addEventListener('click', () => setMenu(menu.hidden));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobile.matches && !menu.hidden) { setMenu(false); toggle.focus(); }
});
mobile.addEventListener('change', syncMenu);
syncMenu();

const motion = document.getElementById('motion-toggle');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
function syncMotion(paused) {
  document.body.classList.toggle('motion-paused', paused || reduced.matches);
  motion.setAttribute('aria-pressed', String(paused));
  motion.textContent = paused ? 'Play motion' : 'Pause motion';
}
let paused = false;
motion.hidden = reduced.matches;
motion.addEventListener('click', () => { paused = !paused; syncMotion(paused); });
syncMotion(false);
