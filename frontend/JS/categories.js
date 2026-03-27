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


// Handle all clickable images
  const images = document.querySelectorAll(".clickable-image");

  images.forEach(img => {
  img.addEventListener("click", () => {
 const pageURL = img.getAttribute("data-page");
 window.location.href = pageURL;
   });
   });

const cartButtons = document.querySelectorAll('.categorie-item button, .categorie-item-2 button, .categorie-item-3 button');
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
