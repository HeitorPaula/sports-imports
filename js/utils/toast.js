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
  
  show(message, type = 'success', duration = null) {
    this.init();
    
    const toast = document.createElement('div');
    const toastId = 'toast-' + Utils.generateId();
    
    const toastDuration = duration || TOAST_CONFIG.DURATION[type.toUpperCase()] || 3000;
    
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
    
    if (window.lucide) {
      lucide.createIcons();
    }
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    if (toastDuration > 0) {
      const progressBar = toast.querySelector('.toast-progress');
      if (progressBar) {
        progressBar.style.animationDuration = `${toastDuration}ms`;
        progressBar.classList.add('animate');
      }
      
      setTimeout(() => this.remove(toastId), toastDuration);
    }
    
    return toastId;
  },
  
  success(message, duration = null) {
    return this.show(message, 'success', duration);
  },
  
  error(message, duration = null) {
    return this.show(message, 'error', duration);
  },
  
  warning(message, duration = null) {
    return this.show(message, 'warning', duration);
  },
  
  info(message, duration = null) {
    return this.show(message, 'info', duration);
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

window.Toast = Toast;