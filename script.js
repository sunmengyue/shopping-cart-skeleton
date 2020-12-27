import items from './items.json';

const addToCartBtn = document.querySelector('button.text-white');
const cart = document.querySelector('button.fixed');

let itemsInCart = [];

addToCartBtn.addEventListener('click', () => {
  showCart();
});

function showCart() {
  cart.classList.remove('invisible');
  //item number + 1
}
