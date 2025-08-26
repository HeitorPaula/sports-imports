// Sports Imports - Components Manager

// Products Component
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
    }
    
    const message = wasAdded 
      ? `${product.name} adicionado aos favoritos!`
      : `${product.name} removido dos favoritos`;
    
    Toast.success(message);
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
            <i data-lucide="heart"></i>
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
    const emptyStars = 5 - fullStars;
    
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i data-lucide="star" class="filled"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i data-lucide="star"></i>';
    }
    
    return starsHTML;
  }
}

// Cart Component
class CartComponent {
  constructor() {
    this.elements = {
      sidebar: document.getElementById('cartSidebar'),
      content: null
    };
  }
  
  async init() {
    this.render();
    window.addEventListener('cart-changed', () => this.render());
  }
  
  render() {
    if (!this.elements.sidebar) return;
    
    const { total, itemCount, items } = CartStorage.getTotals();
    const shippingCost = total >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CONFIG.SHIPPING_COST;
    const finalTotal = total + shippingCost;
    
    const cartHTML = `
      <div class="sidebar-header">
        <div class="sidebar-title">
          <i data-lucide="shopping-cart"></i>
          Carrinho
          ${itemCount > 0 ? `<span class="badge">${itemCount}</span>` : ''}
        </div>
        <button class="sidebar-close" onclick="App.closeCart()">
          <i data-lucide="x"></i>
        </button>
      </div>
      
      <div class="sidebar-body">
        ${items.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">
              <i data-lucide="shopping-cart"></i>
            </div>
            <h3>Carrinho vazio</h3>
            <p>Adicione produtos para começar suas compras!</p>
            <button class="btn btn-primary" onclick="App.closeCart()">
              Continuar Comprando
            </button>
          </div>
        ` : `
          ${items.map(item => `
            <div class="sidebar-item">
              <img src="${item.product.image}" alt="${Utils.escapeHtml(item.product.name)}" class="sidebar-item-image">
              <div class="sidebar-item-content">
                <h4 class="sidebar-item-name">${Utils.escapeHtml(item.product.name)}</h4>
                <p class="sidebar-item-price">${Utils.formatCurrency(item.product.price)}</p>
                <div class="sidebar-item-actions">
                  <div class="quantity-controls">
                    <button class="quantity-btn" onclick="CartComponent.updateQuantity('${item.product.id}', ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>
                      <i data-lucide="minus"></i>
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="CartComponent.updateQuantity('${item.product.id}', ${item.quantity + 1})">
                      <i data-lucide="plus"></i>
                    </button>
                  </div>
                  <button class="remove-btn" onclick="CartComponent.removeItem('${item.product.id}')">
                    <i data-lucide="trash-2"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        `}
      </div>
      
      ${items.length > 0 ? `
        <div class="sidebar-footer">
          <div class="space-y-4">
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${Utils.formatCurrency(total)}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>Frete:</span>
                <span class="${shippingCost === 0 ? 'text-green-600 font-medium' : ''}">${shippingCost === 0 ? 'GRÁTIS' : Utils.formatCurrency(shippingCost)}</span>
              </div>
              <div class="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                <span>Total:</span>
                <span class="text-red-600">${Utils.formatCurrency(finalTotal)}</span>
              </div>
            </div>
            
            <button class="btn btn-primary w-full" onclick="App.navigateToCheckout()">
              Finalizar Compra
              <i data-lucide="arrow-right"></i>
            </button>
            
            <button class="btn btn-outline w-full" onclick="CartComponent.clear()">
              Limpar Carrinho
            </button>
          </div>
        </div>
      ` : ''}
    `;
    
    this.elements.sidebar.innerHTML = `
      <div class="sidebar-overlay"></div>
      <div class="sidebar-content">${cartHTML}</div>
    `;
    
    if (window.lucide) {
      lucide.createIcons();
    }
  }
  
  static updateQuantity(productId, newQuantity) {
    CartStorage.updateQuantity(productId, newQuantity);
  }
  
  static removeItem(productId) {
    CartStorage.removeItem(productId);
    Toast.success('Item removido do carrinho');
  }
  
  static clear() {
    CartStorage.clear();
    Toast.success('Carrinho limpo com sucesso');
  }
}

// Favorites Component
class FavoritesComponent {
  constructor() {
    this.elements = {
      sidebar: document.getElementById('favoritesSidebar')
    };
  }
  
  async init() {
    this.render();
    window.addEventListener('favorites-changed', () => this.render());
  }
  
  render() {
    if (!this.elements.sidebar) return;
    
    const items = FavoritesStorage.getItems();
    
    const favoritesHTML = `
      <div class="sidebar-header">
        <div class="sidebar-title">
          <i data-lucide="heart"></i>
          Favoritos
          ${items.length > 0 ? `<span class="badge">${items.length}</span>` : ''}
        </div>
        <button class="sidebar-close" onclick="App.closeFavorites()">
          <i data-lucide="x"></i>
        </button>
      </div>
      
      <div class="sidebar-body">
        ${items.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">
              <i data-lucide="heart"></i>
            </div>
            <h3>Nenhum favorito ainda</h3>
            <p>Adicione produtos aos favoritos para vê-los aqui</p>
            <button class="btn btn-primary" onclick="App.closeFavorites()">
              Explorar Produtos
            </button>
          </div>
        ` : `
          ${items.map(product => `
            <div class="sidebar-item">
              <img src="${product.image}" alt="${Utils.escapeHtml(product.name)}" class="sidebar-item-image">
              <div class="sidebar-item-content">
                <h4 class="sidebar-item-name">${Utils.escapeHtml(product.name)}</h4>
                <div class="product-category">${product.category}</div>
                <div class="sidebar-item-actions">
                  <button class="btn btn-primary btn-sm flex-1" onclick="FavoritesComponent.addToCart('${product.id}')" ${!product.inStock ? 'disabled' : ''}>
                    <i data-lucide="shopping-cart"></i>
                    ${product.inStock ? 'Adicionar' : 'Esgotado'}
                  </button>
                  <button class="remove-btn" onclick="FavoritesComponent.removeItem('${product.id}')">
                    <i data-lucide="trash-2"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        `}
      </div>
      
      ${items.length > 0 ? `
        <div class="sidebar-footer">
          <button class="btn btn-outline w-full" onclick="FavoritesComponent.clear()">
            <i data-lucide="trash-2"></i>
            Limpar Favoritos
          </button>
        </div>
      ` : ''}
    `;
    
    this.elements.sidebar.innerHTML = `
      <div class="sidebar-overlay"></div>
      <div class="sidebar-content">${favoritesHTML}</div>
    `;
    
    if (window.lucide) {
      lucide.createIcons();
    }
  }
  
  static addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product && product.inStock) {
      App.addToCart(product, 1);
    }
  }
  
  static removeItem(productId) {
    FavoritesStorage.removeItem(productId);
    Toast.success('Item removido dos favoritos');
  }
  
  static clear() {
    FavoritesStorage.clear();
    Toast.success('Favoritos limpos com sucesso');
  }
}

// Export to global scope
window.ProductsComponent = ProductsComponent;
window.CartComponent = CartComponent;
window.FavoritesComponent = FavoritesComponent;