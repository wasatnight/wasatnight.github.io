(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const cards = [...document.querySelectorAll('[data-project-demo]')].map(element => ({
    element, image: element.querySelector('img'), button: element.querySelector('button'),
    label: element.querySelector('[data-demo-label]'), icon: element.querySelector('.demo-toggle-icon'),
    visible: false, paused: reduced.matches
  }));
  function sync() {
    const globalPause = root.classList.contains('cinema-paused');
    for (const card of cards) {
      const playing = card.visible && !card.paused && !globalPause && !document.hidden;
      const source = playing ? card.image.dataset.demoSrc : card.image.dataset.demoPoster;
      if (card.image.getAttribute('src') !== source) card.image.src = source;
      const stopped = card.paused || globalPause;
      card.button.disabled = reduced.matches;
      card.button.setAttribute('aria-pressed', String(stopped));
      card.label.textContent = root.lang === 'es' ? (stopped ? 'Reproducir demo' : 'Pausar demo') : (stopped ? 'Play demo' : 'Pause demo');
      if (reduced.matches) card.label.textContent = root.lang === 'es' ? 'Movimiento reducido' : 'Reduced motion';
      card.icon.textContent = stopped ? '▷' : 'Ⅱ';
    }
  }
  cards.forEach(card => card.button.addEventListener('click', () => {
    const stopped = card.paused || root.classList.contains('cinema-paused');
    if (root.classList.contains('cinema-paused')) document.querySelector('[data-cinema-motion]')?.click();
    card.paused = !stopped;
    sync();
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { cards.find(card => card.element === entry.target).visible = entry.isIntersecting; });
      sync();
    }, { threshold: .1 });
    cards.forEach(card => observer.observe(card.element));
  } else cards.forEach(card => { card.visible = true; });
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['lang','class'] });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', () => { cards.forEach(card => { card.paused = reduced.matches; }); sync(); });
  sync();
})();
