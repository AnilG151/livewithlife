/*
  app.js — Cart + WhatsApp checkout
  IMPORTANT: Replace WHATSAPP_NUMBER with your number in international format WITHOUT plus sign.
  Example (India): '919812345678'
*/

const WHATSAPP_NUMBER = '911234567890'; // <-- REPLACE this before pushing
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

const cart = [];

window.addToCart = function(name, price){
  cart.push({name, price});
  renderCart();
}

function renderCart(){
  const el = document.getElementById('cartItems');
  if(!cart.length){ el.innerHTML = 'No items yet.'; return }
  let html = '<ul style="list-style:none;padding:0;margin:0">';
  let total = 0;
  cart.forEach((it,i)=>{ total+=it.price; html += `<li style="padding:6px 0;border-bottom:1px dotted rgba(15,23,42,0.04)"><strong>${it.name}</strong> — ₹${it.price} <button onclick="removeItem(${i})" style="margin-left:12px;padding:6px;border-radius:6px">Remove</button></li>` });
  html += `</ul><div style="margin-top:10px;font-weight:800">Total ₹${total}</div>`;
  el.innerHTML = html;
}

window.removeItem = function(i){ cart.splice(i,1); renderCart(); }
window.clearCart = function(){ cart.length = 0; renderCart(); }

function checkout(){
  if(!cart.length){ alert('Cart is empty'); return }
  const summary = cart.map(x=>`${x.name} - ₹${x.price}`).join('\n');
  const total = cart.reduce((a,b)=>a+b.price,0);
  const message = `Please confirm order ASAP:\n\n${summary}\n\nTotal: ₹${total}`;
  const url = WHATSAPP_BASE + encodeURIComponent(message);
  window.open(url,'_blank');
}

// Wire up buttons and product add buttons
document.addEventListener('DOMContentLoaded', ()=>{
  // attach add buttons
  document.querySelectorAll('.product').forEach(prod=>{
    const name = prod.dataset.name;
    const price = Number(prod.dataset.price);
    const btn = prod.querySelector('.add-btn');
    if(btn) btn.addEventListener('click', ()=>{ addToCart(name, price); });
  });

  // checkout / clear
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearBtn = document.getElementById('clearBtn');
  const floatWA = document.getElementById('whatsappFloat');

  if(checkoutBtn) checkoutBtn.addEventListener('click', checkout);
  if(clearBtn) clearBtn.addEventListener('click', clearCart);

  // floating whatsapp quick chat — open blank chat with a short greeting
  if(floatWA){
    floatWA.addEventListener('click', (e)=>{
      e.preventDefault();
      const greeting = 'Hi FreshLeaf, I would like to place an order.';
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(greeting)}`;
      window.open(url,'_blank');
    });
  }

  renderCart();
});
