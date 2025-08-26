// Controlador de views da aplicação  
const ViewController = {
  elements: {},
  
  init() {
    this.bindElements();
    this.setupEventListeners();
    this.showView(APP_VIEWS.HOME);
    console.log('ViewController initialized');
  },
  
  bindElements() {
    this.elements = {
      mainContent: document.querySelector(SELECTORS.MAIN_CONTENT),
      homeView: document.querySelector(SELECTORS.HOME_VIEW),
      productView: document.querySelector(SELECTORS.PRODUCT_VIEW),
      checkoutView: document.querySelector(SELECTORS.CHECKOUT_VIEW)
    };
  },
  
  setupEventListeners() {
    // Listen to view changes from AppState
    AppState.addListener('viewChange', (data) => {
      this.showView(data.newView);
    });
    
    // Navigation events
    Events.listen(EVENTS.NAVIGATE_HOME, () => {
      this.navigateToHome();
    });
    
    Events.listen(EVENTS.NAVIGATE_CHECKOUT, () => {
      this.navigateToCheckout();
    });
    
    Events.listen(EVENTS.PRODUCT_CLICKED, (e) => {
      this.navigateToProduct(e.detail.product);
    });
  },
  
  showView(viewName) {
    // Hide all views
    Object.values(this.elements).forEach(element => {
      if (element) {
        element.classList.remove(CSS_CLASSES.ACTIVE);
      }
    });
    
    // Show specific view
    switch (viewName) {
      case APP_VIEWS.HOME:
        if (this.elements.homeView) {
          this.elements.homeView.classList.add(CSS_CLASSES.ACTIVE);
        }
        break;
        
      case APP_VIEWS.PRODUCT:
        if (this.elements.productView) {
          this.elements.productView.classList.add(CSS_CLASSES.ACTIVE);
          this.renderProductView();
        }
        break;
        
      case APP_VIEWS.CHECKOUT:
        if (this.elements.checkoutView) {
          this.elements.checkoutView.classList.add(CSS_CLASSES.ACTIVE);
          this.renderCheckoutView();
        }
        break;
        
      default:
        console.warn(`Unknown view: ${viewName}`);
        this.showView(APP_VIEWS.HOME);
    }
  },
  
  // Navigation methods
  navigateToHome() {
    AppState.setState({
      currentView: APP_VIEWS.HOME,
      selectedProduct: null
    });
  },
  
  navigateToProduct(product) {
    AppState.setState({
      currentView: APP_VIEWS.PRODUCT,
      selectedProduct: product
    });
  },
  
  navigateToCheckout() {
    AppState.setState({
      currentView: APP_VIEWS.CHECKOUT,
      isCartOpen: false
    });
  },
  
  // View rendering methods
  renderProductView() {
    const product = AppState.getSelectedProduct();
    if (!product || !this.elements.productView) return;
    
    this.elements.productView.innerHTML = this.getProductViewHTML(product);
    
    // Initialize lucide icons
    if (window.lucide) {
      lucide.createIcons();
    }
    
    // Setup product page event listeners
    this.setupProductPageListeners();
  },
  
  renderCheckoutView() {
    if (!this.elements.checkoutView) return;
    
    this.elements.checkoutView.innerHTML = this.getCheckoutViewHTML();
    
    // Initialize lucide icons
    if (window.lucide) {
      lucide.createIcons();
    }
    
    // Setup checkout page event listeners
    this.setupCheckoutPageListeners();
  },
  
  // HTML generators
  getProductViewHTML(product) {
    return `
      <div class="min-h-screen bg-background">
        <!-- Product page content will be rendered by ProductPage component -->
        <div id="productPageContent"></div>
      </div>
    `;
  },
  
  getCheckoutViewHTML() {
    return `
      <div class="min-h-screen bg-background">
        <!-- Checkout page content will be rendered by Checkout component -->
        <div id="checkoutPageContent"></div>
      </div>
    `;
  },
  
  // Event listeners setup
  setupProductPageListeners() {
    // Back button
    const backBtn = document.querySelector('.product-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.navigateToHome();
      });
    }
    
    // Add to cart button
    const addToCartBtn = document.querySelector('.product-add-to-cart-btn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        const product = AppState.getSelectedProduct();
        if (product) {
          Events.dispatch(EVENTS.ADD_TO_CART, { product, quantity: 1 });
        }
      });
    }
  },
  
  setupCheckoutPageListeners() {
    // Back button
    const backBtn = document.querySelector('.checkout-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.navigateToHome();
      });
    }
  },
  
  // Get current view element
  getCurrentViewElement() {
    const currentView = AppState.getCurrentView();
    return this.elements[currentView + 'View'] || this.elements.homeView;
  },
  
  // Check if view is active
  isViewActive(viewName) {
    return AppState.getCurrentView() === viewName;
  }
};