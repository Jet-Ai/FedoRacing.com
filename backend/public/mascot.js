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
  function update() {
    crab.hidden = !enabled;
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
  motion.addEventListener('change', () => { if (motion.matches) { enabled = false; update(); } });
  update();
})();
