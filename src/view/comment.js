import AbstractView from "./abstract";

const getDateString = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${year}/${month}/${day} ${hour}:${minute}`;
};

export default class Comment extends AbstractView {
  constructor(comment) {
    super();

    this._comment = comment;
  }
  getTemplate() {
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${this._comment.emoji}.png" width="55" height="55" alt="emoji-angry">
        </span>
        <div>
          <p class="film-details__comment-text">${this._comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${this._comment.author}</span>
            <span class="film-details__comment-day">${getDateString(this._comment.date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  }
}
