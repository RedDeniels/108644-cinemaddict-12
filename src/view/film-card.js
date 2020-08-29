import AbstractView from "./abstract";
import {getDurationString} from "../utils";

const DESCRIPTION_LENGTH = 140;

const cropDescription = (description) => (description.length > DESCRIPTION_LENGTH ? description.slice(0, DESCRIPTION_LENGTH - 1) + `...` : description);

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return (
      `<article class="film-card">
        <h3 class="film-card__title">${this._film.title}</h3>
        <p class="film-card__rating">${this._film.rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._film.date.getFullYear()}</span>
          <span class="film-card__duration">${getDurationString(this._film.duration)}</span>
          <span class="film-card__genre">${this._film.genres[0]}</span>
        </p>
        <img src="./images/posters/${this._film.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${cropDescription(this._film.description)}</p>
        <a class="film-card__comments">${this._film.comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
        </form>
      </article>`
    );
  }
}
