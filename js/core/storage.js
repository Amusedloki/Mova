// ============================================
// MOVA — Storage Manager
// ============================================

const MOVAStorage = {
  KEYS: {
    CART: 'mova-cart',
    WISHLIST: 'mova-wishlist',
    RECENTLY_VIEWED: 'mova-recently-viewed'
  },

  // Get from localStorage
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },

  // Set to localStorage
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },

  // Remove from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Storage remove error:', e);
      return false;
    }
  },

  // Cart methods
  getCart() {
    return this.get(this.KEYS.CART) || [];
  },

  setCart(cart) {
    return this.set(this.KEYS.CART, cart);
  },

  clearCart() {
    return this.set(this.KEYS.CART, []);
  },

  // Recently viewed
  getRecentlyViewed() {
    return this.get(this.KEYS.RECENTLY_VIEWED) || [];
  },

  addToRecentlyViewed(productId, maxItems = 10) {
    let recent = this.getRecentlyViewed();
    recent = recent.filter(id => id !== productId);
    recent.unshift(productId);
    if (recent.length > maxItems) recent = recent.slice(0, maxItems);
    return this.set(this.KEYS.RECENTLY_VIEWED, recent);
  }
};

window.MOVAStorage = MOVAStorage;