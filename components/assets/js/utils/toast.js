// Sports Imports - Toast Notifications

const Toast = {
  container: null,
  
  init() {
    if (!this.container) {
      this.container = document.getElementById('toastContainer');
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.id = 'toastContainer';
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
      }
    }
  },
  
  show(message, type = 'success', duration = 3000) {
    this.init();
    
    const toast = document.createElement('div');
    const toastId = 'toast-' + Utils.generateId();
    
    toast.id = toastId;
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-icon">
          ${this.getIcon(type)}
        </div>
        <div class="toast-message">${Utils.escapeHtml(message)}</div>
        <button class="toast-close" onclick="Toast.remove('${toastId}')">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="toast-progress"></div>
    `;
    
    this.container.appendChild(toast);
    
    // Initialize icons
    if (window.lucide) {
      lucide.createIcons();
    }
    
    // Show toast
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Auto remove
    if (duration > 0) {
      const progressBar = toast.querySelector('.toast-progress');
      if (progressBar) {
        progressBar.style.animationDuration = `${duration}ms`;
        progressBar.classList.add('animate');
      }
      
      setTimeout(() => {
        this.remove(toastId);
      }, duration);
    }
    
    return toastId;
  },
  
  success(message, duration = 3000) {
    return this.show(message, 'success', duration);
  },
  
  error(message, duration = 4000) {
    return this.show(message, 'error', duration);
  },
  
  remove(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.classList.add('hide');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }
  },
  
  getIcon(type) {
    const icons = {
      success: '<i data-lucide="check-circle"></i>',
      error: '<i data-lucide="x-circle"></i>',
      warning: '<i data-lucide="alert-triangle"></i>',
      info: '<i data-lucide="info"></i>'
    };
    
    return icons[type] || icons.info;
  }
};

// Export to global scope
window.Toast = Toast;