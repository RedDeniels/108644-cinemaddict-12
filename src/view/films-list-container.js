import AbstractView from "./abstract";

export default class FilmsListContainer extends AbstractView {
  getTemplate() {
    return (
      `<div class="films-list__container"></div>`
    );
  }
}
