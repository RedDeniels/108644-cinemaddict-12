import {createElement} from "../utils";

export default class MostCommentedList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="films-list--extra js-most-commented-list">
        <h2 class="films-list__title">Most commented</h2>
      </section>`
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
