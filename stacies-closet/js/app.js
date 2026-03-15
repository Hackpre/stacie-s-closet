/* ============================================================
   STACIE'S CLOSET — app.js
   Core logic: products, cart UI, cursor, navigation
   ============================================================ */

'use strict';

/* ── PRODUCT CATALOGUE ───────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: "Ankara Wrap Dress",
    sub: "Women · Imported from Tanzania",
    price: 45000,
    oldPrice: 55000,
    category: "Women",
    badge: "sale",
    sizes: ["XS","S","M","L","XL"],
    img: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&q=80",
    desc: "A stunning wrap dress crafted from premium Ankara fabric. Vibrant patterns and a flattering silhouette make this a must-have piece for any wardrobe."
  },
  {
    id: 2,
    name: "Tailored Linen Suit",
    sub: "Men · Sourced from South Africa",
    price: 89000,
    category: "Men",
    badge: "new",
    sizes: ["S","M","L","XL","XXL"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    desc: "A perfectly tailored two-piece linen suit. Breathable, lightweight, and exuding effortless elegance. Available in two refined colorways."
  },
  {
    id: 3,
    name: "Boho Maxi Skirt",
    sub: "Women · Imported from Tanzania",
    price: 28000,
    category: "Women",
    badge: "new",
    sizes: ["S","M","L","XL"],
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    desc: "Free-spirited boho maxi skirt with flowing fabric and earthy tones. Perfect for both casual days and evening occasions."
  },
  {
    id: 4,
    name: "Classic Oxford Shirt",
    sub: "Men · Sourced from South Africa",
    price: 22000,
    oldPrice: 28000,
    category: "Men",
    badge: "sale",
    sizes: ["S","M","L","XL","XXL"],
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d465?w=600&q=80",
    desc: "A timeless oxford shirt in premium cotton. Crisp, versatile, and ready for every occasion from office to weekend."
  },
  {
    id: 5,
    name: "Kente Off-Shoulder Top",
    sub: "Women · Imported from Tanzania",
    price: 18500,
    category: "Women",
    badge: "new",
    sizes: ["XS","S","M","L"],
    img: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=600&q=80",
    desc: "Bold Kente-inspired patterns on a chic off-shoulder cut. A statement piece that celebrates African heritage with modern flair."
  },
  {
    id: 6,
    name: "Slim Chino Trousers",
    sub: "Men · Sourced from South Africa",
    price: 32000,
    category: "Men",
    sizes: ["S","M","L","XL"],
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
    desc: "Contemporary slim-cut chinos in a premium stretch blend. Comfortable, sharp and adaptable for any occasion."
  },
  {
    id: 7,
    name: "Silk Blouse",
    sub: "Women · Imported from Tanzania",
    price: 35000,
    category: "Women",
    badge: "new",
    sizes: ["XS","S","M","L","XL"],
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&q=80",
    desc: "Luxurious silk blouse with a relaxed, elegant drape. Pairs beautifully with trousers or a midi skirt."
  },
  {
    id: 8,
    name: "African Print Bomber",
    sub: "Men · Sourced from South Africa",
    price: 55000,
    oldPrice: 68000,
    category: "Men",
    badge: "sale",
    sizes: ["S","M","L","XL","XXL"],
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    desc: "A bold bomber jacket featuring vibrant African print panels. High-quality construction meets distinctive street-ready style."
  }
];

/* ── CART STATE ──────────────────────────────────────────── */
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('sc_cart') || '[]');
  } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('sc_cart', JSON.stringify(cart));
}

let cart = loadCart();

/* ── CUSTOM CURSOR ───────────────────────────────────────── */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    ring.style.left   = e.clientX + 'px';
    ring.style.top    = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, [role="button"], .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
      ring.style.transform   = 'translate(-50%,-50%) scale(0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.transform   = 'translate(-50%,-50%) scale(1)';
    });
  });
}

/* ── STICKY NAV ──────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Mark active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* ── MOBILE MENU ─────────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));
}

/* ── SEARCH OVERLAY ──────────────────────────────────────── */
function initSearch() {
  const btn  = document.getElementById('searchBtn');
  const overlay = document.getElementById('searchOverlay');
  const close   = document.getElementById('searchClose');
  const input   = document.getElementById('searchInput');
  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    overlay.classList.add('open');
    setTimeout(() => input && input.focus(), 100);
  });

  if (close) close.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') overlay.classList.remove('open');
  });
}

/* ── CART DRAWER ─────────────────────────────────────────── */
function initCartDrawer() {
  const cartBtn     = document.getElementById('cartBtn');
  const cartDrawer  = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose   = document.getElementById('cartClose');

  function openCart() {
    cartDrawer && cartDrawer.classList.add('open');
    cartOverlay && cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer && cartDrawer.classList.remove('open');
    cartOverlay && cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Expose globally
  window.openCart  = openCart;
  window.closeCart = closeCart;
}

/* ── CART LOGIC ──────────────────────────────────────────── */
window.addToCart = function(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  updateCartUI();
  showToast(product.name, 'Added to your cart');
};

window.removeFromCart = function(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  updateCartUI();
};

window.updateQty = function(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart(cart);
  updateCartUI();
};

function fmtPrice(n) {
  return 'MWK ' + Number(n).toLocaleString('en-MW');
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Badge
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.classList.toggle('show', count > 0);
  });

  // Cart text in nav
  document.querySelectorAll('.cart-count-text').forEach(el => {
    el.textContent = count > 0 ? `(${count})` : '';
  });

  // Subtotal / total in drawer
  const sub = document.getElementById('cartSubtotal');
  const tot = document.getElementById('cartTotal');
  if (sub) sub.textContent = fmtPrice(total);
  if (tot) tot.textContent = fmtPrice(total);

  // Footer visibility
  const footer = document.getElementById('cartFooter');
  if (footer) footer.style.display = count > 0 ? 'block' : 'none';

  // Items
  const itemsContainer = document.getElementById('cartItems');
  if (!itemsContainer) return;

  if (count === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <span>🛍</span>
        <p>Your cart is empty</p>
      </div>`;
  } else {
    itemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.img}" alt="${item.name}" loading="lazy">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.sub}</div>
          <div class="cart-item-price">${fmtPrice(item.price * item.qty)}</div>
          <div class="cart-qty">
            <button class="cart-qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
            <span class="cart-qty-num">${item.qty}</span>
            <button class="cart-qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove">✕</button>
      </div>
    `).join('');
  }
}

/* ── TOAST ───────────────────────────────────────────────── */
window.showToast = function(title, msg) {
  const toast = document.getElementById('toast');
  const t = document.getElementById('toastTitle');
  const m = document.getElementById('toastMsg');
  if (!toast) return;
  if (t) t.textContent = title;
  if (m) m.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
};

/* ── PRODUCT GRID RENDERER ───────────────────────────────── */
let currentFilter = 'All';

window.renderProducts = function(containerId, filter, limit) {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  let products = filter && filter !== 'All'
    ? PRODUCTS.filter(p => p.category === filter || p.badge === filter)
    : [...PRODUCTS];

  if (limit) products = products.slice(0, limit);

  grid.innerHTML = products.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.07}s">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="product-badge ${p.badge}-badge">${p.badge === 'new' ? 'New' : 'Sale'}</span>` : ''}
        <div class="product-overlay"></div>
        <div class="product-quick">
          <button class="btn-add-cart" onclick="addToCart(${p.id})">Add to Cart</button>
          <button class="btn-wish" onclick="openQuickView(${p.id})" title="Quick View">👁</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-sub">${p.sub}</div>
        <div class="product-price-row">
          <span class="product-price">${fmtPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="product-price-old">${fmtPrice(p.oldPrice)}</span>` : ''}
        </div>
        <div class="product-sizes">${p.sizes.map(s => `<span class="size-chip">${s}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');

  initCursor(); // Re-init cursor on new elements
};

window.filterProducts = function(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const gridId = document.getElementById('productGrid') ? 'productGrid' : 'arrivalsGrid';
  window.renderProducts(gridId, cat);
};

/* ── QUICK VIEW MODAL ────────────────────────────────────── */
window.openQuickView = function(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const overlay = document.getElementById('qvOverlay');
  if (!overlay) return;

  document.getElementById('qvImg').src = p.img;
  document.getElementById('qvImg').alt = p.name;
  document.getElementById('qvCat').textContent = p.category;
  document.getElementById('qvName').textContent = p.name;
  document.getElementById('qvPrice').textContent = fmtPrice(p.price);
  document.getElementById('qvDesc').textContent = p.desc;
  document.getElementById('qvSizes').innerHTML = p.sizes.map(s =>
    `<button class="qv-size" onclick="selectQvSize(this)">${s}</button>`
  ).join('');

  // Add to cart btn
  const addBtn = document.getElementById('qvAddBtn');
  if (addBtn) {
    addBtn.onclick = () => {
      addToCart(p.id);
      closeQuickView();
    };
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeQuickView = function() {
  const overlay = document.getElementById('qvOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
};

window.selectQvSize = function(btn) {
  document.querySelectorAll('.qv-size').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
};

/* ── LAZY LOADING OBSERVER ───────────────────────────────── */
function initLazyLoad() {
  if (!('IntersectionObserver' in window)) return;
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  imgs.forEach(img => observer.observe(img));
}

/* ── SCROLL ANIMATIONS ───────────────────────────────────── */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .collection-card, .editorial-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/* ── EXPOSE fmtPrice ─────────────────────────────────────── */
window.fmtPrice = fmtPrice;
window.PRODUCTS = PRODUCTS;
window.cart = cart;
window.loadCart = loadCart;

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNav();
  initMobileMenu();
  initSearch();
  initCartDrawer();
  updateCartUI();
  initLazyLoad();

  // Close QV on overlay click
  const qvOverlay = document.getElementById('qvOverlay');
  if (qvOverlay) {
    qvOverlay.addEventListener('click', e => {
      if (e.target === qvOverlay) closeQuickView();
    });
  }

  setTimeout(initScrollAnimations, 200);
});
