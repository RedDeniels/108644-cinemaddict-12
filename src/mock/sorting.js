export const Type = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const sortByDate = (films) => {
  return [...films].sort((film, filmNext) => {
    if (film.date > filmNext.date) {
      return 1;
    }

    if (film.date < filmNext.date) {
      return -1;
    }
    return 0;
  });
};

const sortByRating = (films) => [...films].sort((film, filmNext) => (film.rating - filmNext.rating));

export const typeToSorting = {
  [Type.DEFAULT]: (films) => films,
  [Type.DATE]: sortByDate,
  [Type.RATING]: sortByRating,
};

export const generateSortings = (films) => (
  Object.entries(typeToSorting).map(([sortingTitle, sortFilms]) => {
    return {
      type: sortingTitle,
      films: sortFilms(films),
    };
  })
);
