// ====== Dados (Arrays + Objetos) ======
const photos = [
  { src: "images/aaa.jpg",          nome: "Cataratas",     camera: "iPhone 16",     lente: "ISO 200 f/4.0 1/60", local: "Foz do Iguaçu", descricao: "Spray e arco-íris no final da tarde." },
  { src: "images/P1080257.JPG",     nome: "Passarela",      camera: "DMC FZ-60",     lente: "ISO 100 f/2.8 1/90", local: "PTI/UNIOESTE",  descricao: "Turistas na passarela em contraluz." },
  { src: "images/P1080268.JPG",     nome: "Poente Urbano",  camera: "DMC FZ-60",     lente: "ISO 100 f/4.0 1/125",local: "Recife",       descricao: "Céu em degradê e silhuetas." },
  { src: "images/P1080328.JPG",     nome: "Verde Profundo", camera: "DMC FZ-60",     lente: "ISO 160 f/5.6 1/80", local: "Parque",       descricao: "Texturas de folhas após a chuva." },
  { src: "images/P1080333.JPG",     nome: "Mirante",        camera: "DMC FZ-60",     lente: "ISO 125 f/3.2 1/100",local: "Foz",          descricao: "Vista ampla com neblina leve." },
  { src: "images/P1080350.JPG",     nome: "Orvalho",        camera: "DMC FZ-60",     lente: "ISO 200 f/2.8 1/90", local: "Jardim",       descricao: "Gotas sobre pétalas." },
  { src: "images/P1080398.JPG",     nome: "Ponte",          camera: "DMC FZ-60",     lente: "ISO 100 f/4.5 1/160",local: "Fronteira",    descricao: "Linhas e simetria." },
  { src: "images/P1080432.JPG",     nome: "Avenida",        camera: "DMC FZ-60",     lente: "ISO 200 f/4.0 1/60", local: "João Pessoa",  descricao: "Movimento e luzes." },
  { src: "images/P1080443.JPG",     nome: "Areia Fina",     camera: "DMC FZ-60",     lente: "ISO 100 f/8 1/200",  local: "Praia",        descricao: "Texturas e padrões." },
  { src: "images/P1080723.JPG",     nome: "Barco",          camera: "DMC FZ-60",     lente: "ISO 100 f/5.6 1/250",local: "Cabedelo",     descricao: "Barco repousando na maré baixa." },
  { src: "images/P1080778.JPG",     nome: "Luar",           camera: "DMC FZ-60",     lente: "ISO 400 f/2.8 1/30", local: "Noite",        descricao: "Reflexos e sombras." }
];

// ====== Utilidades (três formas de função) ======
// 1) Function Declaration
function el(tag, className, attrs = {}) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

// 2) Function Expression
const formatMeta = function (p) {
  return `${p.camera} • ${p.lente} • ${p.local}`;
};

// 3) Arrow Function
const includesI = (text, query) => text.toLowerCase().includes(query.toLowerCase());

// ====== Renderização da Galeria (evento de click + teclado) ======
const galeria = document.getElementById("galeria");
const filtro = document.getElementById("filtro");

function renderGaleria(lista) {
  galeria.innerHTML = "";
  lista.forEach((p, idx) => {
    // Coluna Bootstrap
    const col = el("div", "col-12 col-sm-6 col-lg-4");

    // Card Bootstrap
    const card = el("div", "card photo-card h-100");
    const img = el("img", "card-img-top foto", { src: p.src, alt: p.nome });
    const body = el("div", "card-body");
    const h = el("h5", "card-title mb-1");
    h.textContent = p.nome;
    const small = el("small", "text-muted");
    small.textContent = formatMeta(p);

    body.append(h, small);
    card.append(img, body);
    col.append(card);

    // Evento de mouse: click abre modal com detalhes
    img.addEventListener("click", () => abrirModal(p));
    galeria.append(col);
  });
}

function abrirModal(p) {
  document.getElementById("fotoTitulo").textContent = p.nome;
  document.getElementById("fotoModalImg").src = p.src;
  document.getElementById("fotoCamera").textContent = p.camera;
  document.getElementById("fotoLente").textContent = p.lente;
  document.getElementById("fotoLocal").textContent = p.local;
  document.getElementById("fotoDesc").textContent = p.descricao;

  const modal = new bootstrap.Modal(document.getElementById("fotoModal"));
  modal.show();
}

// Evento de teclado (input): filtra por nome/local/descrição
if (filtro) {
  filtro.addEventListener("input", (e) => {
    const q = e.target.value.trim();
    const filtrados = photos.filter(p =>
      includesI(p.nome, q) || includesI(p.local, q) || includesI(p.descricao, q)
    );
    renderGaleria(filtrados);
  });
}

// ====== Formulário Contato (evento de submit + validação Bootstrap) ======
const form = document.getElementById("contatoForm");
if (form) {
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    // Validação Bootstrap
    form.classList.add("was-validated");
    if (!form.checkValidity()) return;

    // Exibe toast de sucesso
    const toastEl = document.getElementById("toastOk");
    if (toastEl) {
      const t = new bootstrap.Toast(toastEl);
      t.show();
    }

    // Limpa form (exemplo)
    setTimeout(() => {
      form.reset();
      form.classList.remove("was-validated");
    }, 800);
  });
}

// ====== Botão voltar ao topo (scroll + position: fixed) ======
const btnTop = document.getElementById("btnTop");
if (btnTop) {
  btnTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    btnTop.style.display = window.scrollY > 300 ? "inline-block" : "none";
  });
}

// ====== Inicialização ======
document.addEventListener("DOMContentLoaded", () => {
  if (galeria) renderGaleria(photos);
});
