// ============================================
// MOVA — Main Application
// ============================================

const MOVAApp = {
  // Initialize application
  async init() {
    // Load product data
    await MOVAProducts.load();

    // Initialize cart
    MOVACart.init();

    // Initialize components
    MOVANavbar.init();
    MOVACartDrawer.init();
    MOVAFooter.init();
    MOVAShop.init();

    // Register routes
    this.registerRoutes();

    // Initialize router
    MOVARouter.init();

    // Initialize animations
    MOVAAnimations.init();

    // Show footer
    this.updateFooter();

    // Size Guide modal
    const sgClose = document.getElementById('sg-close');
    const sgOverlay = document.getElementById('sg-overlay');
    if (sgClose) sgClose.addEventListener('click', () => sgOverlay.classList.remove('open'));
    if (sgOverlay) sgOverlay.addEventListener('click', (e) => {
      if (e.target === sgOverlay) sgOverlay.classList.remove('open');
    });
  },

  // Register all routes
  registerRoutes() {
    // Home
    MVARouter.register('/', (params) => {
      this.showPage('home');
      MOVARouter.currentPage = 'home';
      this.renderHomePage();
    });

    // Shop
    MVARouter.register('/shop', (params) => {
      this.showPage('shop');
      MOVARouter.currentPage = 'shop';
      MOVAShop.render(params);
    });

    // Product detail
    MVARouter.register('/product/:id', (params, id) => {
      this.showPage('product');
      MOVARouter.currentPage = 'product';
      MOVAProductPage.render(id);
    });

    // Phases
    MVARouter.register('/phases', (params) => {
      this.showPage('phases');
      MOVARouter.currentPage = 'phases';
    });

    // Phase 01
    MVARouter.register('/phase/01', (params) => {
      this.showPage('phase-01');
      MOVARouter.currentPage = 'phase';
      this.renderPhase01Page();
    });

    // About
    MVARouter.register('/about', (params) => {
      this.showPage('about');
      MOVARouter.currentPage = 'about';
    });

    // Checkout
    MVARouter.register('/checkout', (params) => {
      this.showPage('checkout');
      MOVARouter.currentPage = 'checkout';
      if (window.MOVACheckout) {
        MOVACheckout.goToStep(1);
        MOVACheckout.init();
      }
    });

    // Order confirmation
    MVARouter.register('/confirmation', (params) => {
      this.showPage('confirmation');
      MOVARouter.currentPage = 'confirmation';
    });

    // Order tracking
    MVARouter.register('/tracking', (params) => {
      this.showPage('tracking');
      MOVARouter.currentPage = 'tracking';
    });

    // Archive (future)
    MVARouter.register('/archive', (params) => {
      this.showPage('archive');
      MOVARouter.currentPage = 'archive';
    });
  },

  // Show a page by ID
  showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById(`page-${pageId}`);
    if (page) page.classList.add('active');
  },

  // Update footer visibility
  updateFooter() {
    const footer = document.getElementById('site-footer');
    if (footer) {
      footer.style.display = MOVARouter.currentPage === 'confirmation' ? 'none' : '';
    }
  },

  // Render home page
  renderHomePage() {
    const featuredIds = [13, 19, 9, 29, 23];
    const featured = featuredIds.map(id => MOVAProducts.getById(id)).filter(Boolean);

    // Featured products grid
    const featGrid = document.getElementById('featured-grid');
    if (featGrid && featured.length >= 5) {
      featGrid.innerHTML = featured.map(p => MOVAProductCard.renderFeatured(p)).join('');
    }

    // Phase 01 featured
    const phase01Grid = document.getElementById('phase01-featured');
    if (phase01Grid) {
      const phase01 = MOVAProducts.getByCollection('phase-01').slice(0, 4);
      phase01Grid.innerHTML = MOVAProductCard.renderGrid(phase01);
    }
  },

  // Render Phase 01 page
  renderPhase01Page() {
    const grid = document.getElementById('phase01-grid');
    if (grid) {
      const phase01 = MOVAProducts.getByCollection('phase-01');
      grid.innerHTML = MOVAProductCard.renderGrid(phase01);
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => MOVAApp.init());