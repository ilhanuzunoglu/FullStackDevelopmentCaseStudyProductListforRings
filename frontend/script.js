// Global variables
let products = [];
let currentIndex = 0;
let isTransitioning = false;

// DOM elements
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
});

// Load products from API
async function loadProducts() {
    try {
        showLoading(true);
        const response = await fetch(`${API_BASE_URL}/products`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        products = await response.json();
        renderProducts();
        updateCarouselButtons();
        showLoading(false);
    } catch (err) {
        console.error('Error loading products:', err);
        showError(true);
        showLoading(false);
    }
}

// Render products in carousel
function renderProducts() {
    if (!products || products.length === 0) {
        carouselTrack.innerHTML = '<p>No products available</p>';
        return;
    }

    carouselTrack.innerHTML = products.map((product, index) => createProductCard(product, index)).join('');
}

// Create product card HTML
function createProductCard(product, index) {
    const popularityScore = (product.popularityScore * 5).toFixed(1);
    const stars = generateStars(popularityScore);
    
    return `
        <div class="product-card" data-index="${index}">
            <div class="product-image-container">
                <img 
                    src="${product.images.yellow}" 
                    alt="${product.name}" 
                    class="product-image"
                    data-yellow="${product.images.yellow}"
                    data-white="${product.images.white}"
                    data-rose="${product.images.rose}"
                />
            </div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)} USD</div>
            
            <div class="color-picker">
                <div class="color-option yellow active" data-color="yellow" data-product-index="${index}"></div>
                <div class="color-option white" data-color="white" data-product-index="${index}"></div>
                <div class="color-option rose" data-color="rose" data-product-index="${index}"></div>
            </div>
            
            <div class="popularity-score">
                <div class="stars">${stars}</div>
                <span class="score-text">${popularityScore}/5</span>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(score) {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<span class="star">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
        stars += '<span class="star">☆</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<span class="star empty">☆</span>';
    }
    
    return stars;
}

// Setup event listeners
function setupEventListeners() {
    // Carousel navigation
    prevBtn.addEventListener('click', () => moveCarousel('prev'));
    nextBtn.addEventListener('click', () => moveCarousel('next'));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            moveCarousel('prev');
        } else if (e.key === 'ArrowRight') {
            moveCarousel('next');
        }
    });
    
    // Touch/swipe support
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
    });
    
    carouselTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    carouselTrack.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only trigger swipe if horizontal movement is greater than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                moveCarousel('next');
            } else {
                moveCarousel('prev');
            }
        }
        
        isDragging = false;
    });
    
    // Mouse drag support
    let mouseStartX = 0;
    let isMouseDragging = false;
    
    carouselTrack.addEventListener('mousedown', (e) => {
        mouseStartX = e.clientX;
        isMouseDragging = true;
        e.preventDefault();
    });
    
    carouselTrack.addEventListener('mousemove', (e) => {
        if (!isMouseDragging) return;
        e.preventDefault();
    });
    
    carouselTrack.addEventListener('mouseup', (e) => {
        if (!isMouseDragging) return;
        
        const mouseEndX = e.clientX;
        const diffX = mouseStartX - mouseEndX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                moveCarousel('next');
            } else {
                moveCarousel('prev');
            }
        }
        
        isMouseDragging = false;
    });
    
    // Color picker events (delegated)
    carouselTrack.addEventListener('click', (e) => {
        if (e.target.classList.contains('color-option')) {
            const color = e.target.dataset.color;
            const productIndex = parseInt(e.target.dataset.productIndex);
            changeProductColor(productIndex, color, e.target);
        }
    });
}

// Move carousel
function moveCarousel(direction) {
    if (isTransitioning || products.length === 0) return;
    
    isTransitioning = true;
    
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % products.length;
    } else {
        currentIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    }
    
    updateCarouselPosition();
    updateCarouselButtons();
    
    // Reset transition flag after animation
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

// Update carousel position
function updateCarouselPosition() {
    const cardWidth = 300; // Product card width + gap
    const translateX = -currentIndex * cardWidth;
    carouselTrack.style.transform = `translateX(${translateX}px)`;
}

// Update carousel button states
function updateCarouselButtons() {
    // For infinite carousel, buttons are always enabled
    // But we can add visual feedback for better UX
    prevBtn.disabled = false;
    nextBtn.disabled = false;
}

// Change product color
function changeProductColor(productIndex, color, clickedElement) {
    const productCard = clickedElement.closest('.product-card');
    const productImage = productCard.querySelector('.product-image');
    const colorOptions = productCard.querySelectorAll('.color-option');
    
    // Update active color
    colorOptions.forEach(option => option.classList.remove('active'));
    clickedElement.classList.add('active');
    
    // Update image
    const imageUrl = productImage.dataset[color];
    if (imageUrl) {
        productImage.src = imageUrl;
    }
}

// Show/hide loading state
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
}

// Show/hide error state
function showError(show) {
    error.style.display = show ? 'block' : 'none';
}

// Utility function to debounce rapid clicks
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Auto-advance carousel (optional)
function startAutoAdvance() {
    setInterval(() => {
        if (!isTransitioning) {
            moveCarousel('next');
        }
    }, 5000); // Auto-advance every 5 seconds
}

// Uncomment the line below to enable auto-advance
// startAutoAdvance();
