import {MONTH} from "./const";

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomNumber = (min = 0, max = 1, approximation = 0) => (Number((Math.random() * (max - min) + min).toFixed(approximation)));

export const getRandomItem = (list) => (list[getRandomNumber(0, list.length - 1)]);

export const getRandomSublist = (originalList, count) => {
  let list = originalList.slice();
  let newList = [];
  for (let i = 0; i < count; i++) {
    const randomItem = list[getRandomNumber(0, list.length - 1)];
    newList.push(randomItem);
    list.splice(list.indexOf(randomItem), 1);
  }
  return newList
};

export const getItemsElements = (list, createTemplate) => {
  let listElements = [];
  for (const item of list) {
    listElements.push(createTemplate(item));
  }
  return listElements.join(``);
};

export const compareArrays = (arr1, arr2) => (arr1.length === arr2.length && arr1.every(function(value, index) { return value === arr2[index]}));

export const getMonthName = (date) => (MONTH[date.getMonth()]);

const getDurationMinutes = (duration) => (`${duration % 60}m`);

export const getDurationHours = (duration) => (duration >= 60 ? `${Math.floor(duration / 60)}h ` : ``);

export const getDurationString = (duration) => (getDurationHours(duration) + getDurationMinutes(duration));
