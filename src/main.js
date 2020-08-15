import {createHeaderProfileTemplate} from "./view/header-profile";
import {createNavigationTemplate} from "./view/navigation";
import {createSortingListTemplate} from "./view/sorting-list";
import {createFilmsMainListTemplatae} from "./view/films-main-list";
import {createFilmsListContainerTemplate} from "./view/films-list-container";
import {createFilmCardTemplatae} from "./view/film-card";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {createTopRatedListTemplatae} from "./view/top-rated-list";
import {createMostCommentedListTemplatae} from "./view/most-commented-list";
import {createStatisticsTemplate} from "./view/statistics";
import {createFilmDetailsPopup} from "./view/film-details";
import {createSortingTemplate} from "./view/sorting";
import {generateFilm} from "./mock/film";
import {generateSortings} from "./mock/sorting";
import {Type as SortingType} from "./mock/sorting";
import {render, compareArrays, getRandomSubarray} from "./utils";
import {KEY_ESC, RenderPlace} from "./const";

const FilmsCount = {
  TOTAL: 23,
  PER_LOAD: 5,
  EXTRA: 2,
};

const INITIAL_SORTING_ACTIVE = SortingType.DEFAULT;

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerElement = bodyElement.querySelector(`.footer`);

const films = new Array(FilmsCount.TOTAL).fill(``).map(generateFilm);
let currentFilms = [...films];
const sortings = generateSortings(currentFilms);

const renderFilms = (listContainer, actualFilms, itemsCount = actualFilms.length) => {
  let handleFilmsElementClick;

  const getFilmActiveElements = (filmElement) => {
    const filmPosterElement = filmElement.querySelector(`.film-card__poster`);
    const filmTitleElement = filmElement.querySelector(`.film-card__title`);
    const filmCommentsCountElement = filmElement.querySelector(`.film-card__comments`);
    return [filmPosterElement, filmTitleElement, filmCommentsCountElement];
  };

  const addOpenListners = (filmActiveElements) => {
    for (const filmActiveElement of filmActiveElements) {
      filmActiveElement.addEventListener(`click`, handleFilmsElementClick);
    }
  };

  const removeOpenListners = (filmActiveElements) => {
    for (const filmActiveElement of filmActiveElements) {
      filmActiveElement.removeEventListener(`click`, handleFilmsElementClick);
    }
  };

  const filmsElementsClick = (film, filmActiveElements) => {
    removeOpenListners(filmActiveElements);
    render(footerElement, createFilmDetailsPopup(film), RenderPlace.BEFORE_END);

    const filmDetailsElement = bodyElement.querySelector(`.film-details`);
    const filmDetailsCloseButtonElement = filmDetailsElement.querySelector(`.film-details__close-btn`);

    const closeFilmDetails = () => {
      filmDetailsCloseButtonElement.removeEventListener(`click`, handleCloseFilmDetails);
      document.removeEventListener(`keydown`, handleFilmDetailsKeydownPush);
      filmDetailsElement.remove();

      addOpenListners(filmActiveElements);
    };

    let handleCloseFilmDetails = closeFilmDetails.bind(null, filmActiveElements);

    const handleFilmDetailsKeydownPush = (event) => {
      if (event.key !== KEY_ESC) {
        return;
      }

      handleCloseFilmDetails(handleCloseFilmDetails);
    };

    filmDetailsCloseButtonElement.addEventListener(`click`, handleCloseFilmDetails);
    document.addEventListener(`keydown`, handleFilmDetailsKeydownPush);
  };

  const initialFilmsCount = listContainer.querySelectorAll(`.film-card`).length;

  if (initialFilmsCount === actualFilms.length) {
    return;
  }

  if (initialFilmsCount + itemsCount > actualFilms.length) {
    itemsCount = actualFilms.length - initialFilmsCount;
  }

  const newFilms = actualFilms.slice(initialFilmsCount, initialFilmsCount + itemsCount);

  newFilms.forEach((film) => {
    render(listContainer, createFilmCardTemplatae(film), RenderPlace.BEFORE_END);
    const filmElement = listContainer.lastChild;
    const filmActiveElements = getFilmActiveElements(filmElement);
    handleFilmsElementClick = filmsElementsClick.bind(null, film, filmActiveElements);
    addOpenListners(filmActiveElements);
  });
};

const renderFilmsContainer = (container) => {
  render(container, createFilmsListContainerTemplate(), RenderPlace.BEFORE_END);
};

const getSortOfPropertyFilms = (property) => {
  const sortFilms = [...currentFilms].sort((item, itemNext) => (item[property] - itemNext[property]));
  return sortFilms.filter((item) => (item[property] > 0));
};

const getSortOfCommentsCountFilms = () => {
  const sortFilms = [...currentFilms].sort((item, itemNext) => (item.comments.length) - itemNext.comments.length);
  return sortFilms.filter((item) => (item.comments.length));
};

const getSortExtraList = (sortedExtraFilms) => {
  if (!sortedExtraFilms.length) {
    return [];
  }

  let finishSortedExtraFilms;
  if (compareArrays(sortedExtraFilms, films)) {
    finishSortedExtraFilms = getRandomSubarray(sortedExtraFilms, FilmsCount.EXTRA);
  } else {
    finishSortedExtraFilms = sortedExtraFilms.slice(-FilmsCount.EXTRA).reverse();
  }

  return finishSortedExtraFilms;
};

const renderExtraList = (createListTemplate, sortedList, className) => {
  const extraSortedList = getSortExtraList(sortedList);
  render(filmsElement, createListTemplate(), RenderPlace.BEFORE_END);
  const extraListElement = filmsElement.querySelector(`.${className}`);

  renderFilmsContainer(extraListElement);
  const extraContainerElement = extraListElement.querySelector(`.films-list__container`);
  renderFilms(extraContainerElement, extraSortedList);
};

const renderShowButton = () => {
  if (currentFilms.length <= FilmsCount.PER_LOAD) {
    return;
  }

  let showMoreButton = filmsMainListElement.querySelector(`.films-list__show-more`);

  const handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    const filmsMainListContainerElement = filmsMainListElement.querySelector(`.films-list__container`);
    renderFilms(filmsMainListContainerElement, currentFilms, FilmsCount.PER_LOAD);

    if (filmsMainListElement.querySelectorAll(`.film-card`).length === films.length) {
      showMoreButton = filmsMainListElement.querySelector(`.films-list__show-more`);
      showMoreButton.remove();
    }
  };

  if (!showMoreButton) {
    render(filmsMainListElement, createShowMoreButtonTemplate(), RenderPlace.BEFORE_END);
    showMoreButton = filmsMainListElement.querySelector(`.films-list__show-more`);
    showMoreButton.addEventListener(`click`, handleShowMoreButtonClick);
  }
};

const renderMainList = () => {
  renderFilmsContainer(filmsMainListElement);
  const filmsMainListContainerElement = filmsMainListElement.querySelector(`.films-list__container`);

  renderFilms(filmsMainListContainerElement, currentFilms, FilmsCount.PER_LOAD);
  renderShowButton();
};

const renderSortingList = () => {
  const activateSorting = (item, currentSortingElement) => {
    const prevSortingActiveButtonElement = sortingListElement.querySelector(`.sort__button--active`);
    prevSortingActiveButtonElement.classList.remove(`sort__button--active`);
    currentSortingElement.querySelector(`.sort__button`).classList.add(`sort__button--active`);

    const filmsListContainerElement = filmsMainListElement.querySelector(`.films-list__container`);
    filmsListContainerElement.innerHTML = ``;
    currentFilms = item.films;
    renderFilms(filmsListContainerElement, currentFilms, FilmsCount.PER_LOAD);
    renderShowButton();
  };

  render(mainElement, createSortingListTemplate(), RenderPlace.BEFORE_END);
  const sortingListElement = mainElement.querySelector(`.sort`);

  sortings.forEach((item) => {
    const handleSortingClick = (evt) => {
      evt.preventDefault();
      activateSorting(item, currentSortingElement, handleSortingClick);
    };

    render(sortingListElement, createSortingTemplate(item.type), RenderPlace.BEFORE_END);
    const currentSortingElement = sortingListElement.lastChild;
    currentSortingElement.addEventListener(`click`, handleSortingClick);
  });

  const initialSortingActiveElement = sortingListElement.querySelector(`.sort__element--${INITIAL_SORTING_ACTIVE}`);
  initialSortingActiveElement.querySelector(`.sort__button`).classList.add(`sort__button--active`);
};

render(headerElement, createHeaderProfileTemplate(), RenderPlace.BEFORE_END);

render(mainElement, createNavigationTemplate(films.length), RenderPlace.BEFORE_END);

renderSortingList();

render(mainElement, createFilmsMainListTemplatae(), RenderPlace.BEFORE_END);

const filmsElement = mainElement.querySelector(`.films`);
const filmsMainListElement = filmsElement.querySelector(`.films-list`);

renderMainList(currentFilms);
renderExtraList(createTopRatedListTemplatae, getSortOfPropertyFilms(`rating`), `js-top-rated-list`);
renderExtraList(createMostCommentedListTemplatae, getSortOfCommentsCountFilms(), `js-most-commented-list`);

const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createStatisticsTemplate(films.length), RenderPlace.BEFORE_END);
