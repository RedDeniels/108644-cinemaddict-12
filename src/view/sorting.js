import AbstractView from "./abstract";

export default class SortingElement extends AbstractView {
  constructor(type, active) {
    super();

    this._type = type;
    this._active = active;

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return (
      `<li class="sort__element sort__element--${this._type}"><a href="#" class="sort__button ${this._active ? `sort__button--active` : ``}" data-sort-type="${this._type}">Sort by ${this._type}</a></li>`
    );
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(this._type);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.sort__button`).addEventListener(`click`, this._clickHandler);
  }
}
