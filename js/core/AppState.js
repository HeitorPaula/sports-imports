// Sports Imports - Application State Management

class AppState {
  constructor() {
    this.state = {
      currentView: 'home',
      selectedCategory: 'Todos',
      selectedProduct: null,
      isCartOpen: false,
      isFavoritesOpen: false,
      searchTerm: '',
      isMobileMenuOpen: false,
      isLoading: false,
      error: null
    };
    
    this.listeners = new Map();
    this.init();
  }
  
  init() {
    // Initialize state from URL or localStorage if needed
    this.loadFromURL();
    
    // Listen for browser navigation
    window.addEventListener('popstate', () => {
      this.loadFromURL();
    });
  }
  
  // Get current state
  getState() {
    return { ...this.state };
  }
  
  // Set state and notify listeners
  setState(newState, shouldUpdateURL = false) {
    const oldState = { ...this.state };
    this.state = { ...this.state, ...newState };
    
    // Update URL if needed
    if (shouldUpdateURL) {
      this.updateURL();
    }
    
    // Notify listeners
    this.notifyListeners(this.state, oldState);
  }
  
  // Subscribe to state changes
  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key).push(callback);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(key);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }
  
  // Notify all listeners
  notifyListeners(newState, oldState) {
    this.listeners.forEach((callbacks, key) => {
      callbacks.forEach(callback => {
        try {
          callback(newState, oldState);
        } catch (error) {
          console.error(`Error in state listener for ${key}:`, error);
        }
      });
    });
  }
  
  // State getters
  getCurrentView() {
    return this.state.currentView;
  }
  
  getSelectedCategory() {
    return this.state.selectedCategory;
  }
  
  getSelectedProduct() {
    return this.state.selectedProduct;
  }
  
  getSearchTerm() {
    return this.state.searchTerm;
  }
  
  isCartOpen() {
    return this.state.isCartOpen;
  }
  
  isFavoritesOpen() {
    return this.state.isFavoritesOpen;
  }
  
  isMobileMenuOpen() {
    return this.state.isMobileMenuOpen;
  }
  
  isLoading() {
    return this.state.isLoading;
  }
  
  getError() {
    return this.state.error;
  }
  
  // State setters
  setCurrentView(view, product = null) {
    this.setState({
      currentView: view,
      selectedProduct: product,
      isCartOpen: false,
      isFavoritesOpen: false,
      isMobileMenuOpen: false
    }, true);
  }
  
  setSelectedCategory(category) {
    this.setState({
      selectedCategory: category,
      currentView: 'home',
      selectedProduct: null
    });
  }
  
  setSearchTerm(term) {
    this.setState({
      searchTerm: term,
      currentView: 'home',
      selectedProduct: null
    });
  }
  
  openCart() {
    this.setState({
      isCartOpen: true,
      isFavoritesOpen: false
    });
  }
  
  closeCart() {
    this.setState({ isCartOpen: false });
  }
  
  openFavorites() {
    this.setState({
      isFavoritesOpen: true,
      isCartOpen: false
    });
  }
  
  closeFavorites() {
    this.setState({ isFavoritesOpen: false });
  }
  
  toggleMobileMenu() {
    this.setState({
      isMobileMenuOpen: !this.state.isMobileMenuOpen
    });
  }
  
  closeMobileMenu() {
    this.setState({ isMobileMenuOpen: false });
  }
  
  setLoading(loading) {
    this.setState({ isLoading: loading });
  }
  
  setError(error) {
    this.setState({ error });
  }
  
  clearError() {
    this.setState({ error: null });
  }
  
  // Navigation methods
  goToHome() {
    this.setCurrentView('home');
  }
  
  goToProduct(product) {
    this.setCurrentView('product', product);
  }
  
  goToCheckout() {
    this.setCurrentView('checkout');
  }
  
  goBack() {
    const { currentView } = this.state;
    
    if (currentView === 'product' || currentView === 'checkout') {
      this.goToHome();
    }
  }
  
  // URL management
  updateURL() {
    const { currentView, selectedProduct, selectedCategory, searchTerm } = this.state;
    let url = '/';
    
    if (currentView === 'product' && selectedProduct) {
      url = `/product/${selectedProduct.id}`;
    } else if (currentView === 'checkout') {
      url = '/checkout';
    } else if (searchTerm || selectedCategory !== 'Todos') {
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);
      if (selectedCategory !== 'Todos') params.set('category', selectedCategory);
      url = `/?${params.toString()}`;
    }
    
    window.history.pushState({ currentView, selectedProduct, selectedCategory, searchTerm }, '', url);
  }
  
  loadFromURL() {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    
    if (path === '/checkout') {
      this.setState({ currentView: 'checkout' });
    } else if (path.startsWith('/product/')) {
      const productId = path.split('/')[2];
      const product = window.products?.find(p => p.id === productId);
      if (product) {
        this.setState({ 
          currentView: 'product', 
          selectedProduct: product 
        });
      } else {
        this.setState({ currentView: 'home' });
      }
    } else {
      const searchTerm = params.get('search') || '';
      const selectedCategory = params.get('category') || 'Todos';
      
      this.setState({
        currentView: 'home',
        searchTerm,
        selectedCategory,
        selectedProduct: null
      });
    }
  }
  
  // Clear all sidebars and menus
  closeAllOverlays() {
    this.setState({
      isCartOpen: false,
      isFavoritesOpen: false,
      isMobileMenuOpen: false
    });
  }
  
  // Reset search and filters
  resetFilters() {
    this.setState({
      searchTerm: '',
      selectedCategory: 'Todos'
    });
  }
}

// Export to global scope
window.AppState = AppState;