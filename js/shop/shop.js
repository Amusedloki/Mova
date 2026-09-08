// ============================================
// MOVA — Shop Page
// ============================================

const MOVAShop = {
  currentFilter: 'all',
  currentSort: 'featured',
  searchTerm: '',

  // Render shop page
  render(params) {
    this.currentFilter = params.get('collection') || 'all';
    this.currentSort = 'featured';

    const products = this.getFilteredProducts();
    this.renderGrid(products);
    this.syncFilterPills();
    this.updateCount(products.length);
  },

  // Get filtered and sorted products
  getFilteredProducts() {
    let products = MOVAProducts.getAll();

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.collection.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term)) ||
        (p.category && p.category.toLowerCase().includes(term))
      );
    }

    // Apply collection/category filter
    if (this.currentFilter !== 'all') {
      if (this.currentFilter === 'footwear') {
        products = products.filter(p => p.category === 'footwear');
      } else if (this.currentFilter === 'accessories') {
        products = products.filter(p => p.category === 'accessories');
      } else {
        products = products.filter(p => p.collection === this.currentFilter);
      }
    }

    // Apply sort
    products = MOVAProducts.sort(products, this.currentSort);

    return products;
  },

  // Render product grid
  renderGrid(products) {
    const grid = document.getElementById('shop-grid');
    const noResults = document.getElementById('no-results');

    if (!grid) return;

    if (!products.length) {
      grid.innerHTML = '';
      if (noResults) noResults.classList.remove('hidden');
      return;
    }

    if (noResults) noResults.classList.add('hidden');
    grid.innerHTML = MOVAProductCard.renderGrid(products);
  },

  // Update product count
  updateCount(count) {
    const el = document.getElementById('product-count');
    if (el) el.textContent = count;
  },

  // Sync filter pill states
  syncFilterPills() {
    document.querySelectorAll('#shop-filters .filter-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.filter === this.currentFilter);
    });
  },

  // Initialize shop page
  init() {
    // Filter pills
    document.querySelectorAll('#shop-filters .filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        this.currentFilter = pill.dataset.filter;
        this.syncFilterPills();
        const products = this.getFilteredProducts();
        this.renderGrid(products);
        this.updateCount(products.length);
      });
    });

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        const products = this.getFilteredProducts();
        this.renderGrid(products);
      });
    }

    // Search input
    const searchInput = document.getElementById('shop-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.trim();
        const products = this.getFilteredProducts();
        this.renderGrid(products);
        this.updateCount(products.length);
      });
    }
  }
};

window.MOVAShop = MOVAShop;