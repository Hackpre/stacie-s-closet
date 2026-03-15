/* ============================================================
   STACIE'S CLOSET — whatsapp.js
   Floating WhatsApp chat button & link builder
   ============================================================ */

'use strict';

/* ── FLOATING CHAT BUTTON ────────────────────────────────── */
function initWhatsAppFloat() {
  const btn = document.getElementById('waFloat');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const msg = encodeURIComponent("Hello Stacie's Closet! I'd like to ask about your collection. 👗");
    window.open(`https://wa.me/265995600629?text=${msg}`, '_blank');
  });
}

/* ── DIRECT MESSAGE HELPER (used by payment page) ────────── */
window.openWhatsApp = function(number, message) {
  const clean = number.replace(/\D/g, '');
  const formatted = clean.startsWith('265') ? clean : '265' + clean;
  const url = `https://wa.me/${formatted}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

document.addEventListener('DOMContentLoaded', initWhatsAppFloat);
