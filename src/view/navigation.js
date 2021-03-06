import {getRandomNumber, createElement} from "../utils";

export default class Navigation {
  constructor() {
    this._element = null;
  }

  getTemplate(count) {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
          <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getRandomNumber(0, count)}</span></a>
          <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getRandomNumber(0, count)}</span></a>
          <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getRandomNumber(0, count)}</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }

  getElement(count) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(count));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
