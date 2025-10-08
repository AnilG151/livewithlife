// ---------------------------
// PRODUCTS PAGE CART
// ---------------------------
let cart = JSON.parse(localStorage.getItem('cart')) || {};
const products = [
  {id:'1',name:'Wheatgrass',price:149,img:'images/hero-placeholder.png'},
  {id:'2',name:'Sunflower',price:199,img:'images/hero-placeholder.png'},
  {id:'3',name:'Broccoli',price:179,img:'images/hero-placeholder.png'},
  {id:'4',name:'Mix Pack',price:299,img:'images/hero-placeholder.png'}
];

function renderProducts() {
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  grid.innerHTML='';
  products.forEach(p=>{
    const card = document.createElement('div');
    card.className='productCard';
    card.innerHTML=`
      <img src="${p.img}" alt="${p.name}">
      <div>${p.name}</div>
      <div>₹${p.price}</div>
      <div class="quantitySelector">
        <button onclick="decreaseQty('${p.id}')">-</button>
        <span id="qty-${p.id}">${cart[p.id]?.qty || 0}</span>
        <button onclick="increaseQty('${p.id}')">+</button>
      </div>
      <button class="btn" onclick="addToCart('${p.id}')">🛒 Add</button>
    `;
    grid.appendChild(card);
  });
}

function increaseQty(id){
  cart[id]={...cart[id],qty:(cart[id]?.qty||0)+1};
  updateCartUI(id);
}

function decreaseQty(id){
  if(!cart[id] || cart[id].qty<=0) return;
  cart[id].qty--;
  updateCartUI(id);
}

function addToCart(id){
  if(!cart[id]) cart[id]={...products.find(p=>p.id===id),qty:1};
  localStorage.setItem('cart',JSON.stringify(cart));
  renderMiniCart();
}

function updateCartUI(id){
  document.getElementById(`qty-${id}`).innerText=cart[id]?.qty||0;
  localStorage.setItem('cart',JSON.stringify(cart));
  renderMiniCart();
}

function renderMiniCart(){
  const mini = document.getElementById('miniCartBar');
  const count = document.getElementById('cartCount');
  const totalMini = document.getElementById('cartTotalMini');
  if(!mini) return;
  const qty = Object.values(cart).reduce((a,b)=>a+b.qty,0);
  const total = Object.values(cart).reduce((a,b)=>a+b.qty*b.price,0);
  if(qty>0) mini.style.display='flex'; else mini.style.display='none';
  count.innerText=qty;
  totalMini.innerText=`₹${total}`;

  const cartItems = document.getElementById('cartItems');
  if(!cartItems) return;
  cartItems.innerHTML='';
  Object.values(cart).forEach(item=>{
    if(item.qty>0){
      const div=document.createElement('div');
      div.innerHTML=`${item.name} x ${item.qty} = ₹${item.price*item.qty}`;
      cartItems.appendChild(div);
    }
  });
  const totalDiv = document.getElementById('cartTotal');
  if(totalDiv) totalDiv.innerText=`Total: ₹${total}`;
}

function toggleCartPanel(){
  const panel = document.getElementById('cartPanel');
  if(!panel) return;
  panel.style.display = panel.style.display==='flex' ? 'none':'flex';
}

function clearCart(){
  cart={};
  localStorage.setItem('cart',JSON.stringify(cart));
  renderProducts();
  renderMiniCart();
  toggleCartPanel();
}

function checkout(){
  let msg='Please confirm order ASAP\n';
  Object.values(cart).forEach(i=>msg+=`${i.name} x ${i.qty} = ₹${i.price*i.qty}\n`);
  const total = Object.values(cart).reduce((a,b)=>a+b.qty*b.price,0);
  msg+=`Total: ₹${total}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank');
}

// ---------------------------
// ABOUT PAGE TESTIMONIALS
// ---------------------------
const testimonials = [
  "Loved the fresh microgreens! - Ritu",
  "Super quick delivery and quality is amazing. - Sameer",
  "Healthy and easy to grow at home! - Priya"
];

let currentTest=0;
function renderTestimonials(){
  const slider = document.getElementById('testSlider');
  if(!slider) return;
  slider.innerHTML=testimonials[currentTest];
  currentTest=(currentTest+1)%testimonials.length;
  setTimeout(renderTestimonials,4000);
}

// ---------------------------
// INIT
// ---------------------------
document.addEventListener('DOMContentLoaded',()=>{
  renderProducts();
  renderMiniCart();
  renderTestimonials();
});
