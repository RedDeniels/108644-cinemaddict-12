import AbstractView from "./abstract";

export default class SortingList extends AbstractView {
  getTemplate() {
    return (
      `<ul class="sort"></ul>`
    );
  }
}
