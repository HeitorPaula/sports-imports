// Sports Imports - Toast Notifications (Identical to React version)

const Toast = {
  container: null,
  
  init() {
    if (!this.container) {
      this.container = document.getElementById('toastContainer');
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.id = 'toastContainer';
        this.container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2';
        document.body.appendChild(this.container);
      }
    }
  },
  
  show(message, type = 'success', duration = 3000) {
    this.init();
    
    const toast = document.createElement('div');
    const toastId = 'toast-' + Date.now() + Math.random().toString(36).substr(2, 9);
    
    const bgColor = type === 'error' ? 'bg-red-600' : 'bg-green-600';
    
    toast.id = toastId;
    toast.className = `${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-80 transform translate-x-full opacity-0 transition-all duration-300`;
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <i data-lucide="${this.getIcon(type)}" class="w-4 h-4 flex-shrink-0"></i>
        <span class="text-sm font-medium">${message}</span>
      </div>
      <button onclick="Toast.remove('${toastId}')" class="text-white/80 hover:text-white ml-auto">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    `;
    
    this.container.appendChild(toast);
    
    // Initialize icons
    if (window.lucide) {
      lucide.createIcons();
    }
    
    // Show toast
    setTimeout(() => {
      toast.classList.remove('translate-x-full', 'opacity-0');
      toast.classList.add('translate-x-0', 'opacity-100');
    }, 10);
    
    // Auto remove
    if (duration > 0) {
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
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }
  },
  
  getIcon(type) {
    const icons = {
      success: 'check-circle',
      error: 'x-circle'
    };
    
    return icons[type] || icons.success;
  }
};

window.Toast = Toast;