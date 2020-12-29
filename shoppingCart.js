import formatCurrency from './util/formatCurrency.js';
import items from './items.json';
import addGlobalEventListener from './util/addGlobalEventListener.js';
const cartButton = document.querySelector('[data-cart-button]');
const cartItemContainer = document.querySelector('[data-cart-item-container]');
const cartItemsWrapper = document.querySelector('[data-cart-items-wrapper]');
const cartItemTemplate = document.querySelector('#cart-item-template');
const cartQuantity = document.querySelector('[     data-cart-quantity]');
const cartTotal = document.querySelector('[data-cart-total]');
const cart = document.querySelector('[data-cart]');

let shoppingCart = [];
const imgURL = 'https://dummyimage.com/210x130';
const SESSION_STORAGE_KEY = 'SHOPPING_CAR';

export function setupShoppingCart() {
  addGlobalEventListener('click', '[ data-remove-from-cart-button]', (e) => {
    const id = parseInt(e.target.closest('[data-item]').dataset.id);
    removeFromCart(id);
  });

  shoppingCart = loadCart();
  renderCart();

  cartButton.addEventListener('click', () => {
    cartItemsWrapper.classList.toggle('invisible');
  });
}

export function addItemToCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    shoppingCart.push({ id: id, quantity: 1 });
  }

  renderCart();
  saveCart();
}

function hideCart() {
  cart.classList.add('invisible');
  cartItemsWrapper.classList.add('invisible');
}

function showCart() {
  cart.classList.remove('invisible');
}

function removeFromCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  if (existingItem == null) return;
  shoppingCart = shoppingCart.filter((entry) => entry.id !== id);
  renderCart();
  saveCart();
}

function saveCart() {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart));
}

function loadCart() {
  const cart = sessionStorage.getItem(SESSION_STORAGE_KEY);
  return JSON.parse(cart) || [];
}

function renderCart() {
  if (shoppingCart.length === 0) {
    hideCart();
  } else {
    showCart();
    renderCartItems();
  }
}

function renderCartItems() {
  cartQuantity.innerText = shoppingCart.length;
  const totalCents = shoppingCart.reduce((sum, entry) => {
    const item = items.find((item) => entry.id === item.id);
    return sum + item.priceCents * entry.quantity;
  }, 0);
  cartTotal.innerText = formatCurrency(totalCents / 100);

  cartItemContainer.innerHTML = '';
  shoppingCart.forEach((entry) => {
    const item = items.find((item) => entry.id === item.id);
    const cartItem = cartItemTemplate.content.cloneNode(true);

    const container = cartItem.querySelector('[data-item]');
    container.dataset.id = item.id;
    const image = cartItem.querySelector('[data-image]');
    image.src = `${imgURL} /${item.imageColor}/${item.imageColor}`;

    const name = cartItem.querySelector('[data-name]');
    name.innerText = item.name;

    if (entry.quantity > 1) {
      const quantity = cartItem.querySelector('[data-quantity]');
      quantity.innerText = `x${entry.quantity}`;
    }

    const price = cartItem.querySelector('[data-price]');
    price.innerText = formatCurrency((item.priceCents * entry.quantity) / 100);

    cartItemContainer.appendChild(cartItem);
  });
}
