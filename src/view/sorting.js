export const createSortingTemplate = (type) => (
  `<li class="sort__element sort__element--${type}"><a href="#" class="sort__button">Sort by ${type}</a></li>`
);
