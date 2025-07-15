const productList = document.getElementById('product-list');
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");

// ✅ Fusionne produits "fixes" + produits ajoutés depuis admin
const savedCustomProducts = JSON.parse(localStorage.getItem("customProducts")) || [];
const allProducts = [...products, ...savedCustomProducts];

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = allProducts.find(p => p.id === productId);
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} a été ajouté au panier.`);
}

function displayProducts(productsToDisplay) {
  productList.innerHTML = "";
  productsToDisplay.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>${product.price.toFixed(2)} fr</strong></p>
      <button onclick="addToCart(${product.id})">Ajouter au panier</button>
    `;
    productList.appendChild(card);
  });
}

function filterProducts() {
  const category = categoryFilter.value;
  const priceRange = priceFilter.value;
  const searchTerm = searchInput.value.toLowerCase();

  let filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm)
  );

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number);
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }

  displayProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);

// ✅ Affichage initial de tous les produits
displayProducts(allProducts);
