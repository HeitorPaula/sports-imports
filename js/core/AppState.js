// Gerenciador de estado da aplicação
const AppState = {
  // Estado inicial
  state: {
    currentView: APP_VIEWS.HOME,
    selectedProduct: null,
    searchTerm: '',
    selectedCategory: 'Todos',
    filteredProducts: [],
    isMobileMenuOpen: false,
    isCartOpen: false,
    isFavoritesOpen: false
  },
  
  // Listeners para mudanças de estado
  listeners: {
    stateChange: [],
    viewChange: [],
    searchChange: [],
    categoryChange: []
  },
  
  // Inicializar estado
  init() {
    this.updateFilteredProducts();
    console.log('AppState initialized');
  },
  
  // Getter para o estado atual
  getState() {
    return { ...this.state };
  },
  
  // Setter genérico para o estado
  setState(updates) {
    const oldState = { ...this.state };
    this.state = { ...this.state, ...updates };
    
    // Notificar listeners
    this.notifyListeners('stateChange', { oldState, newState: this.state });
    
    return this.state;
  },
  
  // Métodos específicos para cada propriedade do estado
  setCurrentView(view) {
    if (Object.values(APP_VIEWS).includes(view)) {
      const oldView = this.state.currentView;
      this.setState({ currentView: view });
      this.notifyListeners('viewChange', { oldView, newView: view });
      Events.dispatch(EVENTS.VIEW_CHANGED, { view });
    }
  },
  
  setSelectedProduct(product) {
    this.setState({ selectedProduct: product });
  },
  
  setSearchTerm(searchTerm) {
    const oldTerm = this.state.searchTerm;
    this.setState({ searchTerm });
    this.updateFilteredProducts();
    this.notifyListeners('searchChange', { oldTerm, newTerm: searchTerm });
  },
  
  setSelectedCategory(category) {
    const oldCategory = this.state.selectedCategory;
    this.setState({ selectedCategory: category });
    this.updateFilteredProducts();
    this.notifyListeners('categoryChange', { oldCategory, newCategory: category });
  },
  
  setMobileMenuOpen(isOpen) {
    this.setState({ isMobileMenuOpen: isOpen });
  },
  
  setCartOpen(isOpen) {
    this.setState({ isCartOpen: isOpen });
  },
  
  setFavoritesOpen(isOpen) {
    this.setState({ isFavoritesOpen: isOpen });
  },
  
  // Atualizar produtos filtrados
  updateFilteredProducts() {
    const filtered = searchProducts(this.state.searchTerm, this.state.selectedCategory);
    this.setState({ filteredProducts: filtered });
  },
  
  // Sistema de listeners
  addListener(type, callback) {
    if (this.listeners[type]) {
      this.listeners[type].push(callback);
    }
  },
  
  removeListener(type, callback) {
    if (this.listeners[type]) {
      const index = this.listeners[type].indexOf(callback);
      if (index > -1) {
        this.listeners[type].splice(index, 1);
      }
    }
  },
  
  notifyListeners(type, data) {
    if (this.listeners[type]) {
      this.listeners[type].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${type} listener:`, error);
        }
      });
    }
  },
  
  // Métodos de conveniência
  getCurrentView() {
    return this.state.currentView;
  },
  
  getSelectedProduct() {
    return this.state.selectedProduct;
  },
  
  getSearchTerm() {
    return this.state.searchTerm;
  },
  
  getSelectedCategory() {
    return this.state.selectedCategory;
  },
  
  getFilteredProducts() {
    return this.state.filteredProducts;
  },
  
  isMobileMenuOpen() {
    return this.state.isMobileMenuOpen;
  },
  
  isCartOpen() {
    return this.state.isCartOpen;
  },
  
  isFavoritesOpen() {
    return this.state.isFavoritesOpen;
  },
  
  // Reset do estado
  reset() {
    this.state = {
      currentView: APP_VIEWS.HOME,
      selectedProduct: null,
      searchTerm: '',
      selectedCategory: 'Todos',
      filteredProducts: [],
      isMobileMenuOpen: false,
      isCartOpen: false,
      isFavoritesOpen: false
    };
    this.updateFilteredProducts();
  },
  
  // Clear search e categoria
  clearSearch() {
    this.setState({
      searchTerm: '',
      selectedCategory: 'Todos'
    });
    this.updateFilteredProducts();
  }
};