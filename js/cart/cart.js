// ============================================
// MOVA — Cart Manager
// ============================================

const MOVACart = {
  items: [],

  // Initialize cart from storage
  init() {
    this.items = MOVAStorage.getCart();
    this.updateUI();
  },

  // Get all items
  getItems() {
    return this.items;
  },

  // Get item count
  getCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  },

  // Get subtotal
  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  // Add item to cart
  addItem(productId, colorIndex, size, quantity = 1) {
    const product = MOVAProducts.getById(productId);
    if (!product) return false;

    const key = `${product.id}-${colorIndex}-${size}`;
    const existing = this.items.find(i => i.key === key);

    if (existing) {
      existing.qty += quantity;
    } else {
      this.items.push({
        key,
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        color: product.colors[colorIndex].name,
        colorHex: product.colors[colorIndex].hex,
        size,
        qty: quantity,
        collection: product.collection,
        image: MOVAUtils.getProductImage(product, colorIndex)
      });
    }

    this.save();
    this.updateUI();
    MOVAUtils.showToast('Added to bag');
    return true;
  },

  // Remove item from cart
  removeItem(key) {
    this.items = this.items.filter(i => i.key !== key);
    this.save();
    this.updateUI();
  },

  // Update item quantity
  updateQuantity(key, delta) {
    const item = this.items.find(i => i.key === key);
    if (!item) return;

    item.qty = Math.max(1, item.qty + delta);
    this.save();
    this.updateUI();
  },

  // Clear cart
  clear() {
    this.items = [];
    this.save();
    this.updateUI();
  },

  // Save to storage
  save() {
    MOVAStorage.setCart(this.items);
  },

  // Update UI elements
  updateUI() {
    // Update cart count in navbar
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = this.getCount();
  }
};

window.MOVACart = MOVACart;