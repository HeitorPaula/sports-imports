// Sports Imports - Helper Functions

const Helpers = {
  // Currency formatting
  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  },
  
  // Generate star rating HTML
  generateStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i data-lucide="star" class="w-3 h-3 text-yellow-400 fill-current"></i>';
    }
    
    if (hasHalfStar) {
      starsHTML += '<i data-lucide="star" class="w-3 h-3 text-yellow-400"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i data-lucide="star" class="w-3 h-3 text-gray-300"></i>';
    }
    
    return starsHTML;
  },
  
  // Debounce function
  debounce(func, wait) {
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
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Scroll to element
  scrollToElement(element, behavior = 'smooth') {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    
    if (element) {
      element.scrollIntoView({ 
        behavior,
        block: 'start'
      });
    }
  },
  
  // Scroll to top
  scrollToTop(behavior = 'smooth') {
    window.scrollTo({ 
      top: 0, 
      behavior 
    });
  },
  
  // Get current breakpoint
  getCurrentBreakpoint() {
    const width = window.innerWidth;
    const { breakpoints } = window.APP_CONFIG;
    
    if (width >= breakpoints.xxl) return 'xxl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  },
  
  // Check if mobile
  isMobile() {
    return window.innerWidth < window.APP_CONFIG.breakpoints.md;
  },
  
  // Check if tablet
  isTablet() {
    const width = window.innerWidth;
    const { md, lg } = window.APP_CONFIG.breakpoints;
    return width >= md && width < lg;
  },
  
  // Check if desktop
  isDesktop() {
    return window.innerWidth >= window.APP_CONFIG.breakpoints.lg;
  },
  
  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },
  
  // Sanitize HTML
  sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  },
  
  // Escape regex
  escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },
  
  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  
  // Add class with animation support
  addClass(element, className, duration = 0) {
    element.classList.add(className);
    
    if (duration > 0) {
      setTimeout(() => {
        element.classList.remove(className);
      }, duration);
    }
  },
  
  // Remove class with delay
  removeClass(element, className, delay = 0) {
    if (delay > 0) {
      setTimeout(() => {
        element.classList.remove(className);
      }, delay);
    } else {
      element.classList.remove(className);
    }
  },
  
  // Toggle class
  toggleClass(element, className) {
    element.classList.toggle(className);
    return element.classList.contains(className);
  },
  
  // Deep clone object
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (typeof obj === 'object') {
      const cloned = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          cloned[key] = this.deepClone(obj[key]);
        }
      }
      return cloned;
    }
  },
  
  // Format date
  formatDate(date, locale = 'pt-BR') {
    return new Intl.DateTimeFormat(locale).format(new Date(date));
  },
  
  // Validate email
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  // Validate phone (Brazilian format)
  isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 || cleaned.length === 11;
  },
  
  // Format phone
  formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  },
  
  // Format CPF
  formatCPF(cpf) {
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },
  
  // Validate CPF
  isValidCPF(cpf) {
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length !== 11 || /^(\d)\1{10}$/.test(cleaned)) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleaned.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleaned.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.charAt(10))) return false;
    
    return true;
  },
  
  // Calculate shipping cost
  calculateShipping(total) {
    const { freeShippingThreshold, standardShippingCost } = window.APP_CONFIG;
    return total >= freeShippingThreshold ? 0 : standardShippingCost;
  },
  
  // Check if has free shipping
  hasFreeShipping(total) {
    return total >= window.APP_CONFIG.freeShippingThreshold;
  }
};

// Export to global scope
window.Helpers = Helpers;