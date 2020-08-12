import {getRandomItem, getRandomNumber} from "../utils";

const TEXTS = [
  `You must watch this now and with no hesitation.`,
  `If I could give this more than perfect, I would rate it as infinite.`,
  `I invite you to watch this film, you too will witness heaven and beyond.`,
  `I cannot express how heart warmed and touched I was after witnessing such a visual piece of perfection.`,
  `This footage defines unparalleled euphoria.`,
  `It is the best moment in my contrasted, dull life so far, I have never experienced such beauty before.`,
  `I am another man after this life changing event, my self is transcended into a state of utter joyful frenzy.`,
];

const EMOJI = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
];

const AUTHORS = [
  `Big Boss`,
  `Amygdala`,
  `Solaire`,
  `Deathwing`,
  `Arthur Morgan`,
  `Thrall son of Durotan`,
  `Alan Wake`,
];

const COMMENTS_YEAR_MIN = 1900;
const COMMENTS_YEAR_MAX = 2020;

export const generateComment = () => ({
  text: getRandomItem(TEXTS),
  emoji: getRandomItem(EMOJI),
  author: getRandomItem(AUTHORS),
  date: new Date(getRandomNumber(COMMENTS_YEAR_MIN, COMMENTS_YEAR_MAX), getRandomNumber(11), getRandomNumber(31), getRandomNumber(24), getRandomNumber(60)),
});
