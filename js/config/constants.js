// Sports Imports - Configuration Constants

const APP_CONFIG = {
  name: 'Sports Imports',
  tagline: 'Equipamentos Esportivos Premium',
  
  // Shipping
  freeShippingThreshold: 200,
  standardShippingCost: 15.90,
  
  // Returns
  returnPeriod: 15,
  
  // Storage keys
  storage: {
    cart: 'sports-imports-cart',
    favorites: 'sports-imports-favorites'
  },
  
  // Toast settings
  toast: {
    duration: 3000,
    errorDuration: 4000
  },
  
  // Animation durations
  animation: {
    fast: 150,
    normal: 300,
    slow: 500
  },
  
  // Breakpoints (must match CSS)
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
  }
};

// Export to global scope
window.APP_CONFIG = APP_CONFIG;