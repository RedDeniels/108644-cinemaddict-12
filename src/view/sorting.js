export const createSortingTemplate = (title) => (
  `<li class="sort__element sort__element--${title}"><a href="#" class="sort__button">Sort by ${title}</a></li>`
);
