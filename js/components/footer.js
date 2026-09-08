// ============================================
// MOVA — Footer Component
// ============================================

const MOVAFooter = {
  render() {
    return `
    <footer class="section-dark" style="padding: var(--space-16) var(--gutter);">
      <div class="container">
        <div class="footer-grid" style="margin-bottom: var(--space-16);">
          <div>
            <p class="font-display" style="font-size: var(--text-xl); font-weight: var(--weight-bold); letter-spacing: var(--tracking-tight); margin-bottom: var(--space-4);">MOVA</p>
            <p style="font-size: var(--text-xs); color: var(--color-ash); line-height: var(--leading-relaxed); max-width: 280px;">Contemporary fashion built around movement, evolution, and becoming.</p>
          </div>
          <div>
            <p class="text-label" style="margin-bottom: var(--space-4); color: var(--color-ash);">Shop</p>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2);">
              <li><a href="#/shop" style="font-size: var(--text-sm); color: rgba(245,240,235,0.6); transition: color 0.2s;" onmouseover="this.style.color='var(--color-bone)'" onmouseout="this.style.color='rgba(245,240,235,0.6)'">All Products</a></li>
              <li><a href="#/shop?collection=essentials" style="font-size: var(--text-sm); color: rgba(245,240,235,0.6); transition: color 0.2s;" onmouseover="this.style.color='var(--color-bone)'" onmouseout="this.style.color='rgba(245,240,235,0.6)'">Essentials</a></li>
              <li><a href="#/shop?collection=phase-01" style="font-size: var(--text-sm); color: rgba(245,240,235,0.6); transition: color 0.2s;" onmouseover="this.style.color='var(--color-bone)'" onmouseout="this.style.color='rgba(245,240,235,0.6)'">Phase 01</a></li>
              <li><a href="#/shop?collection=editions" style="font-size: var(--text-sm); color: rgba(245,240,235,0.6); transition: color 0.2s;" onmouseover="this.style.color='var(--color-bone)'" onmouseout="this.style.color='rgba(245,240,235,0.6)'">Editions</a></li>
            </ul>
          </div>
          <div>
            <p class="text-label" style="margin-bottom: var(--space-4); color: var(--color-ash);">Brand</p>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2);">
              <li><a href="#/about" style="font-size: var(--text-sm); color: rgba(245,240,235,0.6); transition: color 0.2s;" onmouseover="this.style.color='var(--color-bone)'" onmouseout="this.style.color='rgba(245,240,235,0.6)'">About</a></li>
              <li><a href="#/phases" style="font-size: var(--text-sm); color: rgba(245,240,235,0.6); transition: color 0.2s;" onmouseover="this.style.color='var(--color-bone)'" onmouseout="this.style.color='rgba(245,240,235,0.6)'">Phases</a></li>
              <li><a href="#/tracking" style="font-size: var(--text-sm); color: rgba(245,240,235,0.6); transition: color 0.2s;" onmouseover="this.style.color='var(--color-bone)'" onmouseout="this.style.color='rgba(245,240,235,0.6)'">Track Order</a></li>
            </ul>
          </div>
          <div>
            <p class="text-label" style="margin-bottom: var(--space-4); color: var(--color-ash);">Stay In Motion</p>
            <p style="font-size: var(--text-xs); color: var(--color-ash); margin-bottom: var(--space-4);">Enter your email for updates on new phases, editions, and movements.</p>
            <div style="display: flex;">
              <input type="email" placeholder="Email address" style="flex: 1; background: transparent; border: 1px solid rgba(245,240,235,0.2); padding: var(--space-3) var(--space-4); font-size: var(--text-sm); color: var(--color-bone);" aria-label="Email for newsletter">
              <button class="btn" style="background: var(--color-bone); color: var(--color-obsidian); padding: var(--space-3) var(--space-6); font-size: var(--text-xs); font-weight: var(--weight-semibold); letter-spacing: var(--tracking-widest); text-transform: uppercase;">Join</button>
            </div>
          </div>
        </div>
        <div class="border-top" style="padding-top: var(--space-8); display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: var(--space-4); flex-wrap: wrap;">
          <p style="font-size: var(--text-xs); color: var(--color-ash);">© 2026 MOVA. All rights reserved.</p>
          <div style="display: flex; gap: var(--space-6);">
            <a href="#" style="font-size: var(--text-xs); color: var(--color-ash); transition: color 0.2s;" onmouseover="this.style.color='var(--color-bone)'" onmouseout="this.style.color='var(--color-ash)'">Privacy</a>
            <a href="#" style="font-size: var(--text-xs); color: var(--color-ash); transition: color 0.2s;" onmouseover="this.style.color='var(--color-bone)'" onmouseout="this.style.color='var(--color-ash)'">Terms</a>
            <a href="#" style="font-size: var(--text-xs); color: var(--color-ash); transition: color 0.2s;" onmouseover="this.style.color='var(--color-bone)'" onmouseout="this.style.color='var(--color-ash)'">Contact</a>
          </div>
          <p class="font-display" style="font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(181,176,170,0.5);">Keep Becoming.</p>
        </div>
      </div>
    </footer>`;
  },

  init() {
    const footerEl = document.getElementById('site-footer');
    if (footerEl) {
      footerEl.innerHTML = this.render();
    }
  }
};

window.MOVAFooter = MOVAFooter;