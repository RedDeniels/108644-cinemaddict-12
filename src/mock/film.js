import {getRandomItem, getRandomNumber} from "../utils";
import {FILM_TITLES, FILM_POSTERS, FILM_DESCRIPTION_PHRASES, FILM_GENRE} from "../const";

const RATING_MAX = 10;
const COMMENTS_COUNT_MAX = 5;
const DESCRIPTION_PHRASES_MIN = 1;
const DESCRIPTION_PHRASES_MAX = 5;
const YEAR_MIN = 1940;
const YEAR_MAX = 2020;
const DURATION_MIN = 10;
const DURATION_MAX = 200;

const generateDescription = () => {
  let description = new Array(getRandomNumber(DESCRIPTION_PHRASES_MIN, DESCRIPTION_PHRASES_MAX)).fill(``);
  return description.map(() => getRandomItem(FILM_DESCRIPTION_PHRASES)).join(` `);
};

export const generateFilm = () => ({
  title: getRandomItem(FILM_TITLES),
  poster: getRandomItem(FILM_POSTERS),
  rating: getRandomNumber(0, RATING_MAX, 1),
  year: getRandomNumber(YEAR_MIN, YEAR_MAX),
  duration: getRandomNumber(DURATION_MIN, DURATION_MAX),
  genres: getRandomItem(FILM_GENRE),
  description: generateDescription(DURATION_MAX),
  commentsCount: getRandomNumber(0, COMMENTS_COUNT_MAX),
});
