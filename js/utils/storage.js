// Utilitários para localStorage
const Storage = {
  // Cart storage
  CART_KEY: 'sports-imports-cart',
  FAVORITES_KEY: 'sports-imports-favorites',
  
  // Get item from localStorage
  get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Erro ao ler do localStorage:', error);
      return null;
    }
  },
  
  // Set item in localStorage
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
      return false;
    }
  },
  
  // Remove item from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error);
      return false;
    }
  },
  
  // Clear all localStorage
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
      return false;
    }
  },
  
  // Cart specific methods
  getCart() {
    const cart = this.get(this.CART_KEY);
    return Array.isArray(cart) ? cart : [];
  },
  
  setCart(items) {
    return this.set(this.CART_KEY, items);
  },
  
  clearCart() {
    return this.remove(this.CART_KEY);
  },
  
  // Favorites specific methods
  getFavorites() {
    const favorites = this.get(this.FAVORITES_KEY);
    return Array.isArray(favorites) ? favorites : [];
  },
  
  setFavorites(items) {
    return this.set(this.FAVORITES_KEY, items);
  },
  
  clearFavorites() {
    return this.remove(this.FAVORITES_KEY);
  }
};

// Cart functionality
const CartStorage = {
  // Get all cart items
  getItems() {
    return Storage.getCart();
  },
  
  // Add item to cart
  addItem(product, quantity = 1) {
    const items = this.getItems();
    const existingIndex = items.findIndex(item => item.product.id === product.id);
    
    if (existingIndex >= 0) {
      // Update existing item
      items[existingIndex].quantity += quantity;
    } else {
      // Add new item
      items.push({ product, quantity });
    }
    
    Storage.setCart(items);
    Events.dispatch('cart-changed');
    return true;
  },
  
  // Update item quantity
  updateQuantity(productId, newQuantity) {
    const items = this.getItems();
    
    if (newQuantity <= 0) {
      return this.removeItem(productId);
    }
    
    const index = items.findIndex(item => item.product.id === productId);
    if (index >= 0) {
      items[index].quantity = newQuantity;
      Storage.setCart(items);
      Events.dispatch('cart-changed');
      return true;
    }
    
    return false;
  },
  
  // Remove item from cart
  removeItem(productId) {
    const items = this.getItems();
    const filteredItems = items.filter(item => item.product.id !== productId);
    
    Storage.setCart(filteredItems);
    Events.dispatch('cart-changed');
    return true;
  },
  
  // Clear cart
  clear() {
    Storage.clearCart();
    Events.dispatch('cart-changed');
    return true;
  },
  
  // Get item quantity
  getItemQuantity(productId) {
    const items = this.getItems();
    const item = items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  },
  
  // Calculate totals
  getTotals() {
    const items = this.getItems();
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    return { total, itemCount, items };
  }
};

// Favorites functionality
const FavoritesStorage = {
  // Get all favorite items
  getItems() {
    return Storage.getFavorites();
  },
  
  // Add item to favorites
  addItem(product) {
    const items = this.getItems();
    const exists = items.some(item => item.id === product.id);
    
    if (!exists) {
      items.push(product);
      Storage.setFavorites(items);
      Events.dispatch('favorites-changed');
      return true;
    }
    
    return false;
  },
  
  // Remove item from favorites
  removeItem(productId) {
    const items = this.getItems();
    const filteredItems = items.filter(item => item.id !== productId);
    
    Storage.setFavorites(filteredItems);
    Events.dispatch('favorites-changed');
    return true;
  },
  
  // Toggle favorite
  toggleItem(product) {
    const items = this.getItems();
    const exists = items.some(item => item.id === product.id);
    
    if (exists) {
      this.removeItem(product.id);
      return false; // Removed
    } else {
      this.addItem(product);
      return true; // Added
    }
  },
  
  // Check if item is favorite
  isItemFavorite(productId) {
    const items = this.getItems();
    return items.some(item => item.id === productId);
  },
  
  // Clear favorites
  clear() {
    Storage.clearFavorites();
    Events.dispatch('favorites-changed');
    return true;
  },
  
  // Get count
  getCount() {
    return this.getItems().length;
  }
};