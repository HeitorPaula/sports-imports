// Sports Imports - Checkout Page Component

class CheckoutPageComponent {
  constructor() {
    this.elements = {
      view: document.getElementById('checkoutView')
    };
  }
  
  async init() {
    // Component initialized
  }
  
  render() {
    if (!this.elements.view) return;
    
    const { total, itemCount, items } = CartStorage.getTotals();
    const shippingCost = total >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CONFIG.SHIPPING_COST;
    const finalTotal = total + shippingCost;
    
    this.elements.view.innerHTML = `
      <div class="checkout-page">
        <!-- Checkout Header -->
        <div class="checkout-header">
          <div class="container">
            <button class="btn btn-ghost checkout-back-btn">
              <i data-lucide="arrow-left"></i>
              Voltar
            </button>
          </div>
        </div>

        <div class="checkout-content">
          <div class="container">
            <h1 class="checkout-title">Finalizar Compra</h1>
            
            ${items.length === 0 ? this.renderEmptyCart() : this.renderCheckoutForm(items, total, shippingCost, finalTotal)}
          </div>
        </div>
      </div>
    `;
    
    this.setupEventListeners();
    
    if (window.lucide) {
      lucide.createIcons();
    }
  }
  
  renderEmptyCart() {
    return `
      <div class="empty-state" style="padding: 4rem 0;">
        <div class="empty-state-icon">
          <i data-lucide="shopping-cart"></i>
        </div>
        <h2>Carrinho vazio</h2>
        <p>Adicione produtos para finalizar sua compra</p>
        <button class="btn btn-primary" onclick="App.navigateHome()">
          Continuar Comprando
        </button>
      </div>
    `;
  }
  
  renderCheckoutForm(items, total, shippingCost, finalTotal) {
    return `
      <div class="checkout-grid">
        <!-- Checkout Form -->
        <div class="checkout-form">
          <div class="checkout-section">
            <h3>Dados de Entrega</h3>
            
            <form id="checkoutForm">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Nome Completo</label>
                  <input type="text" class="form-input" placeholder="Seu nome completo" required>
                </div>
                <div class="form-group">
                  <label class="form-label">E-mail</label>
                  <input type="email" class="form-input" placeholder="seu@email.com" required>
                </div>
              </div>
              
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">CEP</label>
                  <input type="text" class="form-input" placeholder="00000-000" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Cidade</label>
                  <input type="text" class="form-input" placeholder="Sua cidade" required>
                </div>
              </div>
              
              <div class="form-group full-width">
                <label class="form-label">Endereço</label>
                <input type="text" class="form-input" placeholder="Rua, número" required>
              </div>
              
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Bairro</label>
                  <input type="text" class="form-input" placeholder="Seu bairro" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Complemento</label>
                  <input type="text" class="form-input" placeholder="Apto, bloco (opcional)">
                </div>
              </div>
            </form>
          </div>
          
          <div class="checkout-section">
            <h3>Forma de Pagamento</h3>
            <div class="payment-options">
              <label class="payment-option selected">
                <input type="radio" name="payment" value="credit" checked>
                <i data-lucide="credit-card"></i>
                <span>Cartão de Crédito</span>
              </label>
              <label class="payment-option">
                <input type="radio" name="payment" value="pix">
                <i data-lucide="smartphone"></i>
                <span>PIX</span>
              </label>
              <label class="payment-option">
                <input type="radio" name="payment" value="boleto">
                <i data-lucide="banknote"></i>
                <span>Boleto Bancário</span>
              </label>
            </div>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="order-summary">
          <h3>Resumo do Pedido</h3>
          
          <div class="order-items">
            ${items.map(item => `
              <div class="order-item">
                <img src="${item.product.image}" alt="${Utils.escapeHtml(item.product.name)}" 
                     class="order-item-image">
                <div class="order-item-details">
                  <div class="order-item-name">${Utils.escapeHtml(item.product.name)}</div>
                  <div class="order-item-quantity">Qtd: ${item.quantity}</div>
                  <div class="order-item-price">${Utils.formatCurrency(item.product.price * item.quantity)}</div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="order-totals">
            <div class="cart-row">
              <span>Subtotal (${itemCount} ${itemCount === 1 ? 'item' : 'itens'}):</span>
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
          
          <div class="checkout-buttons">
            <button class="btn-full" id="finishOrderBtn">
              Finalizar Pedido
              <i data-lucide="check"></i>
            </button>
            
            <div class="security-note">
              <p>Dados protegidos com segurança SSL</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  setupEventListeners() {
    // Back button
    const backBtn = this.elements.view.querySelector('.checkout-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        App.navigateHome();
      });
    }
    
    // Payment options
    const paymentOptions = this.elements.view.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
      option.addEventListener('click', () => {
        paymentOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        const radio = option.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });
    
    // Finish order button
    const finishBtn = this.elements.view.querySelector('#finishOrderBtn');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        this.finishOrder();
      });
    }
  }
  
  finishOrder() {
    const form = this.elements.view.querySelector('#checkoutForm');
    if (form && form.checkValidity()) {
      // Clear cart
      CartStorage.clear();
      
      // Show success message
      Toast.success('Pedido realizado com sucesso! Você receberá um e-mail de confirmação.');
      
      // Navigate to home
      setTimeout(() => {
        App.navigateHome();
      }, 1500);
    } else {
      Toast.error('Por favor, preencha todos os campos obrigatórios');
      form.reportValidity();
    }
  }
}

window.CheckoutPageComponent = CheckoutPageComponent;