(() => {
  'use strict';
  const root = document.documentElement;
  const button = document.querySelector('[data-cinema-motion]');
  const label = document.querySelector('[data-cinema-motion-label]');
  const icon = document.querySelector('.cinema-motion-icon');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!button || !label || !icon) return;
  let paused = reducedMotion.matches;
  const scene = document.querySelector('.hero-photo--landscape');
  let scheduled = false;
  const updateScene = () => {
    scheduled = false;
    const shift = !paused && !reducedMotion.matches && innerWidth > 700
      ? Math.min(scrollY * .18, 120) : 0;
    scene?.style.setProperty('--scene-shift', `${shift}px`);
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateScene); }
  }, { passive: true });
  window.addEventListener('resize', updateScene, { passive: true });

  const sync = () => {
    root.classList.toggle('cinema-paused', paused);
    button.setAttribute('aria-pressed', String(paused));
    button.disabled = reducedMotion.matches;
    const english = reducedMotion.matches ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion';
    const spanish = reducedMotion.matches ? 'Movimiento reducido' : paused ? 'Reanudar movimiento' : 'Pausar movimiento';
    label.dataset.en = english;
    label.dataset.es = spanish;
    label.textContent = root.lang === 'es' ? spanish : english;
    icon.textContent = paused ? '▷' : 'Ⅱ';
    updateScene();
  };

  button.addEventListener('click', () => { paused = !paused; sync(); });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) paused = true; sync(); });
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['lang'] });
  sync();
})();
