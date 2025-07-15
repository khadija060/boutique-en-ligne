function loadOrderSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const summary = document.getElementById('order-summary');
  let total = 0;

  if (cart.length === 0) {
    summary.innerHTML = "<p>Panier vide.</p>";
    return;
  }

  const list = document.createElement('ul');

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price.toFixed(2)} fr`;
    list.appendChild(li);
    total += item.price;
  });

  summary.appendChild(list);
  summary.innerHTML += `<p><strong>Total : ${total.toFixed(2)} fr</strong></p>`;
}

document.getElementById('order-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const client = {
    nom: formData.get('nom'),
    email: formData.get('email'),
    tel: formData.get('tel'),
    adresse: formData.get('adresse'),
  };

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const commande = {
    client,
    produits: cart,
    date: new Date().toISOString()
  };

  console.log("Commande envoyée :", commande);

  localStorage.removeItem('cart');
  document.getElementById('order-form').style.display = 'none';
  document.getElementById('confirmation').textContent = "✅ Merci ! Votre commande a été envoyée.";
});

loadOrderSummary();
