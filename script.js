const products = [
  {name:'Sunflower',desc:'A, B-complex (B2, B3, B6, B9), C, E, K, Calcium, Iron, Magnesium',price:149,img:'https://via.placeholder.com/220x140.png?text=Sunflower'},
  {name:'Broccoli',desc:'Vitamins: A, B-complex, C, E, K, Calcium, Copper, Iron, Magnesium, Zinc',price:199,img:'https://via.placeholder.com/220x140.png?text=Broccoli'},
  {name:'Radish',desc:'Vitamins: A, C, K, B9 (Folate), Potassium, Calcium, Iron',price:149,img:'https://via.placeholder.com/220x140.png?text=Radish'},
  {name:'Wheatgrass',desc:'Vitamins: A, B-complex, C, E, K, Calcium, Iron, Selenium, Potassium',price:199,img:'https://via.placeholder.com/220x140.png?text=Wheatgrass'},
  {name:'Fenugreek',desc:'Vitamins: A, C, K, B-complex (B1,B2,B3,B6,B9), Iron, Phosphorus',price:149,img:'https://via.placeholder.com/220x140.png?text=Fenugreek'},
  {name:'Mustard',desc:'Vitamins: A, C, K, B1, B3, B6, Calcium, Iron, Copper',price:149,img:'https://via.placeholder.com/220x140.png?text=Mustard'},
  {name:'Green Gram (Moong)',desc:'Vitamins: A,C, K, B-Complex, Iron, Magnesium, Potassium',price:199,img:'https://via.placeholder.com/220x140.png?text=Moong'}
];

const productGrid = document.getElementById('productGrid');
const miniCartBar = document.getElementById('miniCartBar');
const miniCartDetails = document.getElementById('miniCartDetails');
let cartDetails = [];

function renderProducts(){
  products.forEach((p,index)=>{
    const div = document.createElement('div');
    div.className='product';
    div.innerHTML = `
      <div class="productImg"><img src="${p.img}" alt="${p.name}"></div>
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <div class="priceRow">
        <div class="price">₹${p.price}</div>
        <button class="addCart" onclick="addToCart(${index})">Add to Cart</button>
      </div>`;
    productGrid.appendChild(div);
  });
}

function addToCart(index){
  const prod = {...products[index], qty:1};
  const existing = cartDetails.find(p=>p.name===prod.name);
  if(existing) existing.qty++;
  else cartDetails.push(prod);
  updateCartUI();
}

function removeFromCart(name){
  const idx = cartDetails.findIndex(p=>p.name===name);
  if(idx!==-1) cartDetails.splice(idx,1);
  updateCartUI();
}

function updateCartUI(){
  const totalItems = cartDetails.reduce((a,b)=>a+b.qty,0);
  document.getElementById('cartCount').innerText = totalItems;
  miniCartBar.style.display = totalItems>0?'flex':'none';

  let html='';
  let totalPrice=0;
  cartDetails.forEach(p=>{
    const itemTotal = p.price*p.qty;
    totalPrice+=itemTotal;
    html+=`<div class="cartItem">
      <div>${p.name} x ${p.qty}</div>
      <div>₹${itemTotal} <button class="removeBtn" onclick="removeFromCart('${p.name}')">✖</button></div>
    </div>`;
  });
  if(cartDetails.length>0) html+=`<div class="cartTotal">Total: ₹${totalPrice}</div>`;
  miniCartDetails.innerHTML = html;
  miniCartDetails.style.display = totalItems>0?'block':'none';
}

function checkout(){
  let message = 'Hello,%20I%20want%20to%20order:%0A';
  cartDetails.forEach(p=>{
    message+=`${p.name} x ${p.qty} = ₹${p.price*p.qty}%0A`;
  });
  const totalPrice = cartDetails.reduce((a,b)=>a+b.price*b.qty,0);
  message+=`Total: ₹${totalPrice}`;
  window.open(`https://wa.me/919873324887?text=${message}`, '_blank');
}

renderProducts();
