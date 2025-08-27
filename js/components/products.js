// Sports Imports - Products Component

class ProductsComponent {
  constructor() {
    this.elements = {
      grid: document.getElementById('productsGrid'),
      loading: document.getElementById('productsLoading')
    };
  }
  
  async init() {
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    if (this.elements.grid) {
      this.elements.grid.addEventListener('click', (e) => this.handleGridClick(e));
    }
  }
  
  handleGridClick(e) {
    const productCard = e.target.closest('.product-card');
    if (!productCard) return;
    
    const productId = productCard.dataset.productId;
    
    if (e.target.closest('.product-favorite')) {
      e.stopPropagation();
      this.toggleFavorite(productId);
      return;
    }
    
    if (e.target.closest('.product-add-btn')) {
      e.stopPropagation();
      this.addToCart(productId);
      return;
    }
    
    // Navigate to product page
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
      App.navigateToProduct(product);
    }
  }
  
  toggleFavorite(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const wasAdded = FavoritesStorage.toggleItem(product);
    const favoriteBtn = this.elements.grid.querySelector(`[data-product-id="${productId}"] .product-favorite`);
    
    if (favoriteBtn) {
      favoriteBtn.classList.toggle('active', wasAdded);
      const icon = favoriteBtn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', wasAdded ? 'heart' : 'heart');
        if (wasAdded) {
          icon.style.fill = 'currentColor';
        } else {
          icon.style.fill = 'none';
        }
      }
    }
    
    const message = wasAdded 
      ? `${product.name} adicionado aos favoritos!`
      : `${product.name} removido dos favoritos`;
    
    Toast.success(message);
    
    if (window.lucide) {
      lucide.createIcons();
    }
  }
  
  addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !product.inStock) return;
    
    App.addToCart(product, 1);
  }
  
  render(products = PRODUCTS) {
    if (!this.elements.grid) return;
    
    if (products.length === 0) {
      this.elements.grid.innerHTML = '';
      return;
    }
    
    const productsHTML = products.map(product => this.generateProductHTML(product)).join('');
    this.elements.grid.innerHTML = productsHTML;
    
    if (window.lucide) {
      lucide.createIcons();
    }
  }
  
  generateProductHTML(product) {
    const isFavorited = FavoritesStorage.isFavorite(product.id);
    const hasDiscount = product.discount > 0;
    const hasFreeShipping = product.price >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD;
    
    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image-container">
          <img 
            src="${product.image}" 
            alt="${Utils.escapeHtml(product.name)}"
            class="product-image"
            loading="lazy"
          >
          
          ${hasDiscount ? `
            <div class="product-discount">-${product.discount}%</div>
          ` : ''}
          
          <button class="product-favorite ${isFavorited ? 'active' : ''}" data-product-id="${product.id}">
            <i data-lucide="heart" ${isFavorited ? 'style="fill: currentColor"' : ''}></i>
          </button>
          
          ${hasFreeShipping ? `
            <div class="product-shipping">
              <i data-lucide="truck"></i>
              Frete Grátis
            </div>
          ` : ''}
          
          ${!product.inStock ? `
            <div class="product-out-of-stock">
              <div class="badge">Esgotado</div>
            </div>
          ` : ''}
        </div>
        
        <div class="product-content">
          <div class="product-category">${product.category}</div>
          <h3 class="product-name">${Utils.escapeHtml(product.name)}</h3>
          <p class="product-description">${Utils.escapeHtml(product.description)}</p>
          
          <div class="product-rating">
            <div class="rating-stars">${this.generateStarsHTML(product.rating)}</div>
            <span class="rating-text">${product.rating} (${product.reviews})</span>
          </div>
          
          <div class="product-prices">
            <span class="product-price">${Utils.formatCurrency(product.price)}</span>
            ${hasDiscount ? `
              <span class="product-original-price">${Utils.formatCurrency(product.originalPrice)}</span>
            ` : ''}
          </div>
          
          <p class="product-installments">
            12x de ${Utils.formatCurrency(product.price / 12)} sem juros
          </p>
          
          <button class="product-add-btn" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
            <i data-lucide="shopping-cart"></i>
            ${product.inStock ? 'Adicionar' : 'Esgotado'}
          </button>
        </div>
      </div>
    `;
  }
  
  generateStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i data-lucide="star" class="filled" style="fill: currentColor; color: #facc15;"></i>';
    }
    
    if (hasHalfStar) {
      starsHTML += '<i data-lucide="star" class="half-filled" style="color: #facc15;"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i data-lucide="star" style="color: #e5e7eb;"></i>';
    }
    
    return starsHTML;
  }
}

window.ProductsComponent = ProductsComponent;