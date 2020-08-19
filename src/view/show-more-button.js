import AbstractView from "./abstract";

export default class ShowMoreButton extends AbstractView {
  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }
}
