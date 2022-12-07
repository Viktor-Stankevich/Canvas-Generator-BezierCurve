import * as arrStore from './arrayStorage.js';
import mousePosition from './mousePosition.js';

let points = arrStore.point;

/**
 * Добавлет в массив новый массив который содержит кривые данной фигуры
 */
export const addFigure = (() => {
  points.push([]);
});

/**
 * Добавлет в массив новый массив который содержит данные точек данной кривой
 */
export const addCurve = (() => {
  let point = points[points.length - 1];
  point.push([]);
});

export const addPoint = ((e, bool) => {
  let mouse = mousePosition(e);
  let point = points[points.length - 1][points[points.length - 1].length - 1];

  if (bool) {
    let prevCurve = points[points.length - 1][points[points.length - 1].length - 2];
    point.push(
      { x: prevCurve[2].x, y: prevCurve[2].y },
      { x: prevCurve[2].x, y: prevCurve[2].y },
      { x: mouse.x, y: mouse.y },
      { x: mouse.x, y: mouse.y }
    );
  } else {
    point.push(
      { x: mouse.x, y: mouse.y },
      { x: mouse.x, y: mouse.y }
    );
  }
});

export const compound = ((indexes) => {
  let point = points[points.length - 1][points[points.length - 1].length - 1];
  let prevCurve = points[points.length - 1][points[points.length - 1].length - 2];

  let pointsXY = points[indexes.figure][indexes.curve][indexes.point];

  point.push(
    { x: prevCurve[2].x, y: prevCurve[2].y },
    { x: prevCurve[2].x, y: prevCurve[2].y },
    { x: pointsXY.x, y: pointsXY.y },
    { x: pointsXY.x, y: pointsXY.y }
  );
});
