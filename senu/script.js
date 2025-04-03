const products = [
    {
        id: 1,
        name: "Revitalizing Shampoo",
        category: "hair",
        price: 24.99,
        description: "Nourishing shampoo for all hair types",
        image: "https://placehold.co/300x300/e8d3e3/333?text=Shampoo"
    },
    {
        id: 2,
        name: "Hydrating Conditioner",
        category: "hair",
        price: 22.99,
        description: "Deep conditioning treatment for dry hair",
        image: "https://placehold.co/300x300/e8d3e3/333?text=Conditioner"
    },
    {
        id: 3,
        name: "Hair Growth Serum",
        category: "hair",
        price: 34.99,
        description: "Promotes healthy hair growth",
        image: "https://placehold.co/300x300/e8d3e3/333?text=Serum"
    },
    {
        id: 4,
        name: "Moisturizing Face Cream",
        category: "skin",
        price: 29.99,
        description: "24-hour hydration for all skin types",
        image: "https://placehold.co/300x300/d3e8e3/333?text=Face+Cream"
    },
    {
        id: 5,
        name: "Vitamin C Serum",
        category: "skin",
        price: 39.99,
        description: "Brightening serum for radiant skin",
        image: "https://placehold.co/300x300/d3e8e3/333?text=Vitamin+C"
    },
    {
        id: 6,
        name: "Exfoliating Scrub",
        category: "skin",
        price: 19.99,
        description: "Gentle exfoliation for smooth skin",
        image: "https://placehold.co/300x300/d3e8e3/333?text=Scrub"
    },
    {
        id: 7,
        name: "Matte Lipstick",
        category: "cosmetics",
        price: 18.99,
        description: "Long-lasting matte finish",
        image: "https://placehold.co/300x300/e3d3e8/333?text=Lipstick"
    },
    {
        id: 8,
        name: "Volumizing Mascara",
        category: "cosmetics",
        price: 21.99,
        description: "Adds volume and length to lashes",
        image: "https://placehold.co/300x300/e3d3e8/333?text=Mascara"
    },
    {
        id: 9,
        name: "Eyeshadow Palette",
        category: "cosmetics",
        price: 42.99,
        description: "12 versatile shades for any look",
        image: "https://placehold.co/300x300/e3d3e8/333?text=Eyeshadow"
    },
    {
        id: 10,
        name: "Hair Styling Mousse",
        category: "hair",
        price: 16.99,
        description: "Medium hold for natural-looking styles",
        image: "https://placehold.co/300x300/e8d3e3/333?text=Mousse"
    },
    {
        id: 11,
        name: "Anti-Aging Night Cream",
        category: "skin",
        price: 49.99,
        description: "Reduces fine lines and wrinkles",
        image: "https://placehold.co/300x300/d3e8e3/333?text=Night+Cream"
    },
    {
        id: 12,
        name: "Foundation",
        category: "cosmetics",
        price: 32.99,
        description: "Buildable coverage with natural finish",
        image: "https://placehold.co/300x300/e3d3e8/333?text=Foundation"
    }
];

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const prevTestimonialBtn = document.getElementById('prev-testimonial');
const nextTestimonialBtn = document.getElementById('next-testimonial');
const testimonials = document.querySelectorAll('.testimonial');
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');

let cart = [];
let currentTestimonial = 0;

function init() {
    displayProducts('all');
    
    setupEventListeners();
    
    const savedCart = localStorage.getItem('glamorCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
    
    const savedTheme = localStorage.getItem('glamorTheme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function setupEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            displayProducts(filter);
        });
    });
    
    cartButton.addEventListener('click', openCart);
    closeBtn.addEventListener('click', closeCart);
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCart();
        }
    });
    
    checkoutBtn.addEventListener('click', checkout);
    
    prevTestimonialBtn.addEventListener('click', prevTestimonial);
    nextTestimonialBtn.addEventListener('click', nextTestimonial);
    
    contactForm.addEventListener('submit', handleContactForm);
    newsletterForm.addEventListener('submit', handleNewsletterForm);
}

function toggleTheme() {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('glamorTheme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('glamorTheme', 'light');
    }
}

function displayProducts(filter) {
    productGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <div class="product-actions">
                    <button class="btn-small add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="btn-small view-details" data-id="${product.id}">Details</button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
    
    const viewDetailsBtns = document.querySelectorAll('.view-details');
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', viewProductDetails);
    });
}

function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    
    saveCart();
    
    showMessage(`${product.name} added to cart!`, 'success');
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function saveCart() {
    localStorage.setItem('glamorCart', JSON.stringify(cart));
}

function openCart() {
    renderCartItems();
    
    cartModal.style.display = 'block';
}

function closeCart() {
    cartModal.style.display = 'none';
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    const decreaseBtns = document.querySelectorAll('.decrease');
    const increaseBtns = document.querySelectorAll('.increase');
    const removeBtns = document.querySelectorAll('.cart-item-remove');
    
    decreaseBtns.forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });
    
    increaseBtns.forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });
    
    removeBtns.forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });
    
    updateCartTotal();
}

function updateCartTotal() {
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        const index = cart.findIndex(item => item.id === productId);
        cart.splice(index, 1);
    }
    
    updateCartCount();
    saveCart();
    renderCartItems();
}

function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    item.quantity++;
    
    updateCartCount();
    saveCart();
    renderCartItems();
}

function removeFromCart(e) {
    const productId = parseInt(e.target.closest('.cart-item-remove').getAttribute('data-id'));
    const index = cart.findIndex(item => item.id === productId);
    
    cart.splice(index, 1);
    
    updateCartCount();
    saveCart();
    renderCartItems();
}

function checkout() {
    if (cart.length === 0) {
        showMessage('Your cart is empty!', 'error');
        return;
    }
    
    showMessage('Thank you for your purchase! Your order has been placed.', 'success');
    
    cart = [];
    updateCartCount();
    saveCart();
    closeCart();
}

function viewProductDetails(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    showMessage(`Viewing details for ${product.name}`, 'info');
}

function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = message;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.classList.add('hide');
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 500);
    }, 3000);
}

function nextTestimonial() {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
}

function prevTestimonial() {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
}

function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    console.log('Contact form submitted:', { name, email, subject, message });
    
    showMessage('Thank you for your message! We will get back to you soon.', 'success');
    
    e.target.reset();
}

function handleNewsletterForm(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    console.log('Newsletter subscription:', email);
    
    showMessage('Thank you for subscribing to our newsletter!', 'success');
    
    e.target.reset();
}

const style = document.createElement('style');
style.textContent = `
    .message {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideIn 0.5s forwards;
    }
    
    .message.hide {
        animation: slideOut 0.5s forwards;
    }
    
    .success {
        background-color: #28a745;
    }
    
    .error {
        background-color: #dc3545;
    }
    
    .info {
        background-color: #17a2b8;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', init);