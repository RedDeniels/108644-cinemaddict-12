import {createHeaderProfileTemplate} from "./view/header-profile";
import {createNavigationTemplate} from "./view/navigation";
import {createSortingListTemplate} from "./view/sortingList";
import {createFilmsMainListTemplatae} from "./view/films-main-list";
import {createFilmsListContainerTemplate} from "./view/films-list-container";
import {createFilmCardTemplatae} from "./view/film-card";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {createTopRatedListTemplatae} from "./view/top-rated-list";
import {createMostCommentedListTemplatae} from "./view/most-commented-list";
import {createStatisticsTemplate} from "./view/statistics";
import {generateFilm} from "./mock/film";
import {render, compareArrays, getRandomSublist} from "./utils";
import {createFilmDetailsPopup} from "./view/film-details";
import {generateSortings} from "./mock/sorting";
import {createSortingTemplate} from "./view/sorting";

const KEY_CODE_ESC = 27;
const FILMS_COUNT = 23;
const FILMS_COUNT_PER_LOAD = 5;
const FILMS_EXTRA_COUNT = 2;
const INITIAL_SORTING_ACTIVE = `default`;

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerElement = bodyElement.querySelector(`.footer`);

const films = new Array(FILMS_COUNT).fill(``).map(generateFilm);
let currentFilms = films.slice();
const sortings = generateSortings(currentFilms);

const renderFilms = (listContainer, films, itemsCount = films.length) => {
  let handleFilmsElementClick;

  const getFilmActiveElements = (filmElement) => {
    const filmPosterElement = filmElement.querySelector(`.film-card__poster`);
    const filmTitleElement = filmElement.querySelector(`.film-card__title`);
    const filmCommentsCountElement = filmElement.querySelector(`.film-card__comments`);
    return [filmPosterElement, filmTitleElement, filmCommentsCountElement];
  };

  const addOpenListners = (film, filmActiveElements) => {
    for (const element of filmActiveElements) {
      element.addEventListener(`click`, handleFilmsElementClick);
    }
  };

  const removeOpenListners = (film, filmActiveElements) => {
    for (const element of filmActiveElements) {
      element.removeEventListener(`click`, handleFilmsElementClick);
    }
  };

  const filmsElementsClick = (film, filmActiveElements) => {
    removeOpenListners(film, filmActiveElements);
    render(footerElement, createFilmDetailsPopup(film), `beforeend`);

    const filmDetailsElement = bodyElement.querySelector(`.film-details`);
    const filmDetailsCloseButtonElement = filmDetailsElement.querySelector(`.film-details__close-btn`);

    const closeFilmDetails = (filmActiveElements) => {
      filmDetailsCloseButtonElement.removeEventListener(`click`, handleCloseFilmDetails);
      document.removeEventListener(`keydown`, handleFilmDetailsKeydownPush);
      filmDetailsElement.remove();

      addOpenListners(film, filmActiveElements);
    };

    let handleCloseFilmDetails = closeFilmDetails.bind(null, filmActiveElements);

    const handleFilmDetailsKeydownPush = (evt) => {
      if (evt.keyCode === KEY_CODE_ESC) {
        handleCloseFilmDetails(handleCloseFilmDetails);
      }
    };

    filmDetailsCloseButtonElement.addEventListener(`click`, handleCloseFilmDetails);
    document.addEventListener(`keydown`, handleFilmDetailsKeydownPush);
  };

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
    const filmActiveElements = getFilmActiveElements(filmElement);
    handleFilmsElementClick = filmsElementsClick.bind(null, film, filmActiveElements);
    addOpenListners(film, filmActiveElements);
  });
};

const renderFilmsContainer = (container) => {
  render(container, createFilmsListContainerTemplate(), `beforeend`);
};

const getSortOfPropertyFilms = (property) => {
  const sortFilms = currentFilms.slice().sort((item, itemNext) => (item[property] - itemNext[property]));
  return sortFilms.filter((item) => (item[property] > 0));
};

const getSortOfCommentsCountFilms = () => {
  const sortFilms = currentFilms.slice().sort((item, itemNext) => (item.comments.length) - itemNext.comments.length);
  return sortFilms.filter((item) => (item.comments.length));
};

const getSortExtraList = (sortedExtraFilms) => {
  if (!sortedExtraFilms.length) {
    return;
  }

  let finishSortedExtraFilms = [];
  if (compareArrays(sortedExtraFilms, films)) {
    finishSortedExtraFilms = getRandomSublist(sortedExtraFilms, FILMS_EXTRA_COUNT);
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

const renderShowButton = () => {
  if (currentFilms.length <= FILMS_COUNT_PER_LOAD) {
    return;
  }

  const showMoreButton = filmsMainListElement.querySelector(`.films-list__show-more`);

  const handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    const filmsMainListContainerElement = filmsMainListElement.querySelector(`.films-list__container`);
    renderFilms(filmsMainListContainerElement, currentFilms, FILMS_COUNT_PER_LOAD);

    if (filmsMainListElement.querySelectorAll(`.film-card`).length === films.length) {
      const showMoreButton = filmsMainListElement.querySelector(`.films-list__show-more`);
      showMoreButton.remove();
    }
  };

  if (!showMoreButton) {
    render(filmsMainListElement, createShowMoreButtonTemplate(), `beforeend`);
    const showMoreButton = filmsMainListElement.querySelector(`.films-list__show-more`);
    showMoreButton.addEventListener('click', handleShowMoreButtonClick);
  }
};

const renderMainList = () => {
  renderFilmsContainer(filmsMainListElement);
  const filmsMainListContainerElement = filmsMainListElement.querySelector(`.films-list__container`);

  renderFilms(filmsMainListContainerElement, currentFilms, FILMS_COUNT_PER_LOAD);
  renderShowButton();
};

const renderSortingList = () => {
  const activateSorting = (item, currentSortingElement) => {
    const prevSortingActiveButtonElement = sortingListElement.querySelector(`.sort__button--active`);
    prevSortingActiveButtonElement.classList.remove(`sort__button--active`);
    currentSortingElement.querySelector(`.sort__button`).classList.add(`sort__button--active`);

    const filmsListContainerElement = filmsMainListElement.querySelector(`.films-list__container`);
    filmsListContainerElement.innerHTML = '';
    currentFilms = item.films;
    renderFilms(filmsListContainerElement, currentFilms, FILMS_COUNT_PER_LOAD);
    renderShowButton();
  };

  render(mainElement, createSortingListTemplate(), `beforeend`);
  const sortingListElement = mainElement.querySelector(`.sort`);

  sortings.forEach((item) => {
    const handleSortingClick = (evt) => {
      evt.preventDefault();
      activateSorting(item, currentSortingElement, handleSortingClick);
    };

    render(sortingListElement, createSortingTemplate(item.title), `beforeend`);
    const currentSortingElement = sortingListElement.lastChild;
    currentSortingElement.addEventListener(`click`, handleSortingClick);
  });

  const initialSortingActiveElement = sortingListElement.querySelector(`.sort__element--${INITIAL_SORTING_ACTIVE}`);
  initialSortingActiveElement.querySelector(`.sort__button`).classList.add(`sort__button--active`);
};

render(headerElement, createHeaderProfileTemplate(), `beforeend`);

render(mainElement, createNavigationTemplate(films.length), `beforeend`);

renderSortingList();

render(mainElement, createFilmsMainListTemplatae(), `beforeend`);

const filmsElement = mainElement.querySelector(`.films`);
const filmsMainListElement = filmsElement.querySelector(`.films-list`);

renderMainList(currentFilms);
renderExtraList(createTopRatedListTemplatae, getSortOfPropertyFilms(`rating`), `js-top-rated-list`);
renderExtraList(createMostCommentedListTemplatae, getSortOfCommentsCountFilms(), `js-most-commented-list`);

const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createStatisticsTemplate(films.length), `beforeend`);