// ============================================
// MOVA — Utility Functions
// ============================================

const MOVAUtils = {
  // DOM helpers
  $(selector) { return document.querySelector(selector); },
  $$(selector) { return document.querySelectorAll(selector); },

  // Format price
  price(n) { return '$' + n.toFixed(2); },

  // Product image — numbered local photos (01.png–30.png matched to product id)
  getProductImage(product, colorIndex = 0) {
    if (!product) return '';
    const id = String(product.id).padStart(2, '0');
    return 'assets/images/Products/' + id + '.png';
  },

  // Get collection accent class
  getCollectionAccent(collection) {
    const accents = {
      'essentials': 'collection-label--essentials',
      'phase-01': 'collection-label--phase',
      'editions': 'collection-label--editions'
    };
    return accents[collection] || '';
  },

  // Debounce function
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  // Throttle function
  throttle(fn, limit = 100) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Generate random order number
  generateOrderNumber() {
    return 'MOVA-' + Math.random().toString(36).substring(2, 7).toUpperCase();
  },

  // Sanitize HTML
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  // Get URL parameters
  getUrlParams() {
    const hash = window.location.hash || '#/';
    const [path, queryStr] = hash.slice(1).split('?');
    return {
      path,
      params: new URLSearchParams(queryStr || '')
    };
  },

  // Show toast notification
  showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }
};

// Export for use in other modules
window.MOVAUtils = MOVAUtils;