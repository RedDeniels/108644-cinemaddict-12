import AbstractView from "./abstract";

export default class FilmsMainList extends AbstractView {
  getTemplate() {
    return (
      `<section class="films-list">
      </section>`
    );
  }
}
