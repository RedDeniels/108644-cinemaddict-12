import {createHeaderProfileTemplate} from "./view/header-profile";
import {createNavigationTemplate} from "./view/navigation";
import {createSortTemplate} from "./view/sort";
import {createFilmsMainListTemplatae} from "./view/films-main-list";
import {createFilmsListContainerTemplate} from "./view/films-list-container";
import {createFilmCardTemplatae} from "./view/film-card";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {createTopRatedListTemplatae} from "./view/top-rated-list";
import {createMostCommentedListTemplatae} from "./view/most-commented-list";
import {createStatisticsTemplate} from "./view/statistics";
import {generateFilm} from "./mock/film";
import {render, compareArrays, getRandomItems} from "./utils";
import {createFilmDetailsPopup} from "./view/film-details";

const KEY_CODE_ESC = 27;
const FILMS_COUNT = 23;
const FILMS_COUNT_PER_LOAD = 5;
const FILMS_EXTRA_COUNT = 2;

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerElement = bodyElement.querySelector(`.footer`);

const films = new Array(FILMS_COUNT).fill(``).map(generateFilm);

const renderFilms = (listContainer, films, itemsCount = films.length) => {
  const filmsCountBeforeRender = listContainer.querySelectorAll(`.film-card`).length;

  if (filmsCountBeforeRender === films.length) {
    return;
  } else if  (filmsCountBeforeRender + itemsCount > films.length) {
    itemsCount = films.length - filmsCountBeforeRender;
  }

  const newFilms = films.slice(filmsCountBeforeRender, filmsCountBeforeRender + itemsCount);

  newFilms.forEach((film) => {
    render(listContainer, createFilmCardTemplatae(film), `beforeend`);
    const filmElement = listContainer.lastChild;
    const filmPosterElement = filmElement.querySelector(`.film-card__poster`);
    const filmTitleElement = filmElement.querySelector(`.film-card__title`);
    const filmCommentsCountElement = filmElement.querySelector(`.film-card__comments`);

    const handleFilmsElementsClick = () => {
      filmPosterElement.removeEventListener(`click`, handleFilmsElementsClick);
      filmTitleElement.removeEventListener(`click`, handleFilmsElementsClick);
      filmCommentsCountElement.removeEventListener(`click`, handleFilmsElementsClick);

      render(footerElement, createFilmDetailsPopup(film), `beforeend`);

      const filmDetailsElement = bodyElement.querySelector(`.film-details`);
      const filmDetailsCloseButtonElement = filmDetailsElement.querySelector(`.film-details__close-btn`);

      const handleCloseFilmDetails = () => {
        filmDetailsCloseButtonElement.removeEventListener(`click`, handleCloseFilmDetails);
        document.removeEventListener(`keydown`, handleFilmDetailsKeydownPush);
        filmDetailsElement.remove();

        filmPosterElement.addEventListener(`click`, handleFilmsElementsClick);
        filmTitleElement.addEventListener(`click`, handleFilmsElementsClick);
        filmCommentsCountElement.addEventListener(`click`, handleFilmsElementsClick);
      };

      const handleFilmDetailsKeydownPush = (evt) => {
        if (evt.keyCode === KEY_CODE_ESC) {
          handleCloseFilmDetails();
        }
      };

      filmDetailsCloseButtonElement.addEventListener(`click`, handleCloseFilmDetails);
      document.addEventListener(`keydown`, handleFilmDetailsKeydownPush);
    };

    filmPosterElement.addEventListener(`click`, handleFilmsElementsClick);
    filmTitleElement.addEventListener(`click`, handleFilmsElementsClick);
    filmCommentsCountElement.addEventListener(`click`, handleFilmsElementsClick);
  });
};

const renderFilmsContainer = (container) => {
  render(container, createFilmsListContainerTemplate(), `beforeend`);
};

const getSortOfPropertyFilms = (property) => {
  const sortFilms = films.slice().sort((item, itemNext) => (item[property] - itemNext[property]));
  return sortFilms.filter((item) => (item[property] > 0));
};

const getSortOfCommentsCountFilms = () => {
  const sortFilms = films.slice().sort((item, itemNext) => (item.comments.length) - itemNext.comments.length);
  return sortFilms.filter((item) => (item.comments.length));
};

const getSortExtraList = (sortedExtraFilms) => {
  if (!sortedExtraFilms.length) {
    return;
  }

  let finishSortedExtraFilms = [];
  if (compareArrays(sortedExtraFilms, films)) {
    finishSortedExtraFilms = getRandomItems(sortedExtraFilms, FILMS_EXTRA_COUNT);
  } else {
    finishSortedExtraFilms = sortedExtraFilms.slice(-FILMS_EXTRA_COUNT).reverse();
  }

  return finishSortedExtraFilms;
};

const renderExtraList = (createListTemplate, sortedList, className) => {
  const extraSortedList = getSortExtraList(sortedList);
  render(filmsElement, createListTemplate(), `beforeend`);
  const extraListElement = filmsElement.querySelector(`.${className}`);

  renderFilmsContainer(extraListElement);
  const extraContainerElement = extraListElement.querySelector(`.films-list__container`);
  renderFilms(extraContainerElement, extraSortedList);
};

const renderMainList = (films) => {
  renderFilmsContainer(filmsMainListElement);
  const filmsMainListContainerElement = filmsMainListElement.querySelector(`.films-list__container`);

  renderFilms(filmsMainListContainerElement, films, FILMS_COUNT_PER_LOAD);
  render(filmsMainListElement, createShowMoreButtonTemplate(), `beforeend`);
  const showMoreButton = filmsMainListElement.querySelector(`.films-list__show-more`);

  const handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();

    renderFilms(filmsMainListContainerElement, films, FILMS_COUNT_PER_LOAD);
    if (filmsMainListElement.querySelectorAll(`.film-card`).length === films.length) {
      showMoreButton.style.display = `none`;
      showMoreButton.removeEventListener(`click`, handleShowMoreButtonClick);
    }
  };

  showMoreButton.addEventListener('click', handleShowMoreButtonClick);
};

render(headerElement, createHeaderProfileTemplate(), `beforeend`);

render(mainElement, createNavigationTemplate(films.length), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createFilmsMainListTemplatae(), `beforeend`);

const filmsElement = mainElement.querySelector(`.films`);
const filmsMainListElement = filmsElement.querySelector(`.films-list`);

renderMainList(films);
renderExtraList(createTopRatedListTemplatae, getSortOfPropertyFilms(`rating`), `js-top-rated-list`);
renderExtraList(createMostCommentedListTemplatae, getSortOfCommentsCountFilms(), `js-most-commented-list`);

const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createStatisticsTemplate(films.length), `beforeend`);