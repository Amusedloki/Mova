// ============================================
// MOVA — Product Detail Page
// ============================================

const MOVAProductPage = {
  currentProduct: null,
  selectedColorIndex: 0,
  selectedSize: null,
  quantity: 1,
  stickyObserver: null,

  // Render product page
  render(productId) {
    const product = MOVAProducts.getById(productId);
    if (!product) {
      MVARouter.navigate('#/shop');
      return;
    }

    this.currentProduct = product;
    this.selectedColorIndex = 0;
    this.selectedSize = null;
    this.quantity = 1;

    const container = document.getElementById('product-page-content');
    if (!container) return;

    this.renderProduct(container);
    MOVAStorage.addToRecentlyViewed(product.id);
  },

  // Render product content
  renderProduct(container) {
    const p = this.currentProduct;
    const color = p.colors[this.selectedColorIndex];
    const img = MOVAUtils.getProductImage(p, this.selectedColorIndex);
    const related = MOVAProducts.getRelated(p.id, 4);
    const accentClass = MOVAUtils.getCollectionAccent(p.collection);

    container.innerHTML = `
    <div style="padding: 0 var(--gutter) var(--space-16);">
      <div class="container">
        <!-- Breadcrumb -->
        <nav style="padding: var(--space-4) 0; border-bottom: 1px solid var(--color-border); margin-bottom: var(--space-8); display: flex; align-items: center; gap: 8px; font-family: var(--font-display); font-size: var(--text-xs); letter-spacing: var(--tracking-wider); text-transform: uppercase; color: var(--color-ash);" aria-label="Breadcrumb">
          <a href="#/" style="transition: color 0.2s;">Home</a>
          <span>/</span>
          <a href="#/shop" style="transition: color 0.2s;">Shop</a>
          <span>/</span>
          <span style="color: var(--color-obsidian);">${MOVAUtils.escapeHtml(p.name)}</span>
        </nav>

        <div class="grid-editorial">
          <!-- Gallery -->
          <div>
            <div class="product-gallery">
              <img src="${img}" alt="${MOVAUtils.escapeHtml(p.name)} in ${MOVAUtils.escapeHtml(color.name)}">
            </div>
            ${p.colors.length > 1 ? `
            <div class="product-thumbnails">
              ${p.colors.map((c, i) => `
                <button class="product-thumbnail thumb-btn ${i === this.selectedColorIndex ? 'active' : ''}" data-idx="${i}" aria-label="View in ${MOVAUtils.escapeHtml(c.name)}">
                  <img src="${MOVAUtils.getProductImage(p, i)}" alt="">
                </button>
              `).join('')}
            </div>` : ''}
          </div>

          <!-- Info -->
          <div>
            <div class="product-info-sticky">
              <span class="product-card-collection ${accentClass}" style="margin-bottom: 8px; display: block;">${MOVAUtils.escapeHtml(p.collectionLabel)}</span>
              ${p.limited ? '<span class="badge" style="margin-bottom: 12px; display: inline-block;">Limited Edition</span>' : ''}
              <h1 class="product-title">${MOVAUtils.escapeHtml(p.name)}</h1>
              <p class="product-price">${MOVAUtils.price(p.price)}</p>
              <div class="prod-divider"></div>
              <p class="prod-story-label">The Piece</p>
              <p class="product-desc">${MOVAUtils.escapeHtml(p.description)}</p>
              <div class="prod-stock"><span class="dot"></span><span>In Stock</span></div>

              <!-- Color -->
              <div style="margin-bottom: var(--space-6);">
                <p class="text-label" style="margin-bottom: 12px; color: var(--color-ash);">Colour — <span style="color: var(--color-obsidian);">${MOVAUtils.escapeHtml(color.name)}</span></p>
                <div style="display: flex; gap: 8px;">
                  ${p.colors.map((c, i) => `
                    <button class="color-btn color-option ${c.hex === '#f5f0eb' ? 'light-border' : ''} ${i === this.selectedColorIndex ? 'active' : ''}" style="background: ${c.hex};" data-idx="${i}" aria-label="Select ${MOVAUtils.escapeHtml(c.name)}"></button>
                  `).join('')}
                </div>
              </div>

              <!-- Size -->
              <div style="margin-bottom: var(--space-6);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                  <p class="text-label" style="color: var(--color-ash);">Size</p>
                  <button class="sg-btn font-display" style="font-size: 10px; letter-spacing: var(--tracking-wider); text-transform: uppercase; color: var(--color-ash); text-decoration: underline; text-underline-offset: 4px; cursor: pointer; background: none; border: none; transition: color 0.2s;">Size Guide</button>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                  ${p.sizes.map(s => `
                    <button class="size-btn size-option ${s === this.selectedSize ? 'active' : ''}" data-size="${s}">${s}</button>
                  `).join('')}
                </div>
              </div>

              <!-- Quantity -->
              <div style="margin-bottom: var(--space-8);">
                <p class="text-label" style="color: var(--color-ash); margin-bottom: 12px;">Quantity</p>
                <div style="display: flex; align-items: center; border: 1px solid var(--color-border); width: fit-content;">
                  <button id="qty-minus" style="padding: 10px 16px; font-size: var(--text-sm); cursor: pointer; transition: all 0.2s;" aria-label="Decrease">−</button>
                  <span class="font-display" id="qty-display" style="padding: 10px 20px; font-size: var(--text-sm); font-weight: var(--weight-semibold); border-left: 1px solid var(--color-border); border-right: 1px solid var(--color-border);">${this.quantity}</span>
                  <button id="qty-plus" style="padding: 10px 16px; font-size: var(--text-sm); cursor: pointer; transition: all 0.2s;" aria-label="Increase">+</button>
                </div>
              </div>

              <!-- Add to bag -->
              <div class="prod-atb-wrap">
                <button id="atb-btn" class="btn btn-primary btn-full" style="padding: var(--space-4);">Add to Bag →</button>
              </div>
              <p id="prod-err" class="text-accent" style="font-size: var(--text-xs); margin-top: 12px; display: none;"></p>

              <!-- Details -->
              <div style="margin-top: var(--space-10); border-top: 1px solid var(--color-border);">
                <button class="accordion-toggle acc-toggle" data-target="acc-d">
                  <span>Details</span>
                  <span class="accordion-icon">+</span>
                </button>
                <div id="acc-d" class="accordion-content">
                  <div style="padding-bottom: var(--space-6); font-size: var(--text-sm); color: var(--color-graphite); opacity: 0.7; display: flex; flex-direction: column; gap: 8px;">
                    <p><span style="color: var(--color-ash);">Material:</span> ${MOVAUtils.escapeHtml(p.material)}</p>
                    <p><span style="color: var(--color-ash);">Fit:</span> ${MOVAUtils.escapeHtml(p.fit)}</p>
                    <p><span style="color: var(--color-ash);">Care:</span> ${MOVAUtils.escapeHtml(p.care)}</p>
                    <p><span style="color: var(--color-ash);">Code:</span> ${MOVAUtils.escapeHtml(p.code)}</p>
                  </div>
                </div>

                <button class="accordion-toggle acc-toggle" data-target="acc-dr" style="border-top: 1px solid var(--color-border);">
                  <span>Delivery & Returns</span>
                  <span class="accordion-icon">+</span>
                </button>
                <div id="acc-dr" class="accordion-content">
                  <div style="padding-bottom: var(--space-6); font-size: var(--text-sm); color: var(--color-graphite); opacity: 0.7; display: flex; flex-direction: column; gap: 8px;">
                    <p>Standard: 5–7 business days ($10)</p>
                    <p>Express: 2–3 business days ($25)</p>
                    <p>Free shipping on orders over $200</p>
                    <p style="margin-top: 12px;">Returns accepted within 14 days. Items must be unworn with tags.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        ${related.length ? `
        <div style="margin-top: var(--space-16); border-top: 1px solid var(--color-border); padding-top: var(--space-12);">
          <h2 class="font-display" style="font-size: var(--text-sm); font-weight: var(--weight-semibold); letter-spacing: var(--tracking-widest); text-transform: uppercase; margin-bottom: var(--space-8);">From the Collection</h2>
          <div class="product-grid">
            ${related.map(rp => MOVAProductCard.render(rp)).join('')}
          </div>
        </div>` : ''}
      </div>
    </div>`;

    // Bind events
    this.bindEvents(container);
  },

  // Bind event listeners
  bindEvents(container) {
    // Color selection
    container.querySelectorAll('.color-option').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedColorIndex = parseInt(btn.dataset.idx);
        this.renderProduct(container);
      });
    });

    // Thumbnail selection
    container.querySelectorAll('.thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedColorIndex = parseInt(btn.dataset.idx);
        this.renderProduct(container);
      });
    });

    // Size selection
    container.querySelectorAll('.size-option').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedSize = btn.dataset.size;
        container.querySelectorAll('.size-option').forEach(b => {
          b.classList.toggle('active', b.dataset.size === this.selectedSize);
        });
      });
    });

    // Quantity
    const qtyDisplay = container.querySelector('#qty-display');
    container.querySelector('#qty-minus')?.addEventListener('click', () => {
      this.quantity = Math.max(1, this.quantity - 1);
      if (qtyDisplay) qtyDisplay.textContent = this.quantity;
    });
    container.querySelector('#qty-plus')?.addEventListener('click', () => {
      this.quantity = Math.min(10, this.quantity + 1);
      if (qtyDisplay) qtyDisplay.textContent = this.quantity;
    });

    // Add to bag
    container.querySelector('#atb-btn')?.addEventListener('click', () => {
      const errEl = container.querySelector('#prod-err');
      if (this.selectedSize === null) {
        errEl.textContent = 'Please select a size.';
        errEl.style.display = 'block';
        return;
      }
      errEl.style.display = 'none';
      MOVACart.addItem(this.currentProduct.id, this.selectedColorIndex, this.selectedSize, this.quantity);
    });

    // Accordions
    container.querySelectorAll('.acc-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = container.querySelector('#' + btn.dataset.target);
        const icon = btn.querySelector('.accordion-icon');
        if (target) target.classList.toggle('open');
        if (icon) icon.classList.toggle('open');
      });
    });

    // Size guide — open modal
    container.querySelector('.sg-btn')?.addEventListener('click', () => {
      const overlay = document.getElementById('sg-overlay');
      if (overlay) overlay.classList.add('open');
    });

    // Sticky ATB on mobile
    const stickyBar = document.getElementById('sticky-atb');
    const atbBtn = container.querySelector('#atb-btn');
    if (stickyBar && atbBtn) {
      // Clean up previous observer
      if (this.stickyObserver) this.stickyObserver.disconnect();

      document.getElementById('sticky-atb-name').textContent = this.currentProduct.name;
      document.getElementById('sticky-atb-price').textContent = MOVAUtils.price(this.currentProduct.price);

      this.stickyObserver = new IntersectionObserver(([entry]) => {
        stickyBar.classList.toggle('show', !entry.isIntersecting);
      }, { threshold: 0 });
      this.stickyObserver.observe(atbBtn);

      document.getElementById('sticky-atb-btn').addEventListener('click', () => {
        atbBtn.click();
      });
    }
  }
};

window.MOVAProductPage = MOVAProductPage;