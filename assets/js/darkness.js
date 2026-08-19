const overlay = document.querySelector('.darkness-overlay');
const toggle = document.querySelector('.darkness-toggle');
const icon = toggle.querySelector('.material-symbols-outlined');

const startX = window.innerWidth + 20;
const startY = -20;
let targetX = startX;
let targetY = startY;
let currentX = targetX;
let currentY = targetY;

const EASE = 0.3; // lower: smoother, higher: snappier
const EPSILON = 0.5; // px distance below which we just stop animating

let rafId = null;

function animate() {
  currentX += (targetX - currentX) * EASE;
  currentY += (targetY - currentY) * EASE;

  overlay.style.setProperty('--x', `${currentX}px`);
  overlay.style.setProperty('--y', `${currentY}px`);

  const dist = Math.hypot(targetX - currentX, targetY - currentY);
  if (dist > EPSILON) {
    rafId = requestAnimationFrame(animate);
  } else {
    rafId = null; // stop the loop, nothing left to animate
  }
}

function setTarget(x, y) {
  targetX = x;
  targetY = y;
  if (rafId === null) rafId = requestAnimationFrame(animate);
}

document.addEventListener('mousemove', (e) => {
  if (overlay.classList.contains('active')) setTarget(e.clientX, e.clientY);
});

// Mobile: last tap/click location works identically
document.addEventListener('click', (e) => {
  if (overlay.classList.contains('active')) setTarget(e.clientX, e.clientY);
});
// or 'touchstart' if you want it to react before the click fires

toggle.addEventListener('click', () => {
  const active = overlay.classList.toggle('active');
  toggle.setAttribute('aria-pressed', String(active));
  toggle.setAttribute('aria-label', active ? 'Disable dark mode' : 'Enable dark mode');
  icon.textContent = active ? 'light_mode' : 'dark_mode';
  currentX = startX;
  currentY = startY;
});