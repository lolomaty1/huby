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

// ===== INTERACTIVE PLANS SYSTEM =====
const planosDados = [
  {
    tag: "Ensino Fundamental I",
    titulo: "Ensino Fundamental — Séries Iniciais",
    sub: "Autorização CEE/MS. Indicado para quem precisa concluir a alfabetização e as séries iniciais (1º ao 5º ano).",
    preco: "79,00",
    parcelas: "Valor correspondente à parcela mensal de ensino",
    beneficios: [
      "✓ Diploma oficial autorizado pela SED/MS com validade nacional",
      "✓ Plataforma de estudos EAD ativa 24h por dia",
      "✓ Todo o material didático em PDF digital incluso",
      "✓ Provas presenciais agendadas no polo de apoio",
      "✓ Suporte e acompanhamento pedagógico via WhatsApp"
    ]
  },
  {
    tag: "Ensino Fundamental II",
    titulo: "Ensino Fundamental — Séries Finais",
    sub: "Autorização CEE/MS. Focado na conclusão acelerada do 6º ao 9º ano em ambiente virtual.",
    preco: "79,00",
    parcelas: "Valor correspondente à parcela mensal de ensino",
    beneficios: [
      "✓ Diploma oficial autorizado pela SED/MS com validade nacional",
      "✓ Estudo flexível pelo computador, tablet ou celular",
      "✓ Provas de conformidade obrigatórias aplicadas no polo",
      "✓ Sem cobranças de taxas de matrícula ou material",
      "✓ Grade curricular alinhada com as diretrizes do CEE"
    ]
  },
  {
    tag: "Ensino Médio Completo",
    titulo: "Ensino Médio Completo (1º ao 3º ano)",
    sub: "Autorização CEE/MS. Homologado para aprovação e ingresso em universidades e concursos públicos.",
    preco: "89,00",
    parcelas: "Valor correspondente à parcela mensal de ensino",
    beneficios: [
      "✓ Diploma oficial autorizado pela SED/MS com validade nacional",
      "✓ Registro formal de conclusão publicado em Diário Oficial",
      "✓ Parceria com a Unigran Educacional",
      "✓ Provas presenciais obrigatórias nos termos da LDB 9.394/96",
      "✓ Aproveitamento legal de disciplinas concluídas anteriormente"
    ]
  },
  {
    tag: "Fundamental + Médio",
    titulo: "Matrícula Integrada: Fundamental + Médio",
    sub: "Autorização CEE/MS. Formação básica integrada e acelerada para conclusão total dos estudos.",
    preco: "149,00",
    parcelas: "Custo-benefício otimizado para dupla certificação",
    beneficios: [
      "✓ Diplomas oficiais autorizados com validade nacional",
      "✓ Acesso unificado a todas as disciplinas da grade EAD",
      "✓ Isenção de taxa de material didático e suporte",
      "✓ Provas agendadas presencialmente no polo credenciado",
      "✓ Conclusão ágil respeitando o tempo de aprendizado do aluno"
    ]
  }
];

function mudarPlano(index, elemento) {
  const dados = planosDados[index];
  if (!dados) return;

  // Atualizar botões ativos
  document.querySelectorAll('.painel-planos__aba').forEach(btn => btn.classList.remove('ativa'));
  if (elemento) elemento.classList.add('ativa');

  // Selecionar elementos dos detalhes com efeito suave de fade
  const detalhes = document.getElementById('detalhesPlano');
  if (detalhes) {
    detalhes.style.opacity = '0.3';
    detalhes.style.transform = 'translateY(4px)';
    
    setTimeout(() => {
      document.getElementById('planoTag').innerText = dados.tag;
      document.getElementById('planoTitulo').innerText = dados.titulo;
      document.getElementById('planoSub').innerText = dados.sub;
      document.getElementById('planoPreco').innerText = dados.preco;
      document.getElementById('planoParcelas').innerText = dados.parcelas;

      // Limpar e reconstruir lista de benefícios
      const lista = document.getElementById('planoBeneficios');
      if (lista) {
        lista.innerHTML = dados.beneficios.map(b => `<li>${b}</li>`).join('');
      }

      detalhes.style.opacity = '1';
      detalhes.style.transform = 'translateY(0)';
    }, 180);
  }
}

// Inicializar com o Ensino Médio como padrão (index 2) no carregamento
window.addEventListener('DOMContentLoaded', () => {
  const abas = document.querySelectorAll('.painel-planos__aba');
  if (abas.length > 2) {
    mudarPlano(2, abas[2]);
  }
});

console.log('🎓 Huby Cursos — Versão institucional finalizada com segurança!');
