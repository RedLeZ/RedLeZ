// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Active link on scroll
const links = [...document.querySelectorAll('#site-nav a')].filter(a => a.getAttribute('href')?.startsWith('#'));
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
function onScroll() {
  const y = window.scrollY + 80;
  let activeId = '';
  for (const sec of sections) {
    if (sec.offsetTop <= y) activeId = '#' + sec.id;
  }
  for (const a of links) {
    if (a.getAttribute('href') === activeId) a.classList.add('active');
    else a.classList.remove('active');
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', () => {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  onScroll();
});
