/*************  ✨ Windsurf Command 🌟  *************/
// Sports Imports - Constants and Configuration

// Application configuration
const APP_CONFIG = {
  name: 'Sports Imports',
  version: '1.0.0',
  description: 'Equipamentos Esportivos Premium'
};

// Storage keys
const STORAGE_KEYS = {
  CART: 'sports-imports-cart',
  FAVORITES: 'sports-imports-favorites',
  USER_PREFERENCES: 'sports-imports-preferences'
};

// Categories
const CATEGORIES = ['Todos', 'Calçados', 'Musculação', 'Yoga', 'Acessórios', 'Suplementos', 'Kits'];

// Shipping configuration
const SHIPPING_CONFIG = {
  FREE_SHIPPING_THRESHOLD: 200,
  SHIPPING_COST: 15.90
};

// Animation durations
const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
};

// Toast configuration
const TOAST_CONFIG = {
  DURATION: {
    SUCCESS: 3000,
    ERROR: 4000,
    WARNING: 3500,
    INFO: 3000
  }
};

// Breakpoints
const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1280
};

if (typeof window !== 'undefined') {
  window.APP_CONFIG = APP_CONFIG;
  window.STORAGE_KEYS = STORAGE_KEYS;
  window.CATEGORIES = CATEGORIES;
  window.SHIPPING_CONFIG = SHIPPING_CONFIG;
  window.ANIMATION_DURATION = ANIMATION_DURATION;
  window.TOAST_CONFIG = TOAST_CONFIG;
  window.BREAKPOINTS = BREAKPOINTS;
} else {
  console.warn('Window object not found. Cannot export constants to global scope.');
}
// Export to global scope
window.APP_CONFIG = APP_CONFIG;
window.STORAGE_KEYS = STORAGE_KEYS;
window.CATEGORIES = CATEGORIES;
window.SHIPPING_CONFIG = SHIPPING_CONFIG;
window.ANIMATION_DURATION = ANIMATION_DURATION;
window.TOAST_CONFIG = TOAST_CONFIG;
window.BREAKPOINTS = BREAKPOINTS;