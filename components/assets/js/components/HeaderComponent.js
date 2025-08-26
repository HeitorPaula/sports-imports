// Sports Imports - Header Component

class HeaderComponent {
  constructor() {
    this.elements = {};
    this.state = {
      isMobileMenuOpen: false,
      selectedCategory: 'Todos'
    };
  }
  
  async init() {
    this.bindElements();
    this.setupEventListeners();
    this.renderCategories();
    this.updateCartDisplay();
    this.updateFavoritesDisplay();
  }
  
  bindElements() {
    this.elements = {
      searchInput: document.getElementById('searchInput'),
      searchInputMobile: document.getElementById('searchInputMobile'),
      searchClear: document.getElementById('searchClear'),
      searchClearMobile: document.getElementById('searchClearMobile'),
      favoritesBtn: document.getElementById('favoritesBtn'),
      favoritesBadge: document.getElementById('favoritesBadge'),
      cartBtn: document.getElementById('cartBtn'),
      cartBadge: document.getElementById('cartBadge'),
      cartTotal: document.getElementById('cartTotal'),
      mobileMenuBtn: document.getElementById('mobileMenuBtn'),
      menuIcon: document.getElementById('menuIcon'),
      navMobile: document.getElementById('navMobile'),
      navDesktop: document.getElementById('navDesktop')
    };
  }
  
  setupEventListeners() {
    // Search functionality
    if (this.elements.searchInput) {
      this.elements.searchInput.addEventListener('input', Utils.debounce((e) => {
        this.handleSearch(e.target.value);
      }, 300));
    }
    
    if (this.elements.searchInputMobile) {
      this.elements.searchInputMobile.addEventListener('input', Utils.debounce((e) => {
        this.handleSearch(e.target.value);
      }, 300));
    }
    
    // Clear buttons
    if (this.elements.searchClear) {
      this.elements.searchClear.addEventListener('click', () => this.clearSearch());
    }
    
    if (this.elements.searchClearMobile) {
      this.elements.searchClearMobile.addEventListener('click', () => this.clearSearch());
    }
    
    // Mobile menu
    if (this.elements.mobileMenuBtn) {
      this.elements.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
    }
    
    // Cart and favorites
    if (this.elements.cartBtn) {
      this.elements.cartBtn.addEventListener('click', () => App.openCart());
    }
    
    if (this.elements.favoritesBtn) {
      this.elements.favoritesBtn.addEventListener('click', () => App.openFavorites());
    }
    
    // Listen to storage changes
    window.addEventListener('cart-changed', () => this.updateCartDisplay());
    window.addEventListener('favorites-changed', () => this.updateFavoritesDisplay());
  }
  
  renderCategories() {
    if (!this.elements.navDesktop || !this.elements.navMobile) return;
    
    const desktopHTML = CATEGORIES.map(category => `
      <button 
        class="category-btn ${category === this.state.selectedCategory ? 'active' : ''}"
        onclick="HeaderComponent.selectCategory('${category}')"
      >
        ${category}
      </button>
    `).join('');
    
    this.elements.navDesktop.innerHTML = desktopHTML;
    
    const mobileHTML = `
      <div class="nav-grid">
        ${CATEGORIES.map(category => `
          <button 
            class="category-btn ${category === this.state.selectedCategory ? 'active' : ''}"
            onclick="HeaderComponent.selectCategory('${category}'); HeaderComponent.closeMobileMenu();"
          >
            ${category}
          </button>
        `).join('')}
      </div>
    `;
    
    this.elements.navMobile.innerHTML = mobileHTML;
  }
  
  handleSearch(searchTerm) {
    this.syncSearchInputs(searchTerm);
    this.updateClearButtonVisibility(searchTerm);
    App.updateSearch(searchTerm);
  }
  
  syncSearchInputs(value) {
    if (this.elements.searchInput && this.elements.searchInput.value !== value) {
      this.elements.searchInput.value = value;
    }
    if (this.elements.searchInputMobile && this.elements.searchInputMobile.value !== value) {
      this.elements.searchInputMobile.value = value;
    }
  }
  
  updateClearButtonVisibility(searchTerm) {
    const hasValue = searchTerm.trim().length > 0;
    
    if (this.elements.searchClear) {
      this.elements.searchClear.classList.toggle('hidden', !hasValue);
    }
    
    if (this.elements.searchClearMobile) {
      this.elements.searchClearMobile.classList.toggle('hidden', !hasValue);
    }
  }
  
  clearSearch() {
    if (this.elements.searchInput) this.elements.searchInput.value = '';
    if (this.elements.searchInputMobile) this.elements.searchInputMobile.value = '';
    
    this.updateClearButtonVisibility('');
    App.clearSearch();
  }
  
  toggleMobileMenu() {
    this.state.isMobileMenuOpen = !this.state.isMobileMenuOpen;
    
    if (this.elements.navMobile) {
      this.elements.navMobile.classList.toggle('hidden', !this.state.isMobileMenuOpen);
    }
    
    if (this.elements.menuIcon) {
      const iconName = this.state.isMobileMenuOpen ? 'x' : 'menu';
      this.elements.menuIcon.setAttribute('data-lucide', iconName);
      
      if (window.lucide) {
        lucide.createIcons();
      }
    }
  }
  
  closeMobileMenu() {
    this.state.isMobileMenuOpen = false;
    
    if (this.elements.navMobile) {
      this.elements.navMobile.classList.add('hidden');
    }
    
    if (this.elements.menuIcon) {
      this.elements.menuIcon.setAttribute('data-lucide', 'menu');
      
      if (window.lucide) {
        lucide.createIcons();
      }
    }
  }
  
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
      this.elements.cartTotal.textContent = Utils.formatCurrency(total);
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
  
  setCategory(category) {
    this.state.selectedCategory = category;
    this.renderCategories();
    App.updateCategory(category);
  }
  
  // Static methods for global access
  static selectCategory(category) {
    if (window.HeaderComponent && window.HeaderComponent.setCategory) {
      window.HeaderComponent.setCategory(category);
    }
  }
  
  static closeMobileMenu() {
    if (window.HeaderComponent && window.HeaderComponent.closeMobileMenu) {
      window.HeaderComponent.closeMobileMenu();
    }
  }
}

// Export to global scope
window.HeaderComponent = HeaderComponent;

// Instância global
window.Header = new HeaderComponent();
