const overlay = document.querySelector('.darkness-overlay');
const toggle = document.querySelector('.darkness-toggle');
const icon = toggle.querySelector('.material-symbols-outlined');

document.addEventListener('mousemove', (e) => {
  overlay.style.setProperty('--x', `${e.clientX}px`);
  overlay.style.setProperty('--y', `${e.clientY}px`);
});

toggle.addEventListener('click', () => {
  const active = overlay.classList.toggle('active');
  toggle.setAttribute('aria-pressed', String(active));
  toggle.setAttribute('aria-label', active ? 'Disable dark mode' : 'Enable dark mode');
  icon.textContent = active ? 'light_mode' : 'dark_mode';
});
