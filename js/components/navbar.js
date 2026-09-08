// ============================================
// MOVA — Navbar Component
// ============================================

const MOVANavbar = {
  cartCount: 0,

  // Update cart count display
  updateCartCount(count) {
    this.cartCount = count;
    const el = document.getElementById('cart-count');
    if (el) el.textContent = count;
  },

  // Update nav style based on current page
  updateNavStyle(currentPage) {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;

    const darkPages = ['home', 'phases', 'phase'];
    const isDark = darkPages.includes(currentPage);

    nav.classList.remove('nav-light', 'nav-dark', 'nav-solid-light', 'nav-solid-dark');

    if (isDark) {
      nav.classList.add('nav-light');
      nav.style.background = 'transparent';
    } else {
      nav.classList.add('nav-dark', 'nav-solid-dark');
      nav.style.background = '';
    }
  },

  // Handle scroll for nav background
  initScrollHandler() {
    let currentPage = 'home';

    window.addEventListener('scroll', MOVAUtils.throttle(() => {
      const nav = document.querySelector('.main-nav');
      if (!nav) return;

      const darkPages = ['home', 'phases', 'phase'];
      const isDark = darkPages.includes(currentPage);

      if (isDark) {
        if (window.scrollY > 100) {
          nav.classList.add('nav-solid-light');
          nav.style.background = '';
        } else {
          nav.classList.remove('nav-solid-light');
          nav.style.background = 'transparent';
        }
      }
    }, 100), { passive: true });
  },

  // Initialize navbar
  init() {
    this.initScrollHandler();

    // Mobile menu toggle
    const toggle = document.getElementById('mobile-menu-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        if (window.MOVAComponents) MOVAComponents.openMobileNav();
      });
    }

    // Mobile nav close
    const close = document.getElementById('mobile-nav-close');
    if (close) {
      close.addEventListener('click', () => {
        if (window.MOVAComponents) MOVAComponents.closeMobileNav();
      });
    }

    // Mobile nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.MOVAComponents) MOVAComponents.closeMobileNav();
      });
    });
  }
};

window.MOVANavbar = MOVANavbar;