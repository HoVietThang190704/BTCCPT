
// Controller to render products onto the productscreen

(function () {
  function formatCurrency(vnd) {
    return vnd.toLocaleString("vi-VN") + " ₫";
  }

  function showProductDetail(product) {
    const detailSection = document.getElementById("product-detail");
    if (!detailSection) return;

    detailSection.classList.add("has-selection");

    const imgEl = detailSection.querySelector("#detail-image");
    const nameEl = detailSection.querySelector("#detail-name");
    const descEl = detailSection.querySelector("#detail-desc");
    const categoryEl = detailSection.querySelector("#detail-category");
    const priceEl = detailSection.querySelector("#detail-price");

    if (imgEl) {
      imgEl.src = product.image;
      imgEl.alt = product.name;
    }
    if (nameEl) nameEl.textContent = product.name;
    if (descEl) descEl.textContent = product.description;
    if (categoryEl) categoryEl.textContent = product.category;
    if (priceEl) priceEl.textContent = formatCurrency(product.price);
  }

  function initDetailClose() {
    const detailSection = document.getElementById("product-detail");
    if (!detailSection) return;

    const btnClose = detailSection.querySelector("#detail-close");
    if (btnClose) {
      btnClose.addEventListener("click", function () {
        detailSection.classList.remove("has-selection");
      });
    }
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

      card.addEventListener("click", function () {
        showProductDetail(p);
      });

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
    initDetailClose();
  }

  document.addEventListener("DOMContentLoaded", init);
})();

