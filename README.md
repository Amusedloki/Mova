# MOVA — KEEP BECOMING

Contemporary fashion brand website. Built as a static SPA with hash-based routing.
## 🌐 Live Demo

[View MOVA Live](https://mova-site.netlify.app/)

## Running Locally

From the `MOVA/` directory, start any HTTP server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Project Structure

```
MOVA/
├── index.html                    # SPA entry point
├── css/
│   └── style.css                 # Complete stylesheet
├── js/
│   ├── main.js                   # App initialization & routing
│   ├── core/
│   │   ├── utils.js              # Utility functions
│   │   ├── storage.js            # LocalStorage management
│   │   ├── router.js             # Hash-based SPA router
│   │   └── components.js         # Shared UI components
│   ├── data/
│   │   └── products.js           # Embedded product data (30 products)
│   ├── components/
│   │   ├── navbar.js             # Adaptive navigation
│   │   ├── footer.js             # Footer component
│   │   └── product-card.js       # Product card renderer
│   ├── cart/
│   │   ├── cart.js               # Cart state management
│   │   └── cart-drawer.js        # Cart drawer UI
│   ├── shop/
│   │   └── shop.js               # Shop page logic
│   ├── product/
│   │   └── product.js            # Product detail page
│   └── animations/
│       └── reveals.js            # Scroll reveal animations
├── data/
│   ├── products.json             # Product catalog (30 products)
│   ├── collections.json          # Collection metadata
│   └── categories.json           # Category definitions
├── assets/
│   └── images/brand/             # SVG logos and favicon
└── README.md
```

## Features

- 30 products across 3 collections (Essentials, Phase 01, Editions)
- Hash-based SPA routing
- Shop with filtering and sorting
- Product detail pages with color/size selection
- Shopping cart with localStorage persistence
- 3-step checkout flow
- Order confirmation and tracking
- Responsive design (mobile, tablet, desktop)
- Scroll reveal animations
- Reduced motion support

## Brand

MOVA is a fictional contemporary fashion brand built around **movement**, **evolution**, and **becoming**.

**KEEP BECOMING.**
