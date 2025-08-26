/*************  ✨ Windsurf Command 🌟  *************/
// Sports Imports - Utility Helpers

const Utils = {
  // Format currency
  formatCurrency(value) {
    if (typeof value !== 'number') {
      throw new Error('formatCurrency expects a number as its argument');
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  },
  
  // Escape HTML
  escapeHtml(text) {
    if (typeof text !== 'string') {
      throw new Error('escapeHtml expects a string as its argument');
    }
    if (typeof text !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },
  
  // Generate unique ID
  generateId() {
    return `${Date.now().toString(36)}${Math.random().toString(36).substr(2)}`;
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },
  
  // Debounce function
  debounce(func, wait) {
    if (typeof func !== 'function') {
      throw new Error('debounce expects a function as its first argument');
    }
    if (typeof wait !== 'number') {
      throw new Error('debounce expects a number as its second argument');
    }
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle function
  throttle(func, limit) {
    if (typeof func !== 'function') {
      throw new Error('throttle expects a function as its first argument');
    }
    if (typeof limit !== 'number') {
      throw new Error('throttle expects a number as its second argument');
    }
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  },
  
  // Check if mobile device
  isMobile() {
    return window.innerWidth < 768;
  },
  
  // Copy to clipboard
  async copyToClipboard(text) {
    if (typeof text !== 'string') {
      throw new Error('copyToClipboard expects a string as its argument');
    }
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      return false;
    }
  },
  
  // Wait for specified time
  wait(ms) {
    if (typeof ms !== 'number') {
      throw new Error('wait expects a number as its argument');
    }
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

// Export to global scope
window.Utils = Utils;