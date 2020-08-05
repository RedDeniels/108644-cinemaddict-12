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

const FILMS_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const footerElement = bodyElement.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilmsContainer = (container, itemsCount) => {
  render(container, createFilmsListContainerTemplate(), `beforeend`);
  const filmsContainerElement = container.querySelector(`.films-list__container`);

  new Array(itemsCount).fill(`*`).forEach(() => {
    render(filmsContainerElement, createFilmCardTemplatae(), `beforeend`);
  });
};

const renderFilmsExtraLists = (lists, itemsCount) => {
  for (const listItem of lists) {
    renderFilmsContainer(listItem, itemsCount);
  }
};

render(headerElement, createHeaderProfileTemplate(), `beforeend`);

render(mainElement, createNavigationTemplate(), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createFilmsMainListTemplatae(), `beforeend`);

const filmsElement = mainElement.querySelector(`.films`);
const filmsMainListElement = filmsElement.querySelector(`.films-list`);

renderFilmsContainer(filmsMainListElement, FILMS_COUNT);
render(filmsMainListElement, createShowMoreButtonTemplate(), `beforeend`);

render(filmsElement, createTopRatedListTemplatae(), `beforeend`);
render(filmsElement, createMostCommentedListTemplatae(), `beforeend`);

const filmsExtraLists = Array.from(filmsElement.querySelectorAll(`.films-list--extra`));

renderFilmsExtraLists(filmsExtraLists, FILMS_EXTRA_COUNT);

const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createStatisticsTemplate(), `beforeend`);

