


// Load existing cart items from session storage
let cartItems = LoadFromSessionStorage("cartItems") || [];
let cartCount = cartItems.length;

//Helper functions to save and load from sessionStorage
function SaveToSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function LoadFromSessionStorage(key) {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

//Update the cart icon count
function updateCartCount() {
  const cartCounter = document.getElementById('cart-count');
  if (cartCounter) {
    cartCounter.innerText = cartCount;
  }
}

//Render cart items visually
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerText = "Your cart is empty.";
    cartContainer.style.display = "flex";
    cartContainer.style.justifyContent = "center";
    cartContainer.style.alignItems = "center";
    cartContainer.style.minHeight = "200px";
    return;
  }

  cartItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" width="80" height="80" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>${item.price}</p>
      </div>
      <button class="remove-btn" data-index="${index}">✖</button>
    `;
    cartContainer.appendChild(div);
  });
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      removeCartItem(index);
    });
  });
}

//Remove item function
function removeCartItem(index) {
  cartItems.splice(index, 1);
  cartCount = cartItems.length;
  SaveToSessionStorage("cartItems", cartItems);
  updateCartCount();
  renderCart();
}

//Order button click event
document.querySelector(".save").addEventListener("click", async () => {
  const addressInput = document.getElementById("address-input");
  const address = addressInput.value.trim();

  if (cartItems.length === 0) {
    alert("Your cart is empty. Add some items before ordering!");
    return;
  }

  if (!address) {
    alert("Please enter your delivery address.");
    return;
  }

  //Send cart data + address to backend
  try {
    const response = await fetch("https://backend-oudr.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: cartItems,
        address: address
      })
    });

    if (response.ok) {
      const result = await response.json();
      alert("✅ Order placed successfully!");

      //Clear cart and UI
      cartItems = [];
      cartCount = 0;
      SaveToSessionStorage("cartItems", cartItems);
      addressInput.value = "";
      updateCartCount();
      renderCart();
    } else {
      alert("❌ Failed to place order. Please try again.");
    }
  } catch (error) {
    console.error("Error saving order:", error);
    alert("There was an error saving your order.");
  }
});

//Initial load
updateCartCount();
renderCart();

