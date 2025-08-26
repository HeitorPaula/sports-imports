// Sports Imports - Cart Component

class CartComponent {
  constructor() {
    this.elements = {
      sidebar: document.getElementById('cartSidebar'),
      content: null
    };
  }
  
  async init() {
    this.render();
    window.addEventListener('cart-changed', () => this.render());
  }
  
  render() {
    if (!this.elements.sidebar) return;
    
    const { total, itemCount, items } = CartStorage.getTotals();
    const shippingCost = total >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CONFIG.SHIPPING_COST;
    const finalTotal = total + shippingCost;
    
    const cartHTML = `
      <div class="sidebar-header">
        <div class="sidebar-title">
          <i data-lucide="shopping-cart"></i>
          Carrinho
          ${itemCount > 0 ? `<span class="badge">${itemCount}</span>` : ''}
        </div>
        <button class="sidebar-close" onclick="App.closeCart()">
          <i data-lucide="x"></i>
        </button>
      </div>
      
      <div class="sidebar-body">
        ${items.length === 0 ? this.renderEmptyState() : this.renderItems(items)}
      </div>
      
      ${items.length > 0 ? this.renderFooter(total, shippingCost, finalTotal) : ''}
    `;
    
    this.elements.sidebar.innerHTML = `
      <div class="sidebar-overlay"></div>
      <div class="sidebar-content">${cartHTML}</div>
    `;
    
    if (window.lucide) {
      lucide.createIcons();
    }
  }
  
  renderEmptyState() {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">
          <i data-lucide="shopping-cart"></i>
        </div>
        <h3>Carrinho vazio</h3>
        <p>Adicione produtos para começar suas compras!</p>
        <button class="btn btn-primary" onclick="App.closeCart()">
          Continuar Comprando
        </button>
      </div>
    `;
  }
  
  renderItems(items) {
    return items.map(item => `
      <div class="sidebar-item">
        <img src="${item.product.image}" alt="${Utils.escapeHtml(item.product.name)}" class="sidebar-item-image">
        <div class="sidebar-item-content">
          <h4 class="sidebar-item-name">${Utils.escapeHtml(item.product.name)}</h4>
          <p class="sidebar-item-price">${Utils.formatCurrency(item.product.price)}</p>
          <div class="sidebar-item-actions">
            <div class="quantity-controls">
              <button class="quantity-btn" onclick="CartComponent.updateQuantity('${item.product.id}', ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>
                <i data-lucide="minus"></i>
              </button>
              <span class="quantity-display">${item.quantity}</span>
              <button class="quantity-btn" onclick="CartComponent.updateQuantity('${item.product.id}', ${item.quantity + 1})">
                <i data-lucide="plus"></i>
              </button>
            </div>
            <button class="remove-btn" onclick="CartComponent.removeItem('${item.product.id}')">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  renderFooter(total, shippingCost, finalTotal) {
    return `
      <div class="sidebar-footer">
        <div class="cart-totals">
          <div class="cart-row">
            <span>Subtotal:</span>
            <span>${Utils.formatCurrency(total)}</span>
          </div>
          <div class="cart-row">
            <span>Frete:</span>
            <span class="${shippingCost === 0 ? 'text-green-600' : ''}">${shippingCost === 0 ? 'GRÁTIS' : Utils.formatCurrency(shippingCost)}</span>
          </div>
          <div class="cart-row total">
            <span>Total:</span>
            <span>${Utils.formatCurrency(finalTotal)}</span>
          </div>
        </div>
        
        <button class="btn-full" onclick="App.navigateToCheckout()">
          Finalizar Compra
          <i data-lucide="arrow-right"></i>
        </button>
        
        <button class="btn-outline-full" onclick="CartComponent.clear()">
          Limpar Carrinho
        </button>
      </div>
    `;
  }
  
  static updateQuantity(productId, newQuantity) {
    CartStorage.updateQuantity(productId, newQuantity);
  }
  
  static removeItem(productId) {
    CartStorage.removeItem(productId);
    Toast.success('Item removido do carrinho');
  }
  
  static clear() {
    CartStorage.clear();
    Toast.success('Carrinho limpo com sucesso');
  }
}

window.CartComponent = CartComponent;