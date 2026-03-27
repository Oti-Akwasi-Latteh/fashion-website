const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();

    const allProducts = document.querySelectorAll('.mens-card, .card-2, .card-3, .card-4');

    allProducts.forEach(product => {
      const name = product.getAttribute('data-name').toLowerCase();
      if (name.includes(query)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  });

  let cartItems = LoadFromSessionStorage("cartItems") || [];
let cartCount = cartItems.length;

function SaveToSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function LoadFromSessionStorage(key) {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function updateCartCount() {
  const cartCounter = document.getElementById('cart-count');
  if (cartCounter) {
    cartCounter.innerText = cartCount;
  }
}

function addToCart(item) {
  cartItems.push(item);
  cartCount = cartItems.length;
  SaveToSessionStorage("cartItems", cartItems);
  updateCartCount();
}

const cartButtons = document.querySelectorAll('.mens-card button, .card-2 button, .card-3 button, .card-4');
cartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productCard = button.closest('div');
    const product = {
      name: productCard.querySelector('h3').innerText,
      price: productCard.querySelector('h2').innerText,
      image: productCard.querySelector('img').src,
      id: Date.now()
    };
    addToCart(product);
  });
});

updateCartCount();

