import {createElement} from "../utils";

export default class Statistics {
  constructor() {
    this._element = null;
  }

  getTemplate(count) {
    return (
      `<p>${count} inside</p>`
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
