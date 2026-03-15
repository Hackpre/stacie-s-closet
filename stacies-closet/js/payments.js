/* ============================================================
   STACIE'S CLOSET — payments.js
   Payment page: method selection, form validation, order build
   ============================================================ */

'use strict';

let selectedPayment = null;

/* ── RENDER ORDER SUMMARY ────────────────────────────────── */
function renderOrderSummary() {
  const cart = loadCart();
  const container = document.getElementById('orderItems');
  const totalEl   = document.getElementById('orderTotal');
  const emptyEl   = document.getElementById('orderEmpty');

  if (!container) return;

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  if (count === 0) {
    container.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    if (totalEl) totalEl.textContent = 'MWK 0';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';

  container.innerHTML = cart.map(item => `
    <div class="order-item-row">
      <span class="order-item-name">${item.name} <span style="color:var(--muted)">×${item.qty}</span></span>
      <span class="order-item-price">${fmtPrice(item.price * item.qty)}</span>
    </div>
  `).join('');

  if (totalEl) totalEl.textContent = fmtPrice(total);
}

/* ── PAYMENT METHOD SELECTION ────────────────────────────── */
window.selectPayment = function(method, cardEl) {
  selectedPayment = method;

  document.querySelectorAll('.pm-card').forEach(c => c.classList.remove('selected'));
  if (cardEl) cardEl.classList.add('selected');

  document.querySelectorAll('.payment-detail').forEach(d => d.classList.remove('active'));
  const detail = document.getElementById('detail-' + method);
  if (detail) detail.classList.add('active');
};

/* ── FORM VALIDATION ─────────────────────────────────────── */
function validateForm() {
  const name     = document.getElementById('custName');
  const phone    = document.getElementById('custPhone');
  const location = document.getElementById('custLocation');
  let valid = true;
  let firstError = null;

  [name, phone, location].forEach(el => {
    if (!el) return;
    if (!el.value.trim()) {
      el.style.borderColor = '#e05555';
      if (!firstError) firstError = el;
      valid = false;
    } else {
      el.style.borderColor = '';
    }
  });

  if (!valid) {
    showToast('Missing Information', 'Please fill all required fields.');
    if (firstError) firstError.focus();
  }

  if (!selectedPayment) {
    showToast('No Payment Method', 'Please select a payment method.');
    valid = false;
  }

  return valid;
}

/* ── SUBMIT PAYMENT / OPEN WHATSAPP ──────────────────────── */
window.submitPayment = function() {
  if (!validateForm()) return;

  const cart = loadCart();
  if (cart.length === 0) {
    showToast('Cart Empty', 'Add items to your cart before checkout.');
    return;
  }

  const name       = document.getElementById('custName').value.trim();
  const phone      = document.getElementById('custPhone').value.trim();
  const location   = document.getElementById('custLocation').value.trim();
  const message    = (document.getElementById('custMessage') || {}).value || '';
  const total      = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const itemLines = cart.map(i => `- ${i.name} x${i.qty} (${fmtPrice(i.price * i.qty)})`).join('\n');

  const pmLabels = {
    airtel: 'Airtel Money (0995600629)',
    tnm:    'TNM Mpamba (0884641102)',
    bank:   'Bank Transfer'
  };

  const waText = [
    `Hello Stacie's Closet! 👗`,
    ``,
    `I would like to place an order.`,
    ``,
    `*Payment Method:* ${pmLabels[selectedPayment]}`,
    ``,
    `*Order Items:*`,
    itemLines,
    ``,
    `*Total:* ${fmtPrice(total)}`,
    message ? `\n*Customer Message:*\n${message}` : '',
    ``,
    `*Name:* ${name}`,
    `*Phone:* ${phone}`,
    `*Delivery Location:* ${location}`
  ].filter(l => l !== undefined).join('\n');

  // Route to correct WhatsApp number
  const waNumbers = {
    airtel: '265995600629',
    tnm:    '265884641102',
    bank:   '265995600629'
  };

  const waNum = waNumbers[selectedPayment];
  const waUrl = `https://wa.me/${waNum}?text=${encodeURIComponent(waText)}`;

  // Open WhatsApp
  window.open(waUrl, '_blank');

  // Show confirmation
  showToast('Order Sent!', 'WhatsApp opened. Complete your payment there.');

  // Optionally clear cart after send
  setTimeout(() => {
    if (confirm('Clear cart after placing order?')) {
      localStorage.setItem('sc_cart', '[]');
      window.location.href = 'index.html';
    }
  }, 1500);
};

document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();

  // Live input validation feedback
  ['custName','custPhone','custLocation'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        if (el.value.trim()) el.style.borderColor = '';
      });
    }
  });
});
