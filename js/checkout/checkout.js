// ============================================
// MOVA — Checkout
// ============================================

const MOVACheckout = {
  step: 1,
  deliveryCost: 10,

  // Update order summary sidebar
  updateSummary() {
    const items = MOVACart.getItems();
    let html = '';
    items.forEach(i => {
      html += `<div class="ck-summary-item"><div class="ck-summary-img"><img src="${i.image}" alt="${MOVAUtils.escapeHtml(i.name)}"></div><div class="ck-summary-info"><p class="ck-summary-name">${MOVAUtils.escapeHtml(i.name)}</p><p class="ck-summary-variant">${MOVAUtils.escapeHtml(i.color)} / ${MOVAUtils.escapeHtml(i.size)}</p><p class="ck-summary-price">${MOVAUtils.price(i.price * i.qty)}</p></div></div>`;
    });
    const itemsEl = document.getElementById('ck-summary-items');
    if (itemsEl) itemsEl.innerHTML = html;

    const sub = MOVACart.getSubtotal();
    const delivery = this.getDeliveryOpt() === 'express' ? 25 : 10;
    this.deliveryCost = delivery;
    const total = sub + delivery;

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setEl('ck-subtotal', MOVAUtils.price(sub));
    setEl('ck-shipping', MOVAUtils.price(delivery));
    setEl('ck-total', MOVAUtils.price(total));
  },

  // Navigate to step
  goToStep(n) {
    this.step = n;
    for (let i = 1; i <= 3; i++) {
      const num = document.getElementById('ck-num-' + i);
      const txt = document.getElementById('ck-txt-' + i);
      const sec = document.getElementById('checkout-step-' + i);
      if (!num || !txt || !sec) continue;

      if (i < n) {
        num.className = 'ck-step-num done';
        num.innerHTML = '✓';
        txt.className = 'ck-step-text on';
      } else if (i === n) {
        num.className = 'ck-step-num active';
        num.textContent = i;
        txt.className = 'ck-step-text on';
      } else {
        num.className = 'ck-step-num pending';
        num.textContent = i;
        txt.className = 'ck-step-text off';
      }
      sec.classList.toggle('hidden', i !== n);
    }

    const c1 = document.getElementById('ck-conn-1');
    const c2 = document.getElementById('ck-conn-2');
    if (c1) c1.className = 'ck-step-connector' + (n > 1 ? ' done' : '');
    if (c2) c2.className = 'ck-step-connector' + (n > 2 ? ' done' : '');

    this.updateSummary();
  },

  // Validate step 1
  validateStep1() {
    const fields = ['co-name', 'co-email', 'co-phone', 'co-address', 'co-city', 'co-state', 'co-zip', 'co-country'];
    for (const f of fields) {
      const el = document.getElementById(f);
      if (!el || !el.value.trim()) return 'Please fill in all fields.';
    }
    return null;
  },

  // Get delivery option
  getDeliveryOpt() {
    const checked = document.querySelector('input[name="delivery"]:checked');
    return checked ? checked.value : 'standard';
  },

  // Render review step
  renderReview() {
    const items = MOVACart.getItems();
    let html = '';
    items.forEach(i => {
      html += `<div class="review-item"><div class="review-item-img"><img src="${i.image}" alt="${MOVAUtils.escapeHtml(i.name)}"></div><div class="review-item-info"><p class="review-item-name">${MOVAUtils.escapeHtml(i.name)}</p><p class="review-item-variant">${MOVAUtils.escapeHtml(i.color)} / ${MOVAUtils.escapeHtml(i.size)}</p><p class="review-item-qty">Qty: ${i.qty}</p></div><p class="review-item-price">${MOVAUtils.price(i.price * i.qty)}</p></div>`;
    });
    const itemsEl = document.getElementById('review-items');
    if (itemsEl) itemsEl.innerHTML = html;

    const sub = MOVACart.getSubtotal();
    this.deliveryCost = this.getDeliveryOpt() === 'express' ? 25 : 10;
    const total = sub + this.deliveryCost;

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setEl('review-subtotal', MOVAUtils.price(sub));
    setEl('review-shipping', MOVAUtils.price(this.deliveryCost));
    setEl('review-total', MOVAUtils.price(total));

    const nm = document.getElementById('co-name')?.value || '';
    const em = document.getElementById('co-email')?.value || '';
    const ad = document.getElementById('co-address')?.value || '';
    const ci = document.getElementById('co-city')?.value || '';
    const st = document.getElementById('co-state')?.value || '';
    const zp = document.getElementById('co-zip')?.value || '';
    const co = document.getElementById('co-country')?.value || '';
    setEl('review-address', `${nm}\n${ad}\n${ci}, ${st} ${zp}\n${co}\n${em}`);
  },

  // Place order
  placeOrder() {
    const orderNum = 'MOVA-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    const items = MOVACart.getItems();
    let html = '';
    items.forEach(i => {
      html += `<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:12px"><span>${MOVAUtils.escapeHtml(i.name)} (x${i.qty})</span><span>${MOVAUtils.price(i.price * i.qty)}</span></div>`;
    });
    const itemsEl = document.getElementById('order-summary-items');
    if (itemsEl) itemsEl.innerHTML = html;
    const numEl = document.getElementById('order-number');
    if (numEl) numEl.textContent = orderNum;
    const total = MOVACart.getSubtotal() + this.deliveryCost;
    const totalEl = document.getElementById('order-total');
    if (totalEl) totalEl.textContent = MOVAUtils.price(total);

    MOVACart.clear();
    if (window.MOVACartDrawer) MOVACartDrawer.render();

    // Navigate to confirmation
    window.location.hash = '#/confirmation';
  },

  // Initialize checkout
  init() {
    const $ = id => document.getElementById(id);

    // Step 1: Continue to Payment
    $('to-payment-btn')?.addEventListener('click', () => {
      const err = this.validateStep1();
      if (err) {
        const errEl = $('checkout-error');
        if (errEl) { errEl.textContent = err; errEl.style.display = 'block'; }
        return;
      }
      const errEl = $('checkout-error');
      if (errEl) errEl.style.display = 'none';
      this.goToStep(2);
    });

    // Back to delivery
    $('back-to-delivery')?.addEventListener('click', () => this.goToStep(1));

    // Step 2: Review Order
    $('to-review-btn')?.addEventListener('click', () => {
      this.renderReview();
      this.goToStep(3);
    });

    // Back to payment
    $('back-to-payment')?.addEventListener('click', () => this.goToStep(2));

    // Place order
    $('place-order-btn')?.addEventListener('click', () => this.placeOrder());

    // Mobile summary toggle
    $('ck-summary-toggle')?.addEventListener('click', () => {
      const col = document.querySelector('.ck-order-col');
      const btn = $('ck-summary-toggle');
      if (col) {
        col.classList.toggle('mobile-open');
        btn.textContent = col.classList.contains('mobile-open') ? 'Hide Order Summary ▴' : 'Show Order Summary ▾';
      }
    });

    // Initialize summary on checkout page visit
    this.updateSummary();
  }
};

window.MOVACheckout = MOVACheckout;
