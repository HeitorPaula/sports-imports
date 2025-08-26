// Constantes da aplicação
const APP_CONFIG = {
  name: 'Sports Imports',
  version: '1.0.0',
  description: 'Equipamentos Esportivos Premium'
};

// Estados da aplicação
const APP_VIEWS = {
  HOME: 'home',
  PRODUCT: 'product', 
  CHECKOUT: 'checkout'
};

// Eventos customizados
const EVENTS = {
  CATEGORY_CHANGED: 'category-changed',
  SEARCH_CHANGED: 'search-changed',
  SEARCH_CLEARED: 'search-cleared',
  CART_CHANGED: 'cart-changed',
  FAVORITES_CHANGED: 'favorites-changed',
  OPEN_CART: 'open-cart',
  OPEN_FAVORITES: 'open-favorites',
  CLOSE_SIDEBAR: 'close-sidebar',
  PRODUCT_CLICKED: 'product-clicked',
  ADD_TO_CART: 'add-to-cart',
  NAVIGATE_HOME: 'navigate-home',
  NAVIGATE_CHECKOUT: 'navigate-checkout',
  VIEW_CHANGED: 'view-changed'
};

// Seletores DOM
const SELECTORS = {
  // Main containers
  MAIN_CONTENT: '#mainContent',
  HOME_VIEW: '#homeView',
  PRODUCT_VIEW: '#productView',
  CHECKOUT_VIEW: '#checkoutView',
  
  // Products
  PRODUCTS_GRID: '#productsGrid',
  SEARCH_RESULTS: '#searchResults',
  SEARCH_RESULTS_TEXT: '#searchResultsText',
  CLEAR_SEARCH_BTN: '#clearSearchBtn',
  NO_RESULTS: '#noResults',
  
  // Sidebars
  CART_SIDEBAR: '#cartSidebar',
  FAVORITES_SIDEBAR: '#favoritesSidebar',
  SIDEBAR_OVERLAY: '.sidebar-overlay',
  
  // Header elements
  HEADER: '#header',
  SEARCH_INPUT: '#searchInput',
  SEARCH_INPUT_MOBILE: '#searchInputMobile',
  SEARCH_CLEAR: '#searchClear',
  SEARCH_CLEAR_MOBILE: '#searchClearMobile',
  FAVORITES_BTN: '#favoritesBtn',
  FAVORITES_BADGE: '#favoritesBadge',
  CART_BTN: '#cartBtn',
  CART_BADGE: '#cartBadge',
  CART_TOTAL: '#cartTotal',
  MOBILE_MENU_BTN: '#mobileMenuBtn',
  MENU_ICON: '#menuIcon',
  NAV_MOBILE: '#navMobile',
  NAV_DESKTOP: '#navDesktop'
};

// Classes CSS
const CSS_CLASSES = {
  HIDDEN: 'hidden',
  VISIBLE: 'visible',
  ACTIVE: 'active',
  CATEGORY_BTN: 'category-btn',
  PRODUCT_CARD: 'product-card',
  SIDEBAR_OVERLAY: 'sidebar-overlay',
  TOAST_CONTAINER: 'toast-container'
};

// Configurações de animação
const ANIMATION_CONFIG = {
  DURATION: {
    SHORT: 150,
    MEDIUM: 300,
    LONG: 500
  },
  EASING: {
    EASE: 'ease',
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out'
  }
};

// Configurações de toast
const TOAST_CONFIG = {
  DURATION: {
    SUCCESS: 3000,
    ERROR: 4000,
    WARNING: 3500,
    INFO: 3000
  },
  POSITION: 'top-right'
};

// Configurações de debounce/throttle
const TIMING_CONFIG = {
  SEARCH_DEBOUNCE: 300,
  SCROLL_THROTTLE: 100,
  RESIZE_THROTTLE: 250
};

// Breakpoints responsivos
const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1280
};

// Configurações de frete
const SHIPPING_CONFIG = {
  FREE_SHIPPING_THRESHOLD: 200,
  SHIPPING_COST: 15.90
};