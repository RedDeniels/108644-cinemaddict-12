export const sortByDate = (film, filmNext) => {
  if (film.date > filmNext.date) {
    return 1;
  }

  if (film.date < filmNext.date) {
    return -1;
  }

  return 0;
};

export const sortByRating = (film, filmNext) => (film.rating - filmNext.rating);
