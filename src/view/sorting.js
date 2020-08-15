import {createElement} from "../utils";

export default class SortingElement {
  constructor(type) {
    this._element = null;
    this._type = type;
  }

  getTemplate() {
    return (
      `<li class="sort__element sort__element--${this._type}"><a href="#" class="sort__button">Sort by ${this._type}</a></li>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
