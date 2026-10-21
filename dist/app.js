const isSlovak = document.documentElement.lang === 'sk';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? (isSlovak ? 'Zavrieť menu' : 'Close menu') : (isSlovak ? 'Otvoriť menu' : 'Open menu')); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', isSlovak ? 'Otvoriť menu' : 'Open menu'); nav.classList.remove('open'); }));
const tuning = isSlovak ? {
 road: ['KAŽDÝ DEŇ. VIAC CHARAKTERU.', 'Preberieme plynulejšiu odozvu a využiteľný krútiaci moment s ohľadom na vaše komponenty a každodennú jazdu.'],
 sport: ['ŠPORTOVEJŠÍ ZÁŽITOK Z JAZDY.', 'Preberieme zladenie softvéru a komponentov. Pri návrhu zohľadníme stav motora, chladenie aj limity pohonného ústrojenstva.'],
 track: ['PRIPRAVENÉ NA OKRUH.', 'Naplánujeme okruhové nastavenie pre dlhodobú záťaž, predvídateľnú odozvu a vaše pretekárske ciele. Vhodnosť posúdime individuálne.']
} : {
  road: ['EVERYDAY DRIVE. EXTRA CHARACTER.', 'Discuss smoother response and usable torque, with your existing hardware and daily driving in mind.'],
  sport: ['A MORE FOCUSED DRIVE.', 'Explore a coordinated tuning and hardware plan. Engine condition, cooling and drivetrain limits guide the specification.'],
  track: ['BUILT AROUND THE SESSION.', 'Plan a dedicated track setup around sustained load, predictable response and your motorsport requirements. Suitability is assessed per vehicle.']
};
const tabs = [...document.querySelectorAll('[data-tune]')];
function selectTune(tab) { tabs.forEach(t => {t.setAttribute('aria-selected', String(t === tab)); t.tabIndex = t === tab ? 0 : -1;}); const panel = document.querySelector('#tuning-panel'); panel.setAttribute('aria-labelledby', tab.id); panel.querySelector('h3').textContent = tuning[tab.dataset.tune][0]; panel.querySelector('p').textContent = tuning[tab.dataset.tune][1]; }
tabs.forEach((tab, i) => {tab.addEventListener('click', () => selectTune(tab)); tab.addEventListener('keydown', e => {let next; if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length]; if (e.key === 'ArrowLeft') next = tabs[(i + tabs.length - 1) % tabs.length]; if (e.key === 'Home') next = tabs[0]; if (e.key === 'End') next = tabs[tabs.length - 1]; if (next) {e.preventDefault(); selectTune(next); next.focus();}});});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {document.querySelectorAll('[data-filter]').forEach(b => {b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button));}); document.querySelectorAll('[data-category]').forEach(card => {card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;});}));
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {document.querySelector('#service-select').value = button.dataset.service; if (button.tagName === 'BUTTON') {document.querySelector('#contact').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); document.querySelector('#service-select').focus({preventScroll:true});}}));
 document.querySelector('#enquiry-form').addEventListener('submit', event => {
 event.preventDefault();
 const data = new FormData(event.currentTarget);
 const service = document.querySelector('#service-select').selectedOptions[0].textContent;
 const subject = (isSlovak ? 'FedoRacing – dopyt: ' : 'FedoRacing enquiry: ') + service;
 const body = isSlovak
 ? `Dobrý deň, FedoRacing,\n\nmám záujem o: ${service}\n\n${data.get('message')}\n\nMeno: ${data.get('name')}\nE-mail: ${data.get('email')}`
 : `Hello FedoRacing,\n\nI'm interested in: ${service}\n\n${data.get('message')}\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}`;
 window.location.href = `mailto:FedoRacing@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 document.querySelector('#form-status').textContent = isSlovak
 ? 'Správa je pripravená vo vašej e-mailovej aplikácii. Odošlite ju odtiaľ. Ak sa aplikácia neotvorí, napíšte na FedoRacing@gmail.com alebo cez WhatsApp.'
 : 'Your enquiry is ready in your email app. Please press Send there. If no email app opens, contact FedoRacing@gmail.com or use WhatsApp.';
 });
document.querySelector('#year').textContent = new Date().getFullYear();
