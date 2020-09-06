import NavigationView from "../view/navigation";
import SortingListView from "../view/sorting-list";
import FilmsView from "../view/films";
import FilmsMainListView from "../view/films-main-list";
import FilmsListTitleView from "../view/films-list-title";
import TopRatedListView from "../view/top-rated-list";
import MostCommentedListView from "../view/most-commented-list";
import FilmCardView from "../view/film-card";
import StatisticsView from "../view/statistics";
import {remove, render, renderItemsElements} from "../utils/render";
import FilmsListContainerView from "../view/films-list-container";
import FilmDetailsView from "../view/film-details";
import GenreItemView from "../view/genre-item";
import CommentView from "../view/comment";
import ShowMoreButtonView from "../view/show-more-button";
import {compareArrays, getRandomSubarray} from "../utils/common";
import {SortType} from "../const";
import {sortByDate, sortByRating} from "../utils/sort";
import SortingElementView from "../view/sorting";


const FilmsCount = {
  TOTAL: 23,
  PER_LOAD: 5,
  EXTRA: 2,
};

export default class MovieList {
  constructor(mainContainer, footerContainer) {
    this._mainElement = mainContainer;
    this._footerElement = footerContainer;
    this._renderedFilmCount = FilmsCount.PER_LOAD;
    this._currentSortType = SortType.DEFAULT;

    this._navigationComponent = new NavigationView();
    this._filmsMainListComponent = new FilmsMainListView();
    this._sortingListComponent = new SortingListView();
    this._filmsComponent = new FilmsView();
    this._filmsMainListContainerComponent = new FilmsListContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._topRatedListComponent = new TopRatedListView();
    this._mostCommentedListComponent = new MostCommentedListView();
    this._filmsTopRatedListContainerComponent = new FilmsListContainerView();
    this._filmsMostCommentedListContainerComponent = new FilmsListContainerView();
    this._statisticsComponent = new StatisticsView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = [...films];
    this._sourcedFilms = [...films];

    render(this._mainElement, this._navigationComponent);
    this._renderSortingContainer();
    render(this._mainElement, this._filmsComponent);
    render(this._filmsComponent, this._filmsMainListComponent);

    this._renderMainList();
    this._renderExtraLists();
    render(this._footerElement, this._statisticsComponent);
  }

  _renderFilmDetails(film) {
    const filmDetails = new FilmDetailsView(film);
    const filmDetailsElement = filmDetails.getElement();
    this._footerElement.appendChild(filmDetailsElement);
    const genresContainer = filmDetailsElement.querySelector(`.film-details__genres`);
    const commentContainer = filmDetailsElement.querySelector(`.film-details__comments-list`);
    renderItemsElements(genresContainer, film.genres, GenreItemView);
    renderItemsElements(commentContainer, film.comments, CommentView);
    return filmDetails;
  }

  _closeFilmDetails(filmComponent, filmDetailsElement) {
    this._footerElement.removeChild(filmDetailsElement);
    filmComponent.setOpenClickHandler(this._filmsElementsClick.bind(this));
  }

  _filmsElementsClick(filmComponent) {
    const filmDetails = this._renderFilmDetails(filmComponent.getFilm());
    filmDetails.setFilmCard(filmComponent);

    filmDetails.setCloseClickHandler(this._closeFilmDetails.bind(this));
  }

  _renderFilm(container, film) {
    const filmCardComponent = new FilmCardView(film);
    render(container, filmCardComponent);
    filmCardComponent.setOpenClickHandler(this._filmsElementsClick.bind(this));
  }

  _renderFilms(container, films, from, to) {
    films.slice(from, to).forEach((film) => this._renderFilm(container, film));
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._filmsMainListContainerComponent, this._films, this._renderedFilmCount, this._renderedFilmCount + FilmsCount.PER_LOAD);
    this._renderedFilmCount += FilmsCount.PER_LOAD;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsMainListComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderMainList() {
    this._filmsListTitleComponent = new FilmsListTitleView(Boolean(this._films));
    render(this._filmsMainListComponent, this._filmsListTitleComponent);
    render(this._filmsMainListComponent, this._filmsMainListContainerComponent);
    this._renderFilms(this._filmsMainListContainerComponent, this._films, 0, Math.min(this._films.length, FilmsCount.PER_LOAD));

    if (this._films.length > FilmsCount.PER_LOAD) {
      this._renderShowMoreButton();
    }
  }

  _getSortExtraList(sortedExtraFilms) {
    if (!sortedExtraFilms.length) {
      return [];
    }

    let finishSortedExtraFilms;
    if (compareArrays(sortedExtraFilms, this._films)) {
      finishSortedExtraFilms = getRandomSubarray(sortedExtraFilms, FilmsCount.EXTRA);
    } else {
      finishSortedExtraFilms = sortedExtraFilms.slice(-FilmsCount.EXTRA).reverse();
    }

    return finishSortedExtraFilms;
  }

  _renderExtraList(listComponent, containerComponent, sortedFilms) {
    const extraSortedList = this._getSortExtraList(sortedFilms);
    render(this._filmsComponent, listComponent);
    render(listComponent, containerComponent);

    this._renderFilms(containerComponent, extraSortedList, 0, FilmsCount.EXTRA);
  }

  _getSortOfPropertyFilms(property) {
    const sortFilms = [...this._films].sort((item, itemNext) => (item[property] - itemNext[property]));
    return sortFilms.filter((item) => (item[property] > 0));
  }

  _getSortOfCommentsCountFilms() {
    const sortFilms = [...this._films].sort((item, itemNext) => (item.comments.length) - itemNext.comments.length);
    return sortFilms.filter((item) => (item.comments.length));
  }

  _renderExtraLists() {
    this._renderExtraList(this._topRatedListComponent, this._filmsTopRatedListContainerComponent, this._getSortOfPropertyFilms(`rating`));
    this._renderExtraList(this._mostCommentedListComponent, this._filmsMostCommentedListContainerComponent, this._getSortOfCommentsCountFilms());
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortByDate);
        break;
      case SortType.RATING:
        this._films.sort(sortByRating);
        break;
      default:
        this._films = [...this._sourcedFilms];
    }

    this._currentSortType = sortType;
  }

  _clearFilms() {
    this._filmsMainListContainerComponent.getElement().innerHTML = ``;
    this._renderedFilmCount = FilmsCount.PER_LOAD;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._sortingListComponent.getElement().innerHTML = ``;
    this._renderSortings();
    this._clearFilms();
    this._renderMainList();
  }

  _renderSortings() {
    Object.values(SortType).forEach((type) => {
      const sortingComponent = new SortingElementView(type, type === this._currentSortType);
      render(this._sortingListComponent, sortingComponent);
      sortingComponent.setClickHandler(this._handleSortTypeChange);
    });
  }

  _renderSortingContainer() {
    render(this._mainElement, this._sortingListComponent);
    this._renderSortings();
  }
}
