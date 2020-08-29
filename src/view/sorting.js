import AbstractView from "./abstract";

export default class SortingElement extends AbstractView {
  constructor(type) {
    super();

    this._type = type;
  }

  getTemplate() {
    return (
      `<li class="sort__element sort__element--${this._type}"><a href="#" class="sort__button">Sort by ${this._type}</a></li>`
    );
  }
}
