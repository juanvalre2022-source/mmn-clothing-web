/* =========================================================
   CONFIGURACIÓN — edita solo esta parte para actualizar la web
   ========================================================= */

// 1) Número de WhatsApp Business (SOLO NÚMEROS, con indicativo de país, sin +, sin espacios).
//    Ejemplo Colombia: "573001234567"
//    ⚠️ Este es un número de EJEMPLO. Reemplázalo apenas tengas el definitivo.
const WHATSAPP_NUMBER = "573115342412";

// 2) Catálogo de productos. Duplica un bloque {} para agregar un producto nuevo.
//    - id: identificador único, sin espacios (ej: "cam-06")
//    - category: "camiseta", "buso" o "pantaloneta"
//    - image: ruta a la foto real (ej: "images/camiseta-01.jpg"). Si la dejas vacía "",
//      se muestra un cuadro de marcador de posición (placeholder).
const PRODUCTS = [
  { id: "cam-01", name: "Camiseta Esencia", category: "camiseta", price: 65000, image: "", tag: "Nuevo" },
  { id: "cam-02", name: "Camiseta Raíces", category: "camiseta", price: 65000, image: "", tag: "" },
  { id: "cam-03", name: "Camiseta Nocturna", category: "camiseta", price: 70000, image: "", tag: "" },
  { id: "cam-04", name: "Camiseta Aurora", category: "camiseta", price: 68000, image: "", tag: "" },
  { id: "cam-05", name: "Camiseta Origen", category: "camiseta", price: 65000, image: "", tag: "" },

  { id: "bus-01", name: "Buso Horizonte", category: "buso", price: 125000, image: "", tag: "Nuevo" },
  { id: "bus-02", name: "Buso Contraste", category: "buso", price: 130000, image: "", tag: "" },
  { id: "bus-03", name: "Buso Minimal", category: "buso", price: 120000, image: "", tag: "" },
  { id: "bus-04", name: "Buso Eclipse", category: "buso", price: 135000, image: "", tag: "" },

  { id: "pan-01", name: "Pantaloneta Urbana", category: "pantaloneta", price: 85000, image: "", tag: "Nuevo" },
  { id: "pan-02", name: "Pantaloneta Esencia", category: "pantaloneta", price: 85000, image: "", tag: "" },
  { id: "pan-03", name: "Pantaloneta Contraste", category: "pantaloneta", price: 90000, image: "", tag: "" }
];

const CATEGORY_LABELS = {
  camiseta: "Camisetas",
  buso: "Busos",
  pantaloneta: "Pantalonetas"
};

const TALLAS = ["S", "M", "L", "XL"];

/* =========================================================
   HELPERS COMPARTIDOS — no es necesario editar debajo de esta línea
   ========================================================= */

function formatCOP(value) {
  return value.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message || "Hola MMN Clothing, quiero más información");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function productsByCategory(category, limit) {
  const items = PRODUCTS.filter(p => p.category === category);
  return limit ? items.slice(0, limit) : items;
}

// Crea el elemento DOM de una tarjeta de producto (usado en previews y catálogo)
function createProductCardElement(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.id = product.id;

  const imageHtml = product.image
    ? `<img src="${product.image}" alt="${product.name}">`
    : `<div class="product-card__placeholder">Foto próximamente<br>${product.name}</div>`;

  const tagHtml = product.tag
    ? `<span class="product-card__tag">${product.tag}</span>`
    : "";

  const tallaOptions = TALLAS.map(t => `<option value="${t}">${t}</option>`).join("");

  card.innerHTML = `
    <div class="product-card__img">
      ${tagHtml}
      ${imageHtml}
    </div>
    <div class="product-card__body">
      <span class="product-card__cat">${CATEGORY_LABELS[product.category]}</span>
      <span class="product-card__name">${product.name}</span>
      <span class="product-card__price">${formatCOP(product.price)}</span>
      <div class="product-card__row">
        <select class="product-card__talla" aria-label="Talla">${tallaOptions}</select>
        <button class="btn btn--primary btn--sm product-card__add">Agregar</button>
      </div>
    </div>
  `;

  card.querySelector(".product-card__add").addEventListener("click", () => {
    const talla = card.querySelector(".product-card__talla").value;
    addToCart(product, talla, 1);
  });

  return card;
}

// Crea una diapositiva del slider: solo imagen, limpia, sin precio ni botón.
// Al hacer clic lleva al catálogo y muestra el detalle de ese producto.
function createSlideElement(product) {
  const slide = document.createElement("a");
  slide.className = "slide-card";
  slide.href = `catalogo.html?product=${product.id}`;

  const imageHtml = product.image
    ? `<img src="${product.image}" alt="${product.name}">`
    : `<div class="product-card__placeholder">Foto próximamente<br>${product.name}</div>`;

  const tagHtml = product.tag
    ? `<span class="product-card__tag">${product.tag}</span>`
    : "";

  slide.innerHTML = `
    <div class="slide-card__img">
      ${tagHtml}
      ${imageHtml}
      <div class="slide-card__overlay">
        <span>${product.name}</span>
      </div>
    </div>
  `;

  return slide;
}
