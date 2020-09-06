import AbstractView from "./abstract";

export default class Films extends AbstractView {
  getTemplate() {
    return (
      `<section class="films"></section>`
    );
  }
}
