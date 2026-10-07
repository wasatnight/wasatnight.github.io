(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const langButtons = document.querySelectorAll('[data-lang]');
  const translatable = document.querySelectorAll('[data-en][data-es]');
  const revealItems = document.querySelectorAll('.reveal');
  const cursorGlow = document.querySelector('.cursor-glow');
  const parallaxItem = document.querySelector('[data-parallax]');
  const printButton = document.querySelector('[data-print]');
  const copyEmailButton = document.querySelector('[data-copy-email]');
  const copyLabel = document.querySelector('[data-copy-label]');
  const copyStatus = document.querySelector('[data-copy-status]');
  const manualCopy = document.querySelector('[data-manual-copy]');
  let copyFeedback = 'idle';
  let copyResetTimer;

  const syncCopyFeedback = () => {
    if (!copyEmailButton || !copyLabel || !copyStatus) return;
    const spanish = root.lang === 'es';
    const copied = copyFeedback === 'copied';
    copyEmailButton.dataset.copied = String(copied);
    copyLabel.textContent = copied
      ? (spanish ? '¡Copiado!' : 'Copied!')
      : (spanish ? 'Copiar correo' : 'Copy email');
    copyStatus.textContent = copied
      ? (spanish ? 'Correo copiado al portapapeles.' : 'Email copied to your clipboard.')
      : copyFeedback === 'manual'
        ? (spanish ? 'Puedes copiar el correo desde el campo inferior.' : 'You can copy the address from the field below.')
        : '';
  };

  const legacyCopy = (value) => {
    const previousFocus = document.activeElement;
    const buffer = document.createElement('textarea');
    buffer.value = value;
    buffer.readOnly = true;
    buffer.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;';
    document.body.appendChild(buffer);
    buffer.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch (_) { /* Offer manual selection below. */ }
    buffer.remove();
    previousFocus?.focus({ preventScroll: true });
    return copied;
  };

  copyEmailButton?.addEventListener('click', async () => {
    const email = copyEmailButton.dataset.copyEmail;
    clearTimeout(copyResetTimer);
    copyEmailButton.disabled = true;
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        copied = true;
      }
    } catch (_) { /* Local files or browser permissions may require the fallback. */ }
    if (!copied) copied = legacyCopy(email);
    copyFeedback = copied ? 'copied' : 'manual';
    if (manualCopy) manualCopy.hidden = copied;
    syncCopyFeedback();
    copyEmailButton.disabled = false;

    if (copied) {
      copyResetTimer = setTimeout(() => { copyFeedback = 'idle'; syncCopyFeedback(); }, 3500);
    } else {
      const input = manualCopy?.querySelector('input');
      input?.focus({ preventScroll: true });
      input?.select();
    }
  });
  printButton?.addEventListener('click', () => window.print());

  const setLanguage = (language) => {
    const lang = language === 'es' ? 'es' : 'en';
    root.lang = lang;

    translatable.forEach((element) => {
      element.textContent = element.dataset[lang];
    });

    langButtons.forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    const title = lang === 'es'
      ? 'Ivan Solano Diaz — Desarrollador de Software y Diseñador Digital'
      : 'Ivan Solano Diaz — Software Developer & Digital Designer';
    document.title = title;
    syncCopyFeedback();

    try { localStorage.setItem('ivan-portfolio-language', lang); } catch (_) { /* Storage is optional. */ }
  };

  langButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));

  let savedLanguage = 'en';
  try { savedLanguage = localStorage.getItem('ivan-portfolio-language') || 'en'; } catch (_) { /* Use default. */ }
  setLanguage(savedLanguage);

  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    nav.classList.toggle('is-open', opening);
    body.classList.toggle('menu-open', opening);
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);

    if (parallaxItem && window.innerWidth > 720 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const shift = Math.min(window.scrollY * 0.055, 34);
      parallaxItem.style.translate = `0 ${shift}px`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    root.classList.add('js-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (event) => {
      cursorGlow.style.setProperty('--x', `${event.clientX}px`);
      cursorGlow.style.setProperty('--y', `${event.clientY}px`);
    }, { passive: true });
  }

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
