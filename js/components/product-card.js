// ============================================
// MOVA — Product Card Component
// ============================================

const MOVAProductCard = {
  // Render a product card
  render(product, options = {}) {
    const { showBadge = true, showQuickView = true, lazy = true } = options;
    const img = MOVAUtils.getProductImage(product);
    const accentClass = MOVAUtils.getCollectionAccent(product.collection);

    return `
    <a href="#/product/${product.id}" class="product-card">
      <div class="product-card-image">
        <img src="${img}" alt="${MOVAUtils.escapeHtml(product.name)}" ${lazy ? 'loading="lazy"' : ''}>
        ${showBadge && product.limited ? '<span class="product-card-badge badge">Limited</span>' : ''}
        ${showQuickView ? `
        <div class="img-overlay">
          <span class="quick-view-btn">Quick View →</span>
        </div>` : ''}
      </div>
      <div class="product-card-info">
        <span class="product-card-collection ${accentClass}">${MOVAUtils.escapeHtml(product.collectionLabel)}</span>
        <span class="product-card-name">${MOVAUtils.escapeHtml(product.name)}</span>
        <span class="product-card-price">${MOVAUtils.price(product.price)}</span>
      </div>
    </a>`;
  },

  // Render featured product (clean product card)
  renderFeatured(product) {
    const img = MOVAUtils.getProductImage(product);
    const colors = ['#d4b89c','#a8b5c0','#c5d86d','#c49a6c','#d93025'];
    const bg = colors[product.id % colors.length] || '#e8e3de';

    return `
    <a href="#/product/${product.id}" class="featured-card">
      <div class="featured-card-img" style="background:${bg};">
        <img src="${img}" alt="${MOVAUtils.escapeHtml(product.name)}" loading="lazy">
      </div>
      <p class="featured-card-collection">${MOVAUtils.escapeHtml(product.collectionLabel)}</p>
      <p class="featured-card-name">${MOVAUtils.escapeHtml(product.name)}</p>
      <p class="featured-card-price">${MOVAUtils.price(product.price)}</p>
    </a>`;
  },

  // Render a grid of product cards
  renderGrid(products, options = {}) {
    return products.map(p => this.render(p, options)).join('');
  }
};

window.MOVAProductCard = MOVAProductCard;