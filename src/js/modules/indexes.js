import * as arrStore from './arrayStorage.js';
import * as terms from './terms.js';

export const figure = ((mouse) => {
  let index;
  for (let i = 0; i < arrStore.point.length; i += 1) {
    for (let j = 0; j < arrStore.point[i].length; j += 1) {
      for (let k = 0; k < arrStore.point[i][j].length; k += 1) {
        if (terms.comparisonMouseAndPoint(mouse, arrStore.point[i][j][k])) {
          index = i;
        }
      }
    }
  }
  return index;
});

export const curve = ((mouse) => {
  let index;
  for (let i = 0; i < arrStore.point.length; i += 1) {
    for (let j = 0; j < arrStore.point[i].length; j += 1) {
      for (let k = 0; k < arrStore.point[i][j].length; k += 1) {
        if (terms.comparisonMouseAndPoint(mouse, arrStore.point[i][j][k])) {
          index = j;
        }
      }
    }
  }
  return index;
});

export const point = ((mouse) => {
  let index;
  for (let i = 0; i < arrStore.point.length; i += 1) {
    for (let j = 0; j < arrStore.point[i].length; j += 1) {
      for (let k = 0; k < arrStore.point[i][j].length; k += 1) {
        if (terms.comparisonMouseAndPoint(mouse, arrStore.point[i][j][k])) {
          index = k;
        }
      }
    }
  }
  return index;
});
