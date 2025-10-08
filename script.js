// Scroll to section
function scrollToSection(id){
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth'});
}

// Fade-in sections on scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting) entry.target.classList.add('visible');
    });
},{threshold:0.2});
sections.forEach(sec=>observer.observe(sec));

// Products array
const products = [
    {name:'Sunflower',desc:'A, B-complex (B2, B3, B6, B9), C, E, K, Calcium, Iron, Magnesium',price:149,img:'https://via.placeholder.com/220x140.png?text=Sunflower'},
    {name:'Broccoli',desc:'Vitamins: A, B-complex, C, E, K, Calcium, Copper, Iron, Magnesium, Zinc',price:199,img:'https://via.placeholder.com/220x140.png?text=Broccoli'},
    {name:'Radish',desc:'Vitamins: A, C, K, B9 (Folate), Potassium, Calcium, Iron',price:199,img:'https://via.placeholder.com/220x140.png?text=Radish'},
    {name:'Wheatgrass',desc:'Vitamins: A, B-complex, C, E, K, Calcium, Iron, Selenium, Potassium',price:149,img:'https://via.placeholder.com/220x140.png?text=Wheatgrass'},
    {name:'Fenugreek',desc:'Vitamins: A, C, K, B-complex (B1,B2,B3,B6,B9), Iron, Phosphorus',price:149,img:'https://via.placeholder.com/220x140.png?text=Fenugreek'},
    {name:'Mustard',desc:'Vitamins: A, C, K, B1, B3, B6, Calcium, Iron, Copper',price:149,img:'https://via.placeholder.com/220x140.png?text=Mustard'},
    {name:'Green Gram (Moong)',desc:'Vitamins: A, C, K, B-Complex, Iron, Magnesium, Potassium',price:199,img:'https://via.placeholder.com/220x140.png?text=Moong'}
];

// Populate product grid if exists
const productGrid = document.getElementById('productGrid');
const miniCartBar = document.getElementById('miniCartBar');
let cartCount = 0;
let cartItems = [];

if(productGrid){
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
            </div>
        `;
        productGrid.appendChild(div);
    });
}

// Add to cart
function addToCart(index){
    const product = products[index];
    cartItems.push(product);
    cartCount++;
    document.getElementById('cartCount').innerText = cartCount;
    miniCartBar.style.display='flex';
}

// Checkout via WhatsApp
function checkout(){
    if(cartItems.length===0){
        alert('Cart is empty!');
        return;
    }
    let message = 'Hello, I want to order:\n';
    cartItems.forEach((item,i)=>{
        message += `${i+1}. ${item.name} - ₹${item.price}\n`;
    });
    message += 'Please confirm order ASAP';
    const encodedMsg = encodeURIComponent(message);
    const waNumber = '919873324887'; // your number
    window.open(`https://wa.me/${waNumber}?text=${encodedMsg}`,'_blank');
}
