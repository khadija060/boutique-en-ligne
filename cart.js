function renderCart() {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.price.toFixed(2)} fr</p>
      <button onclick="removeFromCart(${index})">Supprimer</button>
    `;
    cartItems.appendChild(div);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2) + " fr";
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();

