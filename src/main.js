import HeaderProfileView from "./view/header-profile";
import NavigationView from "./view/navigation";
import FilmsMainListView from "./view/films-main-list";
import StatisticsView from "./view/statistics";
import SortingListView from "./view/sorting-list";
import SortingElementView from "./view/sorting";
import FilmCardView from "./view/film-card";
import FilmsListContainerView from "./view/films-list-container";
import FilmDetailsView from "./view/film-details";
import GenreItemView from "./view/genre-item";
import CommentView from "./view/comment";
import ShowMoreButtonView from "./view/show-more-button";
import MostCommentedListView from "./view/most-commented-list";
import TopRatedListView from "./view/top-rated-list";
import {generateFilm} from "./mock/film";
import {generateSortings} from "./mock/sorting";
import {Type as SortingType} from "./mock/sorting";
import {compareArrays, getRandomSubarray, renderElement, renderItemsElements} from "./utils";
import {KEY_ESC, RenderPosition} from "./const";

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

const renderFilmDetails = (film) => {
  const filmDetails = new FilmDetailsView(film);
  const filmDetailsElement = filmDetails.getElement();
  footerElement.appendChild(filmDetailsElement);
  const genresContainer = filmDetailsElement.querySelector(`.film-details__genres`);
  const commentContainer = filmDetailsElement.querySelector(`.film-details__comments-list`);
  renderItemsElements(genresContainer, film.genres, GenreItemView);
  renderItemsElements(commentContainer, film.comments, CommentView);
  return filmDetails;
};

const renderFilms = (listContainer, actualFilms, itemsCount = actualFilms.length) => {
  let handleFilmsElementClick;

  const getFilmActiveElements = (filmElement) => {
    const filmPosterElement = filmElement.querySelector(`.film-card__poster`);
    const filmTitleElement = filmElement.querySelector(`.film-card__title`);
    const filmCommentsCountElement = filmElement.querySelector(`.film-card__comments`);
    return [filmPosterElement, filmTitleElement, filmCommentsCountElement];
  };

  const addOpenListeners = (filmActiveElements) => {
    for (const filmActiveElement of filmActiveElements) {
      filmActiveElement.addEventListener(`click`, handleFilmsElementClick);
    }
  };

  const removeOpenListeners = (filmActiveElements) => {
    for (const filmActiveElement of filmActiveElements) {
      filmActiveElement.removeEventListener(`click`, handleFilmsElementClick);
    }
  };

  const filmsElementsClick = (film, filmActiveElements) => {
    removeOpenListeners(filmActiveElements);
    const filmDetails = renderFilmDetails(film);

    const filmDetailsElement = filmDetails.getElement();
    const filmDetailsCloseButtonElement = filmDetailsElement.querySelector(`.film-details__close-btn`);

    const closeFilmDetails = () => {
      filmDetailsCloseButtonElement.removeEventListener(`click`, handleCloseFilmDetails);
      document.removeEventListener(`keydown`, handleFilmDetailsKeydownPush);
      footerElement.removeChild(filmDetailsElement);
      filmDetails.removeElement();

      addOpenListeners(filmActiveElements);
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
    renderElement(listContainer, new FilmCardView(film).getElement(), RenderPosition.BEFORE_END);
    const filmElement = listContainer.lastChild;
    const filmActiveElements = getFilmActiveElements(filmElement);
    handleFilmsElementClick = filmsElementsClick.bind(null, film, filmActiveElements);
    addOpenListeners(filmActiveElements);
  });
};

const renderFilmsContainer = (container) => {
  renderElement(container, new FilmsListContainerView().getElement(), RenderPosition.BEFORE_END);
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

const renderExtraList = (element, sortedList, className) => {
  const extraSortedList = getSortExtraList(sortedList);
  renderElement(filmsElement, element, RenderPosition.BEFORE_END);
  const extraListElement = filmsElement.querySelector(`.${className}`);

  renderFilmsContainer(extraListElement);
  const extraContainerElement = extraListElement.querySelector(`.films-list__container`);
  renderFilms(extraContainerElement, extraSortedList);
};

const renderShowButton = () => {
  if (currentFilms.length <= FilmsCount.PER_LOAD) {
    return;
  }

  let showMoreButton;
  let showMoreButtonElement;


  const handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    const filmsMainListContainerElement = filmsMainListElement.querySelector(`.films-list__container`);
    renderFilms(filmsMainListContainerElement, currentFilms, FilmsCount.PER_LOAD);

    if (filmsMainListElement.querySelectorAll(`.film-card`).length === films.length) {
      filmsMainListElement.removeChild(showMoreButtonElement);
      showMoreButton.removeElement();
    }
  };

  if (!showMoreButtonElement) {
    showMoreButton = new ShowMoreButtonView();
    showMoreButtonElement = showMoreButton.getElement();
    renderElement(filmsMainListElement, showMoreButton.getElement(), RenderPosition.BEFORE_END);
    showMoreButtonElement.addEventListener(`click`, handleShowMoreButtonClick);
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

  renderElement(mainElement, new SortingListView().getElement(), RenderPosition.BEFORE_END);
  const sortingListElement = mainElement.querySelector(`.sort`);

  sortings.forEach((item) => {
    const handleSortingClick = (evt) => {
      evt.preventDefault();
      activateSorting(item, currentSortingElement, handleSortingClick);
    };

    renderElement(sortingListElement, new SortingElementView(item.type).getElement(), RenderPosition.BEFORE_END);
    const currentSortingElement = sortingListElement.lastChild;
    currentSortingElement.addEventListener(`click`, handleSortingClick);
  });

  const initialSortingActiveElement = sortingListElement.querySelector(`.sort__element--${INITIAL_SORTING_ACTIVE}`);
  initialSortingActiveElement.querySelector(`.sort__button`).classList.add(`sort__button--active`);
};

renderElement(headerElement, new HeaderProfileView().getElement(), RenderPosition.BEFORE_END);

renderElement(mainElement, new NavigationView().getElement(films.length), RenderPosition.BEFORE_END);

renderSortingList();

renderElement(mainElement, new FilmsMainListView().getElement(), RenderPosition.BEFORE_END);

const filmsElement = mainElement.querySelector(`.films`);
const filmsMainListElement = filmsElement.querySelector(`.films-list`);

renderMainList(currentFilms);
renderExtraList(new TopRatedListView().getElement(), getSortOfPropertyFilms(`rating`), `js-top-rated-list`);
renderExtraList(new MostCommentedListView().getElement(), getSortOfCommentsCountFilms(), `js-most-commented-list`);

const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

renderElement(footerStatisticsElement, new StatisticsView().getElement(films.length), RenderPosition.BEFORE_END);
