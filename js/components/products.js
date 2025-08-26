// Products component functionality
const Products = {
  elements: {
    grid: null,
    section: null
  },
  
  init() {
    this.bindElements();
    this.setupEventListeners();
    this.render();
    console.log('Products component initialized');
  },
  
  bindElements() {
    this.elements.grid = document.querySelector(SELECTORS.PRODUCTS_GRID);
    this.elements.section = document.getElementById('productsSection');
  },
  
  setupEventListeners() {
    // Listen to app state changes
    AppState.addListener('stateChange', () => {
      this.render();
    });
  },
  
  render() {
    if (!this.elements.grid) return;
    
    const filteredProducts = AppState.getFilteredProducts();
    
    if (filteredProducts.length === 0) {
      this.elements.grid.innerHTML = '';
      return;
    }
    
    const productsHTML = filteredProducts.map(product => 
      this.generateProductCardHTML(product)
    ).join('');
    
    this.elements.grid.innerHTML = productsHTML;
    
    // Initialize lucide icons
    if (window.lucide) {
      lucide.createIcons();
    }
    
    // Setup event listeners for product cards
    this.setupProductCardListeners();
  },
  
  generateProductCardHTML(product) {
    const isFavorited = FavoritesStorage.isItemFavorite(product.id);
    const discountBadge = ProductUtils.getDiscountBadgeHTML(product.discount);
    const freeShippingBadge = ProductUtils.getFreeShippingBadgeHTML(product);
    const outOfStockBadge = ProductUtils.getOutOfStockBadgeHTML(product);
    const starsHTML = ProductUtils.generateStarsHTML(product.rating);
    
    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image-container">
          <img 
            src="${product.image}" 
            alt="${escapeHtml(product.name)}"
            class="product-image"
            loading="lazy"
          >
          
          ${discountBadge}
          
          <button 
            class="product-favorite ${isFavorited ? 'active' : ''}"
            data-product-id="${product.id}"
            aria-label="Adicionar aos favoritos"
          >
            <i data-lucide="heart"></i>
          </button>
          
          ${freeShippingBadge}
          ${outOfStockBadge}
        </div>
        
        <div class="product-content">
          <div class="product-category">${product.category}</div>
          
          <h3 class="product-name">${escapeHtml(product.name)}</h3>
          
          <p class="product-description">${escapeHtml(product.description)}</p>
          
          <div class="product-rating">
            <div class="rating-stars">${starsHTML}</div>
            <span class="rating-text">${product.rating} (${product.reviews})</span>
          </div>
          
          <div class="product-prices">
            <span class="product-price">${ProductUtils.formatPrice(product.price)}</span>
            ${product.discount > 0 ? `
              <span class="product-original-price">${ProductUtils.formatPrice(product.originalPrice)}</span>
            ` : ''}
          </div>
          
          <p class="product-installments">
            12x de ${ProductUtils.formatPrice(ProductUtils.calculateInstallments(product.price))} sem juros
          </p>
          
          <button 
            class="product-add-btn"
            data-product-id="${product.id}"
            ${!product.inStock ? 'disabled' : ''}
          >
            <i data-lucide="shopping-cart"></i>
            ${product.inStock ? 'Adicionar' : 'Esgotado'}
          </button>
        </div>
      </div>
    `;
  },
  
  setupProductCardListeners() {
    if (!this.elements.grid) return;
    
    // Product card clicks (for navigation to product page)
    this.elements.grid.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      if (!productCard) return;
      
      // Don't navigate if clicking on favorite or add to cart buttons
      if (e.target.closest('.product-favorite') || e.target.closest('.product-add-btn')) {
        return;
      }
      
      const productId = productCard.dataset.productId;
      const product = ProductUtils.getProductById(productId);
      
      if (product) {
        Events.dispatch(EVENTS.PRODUCT_CLICKED, { product });
      }
    });
    
    // Favorite button clicks
    this.elements.grid.addEventListener('click', (e) => {
      const favoriteBtn = e.target.closest('.product-favorite');
      if (!favoriteBtn) return;
      
      e.stopPropagation();
      
      const productId = favoriteBtn.dataset.productId;
      const product = ProductUtils.getProductById(productId);
      
      if (product) {
        const wasAdded = FavoritesStorage.toggleItem(product);
        
        // Update button state
        favoriteBtn.classList.toggle('active', wasAdded);
        
        // Show toast
        const message = wasAdded 
          ? `${product.name} adicionado aos favoritos!`
          : `${product.name} removido dos favoritos`;
        
        Toast.success(message);
      }
    });
    
    // Add to cart button clicks
    this.elements.grid.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.product-add-btn');
      if (!addBtn || addBtn.disabled) return;
      
      e.stopPropagation();
      
      const productId = addBtn.dataset.productId;
      const product = ProductUtils.getProductById(productId);
      
      if (product) {
        Events.dispatch(EVENTS.ADD_TO_CART, { product, quantity: 1 });
      }
    });
  },
  
  // Get products grid element
  getGridElement() {
    return this.elements.grid;
  },
  
  // Scroll to products section
  scrollToSection() {
    if (this.elements.section) {
      scrollToElement('productsSection', 100);
    }
  }
};