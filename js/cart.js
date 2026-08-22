/* =========================================================
   CARRITO DE COMPRAS — lógica compartida entre index.html y catalogo.html
   Persiste en localStorage para que el carrito no se pierda al cambiar de página.
   ========================================================= */

const CART_KEY = "mmn_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartUI();
}

function addToCart(product, talla, qty) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id && item.talla === talla);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      talla: talla,
      qty: qty
    });
  }

  saveCart(cart);
  openCart();
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function updateQty(index, qty) {
  const cart = getCart();
  if (qty < 1) {
    cart.splice(index, 1);
  } else {
    cart[index].qty = qty;
  }
  saveCart(cart);
}

function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCartUI() {
  const cart = getCart();
  const badge = document.getElementById("cartBadge");
  const itemsEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("cartCheckoutBtn");
  if (!badge || !itemsEl || !totalEl) return;

  const count = cartCount(cart);
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";

  if (cart.length === 0) {
    itemsEl.innerHTML = `<p class="cart-empty">Tu carrito está vacío. Agrega productos desde el catálogo.</p>`;
    checkoutBtn.disabled = true;
  } else {
    checkoutBtn.disabled = false;
    itemsEl.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <div class="cart-item__info">
          <span class="cart-item__name">${item.name}</span>
          <span class="cart-item__meta">${CATEGORY_LABELS[item.category]} · Talla ${item.talla}</span>
          <span class="cart-item__price">${formatCOP(item.price)}</span>
        </div>
        <div class="cart-item__actions">
          <div class="cart-item__qty">
            <button data-action="decrease" data-index="${index}" aria-label="Restar">−</button>
            <span>${item.qty}</span>
            <button data-action="increase" data-index="${index}" aria-label="Sumar">+</button>
          </div>
          <button class="cart-item__remove" data-action="remove" data-index="${index}" aria-label="Eliminar">Eliminar</button>
        </div>
      </div>
    `).join("");
  }

  totalEl.textContent = formatCOP(cartTotal(cart));
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("is-open");
  document.getElementById("cartOverlay").classList.add("is-open");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("is-open");
  document.getElementById("cartOverlay").classList.remove("is-open");
}

function openCheckout() {
  if (getCart().length === 0) return;
  document.getElementById("checkoutModal").classList.add("is-open");
  document.getElementById("checkoutOverlay").classList.add("is-open");
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("is-open");
  document.getElementById("checkoutOverlay").classList.remove("is-open");
}

function buildOrderMessage(cart, buyer) {
  const lines = cart.map((item, i) =>
    `${i + 1}. ${item.name} (Talla ${item.talla}) x${item.qty} — ${formatCOP(item.price * item.qty)}`
  );

  const buyerLines = [
    `Nombre: ${buyer.nombre}`,
    `Teléfono: ${buyer.telefono}`,
    `Ciudad: ${buyer.ciudad}`,
    `Dirección: ${buyer.direccion}`
  ];
  if (buyer.notas) buyerLines.push(`Notas: ${buyer.notas}`);

  const sections = [
    "¡Hola MMN Clothing! Quiero hacer el siguiente pedido:",
    lines.join("\n"),
    `Total: ${formatCOP(cartTotal(cart))}`,
    "Mis datos:\n" + buyerLines.join("\n")
  ];

  return sections.join("\n\n");
}

function setupCartUI() {
  const cartToggle = document.getElementById("cartToggle");
  const cartClose = document.getElementById("cartClose");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartItems = document.getElementById("cartItems");
  const cartCheckoutBtn = document.getElementById("cartCheckoutBtn");
  const checkoutClose = document.getElementById("checkoutClose");
  const checkoutOverlay = document.getElementById("checkoutOverlay");
  const checkoutForm = document.getElementById("checkoutForm");

  cartToggle.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  cartItems.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const index = Number(btn.dataset.index);
    const cart = getCart();
    if (btn.dataset.action === "increase") updateQty(index, cart[index].qty + 1);
    if (btn.dataset.action === "decrease") updateQty(index, cart[index].qty - 1);
    if (btn.dataset.action === "remove") removeFromCart(index);
  });

  cartCheckoutBtn.addEventListener("click", () => {
    closeCart();
    openCheckout();
  });

  checkoutClose.addEventListener("click", closeCheckout);
  checkoutOverlay.addEventListener("click", closeCheckout);

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(checkoutForm);
    const buyer = {
      nombre: formData.get("nombre"),
      telefono: formData.get("telefono"),
      ciudad: formData.get("ciudad"),
      direccion: formData.get("direccion"),
      notas: formData.get("notas")
    };

    const cart = getCart();
    const message = buildOrderMessage(cart, buyer);
    window.open(buildWhatsAppLink(message), "_blank", "noopener");

    localStorage.removeItem(CART_KEY);
    renderCartUI();
    checkoutForm.reset();
    closeCheckout();
  });

  renderCartUI();
}

// Botones sueltos "Pedir por WhatsApp" (header, footer, botón flotante) — no pasan por el carrito.
function setupWhatsAppLinks() {
  document.querySelectorAll(".whatsapp-cta").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const message = link.dataset.whatsappMessage;
      window.open(buildWhatsAppLink(message), "_blank", "noopener");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupCartUI();
  setupWhatsAppLinks();
});
