export const getRandomNumber = (min = 0, max = 1, approximation = 0) => (Number((Math.random() * (max - min) + min).toFixed(approximation)));

export const getRandomItem = (list) => (list[getRandomNumber(0, list.length - 1)]);

export const compareArrays =(arr1, arr2) => (arr1.length === arr2.length && arr1.every(function(value, index) { return value === arr2[index]}));