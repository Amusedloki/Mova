// ============================================
// MOVA — Router
// ============================================

const MOVARouter = {
  routes: {},
  currentPage: null,

  // Register a route
  register(path, handler) {
    this.routes[path] = handler;
  },

  // Navigate to a route
  navigate(hash) {
    window.location.hash = hash;
  },

  // Get current route info
  getCurrentRoute() {
    const hash = window.location.hash || '#/';
    const [path, queryStr] = hash.slice(1).split('?');
    return {
      path,
      params: new URLSearchParams(queryStr || ''),
      hash
    };
  },

  // Handle route change
  handleRoute() {
    const route = this.getCurrentRoute();

    // Close any open overlays
    if (window.MOVAComponents) {
      MOVAComponents.closeCart();
      MOVAComponents.closeMobileNav();
    }

    // Hide sticky ATB when leaving product page
    const stickyBar = document.getElementById('sticky-atb');
    if (stickyBar) stickyBar.classList.remove('show');

    // Close size guide modal
    const sgOverlay = document.getElementById('sg-overlay');
    if (sgOverlay) sgOverlay.classList.remove('open');

    // Find matching route handler
    let matched = false;
    for (const [pattern, handler] of Object.entries(this.routes)) {
      const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, '([^/]+)') + '$');
      const match = route.path.match(regex);
      if (match) {
        const params = match.slice(1);
        handler(route.params, ...params);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Default to home
      this.navigate('#/');
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Update nav style
    if (window.MOVAComponents) {
      MOVAComponents.updateNavStyle();
    }

    // Initialize reveal animations
    if (window.MOVAAnimations) {
      MOVAAnimations.initRevealObserver();
    }
  },

  // Initialize router
  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }
};

window.MVARouter = MOVARouter;