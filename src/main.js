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
import FilmsListTitleView from "./view/films-list-title";
import {generateFilm} from "./mock/film";
import {generateSortings} from "./mock/sorting";
import {Type as SortingType} from "./mock/sorting";
import {compareArrays, getRandomSubarray} from "./utils/common";
import {RenderPosition, render, remove, renderItemsElements} from "./utils/render";

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

const filmsElementsClick = (filmComponent) => {
  const filmDetails = renderFilmDetails(filmComponent.getFilm());
  filmDetails.setFilmCard(filmComponent);

  filmDetails.setCloseClickHandler(closeFilmDetails);
};

const closeFilmDetails = (filmComponent, filmDetailsElement) => {
  footerElement.removeChild(filmDetailsElement);
  filmComponent.setOpenClickHandler(filmsElementsClick);
};

const renderFilms = (listContainer, actualFilms, itemsCount = actualFilms.length) => {
  const initialFilmsCount = listContainer.querySelectorAll(`.film-card`).length;

  if (initialFilmsCount === actualFilms.length) {
    return;
  }

  if (initialFilmsCount + itemsCount > actualFilms.length) {
    itemsCount = actualFilms.length - initialFilmsCount;
  }

  const newFilms = actualFilms.slice(initialFilmsCount, initialFilmsCount + itemsCount);

  newFilms.forEach((newFilm) => {
    const filmComponent = new FilmCardView(newFilm);

    render(listContainer, filmComponent, RenderPosition.BEFORE_END);

    filmComponent.setOpenClickHandler(filmsElementsClick);
  });
};

const renderFilmsContainer = (container) => {
  render(container, new FilmsListContainerView(), RenderPosition.BEFORE_END);
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
  render(filmsElement, element, RenderPosition.BEFORE_END);
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
  let showMoreButtonElement = document.querySelector(`.films-list__show-more`);

  const handleShowMoreButtonClick = () => {
    const filmsMainListContainerElement = filmsMainListElement.querySelector(`.films-list__container`);
    renderFilms(filmsMainListContainerElement, currentFilms, FilmsCount.PER_LOAD);

    if (filmsMainListElement.querySelectorAll(`.film-card`).length === films.length) {
      remove(showMoreButton);
    }
  };

  if (!showMoreButtonElement) {
    showMoreButton = new ShowMoreButtonView();
    render(filmsMainListElement, showMoreButton, RenderPosition.BEFORE_END);
    showMoreButton.setClickHandler(handleShowMoreButtonClick);
  }
};

const renderMainList = () => {
  render(filmsMainListElement, new FilmsListTitleView(Boolean(currentFilms.length)), RenderPosition.BEFORE_END);
  renderFilmsContainer(filmsMainListElement);
  const filmsMainListContainerElement = filmsMainListElement.querySelector(`.films-list__container`);

  renderFilms(filmsMainListContainerElement, currentFilms, FilmsCount.PER_LOAD);
  renderShowButton();
};

const renderSortingList = () => {
  const activateSorting = (currentSortingFilms, currentSortingElement) => {
    const prevSortingActiveButtonElement = sortingListElement.querySelector(`.sort__button--active`);
    prevSortingActiveButtonElement.classList.remove(`sort__button--active`);
    currentSortingElement.querySelector(`.sort__button`).classList.add(`sort__button--active`);

    const filmsListContainerElement = filmsMainListElement.querySelector(`.films-list__container`);
    filmsListContainerElement.innerHTML = ``;
    renderFilms(filmsListContainerElement, currentSortingFilms, FilmsCount.PER_LOAD);
    renderShowButton();
  };

  const sortingListComponent = new SortingListView();
  const sortingListElement = sortingListComponent.getElement();
  render(mainElement, sortingListElement, RenderPosition.BEFORE_END);

  sortings.forEach((item) => {
    const sortingComponent = new SortingElementView(item.type, item.films);

    render(sortingListElement, sortingComponent, RenderPosition.BEFORE_END);
    sortingComponent.setClickHandler(activateSorting);
  });

  const initialSortingActiveElement = sortingListElement.querySelector(`.sort__element--${INITIAL_SORTING_ACTIVE}`);
  initialSortingActiveElement.querySelector(`.sort__button`).classList.add(`sort__button--active`);
};

render(headerElement, new HeaderProfileView(), RenderPosition.BEFORE_END);

render(mainElement, new NavigationView(films.length), RenderPosition.BEFORE_END);

renderSortingList();

render(mainElement, new FilmsMainListView(), RenderPosition.BEFORE_END);

const filmsElement = mainElement.querySelector(`.films`);
const filmsMainListElement = filmsElement.querySelector(`.films-list`);

renderMainList(currentFilms);
renderExtraList(new TopRatedListView().getElement(), getSortOfPropertyFilms(`rating`), `js-top-rated-list`);
renderExtraList(new MostCommentedListView().getElement(), getSortOfCommentsCountFilms(), `js-most-commented-list`);

const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, new StatisticsView(films.length), RenderPosition.BEFORE_END);
