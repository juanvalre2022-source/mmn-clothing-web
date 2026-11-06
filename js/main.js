/* =========================================================
   PÁGINA PRINCIPAL — slider de destacados + vista previa por categoría
   ========================================================= */

function renderSlider() {
  const track = document.getElementById("sliderTrack");
  track.innerHTML = "";
  PRODUCTS.forEach(product => {
    track.appendChild(createSlideElement(product));
  });

  const prevBtn = document.getElementById("sliderPrev");
  const nextBtn = document.getElementById("sliderNext");
  const scrollStep = 300;

  nextBtn.addEventListener("click", () => track.scrollBy({ left: scrollStep, behavior: "smooth" }));
  prevBtn.addEventListener("click", () => track.scrollBy({ left: -scrollStep, behavior: "smooth" }));

  const play = () => setInterval(() => {
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
    track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + scrollStep, behavior: "smooth" });
  }, 4000);

  let autoplay = play();
  track.addEventListener("mouseenter", () => clearInterval(autoplay));
  track.addEventListener("mouseleave", () => { clearInterval(autoplay); autoplay = play(); });
}

function renderCategoryPreviews() {
  Object.keys(CATEGORY_LABELS).forEach(category => {
    const container = document.getElementById(`preview-${category}`);
    if (!container) return;
    productsByCategory(category, 3).forEach(product => {
      container.appendChild(createProductCardElement(product));
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSlider();
  renderCategoryPreviews();
  document.getElementById("year").textContent = new Date().getFullYear();
});
