// Utilitários para produtos
const ProductUtils = {
  
  // Filtrar produtos por categoria e termo de busca
  filterProducts(searchTerm = '', category = 'Todos') {
    let filtered = products;

    // Filtro por categoria
    if (category !== 'Todos') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filtro por pesquisa
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.fullDescription.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  },
  
  // Obter produto por ID
  getProductById(id) {
    return products.find(product => product.id === id);
  },
  
  // Obter produtos por categoria
  getProductsByCategory(category) {
    if (category === 'Todos') {
      return products;
    }
    return products.filter(product => product.category === category);
  },
  
  // Calcular preço com desconto
  calculateDiscountedPrice(originalPrice, discount) {
    return originalPrice * (1 - discount / 100);
  },
  
  // Verificar se produto tem desconto
  hasDiscount(product) {
    return product.discount > 0;
  },
  
  // Calcular parcelamento
  calculateInstallments(price, installments = 12) {
    return price / installments;
  },
  
  // Verificar se produto tem frete grátis
  hasFreeShipping(product) {
    return product.price >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD;
  },
  
  // Gerar estrelas de avaliação
  generateStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Estrelas cheias
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i data-lucide="star" class="filled"></i>';
    }
    
    // Meia estrela (se houver)
    if (hasHalfStar) {
      starsHTML += '<i data-lucide="star" class="half-filled"></i>';
    }
    
    // Estrelas vazias
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i data-lucide="star"></i>';
    }
    
    return starsHTML;
  },
  
  // Gerar HTML de badge de desconto
  getDiscountBadgeHTML(discount) {
    if (discount <= 0) return '';
    return `<div class="product-discount">-${discount}%</div>`;
  },
  
  // Gerar HTML de badge de frete grátis
  getFreeShippingBadgeHTML(product) {
    if (!this.hasFreeShipping(product)) return '';
    return `
      <div class="product-shipping">
        <i data-lucide="truck"></i>
        Frete Grátis
      </div>
    `;
  },
  
  // Gerar HTML de badge esgotado
  getOutOfStockBadgeHTML(product) {
    if (product.inStock) return '';
    return `
      <div class="product-out-of-stock">
        <div class="badge">Esgotado</div>
      </div>
    `;
  },
  
  // Formatar preço
  formatPrice(price) {
    return formatCurrency(price);
  },
  
  // Validar produto
  isValidProduct(product) {
    return product && 
           typeof product.id === 'string' && 
           typeof product.name === 'string' && 
           typeof product.price === 'number' && 
           product.price > 0;
  },
  
  // Obter categorias únicas
  getUniqueCategories() {
    const categorySet = new Set(products.map(product => product.category));
    return ['Todos', ...Array.from(categorySet).sort()];
  },
  
  // Contar produtos por categoria
  countProductsByCategory() {
    const counts = { 'Todos': products.length };
    
    products.forEach(product => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    
    return counts;
  },
  
  // Obter produtos em destaque (com desconto)
  getFeaturedProducts(limit = 6) {
    return products
      .filter(product => product.discount > 0)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, limit);
  },
  
  // Obter produtos mais bem avaliados
  getTopRatedProducts(limit = 6) {
    return products
      .filter(product => product.inStock)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  },
  
  // Buscar produtos similares
  getSimilarProducts(product, limit = 4) {
    return products
      .filter(p => p.id !== product.id && p.category === product.category && p.inStock)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  },
  
  // Gerar slug do produto
  generateProductSlug(product) {
    return product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
};

// Alias para compatibilidade
const searchProducts = ProductUtils.filterProducts;
const getProductById = ProductUtils.getProductById;
const getProductsByCategory = ProductUtils.getProductsByCategory;