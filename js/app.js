// Sports Imports - Main Application (Identical to React version)

class SportsImportsApp {
  constructor() {
    // Estado principal da aplicação (same as React useState)
    this.state = {
      currentView: 'home', // 'home' | 'product' | 'checkout'
      selectedCategory: 'Todos',
      selectedProduct: null,
      isCartOpen: false,
      isFavoritesOpen: false,
      searchTerm: '',
      isMobileMenuOpen: false
    };
    
    this.init();
  }
  
  init() {
    this.bindElements();
    this.setupEventListeners();
    this.renderCategories();
    this.renderProducts();
    this.updateCartDisplay();
    this.updateFavoritesDisplay();
    this.initializeIcons();
  }
  
  bindElements() {
    this.elements = {
      // Views
      homeView: document.getElementById('homeView'),
      productView: document.getElementById('productView'),
      checkoutView: document.getElementById('checkoutView'),
      
      // Search
      searchInputDesktop: document.getElementById('searchInputDesktop'),
      searchInputMobile: document.getElementById('searchInputMobile'),
      clearSearchDesktop: document.getElementById('clearSearchDesktop'),
      clearSearchMobile: document.getElementById('clearSearchMobile'),
      
      // Navigation
      desktopNav: document.getElementById('desktopNav'),
      mobileNav: document.getElementById('mobileNav'),
      mobileNavGrid: document.getElementById('mobileNavGrid'),
      mobileMenuBtn: document.getElementById('mobileMenuBtn'),
      mobileMenuIcon: document.getElementById('mobileMenuIcon'),
      
      // Header actions
      favoritesBtn: document.getElementById('favoritesBtn'),
      favoritesBadge: document.getElementById('favoritesBadge'),
      cartBtn: document.getElementById('cartBtn'),
      cartBadge: document.getElementById('cartBadge'),
      cartTotal: document.getElementById('cartTotal'),
      
      // Products
      productsGrid: document.getElementById('productsGrid'),
      searchResults: document.getElementById('searchResults'),
      searchResultsText: document.getElementById('searchResultsText'),
      clearSearchBtn: document.getElementById('clearSearchBtn'),
      clearSearchFromNoResults: document.getElementById('clearSearchFromNoResults'),
      noResults: document.getElementById('noResults'),
      
      // Sidebars
      cartSidebar: document.getElementById('cartSidebar'),
      favoritesSidebar: document.getElementById('favoritesSidebar'),
      
      // Others
      heroBtn: document.getElementById('heroBtn')
    };
  }
  
  setupEventListeners() {
    // Search functionality
    if (this.elements.searchInputDesktop) {
      this.elements.searchInputDesktop.addEventListener('input', (e) => {
        this.handleSearchChange(e.target.value);
      });
    }
    
    if (this.elements.searchInputMobile) {
      this.elements.searchInputMobile.addEventListener('input', (e) => {
        this.handleSearchChange(e.target.value);
      });
    }
    
    // Clear search buttons
    if (this.elements.clearSearchDesktop) {
      this.elements.clearSearchDesktop.addEventListener('click', () => {
        this.handleSearchChange('');
      });
    }
    
    if (this.elements.clearSearchMobile) {
      this.elements.clearSearchMobile.addEventListener('click', () => {
        this.handleSearchChange('');
      });
    }
    
    if (this.elements.clearSearchBtn) {
      this.elements.clearSearchBtn.addEventListener('click', () => {
        this.handleClearSearch();
      });
    }
    
    if (this.elements.clearSearchFromNoResults) {
      this.elements.clearSearchFromNoResults.addEventListener('click', () => {
        this.handleClearSearch();
      });
    }
    
    // Mobile menu
    if (this.elements.mobileMenuBtn) {
      this.elements.mobileMenuBtn.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }
    
    // Header actions
    if (this.elements.favoritesBtn) {
      this.elements.favoritesBtn.addEventListener('click', () => {
        this.handleFavoritesOpen();
      });
    }
    
    if (this.elements.cartBtn) {
      this.elements.cartBtn.addEventListener('click', () => {
        this.handleCartOpen();
      });
    }
    
    // Hero button
    if (this.elements.heroBtn) {
      this.elements.heroBtn.addEventListener('click', () => {
        this.scrollToProducts();
      });
    }
    
    // Products grid
    if (this.elements.productsGrid) {
      this.elements.productsGrid.addEventListener('click', (e) => {
        this.handleProductGridClick(e);
      });
    }
    
    // Global click outside
    document.addEventListener('click', (e) => {
      if (e.target.closest('.sidebar')) return;
      if (e.target.closest('#cartBtn') || e.target.closest('#favoritesBtn')) return;
      
      if (this.state.isCartOpen || this.state.isFavoritesOpen) {
        this.closeSidebars();
      }
    });
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSidebars();
        if (this.state.isMobileMenuOpen) {
          this.toggleMobileMenu();
        }
      }
    });
    
    // Storage events
    window.addEventListener('cart-changed', () => {
      this.updateCartDisplay();
      this.renderCart();
    });
    
    window.addEventListener('favorites-changed', () => {
      this.updateFavoritesDisplay();
      this.renderFavorites();
      this.renderProducts(); // Re-render to update heart icons
    });
  }
  
  // Produtos filtrados por categoria e pesquisa (same logic as React useMemo)
  getFilteredProducts() {
    let filtered = window.products || [];

    // Filtro por categoria
    if (this.state.selectedCategory !== 'Todos') {
      filtered = filtered.filter(product => product.category === this.state.selectedCategory);
    }

    // Filtro por pesquisa
    if (this.state.searchTerm.trim()) {
      const searchLower = this.state.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.fullDescription.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }
  
  // Handlers de navegação (same as React handlers)
  handleProductClick(product) {
    this.state.selectedProduct = product;
    this.state.currentView = 'product';
    this.showView('product');
    this.renderProductPage(product);
  }

  handleBackToHome() {
    this.state.selectedProduct = null;
    this.state.currentView = 'home';
    this.showView('home');
  }

  handleGoToCheckout() {
    this.state.isCartOpen = false;
    this.state.currentView = 'checkout';
    this.closeSidebars();
    this.showView('checkout');
    this.renderCheckoutPage();
  }

  handleBackFromCheckout() {
    this.state.currentView = 'home';
    this.showView('home');
  }

  // Handlers do carrinho (same as React handlers)
  handleCartOpen() {
    this.state.isCartOpen = true;
    this.state.isFavoritesOpen = false;
    this.renderCart();
    this.showSidebar('cart');
  }

  handleCartClose() {
    this.state.isCartOpen = false;
    this.hideSidebar('cart');
  }

  // Handlers dos favoritos (same as React handlers)
  handleFavoritesOpen() {
    this.state.isFavoritesOpen = true;
    this.state.isCartOpen = false;
    this.renderFavorites();
    this.showSidebar('favorites');
  }

  handleFavoritesClose() {
    this.state.isFavoritesOpen = false;
    this.hideSidebar('favorites');
  }

  // Handlers de categoria (same as React handlers)
  handleCategoryChange(category) {
    this.state.selectedCategory = category;
    this.state.selectedProduct = null;
    this.state.currentView = 'home';
    this.showView('home');
    this.renderCategories();
    this.renderProducts();
    this.updateSearchResults();
  }

  // Handler de pesquisa (same as React handlers)
  handleSearchChange(term) {
    this.state.searchTerm = term;
    this.state.selectedProduct = null;
    this.state.currentView = 'home';
    this.showView('home');
    this.syncSearchInputs(term);
    this.updateClearButtonVisibility(term);
    this.renderProducts();
    this.updateSearchResults();
  }

  // Handler para limpar pesquisa (same as React handlers)
  handleClearSearch() {
    this.state.searchTerm = '';
    this.state.selectedCategory = 'Todos';
    this.syncSearchInputs('');
    this.updateClearButtonVisibility('');
    this.renderCategories();
    this.renderProducts();
    this.updateSearchResults();
  }

  // Handler para adicionar ao carrinho (abre automaticamente)
  handleAddToCartAndOpen() {
    this.handleCartOpen();
  }
  
  // View management
  showView(viewName) {
    // Hide all views
    ['homeView', 'productView', 'checkoutView'].forEach(view => {
      const element = this.elements[view];
      if (element) {
        element.classList.remove('active');
      }
    });
    
    // Show selected view
    const viewElement = this.elements[viewName + 'View'];
    if (viewElement) {
      viewElement.classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Search helpers
  syncSearchInputs(value) {
    if (this.elements.searchInputDesktop) {
      this.elements.searchInputDesktop.value = value;
    }
    if (this.elements.searchInputMobile) {
      this.elements.searchInputMobile.value = value;
    }
  }
  
  updateClearButtonVisibility(searchTerm) {
    const hasValue = searchTerm.trim().length > 0;
    
    if (this.elements.clearSearchDesktop) {
      this.elements.clearSearchDesktop.classList.toggle('hidden', !hasValue);
    }
    
    if (this.elements.clearSearchMobile) {
      this.elements.clearSearchMobile.classList.toggle('hidden', !hasValue);
    }
  }
  
  updateSearchResults() {
    const filteredProducts = this.getFilteredProducts();
    const { searchTerm, selectedCategory } = this.state;
    
    if (!this.elements.searchResults || !this.elements.searchResultsText || !this.elements.noResults) {
      return;
    }
    
    // Show/hide search results
    if (searchTerm.trim() || selectedCategory !== 'Todos') {
      this.elements.searchResults.classList.remove('hidden');
      let text = '';
      if (searchTerm.trim() && selectedCategory !== 'Todos') {
        text = `${filteredProducts.length} produtos encontrados para "${searchTerm}" em ${selectedCategory}`;
      } else if (searchTerm.trim()) {
        text = `${filteredProducts.length} produtos encontrados para "${searchTerm}"`;
      } else if (selectedCategory !== 'Todos') {
        text = `${filteredProducts.length} produtos em ${selectedCategory}`;
      }
      this.elements.searchResultsText.textContent = text;
    } else {
      this.elements.searchResults.classList.add('hidden');
    }
    
    // Show/hide no results message
    if (filteredProducts.length === 0 && (searchTerm.trim() || selectedCategory !== 'Todos')) {
      this.elements.noResults.classList.remove('hidden');
    } else {
      this.elements.noResults.classList.add('hidden');
    }
  }
  
  // Mobile menu
  toggleMobileMenu() {
    this.state.isMobileMenuOpen = !this.state.isMobileMenuOpen;
    
    if (this.elements.mobileNav) {
      this.elements.mobileNav.classList.toggle('hidden', !this.state.isMobileMenuOpen);
    }
    
    if (this.elements.mobileMenuIcon) {
      const iconName = this.state.isMobileMenuOpen ? 'x' : 'menu';
      this.elements.mobileMenuIcon.setAttribute('data-lucide', iconName);
      this.initializeIcons();
    }
  }
  
  // Categories rendering
  renderCategories() {
    if (!this.elements.desktopNav || !this.elements.mobileNavGrid) return;
    
    const { selectedCategory } = this.state;
    
    // Desktop categories
    const desktopHTML = window.categories.map(category => `
      <button
        class="btn btn-sm text-sm font-medium whitespace-nowrap transition-colors ${
          selectedCategory === category 
            ? 'bg-red-600 hover:bg-red-700 text-white' 
            : 'btn-ghost text-muted-foreground hover:text-red-600 hover:bg-red-50'
        }"
        onclick="app.handleCategoryChange('${category}')"
      >
        ${category}
      </button>
    `).join('');
    
    this.elements.desktopNav.innerHTML = desktopHTML;
    
    // Mobile categories
    const mobileHTML = window.categories.map(category => `
      <button
        class="btn btn-sm text-sm justify-start font-medium ${
          selectedCategory === category 
            ? 'bg-red-600 hover:bg-red-700 text-white' 
            : 'btn-ghost text-muted-foreground hover:text-red-600'
        }"
        onclick="app.handleCategoryChange('${category}'); app.toggleMobileMenu();"
      >
        ${category}
      </button>
    `).join('');
    
    this.elements.mobileNavGrid.innerHTML = mobileHTML;
  }
  
  // Products rendering
  renderProducts() {
    const filteredProducts = this.getFilteredProducts();
    
    if (!this.elements.productsGrid) return;
    
    if (filteredProducts.length === 0) {
      this.elements.productsGrid.innerHTML = '';
      return;
    }
    
    const productsHTML = filteredProducts.map(product => this.generateProductHTML(product)).join('');
    this.elements.productsGrid.innerHTML = productsHTML;
    this.initializeIcons();
  }
  
  generateProductHTML(product) {
    const isFavorited = FavoritesStorage.isFavorite(product.id);
    const hasDiscount = product.discount > 0;
    const hasFreeShipping = product.price >= 200;
    
    return `
      <div class="product-card bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer" 
           data-product-id="${product.id}">
        <div class="relative overflow-hidden">
          <img 
            src="${product.image}" 
            alt="${product.name}"
            class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          >
          
          ${hasDiscount ? `
            <div class="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              -${product.discount}%
            </div>
          ` : ''}
          
          <button class="product-favorite absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white border border-red-200 rounded-full flex items-center justify-center transition-all ${isFavorited ? 'text-red-600' : 'text-gray-400'}" 
                  data-product-id="${product.id}">
            <i data-lucide="heart" class="w-4 h-4 ${isFavorited ? 'fill-current' : ''}"></i>
          </button>
          
          ${hasFreeShipping ? `
            <div class="absolute bottom-3 left-3 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
              <i data-lucide="truck" class="w-3 h-3"></i>
              Frete Grátis
            </div>
          ` : ''}
          
          ${!product.inStock ? `
            <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div class="bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium">
                Esgotado
              </div>
            </div>
          ` : ''}
        </div>
        
        <div class="p-4">
          <div class="inline-block bg-red-50 text-red-600 text-xs font-medium px-2 py-1 rounded border border-red-200 mb-2">
            ${product.category}
          </div>
          
          <h3 class="font-semibold mb-2 line-clamp-2 text-foreground hover:text-red-600 transition-colors">
            ${product.name}
          </h3>
          
          <p class="text-sm text-muted-foreground mb-3 line-clamp-2">
            ${product.description}
          </p>
          
          <div class="flex items-center gap-2 mb-3">
            <div class="flex items-center">
              ${this.generateStarsHTML(product.rating)}
            </div>
            <span class="text-xs text-muted-foreground">
              ${product.rating} (${product.reviews})
            </span>
          </div>
          
          <div class="flex items-end gap-2 mb-2">
            <span class="text-lg font-bold text-foreground">
              ${this.formatCurrency(product.price)}
            </span>
            ${hasDiscount ? `
              <span class="text-sm text-muted-foreground line-through">
                ${this.formatCurrency(product.originalPrice)}
              </span>
            ` : ''}
          </div>
          
          <p class="text-xs text-muted-foreground mb-4">
            12x de ${this.formatCurrency(product.price / 12)} sem juros
          </p>
          
          <button class="product-add-btn w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}" 
                  data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
            <i data-lucide="shopping-cart" class="w-4 h-4"></i>
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
      starsHTML += '<i data-lucide="star" class="w-3 h-3 text-yellow-400 fill-current"></i>';
    }
    
    if (hasHalfStar) {
      starsHTML += '<i data-lucide="star" class="w-3 h-3 text-yellow-400"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i data-lucide="star" class="w-3 h-3 text-gray-300"></i>';
    }
    
    return starsHTML;
  }
  
  handleProductGridClick(e) {
    const productCard = e.target.closest('.product-card');
    if (!productCard) return;
    
    const productId = productCard.dataset.productId;
    const product = window.products.find(p => p.id === productId);
    
    if (!product) return;
    
    if (e.target.closest('.product-favorite')) {
      e.stopPropagation();
      this.toggleFavorite(product);
      return;
    }
    
    if (e.target.closest('.product-add-btn')) {
      e.stopPropagation();
      if (product.inStock) {
        this.addToCart(product);
      }
      return;
    }
    
    // Navigate to product page
    this.handleProductClick(product);
  }
  
  toggleFavorite(product) {
    const wasAdded = FavoritesStorage.toggleItem(product);
    
    const message = wasAdded 
      ? `${product.name} adicionado aos favoritos!`
      : `${product.name} removido dos favoritos`;
    
    Toast.success(message);
  }
  
  addToCart(product, quantity = 1) {
    if (!product.inStock) return;
    
    CartStorage.addItem(product, quantity);
    Toast.success(`${product.name} adicionado ao carrinho!`);
    
    // Open cart automatically
    setTimeout(() => {
      this.handleCartOpen();
    }, 500);
  }
  
  // Cart and Favorites rendering
  renderCart() {
    if (!this.elements.cartSidebar) return;
    
    const { total, itemCount, items } = CartStorage.getTotals();
    const shippingCost = total >= 200 ? 0 : 15.90;
    const finalTotal = total + shippingCost;
    
    this.elements.cartSidebar.innerHTML = `
      ${this.state.isCartOpen ? '<div class="sidebar-overlay" onclick="app.handleCartClose()"></div>' : ''}
      <div class="sidebar-content bg-card border-l border-border w-96 h-full flex flex-col ${this.state.isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300">
        <div class="flex items-center justify-between p-4 border-b border-border">
          <div class="flex items-center gap-2">
            <i data-lucide="shopping-cart" class="w-5 h-5 text-red-600"></i>
            <span class="font-semibold">Carrinho</span>
            ${itemCount > 0 ? `<span class="badge bg-red-600 text-white">${itemCount}</span>` : ''}
          </div>
          <button onclick="app.handleCartClose()" class="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-4">
          ${items.length === 0 ? this.renderEmptyCart() : this.renderCartItems(items)}
        </div>
        
        ${items.length > 0 ? this.renderCartFooter(total, shippingCost, finalTotal) : ''}
      </div>
    `;
    
    this.initializeIcons();
  }
  
  renderEmptyCart() {
    return `
      <div class="flex flex-col items-center justify-center text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i data-lucide="shopping-cart" class="w-8 h-8 text-gray-400"></i>
        </div>
        <h3 class="font-semibold mb-2">Carrinho vazio</h3>
        <p class="text-sm text-muted-foreground mb-4">Adicione produtos para começar suas compras!</p>
        <button onclick="app.handleCartClose()" class="btn btn-primary">
          Continuar Comprando
        </button>
      </div>
    `;
  }
  
  renderCartItems(items) {
    return items.map(item => `
      <div class="flex gap-3 p-3 bg-gray-50 rounded-lg mb-3">
        <img src="${item.product.image}" alt="${item.product.name}" class="w-16 h-16 object-cover rounded">
        <div class="flex-1 min-w-0">
          <h4 class="font-medium text-sm mb-1 line-clamp-2">${item.product.name}</h4>
          <p class="text-red-600 font-semibold text-sm mb-2">${this.formatCurrency(item.product.price)}</p>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button onclick="app.updateCartQuantity('${item.product.id}', ${item.quantity - 1})" 
                      class="w-6 h-6 hover:bg-gray-200 rounded flex items-center justify-center ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}"
                      ${item.quantity <= 1 ? 'disabled' : ''}>
                <i data-lucide="minus" class="w-3 h-3"></i>
              </button>
              <span class="text-sm font-medium w-6 text-center">${item.quantity}</span>
              <button onclick="app.updateCartQuantity('${item.product.id}', ${item.quantity + 1})" 
                      class="w-6 h-6 hover:bg-gray-200 rounded flex items-center justify-center">
                <i data-lucide="plus" class="w-3 h-3"></i>
              </button>
            </div>
            <button onclick="app.removeFromCart('${item.product.id}')" 
                    class="w-6 h-6 hover:bg-red-100 rounded flex items-center justify-center text-red-600">
              <i data-lucide="trash-2" class="w-3 h-3"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  renderCartFooter(total, shippingCost, finalTotal) {
    return `
      <div class="border-t border-border p-4">
        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${this.formatCurrency(total)}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>Frete:</span>
            <span class="${shippingCost === 0 ? 'text-green-600' : ''}">${shippingCost === 0 ? 'GRÁTIS' : this.formatCurrency(shippingCost)}</span>
          </div>
          <div class="flex justify-between font-semibold text-red-600 pt-2 border-t border-border">
            <span>Total:</span>
            <span>${this.formatCurrency(finalTotal)}</span>
          </div>
        </div>
        
        <button onclick="app.handleGoToCheckout()" class="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold mb-2 flex items-center justify-center gap-2">
          Finalizar Compra
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
        
        <button onclick="app.clearCart()" class="w-full border border-red-200 text-red-600 hover:bg-red-50 py-2 px-4 rounded-lg text-sm">
          Limpar Carrinho
        </button>
      </div>
    `;
  }
  
  renderFavorites() {
    if (!this.elements.favoritesSidebar) return;
    
    const items = FavoritesStorage.getItems();
    
    this.elements.favoritesSidebar.innerHTML = `
      ${this.state.isFavoritesOpen ? '<div class="sidebar-overlay" onclick="app.handleFavoritesClose()"></div>' : ''}
      <div class="sidebar-content bg-card border-l border-border w-96 h-full flex flex-col ${this.state.isFavoritesOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300">
        <div class="flex items-center justify-between p-4 border-b border-border">
          <div class="flex items-center gap-2">
            <i data-lucide="heart" class="w-5 h-5 text-red-600"></i>
            <span class="font-semibold">Favoritos</span>
            ${items.length > 0 ? `<span class="badge bg-red-600 text-white">${items.length}</span>` : ''}
          </div>
          <button onclick="app.handleFavoritesClose()" class="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-4">
          ${items.length === 0 ? this.renderEmptyFavorites() : this.renderFavoritesItems(items)}
        </div>
        
        ${items.length > 0 ? this.renderFavoritesFooter() : ''}
      </div>
    `;
    
    this.initializeIcons();
  }
  
  renderEmptyFavorites() {
    return `
      <div class="flex flex-col items-center justify-center text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i data-lucide="heart" class="w-8 h-8 text-gray-400"></i>
        </div>
        <h3 class="font-semibold mb-2">Nenhum favorito ainda</h3>
        <p class="text-sm text-muted-foreground mb-4">Adicione produtos aos favoritos para vê-los aqui</p>
        <button onclick="app.handleFavoritesClose()" class="btn btn-primary">
          Explorar Produtos
        </button>
      </div>
    `;
  }
  
  renderFavoritesItems(items) {
    return items.map(product => `
      <div class="flex gap-3 p-3 bg-gray-50 rounded-lg mb-3">
        <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded">
        <div class="flex-1 min-w-0">
          <h4 class="font-medium text-sm mb-1 line-clamp-2">${product.name}</h4>
          <div class="text-xs text-gray-500 mb-1">${product.category}</div>
          <p class="text-red-600 font-semibold text-sm mb-2">${this.formatCurrency(product.price)}</p>
          <div class="flex items-center justify-between">
            <button onclick="app.addToCart(window.products.find(p => p.id === '${product.id}'))" 
                    class="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1 ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}"
                    ${!product.inStock ? 'disabled' : ''}>
              <i data-lucide="shopping-cart" class="w-3 h-3"></i>
              ${product.inStock ? 'Adicionar' : 'Esgotado'}
            </button>
            <button onclick="app.removeFromFavorites('${product.id}')" 
                    class="w-6 h-6 hover:bg-red-100 rounded flex items-center justify-center text-red-600">
              <i data-lucide="trash-2" class="w-3 h-3"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  renderFavoritesFooter() {
    return `
      <div class="border-t border-border p-4">
        <button onclick="app.clearFavorites()" class="w-full border border-red-200 text-red-600 hover:bg-red-50 py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
          Limpar Favoritos
        </button>
      </div>
    `;
  }
  
  // Sidebar management
  showSidebar(type) {
    const sidebarElement = this.elements[type + 'Sidebar'];
    if (sidebarElement) {
      sidebarElement.classList.remove('hidden');
      sidebarElement.classList.add('fixed', 'inset-0', 'z-50', 'flex', 'justify-end');
      document.body.style.overflow = 'hidden';
    }
  }
  
  hideSidebar(type) {
    const sidebarElement = this.elements[type + 'Sidebar'];
    if (sidebarElement) {
      sidebarElement.classList.add('hidden');
      sidebarElement.classList.remove('fixed', 'inset-0', 'z-50', 'flex', 'justify-end');
      if (!this.state.isCartOpen && !this.state.isFavoritesOpen) {
        document.body.style.overflow = '';
      }
    }
  }
  
  closeSidebars() {
    this.handleCartClose();
    this.handleFavoritesClose();
  }
  
  // Cart management methods
  updateCartQuantity(productId, newQuantity) {
    CartStorage.updateQuantity(productId, newQuantity);
  }
  
  removeFromCart(productId) {
    CartStorage.removeItem(productId);
    Toast.success('Item removido do carrinho');
  }
  
  clearCart() {
    CartStorage.clear();
    Toast.success('Carrinho limpo com sucesso');
  }
  
  // Favorites management methods
  removeFromFavorites(productId) {
    FavoritesStorage.removeItem(productId);
    Toast.success('Item removido dos favoritos');
  }
  
  clearFavorites() {
    FavoritesStorage.clear();
    Toast.success('Favoritos limpos com sucesso');
  }
  
  // Display updates
  updateCartDisplay() {
    const { total, itemCount } = CartStorage.getTotals();
    
    if (this.elements.cartBadge) {
      if (itemCount > 0) {
        this.elements.cartBadge.textContent = itemCount;
        this.elements.cartBadge.classList.remove('hidden');
      } else {
        this.elements.cartBadge.classList.add('hidden');
      }
    }
    
    if (this.elements.cartTotal) {
      this.elements.cartTotal.textContent = this.formatCurrency(total);
    }
  }
  
  updateFavoritesDisplay() {
    const items = FavoritesStorage.getItems();
    const count = items.length;
    
    if (this.elements.favoritesBadge) {
      if (count > 0) {
        this.elements.favoritesBadge.textContent = count;
        this.elements.favoritesBadge.classList.remove('hidden');
      } else {
        this.elements.favoritesBadge.classList.add('hidden');
      }
    }
  }
  
  // Render product and checkout pages
  renderProductPage(product) {
    // Implementation will go here
    console.log('Rendering product page for:', product);
  }
  
  renderCheckoutPage() {
    // Implementation will go here
    console.log('Rendering checkout page');
  }
  
  // Utility methods
  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
  
  scrollToProducts() {
    const productsSection = document.getElementById('productsSection');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  
  initializeIcons() {
    if (window.lucide) {
      lucide.createIcons();
    }
  }
}

// Initialize app
const app = new SportsImportsApp();

// Make app globally available for inline event handlers
window.app = app;