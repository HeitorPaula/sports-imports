// Sports Imports - Main Application
class SportsImportsApp {
  constructor() {
    this.state = {
      currentView: 'home',
      selectedProduct: null,
      searchTerm: '',
      selectedCategory: 'Todos',
      filteredProducts: [],
      isCartOpen: false,
      isFavoritesOpen: false,
      isLoading: true
    };
    
    this.components = {};
    this.elements = {};
    
    // Bind methods
    this.init = this.init.bind(this);
    this.bindElements = this.bindElements.bind(this);
    this.setupEventListeners = this.setupEventListeners.bind(this);
  }
  
  async init() {
    console.log('🏃‍♀️ Initializing Sports Imports App...');
    
    try {
      // Wait for DOM to be ready
      await this.waitForDOM();
      
      // Show loading screen for minimum time
      await this.showLoadingScreen();
      
      // Initialize core systems
      this.bindElements();
      this.setupEventListeners();
      
      // Initialize components
      await this.initializeComponents();
      
      // Initial render
      this.updateProducts();
      
      // Hide loading and show app
      this.hideLoadingScreen();
      
      // Initialize icons
      this.initializeIcons();
      
      console.log('✅ Sports Imports App initialized successfully!');
      
    } catch (error) {
      console.error('❌ Error initializing app:', error);
      this.showError('Erro ao carregar a aplicação. Tente recarregar a página.');
      this.hideLoadingScreen();
    }
  }
  
  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }
  
  async showLoadingScreen() {
    // Show loading for minimum 2 seconds for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  bindElements() {
    this.elements = {
      // Main containers
      loadingScreen: document.getElementById('loadingScreen'),
      appContainer: document.getElementById('appContainer'),
      mainContent: document.getElementById('mainContent'),
      homeView: document.getElementById('homeView'),
      productView: document.getElementById('productView'),
      checkoutView: document.getElementById('checkoutView'),
      
      // Products
      productsGrid: document.getElementById('productsGrid'),
      productsLoading: document.getElementById('productsLoading'),
      searchResults: document.getElementById('searchResults'),
      searchResultsText: document.getElementById('searchResultsText'),
      clearSearchBtn: document.getElementById('clearSearchBtn'),
      noResults: document.getElementById('noResults'),
      
      // Sidebars
      cartSidebar: document.getElementById('cartSidebar'),
      favoritesSidebar: document.getElementById('favoritesSidebar'),
      
      // Toast
      toastContainer: document.getElementById('toastContainer')
    };
  }
  
  setupEventListeners() {
    // Global event listeners
    document.addEventListener('click', this.handleGlobalClick.bind(this));
    document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
    
    // Window events
    window.addEventListener('scroll', Utils.throttle(this.handleScroll.bind(this), 100));
    window.addEventListener('resize', Utils.throttle(this.handleResize.bind(this), 250));
    
    // Search clear button
    if (this.elements.clearSearchBtn) {
      this.elements.clearSearchBtn.addEventListener('click', () => {
        this.clearSearch();
      });
    }
  }
  
  async initializeComponents() {
    // Initialize Header
    if (window.HeaderComponent) {
      this.components.header = new HeaderComponent();
      await this.components.header.init();
    }
    
    // Initialize Products
    if (window.ProductsComponent) {
      this.components.products = new ProductsComponent();
      await this.components.products.init();
    }
    
    // Initialize Cart
    if (window.CartComponent) {
      this.components.cart = new CartComponent();
      await this.components.cart.init();
    }
    
    // Initialize Favorites
    if (window.FavoritesComponent) {
      this.components.favorites = new FavoritesComponent();
      await this.components.favorites.init();
    }
    
    // Initialize Product Page
    if (window.ProductPageComponent) {
      this.components.productPage = new ProductPageComponent();
      await this.components.productPage.init();
    }
    
    // Initialize Checkout Page
    if (window.CheckoutPageComponent) {
      this.components.checkoutPage = new CheckoutPageComponent();
      await this.components.checkoutPage.init();
    }
  }
  
  handleGlobalClick(e) {
    // Close sidebars when clicking overlay
    if (e.target.classList.contains('sidebar-overlay')) {
      this.closeSidebars();
    }
  }
  
  handleGlobalKeydown(e) {
    // Close sidebars with Escape key
    if (e.key === 'Escape') {
      this.closeSidebars();
    }
  }
  
  handleScroll() {
    // Add scroll-based animations or lazy loading here
  }
  
  handleResize() {
    // Handle responsive behavior
    this.closeMobileMenus();
  }
  
  // Navigation methods
  navigateHome() {
    this.setState({
      currentView: 'home',
      selectedProduct: null
    });
    this.showView('home');
  }
  
  navigateToProduct(product) {
    this.setState({
      currentView: 'product',
      selectedProduct: product
    });
    this.showView('product');
    
    if (this.components.productPage) {
      this.components.productPage.render(product);
    }
  }
  
  navigateToCheckout() {
    this.setState({
      currentView: 'checkout',
      isCartOpen: false,
      isFavoritesOpen: false
    });
    this.showView('checkout');
    
    if (this.components.checkoutPage) {
      this.components.checkoutPage.render();
    }
  }
  
  showView(viewName) {
    // Hide all views
    const views = ['homeView', 'productView', 'checkoutView'];
    views.forEach(view => {
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
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // State management
  setState(updates) {
    this.state = { ...this.state, ...updates };
    
    // Update filtered products if search or category changed
    if (updates.searchTerm !== undefined || updates.selectedCategory !== undefined) {
      this.updateFilteredProducts();
    }
  }
  
  getState() {
    return { ...this.state };
  }
  
  updateFilteredProducts() {
    this.state.filteredProducts = this.filterProducts(
      this.state.searchTerm,
      this.state.selectedCategory
    );
  }
  
  filterProducts(searchTerm = '', category = 'Todos') {
    let filtered = window.PRODUCTS || [];
    
    // Filter by category
    if (category !== 'Todos') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        (product.fullDescription && product.fullDescription.toLowerCase().includes(searchLower))
      );
    }
    
    return filtered;
  }
  
  // Product management
  updateProducts() {
    this.updateFilteredProducts();
    
    if (this.components.products) {
      this.components.products.render(this.state.filteredProducts);
    }
    
    this.updateSearchResults();
  }
  
  updateSearchResults() {
    const { searchTerm, selectedCategory, filteredProducts } = this.state;
    
    if (!this.elements.searchResults || !this.elements.searchResultsText || !this.elements.noResults) {
      return;
    }
    
    // Show/hide search results bar
    if (searchTerm.trim() || selectedCategory !== 'Todos') {
      this.elements.searchResults.classList.remove('hidden');
      this.updateSearchResultsText(searchTerm, selectedCategory, filteredProducts.length);
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
  }
  
  // Search functionality
  updateSearch(searchTerm) {
    this.setState({ searchTerm });
    this.updateProducts();
  }
  
  updateCategory(category) {
    this.setState({ selectedCategory: category });
    this.updateProducts();
  }
  
  clearSearch() {
    this.setState({
      searchTerm: '',
      selectedCategory: 'Todos'
    });
    
    // Clear search inputs
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
      input.value = '';
    });
    
    // Update header category
    if (this.components.header) {
      this.components.header.setCategory('Todos');
    }
    
    this.updateProducts();
  }
  
  // Cart management
  openCart() {
    this.setState({ isCartOpen: true, isFavoritesOpen: false });
    if (this.elements.cartSidebar) {
      this.elements.cartSidebar.classList.remove('hidden');
    }
    document.body.style.overflow = 'hidden';
    
    if (this.components.cart) {
      this.components.cart.render();
    }
  }
  
  closeCart() {
    this.setState({ isCartOpen: false });
    if (this.elements.cartSidebar) {
      this.elements.cartSidebar.classList.add('hidden');
    }
    if (!this.state.isFavoritesOpen) {
      document.body.style.overflow = '';
    }
  }
  
  // Favorites management
  openFavorites() {
    this.setState({ isFavoritesOpen: true, isCartOpen: false });
    if (this.elements.favoritesSidebar) {
      this.elements.favoritesSidebar.classList.remove('hidden');
    }
    document.body.style.overflow = 'hidden';
    
    if (this.components.favorites) {
      this.components.favorites.render();
    }
  }
  
  closeFavorites() {
    this.setState({ isFavoritesOpen: false });
    if (this.elements.favoritesSidebar) {
      this.elements.favoritesSidebar.classList.add('hidden');
    }
    if (!this.state.isCartOpen) {
      document.body.style.overflow = '';
    }
  }
  
  closeSidebars() {
    this.closeCart();
    this.closeFavorites();
  }
  
  closeMobileMenus() {
    if (this.components.header) {
      this.components.header.closeMobileMenu();
    }
  }
  
  // Actions
  addToCart(product, quantity = 1) {
    if (!product.inStock) return;
    
    for (let i = 0; i < quantity; i++) {
      CartStorage.addItem(product, 1);
    }
    
    const quantityText = quantity > 1 ? `${quantity}x ` : '';
    Toast.success(`${quantityText}${product.name} adicionado ao carrinho!`);
    
    // Open cart automatically
    setTimeout(() => {
      this.openCart();
    }, 150);
  }
  
  // Utility methods
  hideLoadingScreen() {
    if (this.elements.loadingScreen) {
      this.elements.loadingScreen.classList.add('hidden');
    }
    if (this.elements.appContainer) {
      this.elements.appContainer.classList.remove('hidden');
    }
    this.setState({ isLoading: false });
  }
  
  showError(message) {
    Toast.error(message);
  }
  
  initializeIcons() {
    if (window.lucide) {
      lucide.createIcons();
    }
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
  
  // Global methods for inline event handlers
  setCategory(category) {
    this.updateCategory(category);
    this.scrollToProducts();
  }
}

// Global App instance
const App = new SportsImportsApp();

// Global methods for inline handlers
window.App = App;

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}