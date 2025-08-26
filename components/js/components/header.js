// Header component functionality
const Header = {
  elements: {
    header: null,
    searchInput: null,
    searchInputMobile: null,
    searchClear: null,
    searchClearMobile: null,
    favoritesBtn: null,
    favoritesBadge: null,
    cartBtn: null,
    cartBadge: null,
    cartTotal: null,
    mobileMenuBtn: null,
    menuIcon: null,
    navMobile: null,
    navDesktop: null
  },
  
  state: {
    isMobileMenuOpen: false,
    selectedCategory: 'Todos'
  },
  
  init() {
    this.bindElements();
    this.setupEventListeners();
    this.renderCategories();
    this.updateCartDisplay();
    this.updateFavoritesDisplay();
  },
  
  bindElements() {
    this.elements.header = document.getElementById('header');
    this.elements.searchInput = document.getElementById('searchInput');
    this.elements.searchInputMobile = document.getElementById('searchInputMobile');
    this.elements.searchClear = document.getElementById('searchClear');
    this.elements.searchClearMobile = document.getElementById('searchClearMobile');
    this.elements.favoritesBtn = document.getElementById('favoritesBtn');
    this.elements.favoritesBadge = document.getElementById('favoritesBadge');
    this.elements.cartBtn = document.getElementById('cartBtn');
    this.elements.cartBadge = document.getElementById('cartBadge');
    this.elements.cartTotal = document.getElementById('cartTotal');
    this.elements.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.elements.menuIcon = document.getElementById('menuIcon');
    this.elements.navMobile = document.getElementById('navMobile');
    this.elements.navDesktop = document.getElementById('navDesktop');
  },
  
  setupEventListeners() {
    // Search functionality
    if (this.elements.searchInput) {
      this.elements.searchInput.addEventListener('input', debounce((e) => {
        this.handleSearch(e.target.value);
        this.syncSearchInputs(e.target.value);
      }, 300));
    }
    
    if (this.elements.searchInputMobile) {
      this.elements.searchInputMobile.addEventListener('input', debounce((e) => {
        this.handleSearch(e.target.value);
        this.syncSearchInputs(e.target.value);
      }, 300));
    }
    
    // Search clear buttons
    if (this.elements.searchClear) {
      this.elements.searchClear.addEventListener('click', () => {
        this.clearSearch();
      });
    }
    
    if (this.elements.searchClearMobile) {
      this.elements.searchClearMobile.addEventListener('click', () => {
        this.clearSearch();
      });
    }
    
    // Mobile menu toggle
    if (this.elements.mobileMenuBtn) {
      this.elements.mobileMenuBtn.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }
    
    // Cart button
    if (this.elements.cartBtn) {
      this.elements.cartBtn.addEventListener('click', () => {
        Events.dispatch('open-cart');
      });
    }
    
    // Favorites button
    if (this.elements.favoritesBtn) {
      this.elements.favoritesBtn.addEventListener('click', () => {
        Events.dispatch('open-favorites');
      });
    }
    
    // Listen to cart changes
    Events.onCartChange(() => {
      this.updateCartDisplay();
    });
    
    // Listen to favorites changes
    Events.onFavoritesChange(() => {
      this.updateFavoritesDisplay();
    });
  },
  
  renderCategories() {
    if (!this.elements.navDesktop || !this.elements.navMobile) return;
    
    // Desktop categories
    const desktopHTML = categories.map(category => `
      <button 
        class="category-btn ${category === this.state.selectedCategory ? 'active' : ''}"
        onclick="Header.selectCategory('${category}')"
      >
        ${category}
      </button>
    `).join('');
    
    this.elements.navDesktop.innerHTML = desktopHTML;
    
    // Mobile categories
    const mobileHTML = `
      <div class="nav-grid">
        ${categories.map(category => `
          <button 
            class="category-btn ${category === this.state.selectedCategory ? 'active' : ''}"
            onclick="Header.selectCategory('${category}'); Header.closeMobileMenu();"
          >
            ${category}
          </button>
        `).join('')}
      </div>
    `;
    
    this.elements.navMobile.innerHTML = mobileHTML;
  },
  
  selectCategory(category) {
    this.state.selectedCategory = category;
    this.renderCategories();
    Events.dispatch('category-changed', { category });
  },
  
  handleSearch(searchTerm) {
    // Update clear button visibility
    this.updateClearButtonVisibility(searchTerm);
    
    // Dispatch search event
    Events.dispatch('search-changed', { searchTerm });
  },
  
  syncSearchInputs(value) {
    if (this.elements.searchInput && this.elements.searchInput.value !== value) {
      this.elements.searchInput.value = value;
    }
    if (this.elements.searchInputMobile && this.elements.searchInputMobile.value !== value) {
      this.elements.searchInputMobile.value = value;
    }
  },
  
  updateClearButtonVisibility(searchTerm) {
    const hasValue = searchTerm.trim().length > 0;
    
    if (this.elements.searchClear) {
      this.elements.searchClear.classList.toggle('hidden', !hasValue);
    }
    
    if (this.elements.searchClearMobile) {
      this.elements.searchClearMobile.classList.toggle('hidden', !hasValue);
    }
  },
  
  clearSearch() {
    if (this.elements.searchInput) {
      this.elements.searchInput.value = '';
    }
    if (this.elements.searchInputMobile) {
      this.elements.searchInputMobile.value = '';
    }
    
    this.updateClearButtonVisibility('');
    Events.dispatch('search-cleared');
  },
  
  toggleMobileMenu() {
    this.state.isMobileMenuOpen = !this.state.isMobileMenuOpen;
    
    if (this.elements.navMobile) {
      this.elements.navMobile.classList.toggle('hidden', !this.state.isMobileMenuOpen);
    }
    
    if (this.elements.menuIcon) {
      // Update menu icon
      const iconName = this.state.isMobileMenuOpen ? 'x' : 'menu';
      this.elements.menuIcon.setAttribute('data-lucide', iconName);
      
      // Reinitialize lucide icons
      if (window.lucide) {
        lucide.createIcons();
      }
    }
  },
  
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
  },
  
  updateCartDisplay() {
    const { total, itemCount } = CartStorage.getTotals();
    
    // Update badge
    if (this.elements.cartBadge) {
      if (itemCount > 0) {
        this.elements.cartBadge.textContent = itemCount;
        this.elements.cartBadge.classList.remove('hidden');
      } else {
        this.elements.cartBadge.classList.add('hidden');
      }
    }
    
    // Update total
    if (this.elements.cartTotal) {
      this.elements.cartTotal.textContent = formatCurrency(total);
    }
  },
  
  updateFavoritesDisplay() {
    const count = FavoritesStorage.getCount();
    
    if (this.elements.favoritesBadge) {
      if (count > 0) {
        this.elements.favoritesBadge.textContent = count;
        this.elements.favoritesBadge.classList.remove('hidden');
      } else {
        this.elements.favoritesBadge.classList.add('hidden');
      }
    }
  },
  
  getSelectedCategory() {
    return this.state.selectedCategory;
  },
  
  getCurrentSearch() {
    return this.elements.searchInput ? this.elements.searchInput.value.trim() : '';
  }
};

// Global functions for onclick handlers
window.scrollToProducts = function() {
  scrollToElement('productsSection', 100);
};

window.setCategory = function(category) {
  Header.selectCategory(category);
  scrollToElement('productsSection', 100);
};

window.clearSearch = function() {
  Header.clearSearch();
};