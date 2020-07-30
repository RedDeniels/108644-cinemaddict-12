"use strict";

const FILM_LIST_COUNT = 5;
const FILM_LIST_EXTRA_COUNT = 2;

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerElement = bodyElement.querySelector(`.footer`);

const createHeaderProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
     </section>`
  );
};

const createNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

const createFilmsMainListTemplatae = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>
    </section>`
  );
};

const createFilmsListContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

const createFilmCardTemplatae = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">Santa Claus Conquers the Martians</h3>
      <p class="film-card__rating">2.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1964</span>
        <span class="film-card__duration">1h 21m</span>
        <span class="film-card__genre">Comedy</span>
      </p>
      <img src="./images/posters/santa-claus-conquers-the-martians.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…</p>
      <a class="film-card__comments">465 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
      </form>
    </article>`
  );
};

const createShowMoreButtonTemplatae = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createTopRatedListTemplatae = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
    </section>`
  );
};

const createMostCommentedListTemplatae = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
    </section>`
  );
};

const createStatisticsTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilmsContainer = (container, itemCount) => {
  render(container, createFilmsListContainerTemplate(), `beforeend`);
  const filmsContainerElement = container.querySelector(`.films-list__container`);

  for (let i = 0; i < itemCount; i++) {
    render(filmsContainerElement, createFilmCardTemplatae(), `beforeend`);
  }
};

const renderFilmsExtraLists = (lists, itemCount) => {
  for (const listItem of lists) {
    renderFilmsContainer(listItem, itemCount);
  }
};

render(headerElement, createHeaderProfileTemplate(), `beforeend`);

render(mainElement, createNavigationTemplate(), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createFilmsMainListTemplatae(), `beforeend`);

const filmsElement = mainElement.querySelector(`.films`);
const filmsMainListElement = filmsElement.querySelector(`.films-list`);

renderFilmsContainer(filmsMainListElement, FILM_LIST_COUNT);
render(filmsMainListElement, createShowMoreButtonTemplatae(), `beforeend`);

render(filmsElement, createTopRatedListTemplatae(), `beforeend`);
render(filmsElement, createMostCommentedListTemplatae(), `beforeend`);

const filmsExtraLists = Array.from(filmsElement.querySelectorAll(`.films-list--extra`));

renderFilmsExtraLists(filmsExtraLists, FILM_LIST_EXTRA_COUNT);

const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createStatisticsTemplate(), `beforeend`);

