// Sports Imports - Product Page Component

class ProductPageComponent {
  constructor() {
    this.elements = {
      view: document.getElementById('productView')
    };
  }
  
  async init() {
    // Component initialized
  }
  
  render(product) {
    if (!this.elements.view || !product) return;
    
    const isFavorited = FavoritesStorage.isFavorite(product.id);
    const hasDiscount = product.discount > 0;
    const hasFreeShipping = product.price >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD;
    
    this.elements.view.innerHTML = `
      <div class="product-page">
        <!-- Product Page Header -->
        <div class="product-page-header">
          <div class="container">
            <div class="product-page-nav">
              <button class="btn btn-ghost product-back-btn">
                <i data-lucide="arrow-left"></i>
                Voltar
              </button>
              
              <div class="product-page-actions">
                <button class="btn btn-outline product-favorite-btn ${isFavorited ? 'active' : ''}">
                  <i data-lucide="heart" ${isFavorited ? 'style="fill: currentColor"' : ''}></i>
                </button>
                
                <button class="btn btn-outline product-share-btn">
                  <i data-lucide="share-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="product-page-content">
          <div class="container">
            <div class="product-details-grid">
              <!-- Product Image -->
              <div class="product-image-section">
                <div class="product-main-image-container">
                  <img
                    src="${product.image}"
                    alt="${Utils.escapeHtml(product.name)}"
                    class="product-main-image"
                  >
                  ${hasDiscount ? `
                    <div class="product-discount">-${product.discount}%</div>
                  ` : ''}
                  ${!product.inStock ? `
                    <div class="product-out-of-stock">
                      <div class="badge">Produto Esgotado</div>
                    </div>
                  ` : ''}
                </div>
              </div>

              <!-- Product Info -->
              <div class="product-info-section">
                <div class="product-page-category">${product.category}</div>
                
                <h1 class="product-page-title">
                  ${Utils.escapeHtml(product.name)}
                </h1>
                
                <p class="product-page-description">
                  ${Utils.escapeHtml(product.description)}
                </p>

                <!-- Rating -->
                <div class="product-page-rating">
                  <div class="rating-stars">
                    ${this.generateStarsHTML(product.rating)}
                  </div>
                  <span class="rating-text">${product.rating} ⭐ (${product.reviews} avaliações)</span>
                </div>

                <!-- Prices -->
                <div class="product-page-prices">
                  <span class="product-page-price">
                    ${Utils.formatCurrency(product.price)}
                  </span>
                  ${hasDiscount ? `
                    <span class="product-page-original-price">
                      ${Utils.formatCurrency(product.originalPrice)}
                    </span>
                  ` : ''}
                </div>
                
                <p class="product-page-installments">
                  12x de ${Utils.formatCurrency(product.price / 12)} sem juros no cartão
                </p>
                
                ${hasFreeShipping ? `
                  <div class="shipping-info">
                    <i data-lucide="truck"></i>
                    <span>Frete grátis para todo o Brasil</span>
                  </div>
                ` : ''}

                <!-- Quantity and Add to Cart -->
                <div class="product-actions">
                  <div class="quantity-section">
                    <span class="quantity-label">Quantidade:</span>
                    <div class="quantity-controls">
                      <button class="quantity-btn minus" ${!product.inStock ? 'disabled' : ''}>
                        <i data-lucide="minus"></i>
                      </button>
                      <span class="quantity-display">1</span>
                      <button class="quantity-btn plus" ${!product.inStock ? 'disabled' : ''}>
                        <i data-lucide="plus"></i>
                      </button>
                    </div>
                  </div>

                  <button class="btn-full product-add-to-cart-btn" ${!product.inStock ? 'disabled' : ''}>
                    <i data-lucide="shopping-cart"></i>
                    ${product.inStock ? `Adicionar ao Carrinho - ${Utils.formatCurrency(product.price)}` : 'Produto Esgotado'}
                  </button>
                </div>

                <!-- Benefits -->
                <div class="product-benefits">
                  <h3>Garantias e Benefícios</h3>
                  <div class="benefits-list">
                    <div class="benefit-item">
                      <i data-lucide="shield-check" style="color: #16a34a;"></i>
                      <span>Produto original e garantia de qualidade</span>
                    </div>
                    <div class="benefit-item">
                      <i data-lucide="refresh-cw" style="color: #2563eb;"></i>
                      <span>15 dias para devolução sem custos</span>
                    </div>
                    <div class="benefit-item">
                      <i data-lucide="truck" style="color: #fb923c;"></i>
                      <span>Entrega rápida e segura</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Full Description -->
            <div class="product-full-description">
              <h2>Descrição Completa</h2>
              <p>${Utils.escapeHtml(product.fullDescription || product.description)}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.setupEventListeners(product);
    
    if (window.lucide) {
      lucide.createIcons();
    }
  }
  
  setupEventListeners(product) {
    let quantity = 1;
    
    // Back button
    const backBtn = this.elements.view.querySelector('.product-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        App.navigateHome();
      });
    }
    
    // Quantity controls
    const minusBtn = this.elements.view.querySelector('.quantity-btn.minus');
    const plusBtn = this.elements.view.querySelector('.quantity-btn.plus');
    const quantityDisplay = this.elements.view.querySelector('.quantity-display');
    const addToCartBtn = this.elements.view.querySelector('.product-add-to-cart-btn');
    
    if (minusBtn && plusBtn && quantityDisplay) {
      minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
          quantity--;
          quantityDisplay.textContent = quantity;
          this.updateAddToCartButton(addToCartBtn, product, quantity);
        }
      });
      
      plusBtn.addEventListener('click', () => {
        if (quantity < 10) {
          quantity++;
          quantityDisplay.textContent = quantity;
          this.updateAddToCartButton(addToCartBtn, product, quantity);
        }
      });
    }
    
    // Add to cart button
    if (addToCartBtn && product.inStock) {
      addToCartBtn.addEventListener('click', () => {
        App.addToCart(product, quantity);
      });
    }
    
    // Favorite button
    const favoriteBtn = this.elements.view.querySelector('.product-favorite-btn');
    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', () => {
        this.toggleFavorite(product, favoriteBtn);
      });
    }
    
    // Share button
    const shareBtn = this.elements.view.querySelector('.product-share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        this.shareProduct(product);
      });
    }
  }
  
  updateAddToCartButton(button, product, quantity) {
    if (button && product.inStock) {
      const total = product.price * quantity;
      button.innerHTML = `
        <i data-lucide="shopping-cart"></i>
        Adicionar ao Carrinho - ${Utils.formatCurrency(total)}
      `;
      if (window.lucide) {
        lucide.createIcons();
      }
    }
  }
  
  toggleFavorite(product, button) {
    const wasAdded = FavoritesStorage.toggleItem(product);
    
    button.classList.toggle('active', wasAdded);
    const icon = button.querySelector('i');
    if (icon) {
      if (wasAdded) {
        icon.style.fill = 'currentColor';
      } else {
        icon.style.fill = 'none';
      }
    }
    
    const message = wasAdded 
      ? `${product.name} adicionado aos favoritos!`
      : `${product.name} removido dos favoritos`;
    
    Toast.success(message);
  }
  
  shareProduct(product) {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        Toast.success('Link copiado para a área de transferência!');
      }).catch(() => {
        Toast.error('Erro ao copiar link');
      });
    }
  }
  
  generateStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i data-lucide="star" style="fill: #facc15; color: #facc15;"></i>';
    }
    
    if (hasHalfStar) {
      starsHTML += '<i data-lucide="star" style="color: #facc15;"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i data-lucide="star" style="color: #e5e7eb;"></i>';
    }
    
    return starsHTML;
  }
}

window.ProductPageComponent = ProductPageComponent;