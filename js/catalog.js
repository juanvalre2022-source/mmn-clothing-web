/* =========================================================
   PÁGINA DE CATÁLOGO COMPLETO — pestañas por categoría
   ========================================================= */

function renderCatalog(filter) {
  const grid = document.getElementById("catalogGrid");
  grid.innerHTML = "";

  const items = filter && filter !== "todos"
    ? PRODUCTS.filter(p => p.category === filter)
    : PRODUCTS;

  const sort = document.getElementById("catalogSort").value;
  const sorted = sort === "default" ? items : [...items].sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price);
  document.getElementById("catalogCount").textContent = `${sorted.length} producto${sorted.length === 1 ? "" : "s"}`;
  sorted.forEach(product => grid.appendChild(createProductCardElement(product)));
}

function setupTabs() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderCatalog(btn.dataset.filter);
      history.replaceState(null, "", btn.dataset.filter === "todos" ? "/catalogo" : `/catalogo?cat=${btn.dataset.filter}`);
    });
  });
}

function highlightProduct(productId) {
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (!card) return;
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  card.classList.add("is-highlighted");
  setTimeout(() => card.classList.remove("is-highlighted"), 2600);
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");
  const productMatch = productId ? PRODUCTS.find(p => p.id === productId) : null;
  const initialFilter = params.get("cat") || (productMatch ? productMatch.category : "todos");

  setupTabs();
  renderCatalog(initialFilter);
  document.getElementById("catalogSort").addEventListener("change", () => {
    const active = document.querySelector(".filter-btn.is-active");
    renderCatalog(active ? active.dataset.filter : "todos");
  });

  const activeBtn = document.querySelector(`.filter-btn[data-filter="${initialFilter}"]`);
  if (activeBtn) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("is-active"));
    activeBtn.classList.add("is-active");
  }

  if (productMatch) {
    setTimeout(() => highlightProduct(productMatch.id), 250);
  }

  document.getElementById("year").textContent = new Date().getFullYear();
});
