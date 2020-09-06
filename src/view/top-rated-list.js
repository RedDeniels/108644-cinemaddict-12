import AbstractView from "./abstract";

export default class TopRatedList extends AbstractView {
  getTemplate() {
    return (
      `<section class="films-list--extra js-top-rated-list">
        <h2 class="films-list__title">Top rated</h2>
      </section>`
    );
  }
}
