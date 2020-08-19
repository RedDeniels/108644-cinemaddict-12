import AbstractView from "./abstract";
import {CssClass} from "../const";

const Title = {
  FILLED: `All movies. Upcoming`,
  EMPTY: `There are no movies in our database`,
};

export default class FilmsListTitle extends AbstractView {
  getTemplate() {
    return (
      `<h2 class="films-list__title ${this._isFilled ? CssClass.HIDDEN : ``}">${this._isFilled ? Title.FILLED : Title.EMPTY}</h2>`
    );
  }
}
