import {createElement} from "../utils";

export default class SortingList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<ul class="sort"></ul>`
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
