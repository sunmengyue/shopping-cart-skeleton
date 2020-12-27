import items from './items.json';
import formatCurrency from './util/formatCurrency.js';

const storeItemTemplate = document.querySelector('#store-item-template');
const realStoreItemContainer = document.querySelector('[data-store-container]');
const imgURL = 'https://dummyimage.com/420x260';

export function setupStore() {
  items.forEach(renderStoreItem);
}

function renderStoreItem(item) {
  const storeItem = storeItemTemplate.content.cloneNode(true);

  const container = storeItem.querySelector('[data-store-item]');
  container.dataset.id = item.id;
  const image = storeItem.querySelector('[daga-img]');
  image.src = `${imgURL} /${item.imageColor}/${item.imageColor}`;

  const name = storeItem.querySelector('[data-name]');
  name.innerText = item.name;

  const price = storeItem.querySelector('[data-price]');
  price.innerText = formatCurrency(item.priceCents / 100);

  realStoreItemContainer.appendChild(storeItem);
}
