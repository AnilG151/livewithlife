const products=[
{name:'Sunflower',details:'A, B-complex (B2, B3, B6, B9), C, E, K | Calcium, Iron, Magnesium'},
{name:'Broccoli',details:'A, B-complex, C, E, K | Calcium, Copper, Iron, Magnesium, Zinc'},
{name:'Radish',details:'A, C, K, B9 | Potassium, Calcium, Iron'},
{name:'Wheatgrass',details:'A, B-complex, C, E, K | Calcium, Iron, Selenium, Potassium'},
{name:'Fenugreek',details:'A, C, K, B-complex (B1, B2, B3, B6, B9) | Iron, Phosphorus'},
{name:'Mustard',details:'A, C, K, B1, B3, B6 | Calcium, Iron, Copper'},
{name:'Green Gram (Moong)',details:'A, C, K, B-Complex | Iron, Magnesium, Potassium'}
];
window.onload=()=>{
  const grid=document.getElementById('productGrid');
  if(grid){
    products.forEach(p=>{
      const card=document.createElement('div');
      card.className='productCard';
      card.innerHTML=`<h3>${p.name}</h3><p>${p.details}</p><button onclick="addToCart('${p.name}')">Add to Cart</button>`;
      grid.appendChild(card);
    });
  }
}
function addToCart(name){
  alert(name+' added to cart! WhatsApp us at +91 9873324887 to confirm your order.');
}