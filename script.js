// PRELOADER
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 1800);
});

// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
if (cursor && window.innerWidth > 768) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX - 11 + 'px';
    cursor.style.top = e.clientY - 11 + 'px';
  });
  document.querySelectorAll('a, button, .video-card, .collab-card, .stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// NAVBAR
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 80));

// MOBILE MENU
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// FALLING PETALS
const petalsContainer = document.getElementById('petals');
if (petalsContainer) {
  const petalEmojis = ['🌸', '🩷', '✿', '❀', '🦋', '✨'];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    p.style.fontSize = (0.6 + Math.random() * 0.8) + 'rem';
    petalsContainer.appendChild(p);
  }
}

// ANIMATED COUNTERS
function animateCounters() {
  document.querySelectorAll('.counter').forEach(counter => {
    if (counter.dataset.animated) return;
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      counter.textContent = target >= 1000 ? current.toLocaleString() : current;
      if (progress < 1) requestAnimationFrame(update);
      else { counter.textContent = target >= 1000 ? target.toLocaleString() : target; counter.dataset.animated = 'true'; }
    }
    requestAnimationFrame(update);
  });
}

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.closest('.stats')) animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

// PARALLAX
window.addEventListener('scroll', () => {
  const bg = document.querySelector('.hero-bg img');
  if (bg && window.scrollY < window.innerHeight) bg.style.transform = `translateY(${window.scrollY * 0.25}px) scale(1.1)`;
});
