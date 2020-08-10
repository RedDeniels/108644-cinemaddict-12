const sortByDate = (films) => {
  return films.slice().sort((film, filmNext) => {
    if (film.date > filmNext.date) {
      return 1;
    } else if (film.date < filmNext.date) {
      return -1;
    }
    return 0;
  });
};

export const filmToSortMap = {
  default: (films) => films,
  date: sortByDate,
  rating: (films) => films.slice().sort((film, filmNext) => (film.rating - filmNext.rating)),
};

export const generateSortings = (films) => {
  return Object.entries(filmToSortMap).map(([sortingTitle, sortFilms]) => {
    return {
      title: sortingTitle,
      films: sortFilms(films),
    };
  });
};
