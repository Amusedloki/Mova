// ============================================
// MOVA — Shared Components
// ============================================

const MOVAComponents = {
  closeCart() {
    const overlay = document.getElementById('cart-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  },

  openCart() {
    const overlay = document.getElementById('cart-overlay');
    if (overlay) {
      overlay.classList.add('open');
      document.body.classList.add('no-scroll');
    }
  },

  closeMobileNav() {
    const nav = document.getElementById('mobile-nav');
    if (nav) {
      nav.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  },

  openMobileNav() {
    const nav = document.getElementById('mobile-nav');
    if (nav) {
      nav.classList.add('open');
      document.body.classList.add('no-scroll');
    }
  },

  updateNavStyle() {
    if (window.MOVANavbar) {
      MOVANavbar.updateNavStyle(MOVARouter.currentPage || 'home');
    }
  }
};

window.MOVAComponents = MOVAComponents;
