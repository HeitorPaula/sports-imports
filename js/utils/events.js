// Sistema de eventos customizados
const Events = {
  // Dispatch custom event
  dispatch(eventName, data = null) {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
  },
  
  // Listen to custom event
  listen(eventName, callback) {
    window.addEventListener(eventName, callback);
  },
  
  // Remove event listener
  remove(eventName, callback) {
    window.removeEventListener(eventName, callback);
  },
  
  // Cart events
  onCartChange(callback) {
    this.listen('cart-changed', callback);
  },
  
  offCartChange(callback) {
    this.remove('cart-changed', callback);
  },
  
  // Favorites events
  onFavoritesChange(callback) {
    this.listen('favorites-changed', callback);
  },
  
  offFavoritesChange(callback) {
    this.remove('favorites-changed', callback);
  },
  
  // UI events
  onViewChange(callback) {
    this.listen('view-changed', callback);
  },
  
  offViewChange(callback) {
    this.remove('view-changed', callback);
  },
  
  // Dispatch view change
  changeView(viewName, data = null) {
    this.dispatch('view-changed', { view: viewName, data });
  }
};

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
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
}

// DOM ready function
function ready(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

// Scroll to element
function scrollToElement(elementId, offset = 0) {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.offsetTop - offset;
    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });
  }
}

// Format currency
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

// Format number
function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(value);
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Validate email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone
function isValidPhone(phone) {
  const re = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return re.test(phone);
}

// Format phone
function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

// Format CPF
function formatCPF(cpf) {
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
  }
  return cpf;
}

// Validate CPF
function isValidCPF(cpf) {
  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length !== 11 || /^(\d)\1{10}$/.test(cleaned)) {
    return false;
  }
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  
  return remainder === parseInt(cleaned.charAt(10));
}

// Animation utilities
const Animation = {
  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      
      element.style.opacity = percentage;
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  },
  
  fadeOut(element, duration = 300) {
    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      
      element.style.opacity = 1 - percentage;
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    }
    
    requestAnimationFrame(animate);
  },
  
  slideDown(element, duration = 300) {
    element.style.height = '0px';
    element.style.overflow = 'hidden';
    element.style.display = 'block';
    
    const targetHeight = element.scrollHeight;
    
    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      
      element.style.height = (targetHeight * percentage) + 'px';
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.height = 'auto';
        element.style.overflow = 'visible';
      }
    }
    
    requestAnimationFrame(animate);
  },
  
  slideUp(element, duration = 300) {
    const startHeight = element.offsetHeight;
    element.style.height = startHeight + 'px';
    element.style.overflow = 'hidden';
    
    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      
      element.style.height = (startHeight * (1 - percentage)) + 'px';
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
        element.style.height = 'auto';
        element.style.overflow = 'visible';
      }
    }
    
    requestAnimationFrame(animate);
  }
};