/* ============================================================
   STACIE'S CLOSET — cart.js
   Cart page: render full cart table, totals, checkout nav
   ============================================================ */

'use strict';

function renderCartPage() {
  const cart = loadCart();
  const tableBody = document.getElementById('cartPageBody');
  const emptyMsg  = document.getElementById('cartEmpty');
  const tableWrap = document.getElementById('cartTable');
  const subtotalEl = document.getElementById('pageSubtotal');
  const shippingEl = document.getElementById('pageShipping');
  const totalEl    = document.getElementById('pageTotal');
  const checkoutBtn = document.getElementById('pageCheckout');

  if (!tableBody) return;

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  if (count === 0) {
    if (tableWrap) tableWrap.style.display = 'none';
    if (emptyMsg) emptyMsg.style.display = 'block';
    if (subtotalEl) subtotalEl.textContent = 'MWK 0';
    if (shippingEl) shippingEl.textContent = '—';
    if (totalEl) totalEl.textContent = 'MWK 0';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (tableWrap) tableWrap.style.display = 'block';
  if (emptyMsg) emptyMsg.style.display = 'none';
  if (checkoutBtn) checkoutBtn.disabled = false;

  tableBody.innerHTML = cart.map(item => `
    <div class="cart-page-row">
      <div class="cart-page-product">
        <div class="cart-page-img">
          <img src="${item.img}" alt="${item.name}" loading="lazy">
        </div>
        <div>
          <div class="cart-page-name">${item.name}</div>
          <div class="cart-page-meta">${item.sub}</div>
        </div>
      </div>
      <div class="cart-page-price">${fmtPrice(item.price)}</div>
      <div class="cart-page-qty">
        <button class="cart-qty-btn" onclick="pageUpdateQty(${item.id}, -1)">−</button>
        <span class="cart-qty-num">${item.qty}</span>
        <button class="cart-qty-btn" onclick="pageUpdateQty(${item.id}, 1)">+</button>
      </div>
      <button class="cart-page-remove" onclick="pageRemove(${item.id})" title="Remove">✕</button>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = fmtPrice(total);
  if (shippingEl) shippingEl.textContent = 'Calculated at checkout';
  if (totalEl) totalEl.textContent = fmtPrice(total);
}

window.pageUpdateQty = function(id, delta) {
  const cart = loadCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  const updated = item.qty < 1 ? cart.filter(i => i.id !== id) : cart;
  localStorage.setItem('sc_cart', JSON.stringify(updated));
  renderCartPage();
  // Sync badge
  const count = updated.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.classList.toggle('show', count > 0);
  });
};

window.pageRemove = function(id) {
  const cart = loadCart().filter(i => i.id !== id);
  localStorage.setItem('sc_cart', JSON.stringify(cart));
  renderCartPage();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.classList.toggle('show', count > 0);
  });
};

window.clearCart = function() {
  localStorage.setItem('sc_cart', '[]');
  renderCartPage();
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = 0;
    b.classList.remove('show');
  });
};

document.addEventListener('DOMContentLoaded', renderCartPage);
