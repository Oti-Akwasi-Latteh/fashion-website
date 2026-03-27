// Check if user is logged in
window.addEventListener('load', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');

    if (isLoggedIn !== 'true') {
        // Redirect to login page if not logged in
        window.location.href = 'account.html';
        return;
    }

    // Display user greeting
    if (currentUser) {
        const userGreeting = document.getElementById('user-greeting');
        if (userGreeting) {
            userGreeting.textContent = `Hello, ${currentUser}!`;
        } else {
            console.warn('Element with id "user-greeting" not found.');
        }
    }
});

// Handle logout
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Clear all stored data
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');

            // Redirect to login page
            window.location.href = 'account.html';
        });
    } else {
        console.warn('Logout button with id "logout-btn" not found.');
    }

    // Add functionality to dashboard cards
    const cardButtons = document.querySelectorAll('.card-btn');
    cardButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const cardTitleElement = e.target.closest('.card').querySelector('h3');
            if (cardTitleElement) {
                const cardTitle = cardTitleElement.textContent;
                alert(`Card clicked: ${cardTitle}`);
            }
        });
    });
});


