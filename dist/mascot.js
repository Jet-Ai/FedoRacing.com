(() => {
  if (document.body.dataset.page === 'admin') return;
  const en = document.documentElement.lang === 'en';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let saved;
  try { saved = localStorage.getItem('fedoracing-crab'); } catch {}
  let enabled = saved !== 'off' && !motion.matches;
  const crab = document.createElement('div');
  crab.className = 'drift-crab';
  crab.setAttribute('aria-hidden', 'true');
  crab.innerHTML = '<div class="crab-smoke"><i></i><i></i><i></i></div><img src="crab-mascot.png" alt="" width="1254" height="1254">';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'crab-toggle';
  document.body.append(crab, toggle);
  const pit = document.createElement('span');
  pit.className = 'crab-pit';
  pit.setAttribute('aria-hidden', 'true');
  pit.innerHTML = '<span>PIT</span>';
  document.querySelector('.header .logo')?.after(pit);
  function positionPit() {
    const box = pit.getBoundingClientRect();
    const size = crab.offsetWidth || (innerWidth <= 600 ? 88 : 132);
    crab.style.setProperty('--pit-x', `${box.left + box.width / 2 - size / 2}px`);
    crab.style.setProperty('--pit-y', `${box.top + box.height / 2 - size / 2 - 3}px`);
    crab.style.setProperty('--pit-scale', String(box.width / size));
  }
  new ResizeObserver(positionPit).observe(document.querySelector('.header'));
  window.addEventListener('scroll', positionPit, {passive:true});
  window.addEventListener('resize', positionPit);
  function update() {
    crab.hidden = !enabled;
    pit.hidden = !enabled;
    document.querySelector('.header').classList.toggle('has-crab-pit', enabled);
    positionPit();
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.textContent = (en ? 'CRAB' : 'KRAB') + ' · ' + (enabled ? (en ? 'ON' : 'ZAP') : (en ? 'OFF' : 'VYP'));
    toggle.setAttribute('aria-label', enabled ? (en ? 'Pause drifting crab' : 'Zastaviť driftujúceho kraba') : (en ? 'Start drifting crab animation' : 'Spustiť animáciu driftujúceho kraba'));
  }
  toggle.addEventListener('click', () => {
    enabled = !enabled;
    try { localStorage.setItem('fedoracing-crab', enabled ? 'on' : 'off'); } catch {}
    update();
  });
  function pause() {
    const editing = document.activeElement?.matches('input, textarea, select, [contenteditable="true"]');
    const blocked = document.hidden || editing || !!document.querySelector('dialog[open]') || document.querySelector('#nav.open');
    crab.classList.toggle('crab-paused', !!blocked);
  }
  document.addEventListener('focusin', pause);
  document.addEventListener('focusout', () => requestAnimationFrame(pause));
  document.addEventListener('visibilitychange', pause);
  new MutationObserver(pause).observe(document.body, {subtree:true, attributes:true, attributeFilter:['open']});
  new MutationObserver(pause).observe(document.querySelector('#nav'), {attributes:true, attributeFilter:['class']});
  motion.addEventListener('change', () => { if (motion.matches) { enabled = false; update(); } });
  update();
})();
