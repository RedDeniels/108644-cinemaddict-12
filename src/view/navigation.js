import AbstractView from "./abstract";
import {getRandomNumber} from "../utils/common";

export default class Navigation extends AbstractView {
  constructor(count) {
    super();

    this._count = count;
  }
  getTemplate() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
          <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getRandomNumber(0, this._count)}</span></a>
          <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getRandomNumber(0, this._count)}</span></a>
          <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getRandomNumber(0, this._count)}</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }
}
