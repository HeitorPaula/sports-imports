// Sports Imports - Storage Management (Identical to React version)

// Cart Storage
const CartStorage = {
  getItems() {
    try {
      const saved = localStorage.getItem('sports-imports-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },
  
  setItems(items) {
    try {
      localStorage.setItem('sports-imports-cart', JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('cart-changed'));
      return true;
    } catch {
      return false;
    }
  },
  
  addItem(product, quantity = 1) {
    const items = this.getItems();
    const existingIndex = items.findIndex(item => item.product.id === product.id);
    
    if (existingIndex >= 0) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    
    return this.setItems(items);
  },
  
  updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      return this.removeItem(productId);
    }
    
    const items = this.getItems();
    const index = items.findIndex(item => item.product.id === productId);
    
    if (index >= 0) {
      items[index].quantity = newQuantity;
      return this.setItems(items);
    }
    
    return false;
  },
  
  removeItem(productId) {
    const items = this.getItems();
    const filteredItems = items.filter(item => item.product.id !== productId);
    return this.setItems(filteredItems);
  },
  
  clear() {
    return this.setItems([]);
  },
  
  getTotals() {
    const items = this.getItems();
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, itemCount, items };
  }
};

// Favorites Storage
const FavoritesStorage = {
  getItems() {
    try {
      const saved = localStorage.getItem('sports-imports-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },
  
  setItems(items) {
    try {
      localStorage.setItem('sports-imports-favorites', JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('favorites-changed'));
      return true;
    } catch {
      return false;
    }
  },
  
  addItem(product) {
    const items = this.getItems();
    const exists = items.some(item => item.id === product.id);
    
    if (!exists) {
      items.push(product);
      return this.setItems(items);
    }
    
    return false;
  },
  
  removeItem(productId) {
    const items = this.getItems();
    const filteredItems = items.filter(item => item.id !== productId);
    return this.setItems(filteredItems);
  },
  
  toggleItem(product) {
    const items = this.getItems();
    const exists = items.some(item => item.id === product.id);
    
    if (exists) {
      this.removeItem(product.id);
      return false;
    } else {
      this.addItem(product);
      return true;
    }
  },
  
  isFavorite(productId) {
    const items = this.getItems();
    return items.some(item => item.id === productId);
  },
  
  clear() {
    return this.setItems([]);
  }
};

// Export to global scope
window.CartStorage = CartStorage;
window.FavoritesStorage = FavoritesStorage;