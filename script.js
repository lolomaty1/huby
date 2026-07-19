// ===== NAVBAR =====
const topo = document.getElementById('topo');
window.addEventListener('scroll', () => {
  topo.classList.toggle('topo--fixo', window.pageYOffset > 60);
}, { passive: true });

// ===== MOBILE MENU =====
const hamburguer = document.getElementById('hamburguer');
const menuMobile = document.getElementById('menuMobile');

hamburguer.addEventListener('click', () => {
  hamburguer.classList.toggle('ativo');
  menuMobile.classList.toggle('ativo');
  document.body.style.overflow = menuMobile.classList.contains('ativo') ? 'hidden' : '';
});

menuMobile.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
  hamburguer.classList.remove('ativo');
  menuMobile.classList.remove('ativo');
  document.body.style.overflow = '';
}));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuMobile.classList.contains('ativo')) {
    hamburguer.classList.remove('ativo');
    menuMobile.classList.remove('ativo');
    document.body.style.overflow = '';
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - topo.offsetHeight - 16, behavior: 'smooth' });
      if (menuMobile.classList.contains('ativo')) {
        hamburguer.classList.remove('ativo');
        menuMobile.classList.remove('ativo');
        document.body.style.overflow = '';
      }
    }
  });
});

// ===== SCROLL REVEAL =====
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// ===== FAQ =====
function abrirFaq(el) {
  const item = el.closest('.faq__item');
  const aberto = item.classList.contains('aberto');
  document.querySelectorAll('.faq__item.aberto').forEach(i => i.classList.remove('aberto'));
  if (!aberto) item.classList.add('aberto');
}

// ===== SCROLL TOP =====
const voltarTopo = document.getElementById('voltarTopo');
window.addEventListener('scroll', () => {
  voltarTopo.classList.toggle('visivel', window.pageYOffset > 500);
}, { passive: true });

// ===== MOBILE CTA BAR =====
const barraMobile = document.getElementById('barraMobile');
if (barraMobile) {
  window.addEventListener('scroll', () => {
    barraMobile.classList.toggle('visivel', window.pageYOffset > 500);
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

// ===== FORM =====
function enviarForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.botao');
  const html = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '✓ Mensagem Enviada!';
  btn.style.background = '#25D366';
  setTimeout(() => { btn.innerHTML = html; btn.style.background = ''; btn.disabled = false; e.target.reset(); }, 3000);
}

// ===== RESIZE =====
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && menuMobile.classList.contains('ativo')) {
    hamburguer.classList.remove('ativo');
    menuMobile.classList.remove('ativo');
    document.body.style.overflow = '';
  }
});

console.log('🎓 Huby Cursos — Site carregado!');
