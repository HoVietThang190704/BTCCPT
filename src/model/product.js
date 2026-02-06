
// Simple in-memory product "model"
// You can replace this later with data from API or database

const ProductModel = (function () {
  const products = [
    {
      id: 1,
      name: "Laptop Ultra 14\"",
      price: 18990000,
      category: "Laptop",
      description: "Mỏng nhẹ, pin tốt cho học tập và văn phòng.",
      image:
        "https://via.placeholder.com/320x200.png?text=Laptop+Ultra+14",
    },
    {
      id: 2,
      name: "Chuột không dây Pro",
      price: 299000,
      category: "Phụ kiện",
      description: "Chuột không dây 2.4GHz, độ nhạy cao, dùng êm.",
      image:
        "https://via.placeholder.com/320x200.png?text=Mouse+Wireless+Pro",
    },
    {
      id: 3,
      name: "Tai nghe Gaming 7.1",
      price: 990000,
      category: "Phụ kiện",
      description: "Âm thanh giả lập 7.1, micro chống ồn.",
      image:
        "https://via.placeholder.com/320x200.png?text=Gaming+Headset",
    },
    {
      id: 4,
      name: "Màn hình 24\" IPS 75Hz",
      price: 3190000,
      category: "Màn hình",
      description: "Tấm nền IPS, viền mỏng, tần số quét 75Hz.",
      image:
        "https://via.placeholder.com/320x200.png?text=Monitor+24+IPS",
    },
    {
      id: 5,
      name: "Bàn phím cơ RGB",
      price: 1250000,
      category: "Phụ kiện",
      description: "Switch cơ, đèn RGB nhiều hiệu ứng.",
      image:
        "https://via.placeholder.com/320x200.png?text=Mechanical+Keyboard",
    },
  ];

  function getAll() {
    return products.slice();
  }

  function getCategories() {
    const set = new Set(products.map((p) => p.category));
    return Array.from(set);
  }

  function search(term) {
    if (!term) return getAll();
    const lower = term.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
  }

  function filterByCategory(category) {
    if (!category || category === "all") return getAll();
    return products.filter((p) => p.category === category);
  }

  return {
    getAll,
    getCategories,
    search,
    filterByCategory,
  };
})();

// Expose to global scope for controller
window.ProductModel = ProductModel;

