import {createElement} from "../utils";
import {CssClass} from "../const";

const Title = {
  FILLED: `All movies. Upcoming`,
  EMPTY: `There are no movies in our database`,
};

export default class FilmsListTitle {
  constructor(isFilled) {
    this._element = null;
    this._isFilled = isFilled;
  }

  getTemplate() {
    return (
      `<h2 class="films-list__title ${this._isFilled ? CssClass.HIDDEN : ``}">${this._isFilled ? Title.FILLED : Title.EMPTY}</h2>`
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
