// ===== UTILITY: Is mobile check =====
function isMobile() {
  return window.innerWidth <= 768;
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
}, { passive: true });

// ===== MOBILE NAV =====
const hamburger = document.getElementById('navHamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMobile.classList.toggle('active');
  document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
});

// Close mobile nav on link click
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMobile.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close mobile nav on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMobile.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMobile.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Close mobile nav if open
      if (navMobile.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links .nav-link:not(.nav-cta)');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Throttled scroll for performance
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      updateActiveLink();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -30px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== FAQ TOGGLE =====
function toggleFaq(element) {
  const faqItem = element.closest('.faq-item');
  const isActive = faqItem.classList.contains('active');

  // Close all other FAQs
  document.querySelectorAll('.faq-item.active').forEach(item => {
    item.classList.remove('active');
  });

  // Toggle current
  if (!isActive) {
    faqItem.classList.add('active');
  }
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}, { passive: true });

// ===== MOBILE CTA BAR =====
const mobileCta = document.getElementById('mobileCta');

if (mobileCta) {
  window.addEventListener('scroll', () => {
    // Show mobile CTA after scrolling past the hero
    if (window.pageYOffset > 600) {
      mobileCta.classList.add('visible');
    } else {
      mobileCta.classList.remove('visible');
    }
  }, { passive: true });
}

// ===== HERO PARTICLES =====
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  // Fewer particles on mobile for performance
  const particleCount = isMobile() ? 12 : 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    const opacity = Math.random() * 0.5 + 0.2;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${opacity};
    `;

    // Alternate colors
    if (Math.random() > 0.5) {
      particle.style.background = 'rgba(10, 47, 255, 0.4)';
    }

    container.appendChild(particle);
  }
}

createParticles();

// ===== CONTACT FORM =====
function handleContactForm(event) {
  event.preventDefault();

  const form = event.target;
  const btn = form.querySelector('.btn');
  const originalHTML = btn.innerHTML;

  // Disable button to prevent double submit
  btn.disabled = true;
  btn.innerHTML = '✓ Mensagem Enviada!';
  btn.style.background = 'linear-gradient(135deg, #00D4AA 0%, #00B894 100%)';

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 3000);
}

// ===== PHONE MASK =====
const phoneInput = document.getElementById('contact-phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 0) {
      value = '(' + value;
    }
    if (value.length > 3) {
      value = value.slice(0, 3) + ') ' + value.slice(3);
    }
    if (value.length > 10) {
      value = value.slice(0, 10) + '-' + value.slice(10);
    }

    e.target.value = value;
  });
}

// ===== PARALLAX EFFECT on Scroll (desktop only) =====
if (!isMobile()) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    const heroImage = document.querySelector('.hero-image-wrapper');
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.05}px)`;
    }

    const floatCards = document.querySelectorAll('.hero-float-card');
    floatCards.forEach((card, index) => {
      const speed = index === 0 ? 0.08 : -0.06;
      card.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }, { passive: true });
}

// ===== HANDLE RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Close mobile nav if window gets wider
    if (window.innerWidth > 768 && navMobile.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMobile.classList.remove('active');
      document.body.style.overflow = '';
    }
  }, 250);
});

// ===== PRELOAD IMAGES =====
function preloadImages() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  });
}

document.addEventListener('DOMContentLoaded', preloadImages);

console.log('🎓 Huby Cursos - Site carregado com sucesso!');
