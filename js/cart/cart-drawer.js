// ============================================
// MOVA — Cart Drawer Component
// ============================================

const MOVACartDrawer = {
  // Render cart drawer content
  render() {
    const items = MOVACart.getItems();
    const footerEl = document.getElementById('cart-footer');
    const emptyEl = document.getElementById('cart-empty');
    const itemsEl = document.getElementById('cart-items');

    if (!items.length) {
      if (itemsEl) itemsEl.innerHTML = '';
      if (footerEl) footerEl.classList.add('hidden');
      if (emptyEl) emptyEl.classList.remove('hidden');
      return;
    }

    if (emptyEl) emptyEl.classList.add('hidden');
    if (footerEl) footerEl.classList.remove('hidden');

    if (!itemsEl) return;

    itemsEl.innerHTML = items.map(item => `
      <div class="flex gap-4" style="padding: var(--space-5) 0; border-bottom: 1px solid var(--color-border);">
        <div style="width: 80px; height: 96px; background: rgba(26,26,26,0.06); flex-shrink: 0; overflow: hidden;">
          <img src="${item.image}" alt="${MOVAUtils.escapeHtml(item.name)}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1; min-width: 0;">
          <p class="font-display" style="font-size: var(--text-xs); font-weight: var(--weight-semibold); letter-spacing: var(--tracking-wide); text-transform: uppercase; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${MOVAUtils.escapeHtml(item.name)}</p>
          <p style="font-size: 11px; color: var(--color-ash); margin-top: 2px;">${MOVAUtils.escapeHtml(item.color)} / ${MOVAUtils.escapeHtml(item.size)}</p>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 12px;">
            <div style="display: flex; align-items: center; border: 1px solid var(--color-border);">
              <button class="cart-qty-btn" data-key="${item.key}" data-delta="-1" style="padding: 4px 10px; font-size: var(--text-xs); cursor: pointer; transition: all 0.2s;" aria-label="Decrease quantity">−</button>
              <span class="font-display" style="padding: 4px 12px; font-size: var(--text-xs); font-weight: var(--weight-semibold); border-left: 1px solid var(--color-border); border-right: 1px solid var(--color-border);">${item.qty}</span>
              <button class="cart-qty-btn" data-key="${item.key}" data-delta="1" style="padding: 4px 10px; font-size: var(--text-xs); cursor: pointer; transition: all 0.2s;" aria-label="Increase quantity">+</button>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="font-display" style="font-size: var(--text-xs); font-weight: var(--weight-semibold);">${MOVAUtils.price(item.price * item.qty)}</span>
              <button class="cart-remove-btn" data-key="${item.key}" style="color: var(--color-ash); cursor: pointer; font-size: var(--text-sm); transition: color 0.2s;" aria-label="Remove ${MOVAUtils.escapeHtml(item.name)}">×</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Update subtotal
    const subtotalEl = document.getElementById('cart-subtotal');
    if (subtotalEl) subtotalEl.textContent = MOVAUtils.price(MOVACart.getSubtotal());

    // Bind event listeners
    itemsEl.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        MOVACart.updateQuantity(btn.dataset.key, parseInt(btn.dataset.delta));
        this.render();
      });
    });

    itemsEl.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        MOVACart.removeItem(btn.dataset.key);
        this.render();
      });
    });
  },

  // Open cart drawer
  open() {
    this.render();
    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.classList.add('open');
    document.body.classList.add('no-scroll');
  },

  // Close cart drawer
  close() {
    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  },

  // Initialize cart drawer
  init() {
    // Cart toggle button
    const toggle = document.getElementById('cart-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.open());
    }

    // Close button
    const close = document.getElementById('cart-close');
    if (close) {
      close.addEventListener('click', () => this.close());
    }

    // Backdrop click
    const backdrop = document.getElementById('cart-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.close());
    }

    // Checkout button
    const checkout = document.getElementById('checkout-btn');
    if (checkout) {
      checkout.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
        MVARouter.navigate('#/checkout');
      });
    }
  }
};

window.MOVACartDrawer = MOVACartDrawer;