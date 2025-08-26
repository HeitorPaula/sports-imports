// Sports Imports - Main Application (GitHub Pages Ready)
class SportsImportsApp {
  constructor() {
    this.state = {
      currentView: 'home',
      selectedProduct: null,
      searchTerm: '',
      selectedCategory: 'Todos',
      filteredProducts: []
    };
    
    this.components = {};
    this.elements = {};
  }
  
  async init() {
    console.log('🏃‍♀️ Initializing Sports Imports App...');
    
    try {
      await this.waitForDOM();
      this.bindElements();
      this.setupEventListeners();
      await this.initializeComponents();
      this.updateProducts();
      this.hideLoading();
      this.initializeIcons();
      
      console.log('✅ Sports Imports App initialized successfully!');
    } catch (error) {
      console.error('❌ Error initializing app:', error);
      Toast.error('Erro ao carregar a aplicação. Tente recarregar a página.');
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
  
  bindElements() {
    this.elements = {
      homeView: document.getElementById('homeView'),
      productView: document.getElementById('productView'),
      checkoutView: document.getElementById('checkoutView'),
      productsGrid: document.getElementById('productsGrid'),
      searchResults: document.getElementById('searchResults'),
      searchResultsText: document.getElementById('searchResultsText'),
      noResults: document.getElementById('noResults'),
      cartSidebar: document.getElementById('cartSidebar'),
      favoritesSidebar: document.getElementById('favoritesSidebar'),
      loadingScreen: document.getElementById('loadingScreen')
    };
  }
  
  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('sidebar-overlay')) {
        this.closeSidebars();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSidebars();
      }
    });
  }
  
  async initializeComponents() {
    this.components.header = new HeaderComponent();
    await this.components.header.init();
    
    this.components.products = new ProductsComponent();
    await this.components.products.init();
    
    this.components.cart = new CartComponent();
    await this.components.cart.init();
    
    this.components.favorites = new FavoritesComponent();
    await this.components.favorites.init();
    
    // Store components globally for static method access
    window.HeaderComponent = this.components.header;
    window.CartComponent = CartComponent;
    window.FavoritesComponent = FavoritesComponent;
  }
  
  // Navigation
  navigateHome() {
    this.state.currentView = 'home';
    this.state.selectedProduct = null;
    this.showView('home');
  }
  
  navigateToProduct(product) {
    this.state.currentView = 'product';
    this.state.selectedProduct = product;
    this.showView('product');
    this.renderProductPage(product);
  }
  
  navigateToCheckout() {
    this.state.currentView = 'checkout';
    this.showView('checkout');
    this.renderCheckoutPage();
    this.closeSidebars();
  }
  
  showView(viewName) {
    ['homeView', 'productView', 'checkoutView'].forEach(view => {
      const element = this.elements[view];
      if (element) {
        element.classList.remove('active');
      }
    });
    
    const viewElement = this.elements[viewName + 'View'];
    if (viewElement) {
      viewElement.classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Product management
  updateProducts() {
    this.state.filteredProducts = this.filterProducts(this.state.searchTerm, this.state.selectedCategory);
    
    if (this.components.products) {
      this.components.products.render(this.state.filteredProducts);
    }
    
    this.updateSearchResults();
  }
  
  filterProducts(searchTerm = '', category = 'Todos') {
    let filtered = PRODUCTS;
    
    if (category !== 'Todos') {
      filtered = filtered.filter(product => product.category === category);
    }
    
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
  
  updateSearchResults() {
    const { searchTerm, selectedCategory, filteredProducts } = this.state;
    
    if (searchTerm.trim() || selectedCategory !== 'Todos') {
      this.elements.searchResults?.classList.remove('hidden');
      this.updateSearchResultsText(searchTerm, selectedCategory, filteredProducts.length);
    } else {
      this.elements.searchResults?.classList.add('hidden');
    }
    
    if (filteredProducts.length === 0 && (searchTerm.trim() || selectedCategory !== 'Todos')) {
      this.elements.noResults?.classList.remove('hidden');
    } else {
      this.elements.noResults?.classList.add('hidden');
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
    this.state.searchTerm = searchTerm;
    this.updateProducts();
  }
  
  updateCategory(category) {
    this.state.selectedCategory = category;
    this.updateProducts();
  }
  
  clearSearch() {
    this.state.searchTerm = '';
    this.state.selectedCategory = 'Todos';
    
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => { input.value = ''; });
    
    this.updateProducts();
  }
  
  // Cart management
  openCart() {
    this.elements.cartSidebar?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  
  closeCart() {
    this.elements.cartSidebar?.classList.add('hidden');
    document.body.style.overflow = '';
  }
  
  openFavorites() {
    this.elements.favoritesSidebar?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  
  closeFavorites() {
    this.elements.favoritesSidebar?.classList.add('hidden');
    document.body.style.overflow = '';
  }
  
  closeSidebars() {
    this.closeCart();
    this.closeFavorites();
  }
  
  // Actions
  addToCart(product, quantity = 1) {
    if (!product.inStock) return;
    
    for (let i = 0; i < quantity; i++) {
      CartStorage.addItem(product, 1);
    }
    
    const quantityText = quantity > 1 ? `${quantity}x ` : '';
    Toast.success(`${quantityText}${product.name} adicionado ao carrinho!`);
    
    setTimeout(() => this.openCart(), 150);
  }
  
  // Page rendering
  renderProductPage(product) {
    if (!this.elements.productView || !product) return;
    
    const isFavorited = FavoritesStorage.isFavorite(product.id);
    const hasDiscount = product.discount > 0;
    
    this.elements.productView.innerHTML = `
      <div class="min-h-screen bg-background">
        <div class="sticky top-0 z-40 bg-card border-b border-border">
          <div class="container py-4">
            <button class="btn btn-ghost" onclick="App.navigateHome()">
              <i data-lucide="arrow-left"></i>
              Voltar
            </button>
          </div>
        </div>
        
        <div class="container py-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div class="aspect-square bg-muted rounded-xl overflow-hidden">
              <img src="${product.image}" alt="${Utils.escapeHtml(product.name)}" class="w-full h-full object-cover">
            </div>
            
            <div class="space-y-6">
              <div>
                <div class="text-red-600 border border-red-200 px-2 py-1 rounded text-sm inline-block mb-3">
                  ${product.category}
                </div>
                <h1 class="text-3xl font-bold mb-4">${Utils.escapeHtml(product.name)}</h1>
                <p class="text-lg text-muted-foreground mb-4">${Utils.escapeHtml(product.description)}</p>
              </div>
              
              <div class="space-y-2">
                <div class="flex items-end gap-3">
                  <span class="text-4xl font-bold">${Utils.formatCurrency(product.price)}</span>
                  ${hasDiscount ? `<span class="text-xl text-muted-foreground line-through">${Utils.formatCurrency(product.originalPrice)}</span>` : ''}
                </div>
                <p class="text-muted-foreground">12x de ${Utils.formatCurrency(product.price / 12)} sem juros</p>
              </div>
              
              <button class="btn btn-primary w-full py-4 text-lg" onclick="App.addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')}, 1)" ${!product.inStock ? 'disabled' : ''}>
                <i data-lucide="shopping-cart"></i>
                ${product.inStock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.initializeIcons();
  }
  
  renderCheckoutPage() {
    if (!this.elements.checkoutView) return;
    
    const { total, itemCount, items } = CartStorage.getTotals();
    
    this.elements.checkoutView.innerHTML = `
      <div class="min-h-screen bg-background">
        <div class="sticky top-0 z-40 bg-card border-b border-border">
          <div class="container py-4">
            <button class="btn btn-ghost" onclick="App.navigateHome()">
              <i data-lucide="arrow-left"></i>
              Voltar
            </button>
          </div>
        </div>
        
        <div class="container py-8">
          <h1 class="text-3xl font-bold mb-8">Finalizar Compra</h1>
          
          ${items.length === 0 ? `
            <div class="text-center py-12">
              <h2 class="text-xl font-semibold mb-2">Carrinho vazio</h2>
              <p class="text-muted-foreground mb-6">Adicione produtos para finalizar sua compra</p>
              <button class="btn btn-primary" onclick="App.navigateHome()">Continuar Comprando</button>
            </div>
          ` : `
            <div class="max-w-2xl mx-auto">
              <div class="space-y-4 mb-8">
                ${items.map(item => `
                  <div class="flex gap-3 p-4 border border-border rounded-lg">
                    <img src="${item.product.image}" alt="${Utils.escapeHtml(item.product.name)}" class="w-16 h-16 object-cover rounded">
                    <div class="flex-1">
                      <h3 class="font-medium">${Utils.escapeHtml(item.product.name)}</h3>
                      <p class="text-sm text-muted-foreground">Quantidade: ${item.quantity}</p>
                      <p class="font-semibold text-red-600">${Utils.formatCurrency(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
              
              <div class="card p-6">
                <div class="flex justify-between text-lg font-semibold mb-6">
                  <span>Total:</span>
                  <span class="text-red-600">${Utils.formatCurrency(total)}</span>
                </div>
                
                <button class="btn btn-primary w-full" onclick="App.finishOrder()">
                  Finalizar Pedido
                  <i data-lucide="check"></i>
                </button>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
    
    this.initializeIcons();
  }
  
  finishOrder() {
    CartStorage.clear();
    Toast.success('Pedido realizado com sucesso!');
    setTimeout(() => this.navigateHome(), 1500);
  }
  
  // Utilities
  hideLoading() {
    this.elements.loadingScreen?.classList.add('hidden');
  }
  
  initializeIcons() {
    if (window.lucide) {
      lucide.createIcons();
    }
  }
  
  scrollToProducts() {
    const productsSection = document.getElementById('productsSection');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  setCategory(category) {
    this.updateCategory(category);
    this.scrollToProducts();
  }
}

// Initialize and export
const App = new SportsImportsApp();
window.App = App;

// Start app
App.init();