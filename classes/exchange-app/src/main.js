import { getSupportedCurrencies } from './main';
import { getRates } from './main';
import './style.css';
export {getRates, getSupportedCurrencies, getExchangeResult} from './http/client';


const ELEMENT_SELECTORS = { ROOT: '#app', NAVBAR: '[data-navbar]'};

document.addEventListener('DOMContentLoaded', init);

export function getElement(selector) {
  return document.querySelector(selector);
}

export function init() {
  renderNavbarElement();
  renderExchangePage();
}

export async function renderExchangePage() {
    getElement(ELEMENT_SELECTORS.ROOT).innerHTML = /*html*/ `
    <h1>Exchange page</h1>
  `;
}

export function renderExchangeCalculator() {
  getElement(ELEMENT_SELECTORS.ROOT).innerHTML = /*html*/ `
    <h1>Exchange calculator</h1>
    <form action="submit">
        <label for="currencySelector"></label>
      
        <input type="submit" value="">
      </form>
  `;

  getElement(ELEMENT_SELECTORS.ROOT).

}

export function renderNavbarElement() {
  const navbarElement = getElement(ELEMENT_SELECTORS.NAVBAR);
  navbarElement.innerHTML = /*html*/ `
    <nav>
      <button data-exchange-btn>Exchange</button>
      <button data-exchange-calculator-btn>Exchange calculator</button>
    </nav>
  `;

  navbarElement.querySelector('[data-exchange-btn]').addEventListener('click', () => {
    renderExchangePage();
  });
  navbarElement.querySelector('[data-exchange-calculator-btn]').addEventListener('click', () => {
    renderExchangeCalculator();
  });
}


async function storeCurrencyList() {
  var currencyList = await getSupportedCurrencies();
  localStorage.setItem(currencyList);
}

getCurrencyLsit() {
  localStorage.getItem(currencyList);
}


