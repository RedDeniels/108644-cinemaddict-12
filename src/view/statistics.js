import AbstractView from "./abstract";

export default class Statistics extends AbstractView {
  constructor(count) {
    super();

    this._count = count;
  }

  getTemplate() {
    return (
      `<p>${this._count} inside</p>`
    );
  }
}
