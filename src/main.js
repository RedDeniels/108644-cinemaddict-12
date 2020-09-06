import MovieList from "./presenter/movie-list";
import HeaderProfileView from "./view/header-profile";
import {generateFilm} from "./mock/film";
import {RenderPosition, render} from "./utils/render";

const FilmsCount = {
  TOTAL: 23,
  PER_LOAD: 5,
  EXTRA: 2,
};

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerElement = bodyElement.querySelector(`.footer`);

const films = new Array(FilmsCount.TOTAL).fill(``).map(generateFilm);

render(headerElement, new HeaderProfileView(), RenderPosition.BEFORE_END);

const movieListPresenter = new MovieList(mainElement, footerElement);
movieListPresenter.init(films);
