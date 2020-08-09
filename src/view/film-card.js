const DESCRIPTION_LENGTH = 140;

export const createFilmCardTemplatae = (film) => {
  const {title, rating, year, duration, genres, poster, description, commentsCount} = film;
  return (
  `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${getDurationString(duration)}</span>
      <span class="film-card__genre">${genres}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${cropDescription(description)}</p>
    <a class="film-card__comments">${commentsCount} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
    </form>
  </article>`
)};

const cropDescription = (description) => (description.length > DESCRIPTION_LENGTH ? description.slice(0, DESCRIPTION_LENGTH - 1) + `...` : description);

const getDurationHours = (duration) => (duration >= 60 ? `${Math.floor(duration / 60)}h` : ``);

const getDurationMinutes = (duration) => (`${duration % 60}m`);

const getDurationString = (duration) => (`${getDurationHours(duration)} ${getDurationMinutes(duration)}`);

