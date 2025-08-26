// Sistema de toast notifications
const Toast = {
  container: null,
  toasts: [],
  
  init() {
    // Create toast container if it doesn't exist
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'toast-container';
      this.container.innerHTML = '';
      document.body.appendChild(this.container);
    }
  },
  
  show(message, type = 'success', duration = 3000) {
    this.init();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-icon">
          ${this.getIcon(type)}
        </div>
        <div class="toast-message">${escapeHtml(message)}</div>
        <button class="toast-close" onclick="Toast.remove('${toast.id}')">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="toast-progress"></div>
    `;
    
    // Generate unique ID
    toast.id = 'toast-' + generateId();
    
    // Add to container
    this.container.appendChild(toast);
    this.toasts.push(toast);
    
    // Initialize lucide icons
    if (window.lucide) {
      lucide.createIcons();
    }
    
    // Animate in
    setTimeout(() => {
      toast.classList.add('toast-show');
    }, 10);
    
    // Auto remove
    if (duration > 0) {
      const progressBar = toast.querySelector('.toast-progress');
      if (progressBar) {
        progressBar.style.animationDuration = `${duration}ms`;
        progressBar.classList.add('toast-progress-animate');
      }
      
      setTimeout(() => {
        this.remove(toast.id);
      }, duration);
    }
    
    return toast.id;
  },
  
  success(message, duration = 3000) {
    return this.show(message, 'success', duration);
  },
  
  error(message, duration = 4000) {
    return this.show(message, 'error', duration);
  },
  
  warning(message, duration = 3500) {
    return this.show(message, 'warning', duration);
  },
  
  info(message, duration = 3000) {
    return this.show(message, 'info', duration);
  },
  
  remove(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.classList.add('toast-hide');
      
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
        
        // Remove from array
        const index = this.toasts.findIndex(t => t.id === toastId);
        if (index > -1) {
          this.toasts.splice(index, 1);
        }
      }, 300);
    }
  },
  
  clear() {
    this.toasts.forEach(toast => {
      this.remove(toast.id);
    });
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

// CSS for toast styling
const toastCSS = `
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
}

.toast {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border);
  min-width: 300px;
  max-width: 400px;
  overflow: hidden;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.3s ease;
  pointer-events: auto;
  position: relative;
}

.toast-show {
  opacity: 1;
  transform: translateX(0);
}

.toast-hide {
  opacity: 0;
  transform: translateX(100%);
}

.toast-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
}

.toast-icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
}

.toast-message {
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--foreground);
}

.toast-close {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted-foreground);
  padding: 0;
  margin-top: 0.125rem;
}

.toast-close:hover {
  color: var(--foreground);
}

.toast-progress {
  height: 3px;
  background: var(--muted);
  position: relative;
  overflow: hidden;
}

.toast-progress::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: currentColor;
  transform: translateX(-100%);
}

.toast-progress-animate::before {
  animation: toast-progress-animation linear forwards;
}

@keyframes toast-progress-animation {
  to {
    transform: translateX(0);
  }
}

.toast-success {
  border-left: 4px solid var(--green-600);
}

.toast-success .toast-icon {
  color: var(--green-600);
}

.toast-success .toast-progress::before {
  background: var(--green-600);
}

.toast-error {
  border-left: 4px solid var(--red-600);
}

.toast-error .toast-icon {
  color: var(--red-600);
}

.toast-error .toast-progress::before {
  background: var(--red-600);
}

.toast-warning {
  border-left: 4px solid var(--orange-400);
}

.toast-warning .toast-icon {
  color: var(--orange-400);
}

.toast-warning .toast-progress::before {
  background: var(--orange-400);
}

.toast-info {
  border-left: 4px solid var(--blue-600);
}

.toast-info .toast-icon {
  color: var(--blue-600);
}

.toast-info .toast-progress::before {
  background: var(--blue-600);
}

@media (max-width: 640px) {
  .toast-container {
    top: 0.5rem;
    right: 0.5rem;
    left: 0.5rem;
  }
  
  .toast {
    min-width: unset;
    max-width: unset;
  }
}
`;

// Add CSS to page
function addToastCSS() {
  if (!document.getElementById('toast-css')) {
    const style = document.createElement('style');
    style.id = 'toast-css';
    style.textContent = toastCSS;
    document.head.appendChild(style);
  }
}

// Initialize toast CSS when DOM is ready
ready(() => {
  addToastCSS();
});