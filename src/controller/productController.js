
// Controller to render products onto the productscreen

(function () {
  function formatCurrency(vnd) {
    return vnd.toLocaleString("vi-VN") + " ₫";
  }

  function renderProducts(list) {
    const container = document.getElementById("product-list");
    const countEl = document.getElementById("product-count");

    if (!container) return;

    container.innerHTML = "";

    if (!list || list.length === 0) {
      container.innerHTML =
        '<p class="product-empty">Không tìm thấy sản phẩm phù hợp.</p>';
      if (countEl) countEl.textContent = "0";
      return;
    }

    list.forEach((p) => {
      const card = document.createElement("article");
      card.className = "product-card";

      card.innerHTML = `
        <div class="product-image-wrap">
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="product-info">
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.description}</p>
          <div class="product-meta">
            <span class="product-category">${p.category}</span>
            <span class="product-price">${formatCurrency(p.price)}</span>
          </div>
          <button class="btn-buy" type="button">Thêm vào giỏ</button>
        </div>
      `;

      container.appendChild(card);
    });

    if (countEl) countEl.textContent = String(list.length);
  }

  function initFilters() {
    const searchInput = document.getElementById("search-input");
    const categorySelect = document.getElementById("category-filter");

    function applyFilters() {
      if (!window.ProductModel) return;
      const term = searchInput ? searchInput.value.trim() : "";
      const category = categorySelect ? categorySelect.value : "all";

      let list = ProductModel.search(term);
      if (category && category !== "all") {
        list = list.filter((p) => p.category === category);
      }

      renderProducts(list);
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        applyFilters();
      });
    }

    if (categorySelect) {
      categorySelect.addEventListener("change", function () {
        applyFilters();
      });
    }
  }

  function populateCategories() {
    const categorySelect = document.getElementById("category-filter");
    if (!categorySelect || !window.ProductModel) return;

    const categories = ProductModel.getCategories();
    categorySelect.innerHTML =
      '<option value="all">Tất cả danh mục</option>' +
      categories
        .map(
          (c) =>
            `<option value="${c}">${c}</option>`
        )
        .join("");
  }

  function init() {
    if (!window.ProductModel) return;
    populateCategories();
    renderProducts(ProductModel.getAll());
    initFilters();
  }

  document.addEventListener("DOMContentLoaded", init);
})();

