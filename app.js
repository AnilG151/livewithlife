const cart = [];
const WHATSAPP_NUMBER = '919876543210';


function updateCart(productName) {
cart.push(productName);
alert(`${productName} added to cart!`);
}


document.querySelectorAll('.add-cart').forEach(btn => {
btn.addEventListener('click', e => {
const productName = e.target.parentElement.querySelector('h3').innerText;
updateCart(productName);
});
});


const checkoutBtn = document.getElementById('checkoutBtn');
checkoutBtn.addEventListener('click', () => {
if (cart.length === 0) {
alert('Your cart is empty!');
return;
}
const message = encodeURIComponent(`Please confirm order ASAP:\n\n${cart.join('\n')}\n\nThank you!`);
window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
});
