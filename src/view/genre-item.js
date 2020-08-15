import {createElement} from "../utils";

export default class GenreItem {
  constructor(title) {
    this._element = null;
    this._title = title;
  }

  getTemplate() {
    return (
      `<span class="film-details__genre">${this._title}</span>`
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
