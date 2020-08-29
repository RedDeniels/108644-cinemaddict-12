import AbstractView from "./abstract";

export default class SortingElement extends AbstractView {
  constructor(type, films) {
    super();

    this._type = type;
    this._films = films;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return (
      `<li class="sort__element sort__element--${this._type}"><a href="#" class="sort__button">Sort by ${this._type}</a></li>`
    );
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(this._films, this.getElement());
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
