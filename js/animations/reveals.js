// ============================================
// MOVA — Reveal Animations
// ============================================

const MOVAAnimations = {
  observer: null,

  // Initialize intersection observer for reveals
  initRevealObserver() {
    // Disconnect previous observer
    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('visible');
      this.observer.observe(el);
    });

    // Observe data-reveal-word elements (About page Section 04)
    document.querySelectorAll('[data-reveal-word]').forEach(el => {
      el.classList.remove('visible');
      this.observer.observe(el);
    });
  },

  // Initialize all animations
  init() {
    this.initRevealObserver();
  }
};

window.MOVAAnimations = MOVAAnimations;