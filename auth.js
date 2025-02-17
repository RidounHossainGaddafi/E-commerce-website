const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Here you would typically make an API call to your backend
        // For demo purposes, we'll just check if the fields are filled
        if (email && password) {
            // Store login state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Redirect to home page
            window.location.href = 'index.html';
        }
    });
}

// Registration Form Handling
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Basic validation
        if (password !== confirmPassword) {
            showNotification('Passwords do not match!');
            return;
        }
        
        // Here you would typically make an API call to your backend
        // For demo purposes, we'll just store in localStorage
        const userData = {
            fullname,
            email,
            phone,
            registeredAt: new Date().toISOString()
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to home page
        window.location.href = 'index.html';
    });
}

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#006a4e';
    notification.style.color = 'white';
    notification.style.padding = '1rem';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1002';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Check login status on page load
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navLinks = document.querySelector('.nav-links');
    
    if (isLoggedIn === 'true') {
        // Update navigation for logged-in users
        const userEmail = localStorage.getItem('userEmail');
        if (navLinks) {
            navLinks.innerHTML = `
                <li><a href="#home">Home</a></li>
                <li><a href="#electronics">Electronics</a></li>
                <li><a href="#gents">Gents</a></li>
                <li><a href="#baby">Baby Items</a></li>
                <li><a href="#cart" id="cart-icon">Cart (<span id="cart-count">0</span>)</a></li>
                <li><a href="#" id="logout-btn">Logout</a></li>
            `;
        }
    }
}

// Logout functionality
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'logout-btn') {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }
});

// Run on page load
checkLoginStatus();