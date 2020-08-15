import {MONTHS, MIN_IN_HOUR} from "./const";

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomNumber = (min = 0, max = 1, approximation = 0) => Number((Math.random() * (max - min) + min).toFixed(approximation));

export const getRandomItem = (array) => array[getRandomNumber(0, array.length - 1)];

export const getRandomSubarray = (originalArray, count) => {
  let subArray = [...originalArray];
  let newList = [];
  for (let i = 0; i < count; i++) {
    const randomItem = subArray[getRandomNumber(0, subArray.length - 1)];
    newList.push(randomItem);
    subArray.splice(subArray.indexOf(randomItem), 1);
  }
  return newList;
};

export const getItemsElements = (items, createTemplate) => {
  let elements = [];
  for (const item of items) {
    elements.push(createTemplate(item));
  }
  return elements.join(``);
};

export const compareArrays = (arr1, arr2) => arr1.length === arr2.length && arr1.every((value, index) => (value === arr2[index]));

export const getMonthName = (date) => MONTHS[date.getMonth()];

const getDurationMinutes = (duration) => `${duration % MIN_IN_HOUR}m`;

export const getDurationHours = (duration) => duration >= MIN_IN_HOUR ? `${Math.floor(duration / MIN_IN_HOUR)}h ` : ``;

export const getDurationString = (duration) => getDurationHours(duration) + getDurationMinutes(duration);
