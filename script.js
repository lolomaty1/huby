// ===== NAVBAR =====
const topo = document.getElementById('topo');
if (topo) {
  window.addEventListener('scroll', () => {
    // scrollY é a propriedade padrão moderna recomendada (substituindo pageYOffset)
    topo.classList.toggle('topo--fixo', window.scrollY > 60);
  }, { passive: true });
}

// ===== MOBILE MENU =====
const hamburguer = document.getElementById('hamburguer');
const menuMobile = document.getElementById('menuMobile');

if (hamburguer && menuMobile) {
  hamburguer.addEventListener('click', () => {
    hamburguer.classList.toggle('ativo');
    menuMobile.classList.toggle('ativo');
    document.body.style.overflow = menuMobile.classList.contains('ativo') ? 'hidden' : '';
  });

  menuMobile.querySelectorAll('a').forEach(l => {
    l.addEventListener('click', () => {
      hamburguer.classList.remove('ativo');
      menuMobile.classList.remove('ativo');
      document.body.style.overflow = '';
    });
  });
}

// ===== UNIFIED ESCAPE HANDLER =====
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  
  // Modal de vídeo tem prioridade de fechamento
  const videoModal = document.getElementById('videoModal');
  if (videoModal && videoModal.classList.contains('ativo')) {
    fecharVideo();
  } else if (menuMobile && menuMobile.classList.contains('ativo')) {
    if (hamburguer) hamburguer.classList.remove('ativo');
    menuMobile.classList.remove('ativo');
    document.body.style.overflow = '';
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return; // Comportamento padrão para logo/início
    
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      const offsetTop = el.offsetTop - (topo ? topo.offsetHeight : 0) - 16;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      
      if (menuMobile && menuMobile.classList.contains('ativo')) {
        if (hamburguer) hamburguer.classList.remove('ativo');
        menuMobile.classList.remove('ativo');
        document.body.style.overflow = '';
      }
    }
  });
});

// ===== SCROLL REVEAL (Intersection Observer) =====
const observerElements = document.querySelectorAll('.rv');
if (observerElements.length > 0) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  
  observerElements.forEach(el => obs.observe(el));
}

// ===== FAQ =====
function abrirFaq(el) {
  if (!el) return;
  const item = el.closest('.faq__item');
  if (!item) return;
  
  const aberto = item.classList.contains('aberto');
  document.querySelectorAll('.faq__item.aberto').forEach(i => i.classList.remove('aberto'));
  if (!aberto) item.classList.add('aberto');
}

// ===== SCROLL TOP BUTTON =====
const voltarTopo = document.getElementById('voltarTopo');
if (voltarTopo) {
  window.addEventListener('scroll', () => {
    voltarTopo.classList.toggle('visivel', window.scrollY > 500);
  }, { passive: true });
}

// ===== MOBILE CTA BAR =====
const barraMobile = document.getElementById('barraMobile');
if (barraMobile) {
  window.addEventListener('scroll', () => {
    barraMobile.classList.toggle('visivel', window.scrollY > 500);
  }, { passive: true });
}

// ===== PHONE MASK =====
const tel = document.getElementById('telefone');
if (tel) {
  tel.addEventListener('input', function (e) {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 0) v = '(' + v;
    if (v.length > 3) v = v.slice(0, 3) + ') ' + v.slice(3);
    if (v.length > 10) v = v.slice(0, 10) + '-' + v.slice(10);
    e.target.value = v;
  });
}

// ===== FORM CONTACT =====
function enviarForm(e) {
  e.preventDefault();
  if (!e.target) return;
  
  const btn = e.target.querySelector('.botao');
  if (!btn) return;
  
  const htmlOriginal = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '✓ Mensagem Enviada!';
  btn.style.background = '#25D366';
  
  setTimeout(() => {
    btn.innerHTML = htmlOriginal;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

// ===== RESIZE WINDOW =====
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && menuMobile && menuMobile.classList.contains('ativo')) {
    if (hamburguer) hamburguer.classList.remove('ativo');
    menuMobile.classList.remove('ativo');
    document.body.style.overflow = '';
  }
});

// ===== VIDEO MODAL CONTROLS =====
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const fecharModal = document.getElementById('fecharModal');

if (videoModal && videoFrame) {
  document.querySelectorAll('.video-card__thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const videoId = thumb.dataset.video;
      if (videoId) {
        videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        videoModal.classList.add('ativo');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

function fecharVideo() {
  if (videoModal && videoFrame) {
    videoModal.classList.remove('ativo');
    videoFrame.src = '';
    document.body.style.overflow = '';
  }
}

if (fecharModal) {
  fecharModal.addEventListener('click', fecharVideo);
}
if (videoModal) {
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) fecharVideo();
  });
}

console.log('🎓 Huby Cursos — Versão institucional finalizada com segurança!');
