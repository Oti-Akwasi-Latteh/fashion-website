
// DOM Elements
const signinBtn = document.getElementById('signin-btn');
const loginBtn = document.getElementById('login-btn');
const signinForm = document.getElementById('signin-form');
const loginForm = document.getElementById('login-form');
const authTitle = document.getElementById('auth-title');

// Check if user is already logged in
window.addEventListener('load', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'index.html';
    }
});

// Toggle between Sign In and Login forms
if (signinBtn && loginBtn) {
    signinBtn.addEventListener('click', showSignInForm);
    loginBtn.addEventListener('click', showLoginForm);
}

function showSignInForm() {
    signinBtn.classList.add('active');
    loginBtn.classList.remove('active');
    signinForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    authTitle.textContent = 'Sign In';
}

function showLoginForm() {
    loginBtn.classList.add('active');
    signinBtn.classList.remove('active');
    loginForm.classList.remove('hidden');
    signinForm.classList.add('hidden');
    authTitle.textContent = 'Login';
}

// Handle Sign In Form Submission
if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('signin-username').value.trim();
        const email = document.getElementById('signin-email').value.trim();
        const password = document.getElementById('signin-password').value;
        const confirmPassword = document.getElementById('signin-confirm-password').value;

        removeMessages();

        // Validation
        if (password !== confirmPassword) {
            showMessage('Passwords do not match!', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long!', 'error');
            return;
        }

        // Store user data in localStorage (simulate database)
        const userData = {
            username,
            email,
            password
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);

        showMessage('Account created successfully! Redirecting...', 'success');

        // Redirect to home page after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
}

// Handle Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const usernameOrEmail = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;

        removeMessages();

        const storedUserData = localStorage.getItem('userData');

        if (!storedUserData) {
            showMessage('No account found. Please sign in first.', 'error');
            return;
        }

        const userData = JSON.parse(storedUserData);

        const isValidLogin = (userData.username === usernameOrEmail || userData.email === usernameOrEmail)
            && userData.password === password;

        if (isValidLogin) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', userData.username);

            showMessage('Login successful', 'success');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showMessage('Invalid username/email or password!', 'error');
        }
    });
}


// Utility Functions
function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;

    const authBox = document.querySelector('.auth-box');
    if (authBox) {
        authBox.insertBefore(messageDiv, authBox.firstChild);
    }
}

function removeMessages() {
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(message => message.remove());
}
// SIGNUP
signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = document.getElementById("signin-username").value;
  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;
  const confirmPassword = document.getElementById("signin-confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await fetch("https://backend-oudr.onrender.com/api/account/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful!");
      signinForm.reset();
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Error signing up");
  }
});

// LOGIN
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch("https://backend-oudr.onrender.com/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Login successful!");
      loginForm.reset();
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Error logging in");
  }
});








