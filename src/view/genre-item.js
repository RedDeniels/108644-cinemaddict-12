import AbstractView from "./abstract";

export default class GenreItem extends AbstractView {
  getTemplate() {
    return (
      `<span class="film-details__genre">${this._title}</span>`
    );
  }
}
