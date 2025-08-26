// Sports Imports - Favorites Component

class FavoritesComponent {
  constructor() {
    this.elements = {
      sidebar: document.getElementById('favoritesSidebar')
    };
  }
  
  async init() {
    this.render();
    window.addEventListener('favorites-changed', () => this.render());
  }
  
  render() {
    if (!this.elements.sidebar) return;
    
    const items = FavoritesStorage.getItems();
    
    const favoritesHTML = `
      <div class="sidebar-header">
        <div class="sidebar-title">
          <i data-lucide="heart"></i>
          Favoritos
          ${items.length > 0 ? `<span class="badge">${items.length}</span>` : ''}
        </div>
        <button class="sidebar-close" onclick="App.closeFavorites()">
          <i data-lucide="x"></i>
        </button>
      </div>
      
      <div class="sidebar-body">
        ${items.length === 0 ? this.renderEmptyState() : this.renderItems(items)}
      </div>
      
      ${items.length > 0 ? this.renderFooter() : ''}
    `;
    
    this.elements.sidebar.innerHTML = `
      <div class="sidebar-overlay"></div>
      <div class="sidebar-content">${favoritesHTML}</div>
    `;
    
    if (window.lucide) {
      lucide.createIcons();
    }
  }
  
  renderEmptyState() {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">
          <i data-lucide="heart"></i>
        </div>
        <h3>Nenhum favorito ainda</h3>
        <p>Adicione produtos aos favoritos para vê-los aqui</p>
        <button class="btn btn-primary" onclick="App.closeFavorites()">
          Explorar Produtos
        </button>
      </div>
    `;
  }
  
  renderItems(items) {
    return items.map(product => `
      <div class="sidebar-item">
        <img src="${product.image}" alt="${Utils.escapeHtml(product.name)}" class="sidebar-item-image">
        <div class="sidebar-item-content">
          <h4 class="sidebar-item-name">${Utils.escapeHtml(product.name)}</h4>
          <div class="product-category">${product.category}</div>
          <p class="sidebar-item-price">${Utils.formatCurrency(product.price)}</p>
          <div class="sidebar-item-actions">
            <button class="btn btn-primary btn-sm" onclick="FavoritesComponent.addToCart('${product.id}')" ${!product.inStock ? 'disabled' : ''}>
              <i data-lucide="shopping-cart"></i>
              ${product.inStock ? 'Adicionar' : 'Esgotado'}
            </button>
            <button class="remove-btn" onclick="FavoritesComponent.removeItem('${product.id}')">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  renderFooter() {
    return `
      <div class="sidebar-footer">
        <button class="btn-outline-full" onclick="FavoritesComponent.clear()">
          <i data-lucide="trash-2"></i>
          Limpar Favoritos
        </button>
      </div>
    `;
  }
  
  static addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product && product.inStock) {
      App.addToCart(product, 1);
    }
  }
  
  static removeItem(productId) {
    FavoritesStorage.removeItem(productId);
    Toast.success('Item removido dos favoritos');
  }
  
  static clear() {
    FavoritesStorage.clear();
    Toast.success('Favoritos limpos com sucesso');
  }
}

window.FavoritesComponent = FavoritesComponent;