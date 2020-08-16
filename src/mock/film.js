import {getRandomItem, getRandomSubarray, getRandomNumber} from "../utils";
import {generateComment} from "./comment";

const TITLES = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `Made for Each Other`,
  `The Great Flamarion`,
];

const ORIGINAL_TITLES = [
  `Green elephant`,
  `Red Constructor`,
  `Plan 9 from Outer Space`,
  `Tarantula`,
  `Attacks by monstrous crabs`,
  `Vampire Planet`,
  `Thing from the Sea of Ghosts`,
];

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const DIRECTORS = [
  `Uwe Boll`,
  `Jason Friedberg`,
  `Aaron Seltzer`,
  `McG`,
  `Strauss brothers`,
  `Jonathan Mostow`,
  `Ronnie Yu`,
];

const WRITERS = [
  `Jason Friedberg`,
  `Aaron Seltzer`,
  `Ulli Lommel`,
  `Gabor Forgach`,
  `James Nguyen`,
  `Dünyayı Kurtaran`,
  `Adamın Oğlu`,
];

const ACTORS = [
  `Andrei Panin`,
  `Vladimir Epifantsev`,
  `Sergey Pakhomov`,
  `Steven Seagal`,
  `Tommy Wiseau`,
  `David Hasselhoff`,
  `Kevin Costner`,
];

const COUNTRIES = [
  `Rohan`,
  `Valyria`,
  `Nilfgaard`,
  `Hyperborea`,
  `Atlantis`,
  `Ophir`,
  `Azeroth`,
];

const DESCRIPTION_PHRASES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const GENRES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
  `Thriller`,
];

const AGE_RATINGS = [
  `0+`,
  `6+`,
  `12+`,
  `16+`,
  `18+`,
];

const RATING_MAX = 10;
const COMMENTS_COUNT_MAX = 5;

const WORKERS_COUNT_MAX = 3;
const GENRES_COUNT_MAX = 4;

const Year = {
  MIN: 1900,
  MAX: 2020,
};

const Duration = {
  MIN: 10,
  MAX: 200,
};

const DescriptionPhrase = {
  MIN: 1,
  MAX: 5,
};

const generateDescription = () => {
  let description = new Array(getRandomNumber(DescriptionPhrase.MIN, DescriptionPhrase.MAX)).fill(``);
  return description.map(() => getRandomItem(DESCRIPTION_PHRASES)).join(` `);
};

const generateComments = () => new Array(getRandomNumber(1, COMMENTS_COUNT_MAX)).fill(``).map(generateComment);

export const generateFilm = () => ({
  title: getRandomItem(TITLES),
  originalTitle: getRandomItem(ORIGINAL_TITLES),
  director: getRandomItem(DIRECTORS),
  writers: getRandomSubarray(WRITERS, getRandomNumber(1, WORKERS_COUNT_MAX)),
  actors: getRandomSubarray(ACTORS, getRandomNumber(1, WORKERS_COUNT_MAX)),
  country: getRandomItem(COUNTRIES),
  poster: getRandomItem(POSTERS),
  rating: getRandomNumber(0, RATING_MAX, 1),
  date: new Date(getRandomNumber(Year.MIN, Year.MAX), getRandomNumber(0, 11), getRandomNumber(1, 31)),
  ageRating: getRandomItem(AGE_RATINGS),
  duration: getRandomNumber(Duration.MIN, Duration.MAX),
  genres: getRandomSubarray(GENRES, GENRES_COUNT_MAX),
  description: generateDescription(Duration.MAX),
  comments: generateComments(),
});
