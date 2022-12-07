import canvas from './classes/canvas.js';
import mousePosition from './modules/mousePosition.js';
import * as terms from './modules/terms.js';
import * as index from './modules/indexes.js';
import * as createPoint from './modules/createPoint.js';
import * as arrStore from './modules/arrayStorage.js';
import * as draw from './modules/draw.js';

let clickCounter = null;
let mouseDown;
let indexes = {
  figure: null,
  curve: null,
  point: null
};

document.addEventListener('keydown', () => {

});

document.addEventListener('keyup', () => {

});

canvas.cnv.addEventListener('mousedown', (e) => {
  mouseDown = mousePosition(e);
  indexes.figure = index.figure(mousePosition(e));
  indexes.curve = index.curve(mousePosition(e));
  indexes.point = index.point(mousePosition(e));
});

canvas.cnv.addEventListener('mouseup', (e) => {
  let mouseDownEqualMouseUp;
  let indexFigure;
  let hasPoint;
  if (clickCounter != null) {
    mouseDownEqualMouseUp = terms.comparisobDownAndUp(mouseDown, mousePosition(e));
    indexFigure = index.figure(mousePosition(e));
    hasPoint = index.point(mousePosition(e));
  }

  if (
    clickCounter === 0
    && mouseDownEqualMouseUp === true
    && hasPoint === undefined
  ) {
    createPoint.addFigure();
  }

  if (
    (clickCounter === 0 || clickCounter > 1)
    && mouseDownEqualMouseUp === true
    && hasPoint === undefined
  ) {
    createPoint.addCurve();
  }

  if (
    clickCounter < 2
    && mouseDownEqualMouseUp === true
    && hasPoint === undefined
  ) {
    createPoint.addPoint(e, false);
  }

  if (
    clickCounter > 1
    && mouseDownEqualMouseUp === true
    && hasPoint === undefined
  ) {
    createPoint.addPoint(e, true);
  }

  if (
    clickCounter > 1
    && mouseDownEqualMouseUp === true
  ) {
    if (
      (hasPoint === 0 || hasPoint === 2)
      && (arrStore.point.length - 1) === indexFigure
    ) {
      createPoint.addCurve();
      createPoint.compound(indexes);
      clickCounter = -1;
    }
  }

  if (
    mouseDownEqualMouseUp === true
    && hasPoint === undefined
  ) {
    clickCounter += 1;
  }

  draw.clear();
  draw.drawCurve();
});

canvas.cnv.addEventListener('dblclick', (e) => {
  if (clickCounter === null) {
    clickCounter = 0;
  }

  if (clickCounter === 0) {
    createPoint.addFigure();
    createPoint.addCurve();
    createPoint.addPoint(e, false);

    clickCounter += 1;

    draw.clear();
    draw.drawCurve();
  } else {
    clickCounter = null;
  }
});
