import AbstractView from "./abstract";

export default class MostCommentedList extends AbstractView {
  getTemplate() {
    return (
      `<section class="films-list--extra js-most-commented-list">
        <h2 class="films-list__title">Most commented</h2>
      </section>`
    );
  }
}
