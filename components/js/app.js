// Main application - Sports Imports
const App = {
  // Elementos principais
  elements: {},
  
  // Inicialização da aplicação
  init() {
    console.log('🏃‍♀️ Initializing Sports Imports App...');
    
    // Wait for DOM to be ready
    ready(() => {
      this.bindElements();
      this.initializeCore();
      this.initializeComponents();  
      this.setupGlobalEventListeners();
      this.finalizeInitialization();
      
      console.log('✅ Sports Imports App initialized successfully!');
    });
  },
  
  // Bind main elements
  bindElements() {
    this.elements = {
      mainContent: document.querySelector(SELECTORS.MAIN_CONTENT),
      productsGrid: document.querySelector(SELECTORS.PRODUCTS_GRID),
      searchResults: document.querySelector(SELECTORS.SEARCH_RESULTS),
      searchResultsText: document.querySelector(SELECTORS.SEARCH_RESULTS_TEXT),
      clearSearchBtn: document.querySelector(SELECTORS.CLEAR_SEARCH_BTN),
      noResults: document.querySelector(SELECTORS.NO_RESULTS),
      cartSidebar: document.querySelector(SELECTORS.CART_SIDEBAR),
      favoritesSidebar: document.querySelector(SELECTORS.FAVORITES_SIDEBAR)
    };
  },
  
  // Initialize core systems
  initializeCore() {
    AppState.init();
    ViewController.init();
  },
  
  // Initialize all components
  initializeComponents() {
    // Initialize main components
    Header.init();
    Cart.init();
    Favorites.init();
    Products.init();
    
    // Initialize page-specific components if they exist
    if (window.ProductPage) {
      ProductPage.init();
    }
    
    if (window.Checkout) {
      Checkout.init();
    }
  },
  
  // Setup global event listeners
  setupGlobalEventListeners() {
    // Category changes
    Events.listen(EVENTS.CATEGORY_CHANGED, (e) => {
      AppState.setSelectedCategory(e.detail.category);
      this.updateProducts();
      this.updateSearchResults();
    });
    
    // Search changes
    Events.listen(EVENTS.SEARCH_CHANGED, (e) => {
      AppState.setSearchTerm(e.detail.searchTerm);
      this.updateProducts();
      this.updateSearchResults();
    });
    
    // Search cleared
    Events.listen(EVENTS.SEARCH_CLEARED, () => {
      AppState.clearSearch();
      this.updateProducts();
      this.updateSearchResults();
      Header.selectCategory('Todos');
    });
    
    // Clear search button
    if (this.elements.clearSearchBtn) {
      this.elements.clearSearchBtn.addEventListener('click', () => {
        Events.dispatch(EVENTS.SEARCH_CLEARED);
      });
    }
    
    // Sidebar events
    Events.listen(EVENTS.OPEN_CART, () => {
      Cart.open();
    });
    
    Events.listen(EVENTS.OPEN_FAVORITES, () => {
      Favorites.open();
    });
    
    Events.listen(EVENTS.CLOSE_SIDEBAR, () => {
      Cart.close();
      Favorites.close();
    });
    
    // Product events
    Events.listen(EVENTS.PRODUCT_CLICKED, (e) => {
      ViewController.navigateToProduct(e.detail.product);
    });
    
    Events.listen(EVENTS.ADD_TO_CART, (e) => {
      this.handleAddToCart(e.detail.product, e.detail.quantity || 1);
    });
    
    // Sidebar overlay clicks
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains(CSS_CLASSES.SIDEBAR_OVERLAY)) {
        Events.dispatch(EVENTS.CLOSE_SIDEBAR);
      }
    });
    
    // Escape key to close sidebars
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        Events.dispatch(EVENTS.CLOSE_SIDEBAR);
      }
    });
  },
  
  // Handle add to cart with automatic opening
  handleAddToCart(product, quantity = 1) {
    const success = CartStorage.addItem(product, quantity);
    if (success) {
      const productName = product.name;
      const quantityText = quantity > 1 ? `${quantity}x ` : '';
      Toast.success(`${quantityText}${productName} adicionado${quantity > 1 ? 's' : ''} ao carrinho!`);
      
      // Open cart automatically with small delay
      setTimeout(() => {
        Cart.open();
      }, ANIMATION_CONFIG.DURATION.SHORT);
    } else {
      Toast.error('Erro ao adicionar produto ao carrinho');
    }
  },
  
  // Update products display
  updateProducts() {
    if (Products && Products.render) {
      Products.render();
    }
  },
  
  // Update search results display
  updateSearchResults() {
    const searchTerm = AppState.getSearchTerm();
    const category = AppState.getSelectedCategory();
    const filteredProducts = AppState.getFilteredProducts();
    
    if (!this.elements.searchResults || !this.elements.searchResultsText || !this.elements.noResults) {
      return;
    }
    
    // Show/hide search results bar
    if (searchTerm.trim() || category !== 'Todos') {
      this.elements.searchResults.classList.remove(CSS_CLASSES.HIDDEN);
      this.updateSearchResultsText(searchTerm, category, filteredProducts.length);
    } else {
      this.elements.searchResults.classList.add(CSS_CLASSES.HIDDEN);
    }
    
    // Show/hide no results message
    if (filteredProducts.length === 0 && (searchTerm.trim() || category !== 'Todos')) {
      this.elements.noResults.classList.remove(CSS_CLASSES.HIDDEN);
    } else {
      this.elements.noResults.classList.add(CSS_CLASSES.HIDDEN);
    }
  },
  
  // Update search results text
  updateSearchResultsText(searchTerm, category, count) {
    if (!this.elements.searchResultsText) return;
    
    let text = '';
    
    if (searchTerm.trim() && category !== 'Todos') {
      text = `${count} produtos encontrados para "${searchTerm}" em ${category}`;
    } else if (searchTerm.trim()) {
      text = `${count} produtos encontrados para "${searchTerm}"`;
    } else if (category !== 'Todos') {
      text = `${count} produtos em ${category}`;
    }
    
    this.elements.searchResultsText.textContent = text;
  },
  
  // Finalize initialization
  finalizeInitialization() {
    // Initialize lucide icons
    if (window.lucide) {
      lucide.createIcons();
    }
    
    // Initial render
    this.updateProducts();
    this.updateSearchResults();
    
    // Show app (remove loading if any)
    document.body.classList.remove('loading');
    
    // Dispatch app ready event
    Events.dispatch('app-ready');
  },
  
  // Get current app state
  getState() {
    return AppState.getState();
  },
  
  // Utility methods
  getCurrentView() {
    return AppState.getCurrentView();
  },
  
  getFilteredProducts() {
    return AppState.getFilteredProducts();
  }
};

// Global utility functions
window.scrollToProducts = function() {
  scrollToElement('productsSection', 100);
};

window.setCategory = function(category) {
  Header.selectCategory(category);
  scrollToElement('productsSection', 100);
};

window.clearSearch = function() {
  Events.dispatch(EVENTS.SEARCH_CLEARED);
};

// Initialize app when script loads
App.init();