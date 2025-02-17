// Cart functionality
let cart = [];
let cartTotal = 0;

// DOM Elements
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const closeBtn = document.querySelector('.close');
const cartIcon = document.getElementById('cart-icon');
const checkoutBtn = document.getElementById('checkout-btn');

// Add to Cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        
        addToCart(name, price);
        showNotification(`${name} added to cart`);
    });
});

function addToCart(name, price) {
    cart.push({ name, price });
    cartTotal += price;
    updateCartUI();
}

function updateCartUI() {
    // Update cart count
    cartCount.textContent = cart.length;
    
    // Update cart items
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <p>${item.name} - ৳${item.price.toLocaleString()}
            <button onclick="removeFromCart(${index})" class="remove-item">Remove</button></p>
        `;
        cartItems.appendChild(itemElement);
    });
    
    // Update total
    cartTotalElement.textContent = cartTotal.toLocaleString();
}

function removeFromCart(index) {
    cartTotal -= cart[index].price;
    cart.splice(index, 1);
    updateCartUI();
}

// Cart Modal
cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    // Here you would typically handle the checkout process
    showNotification('Proceeding to checkout...');
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add notification styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#006a4e';
    notification.style.color = 'white';
    notification.style.padding = '1rem';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1002';
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Category card hover effects
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});