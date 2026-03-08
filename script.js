/* ============================
   SCRIPT.JS — Site Maman
============================ */

// ── Page Transition ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  document.body.appendChild(overlay);

  // Exit animation on page load
  overlay.classList.add('exit');
  setTimeout(() => overlay.classList.remove('exit'), 400);

  // Intercept navigation
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http')) return;
      e.preventDefault();
      overlay.style.transformOrigin = 'left';
      overlay.classList.add('enter');
      setTimeout(() => { window.location.href = href; }, 420);
    });
  });
});

// ── Active Nav Link ───────────────────────────────────────
(function markActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'accueil.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });
})();

// ── Mobile Nav Toggle ─────────────────────────────────────
(function navToggle() {
  const btn = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    links.classList.toggle('open');
    btn.setAttribute('aria-expanded', links.classList.contains('open'));
  });
})();

// ── Scroll Reveal ─────────────────────────────────────────
(function scrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stagger cards
        if (entry.target.classList.contains('cards-grid')) {
          entry.target.querySelectorAll('.card').forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 120);
          });
        }
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.content-grid, .cards-grid, .card').forEach(el => {
    observer.observe(el);
  });
})();

// ── Floating Petals ───────────────────────────────────────
(function spawnPetals() {
  const petals = ['🌸', '🌷', '✿', '🌺', '💮', '🌼'];
  function createPetal() {
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = petals[Math.floor(Math.random() * petals.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-40px';
    const dur = 7 + Math.random() * 8;
    el.style.animationDuration = dur + 's';
    el.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    el.style.opacity = 0.5 + Math.random() * 0.5;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
  }
  setInterval(createPetal, 2200);
  // spawn a few immediately
  for (let i = 0; i < 3; i++) setTimeout(createPetal, i * 600);
})();

// ── Ambient Particles ─────────────────────────────────────
(function ambientParticles() {
  const colors = [
    'rgba(249,198,211,0.55)',
    'rgba(195,174,224,0.45)',
    'rgba(201,168,76,0.3)',
    'rgba(232,136,158,0.4)',
  ];
  const count = 12;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 5 + Math.random() * 20;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}vw;
      top: ${10 + Math.random() * 80}vh;
      animation-duration: ${4 + Math.random() * 6}s;
      animation-delay: -${Math.random() * 6}s;
    `;
    document.body.appendChild(p);
  }
})();

// ── Surprise Button ───────────────────────────────────────
const MESSAGES = [
  "Maman, tu es le premier amour de ma vie, et aucun mot ne pourra jamais décrire à quel point tu me manques chaque fois que tu n'es pas là. Tu es ma maison, mon refuge, ma lumière.",
  "Il y a dans tes yeux une douceur que je n'ai jamais retrouvée nulle part ailleurs. Merci d'avoir choisi, chaque jour, de m'aimer sans condition.",
  "Ta voix est la mélodie qui a bercé mes nuits d'enfance. Aujourd'hui encore, elle résonne dans mon cœur comme une promesse éternelle.",
  "Chaque ride sur ton visage est une histoire d'amour que tu as écrite pour moi. Je lis dans tes mains le courage, le sacrifice, et la tendresse.",
  "Si je devais recommencer ma vie, je te choisirais encore et encore comme ma maman. Tu es le plus beau cadeau que l'univers m'ait offert.",
  "Merci de m'avoir appris que la vraie force, c'est la douceur. Que le vrai courage, c'est d'aimer. Que le vrai bonheur, c'est toi.",
  "Tu m'as donné la vie, et depuis, tu ne cesses de me l'embellir. Je t'aime, Maman — aujourd'hui, demain, et pour toujours.",
];

let msgIndex = 0;

(function surpriseButton() {
  const btn = document.getElementById('btn-surprise');
  const box = document.getElementById('surprise-message');
  if (!btn || !box) return;

  btn.addEventListener('click', () => {
    box.style.display = 'block';
    box.style.opacity = '0';
    box.style.transform = 'translateY(20px)';
    box.innerHTML = '💌 &nbsp;' + MESSAGES[msgIndex % MESSAGES.length];
    msgIndex++;

    requestAnimationFrame(() => {
      box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      box.style.opacity = '1';
      box.style.transform = 'translateY(0)';
    });

    // Burst of petals
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const p = document.createElement('div');
        p.className = 'petal';
        p.textContent = ['❤️','💕','🌸','💗','✨'][Math.floor(Math.random() * 5)];
        p.style.left = (30 + Math.random() * 40) + 'vw';
        p.style.top  = '50vh';
        p.style.animationDuration = (2 + Math.random() * 2) + 's';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 4000);
      }, i * 80);
    }
  });
})();

// ── Typing effect for hero titles ────────────────────────
(function typeEffect() {
  const el = document.querySelector('.type-target');
  if (!el) return;
  const text = el.textContent;
  el.textContent = '';
  el.style.opacity = '1';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, 40);
    }
  };
  setTimeout(type, 600);
})();
