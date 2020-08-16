import {createElement} from "../utils";

export default class Statistics {
  constructor(count) {
    this._element = null;
    this._count = count;
  }

  getTemplate() {
    return (
      `<p>${this._count} inside</p>`
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
