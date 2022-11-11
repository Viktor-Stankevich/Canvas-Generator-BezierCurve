const canvasCurve = new CreateCanvas();

const cnv  = canvasCurve.cnv;
const ctx  = canvasCurve.ctx;
const size = canvasCurve.size;
const rect = cnv.getBoundingClientRect();

/**
 * Массив хранящий координаты точек для кривых
 * 
 * @type {object}
 */
var curves = []

/**
 * Объект хранящий координаты курсора
 * 
 * @type {object}
 */
var cursor = { x: 0, y : 0 };

/**
 * Если значение в "true" то создаём в массиве "curves" новый мыссив "figure"
 * 
 * @type {boolean} 
 */
var newFigure = true;

/**
 * Если значение в "true" то создаём в массиве "figure" новый мыссив "curve"
 * 
 * @type {boolean} 
 */
var newCurve = true;

/**
 * Счётчик кликов
 * 
 * @type {number}
 */
var clickCounter = 0;

/**
 * Индекс текущего массива "figure"
 * 
 * @type {number}
 */
var currentFigureIndex = null;

/**
 * Если значение в "true" то можно создавать точки
 * 
 * @type {boolean}
 */
var create = true;

/**
 * Индекс текущего массива "curve"
 * 
 * @type {number}
 */
var currentCurveIndex = null;

/**
 * Индекс "figure" по точке которой произошёл клик
 * 
 * @type {number}
 */
var clickFigureIndex = null;

/**
 * Индекс "curve" по точку кторой произошёл клик
 * 
 * @type {number}
 */
var clickCurveIndex  = null;

/**
 * Индекс точки по которой произошёл клик
 * 
 * @type {number}
 */
var clickPointIndex  = null;

/**
 * Нажата ли клавища контрол
 * 
 * @type {boolean}
 */
var pushCtrl = false;

/**
 * Слушатель события "keydown"
 */
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey) {
    pushCtrl = true;
  }
  console.log(pushCtrl);
});

/**
 * Слушатель события "keydown"
 */
document.addEventListener("keyup", (e) => {
  if (!e.ctrlKey) {
    pushCtrl = false;
  }
  console.log(pushCtrl);
});

/**
 * Слушатель события "mousedown"
 */
cnv.addEventListener('mousedown', (e) => {
  let clickIndex = new GetIndex(rect, curves, e);
  clickFigureIndex = clickIndex.figureIndex;
  clickCurveIndex  = clickIndex.curveIndex;
  clickPointIndex  = clickIndex.pointIndex;

  /**
   * Слушатель события "mousemove"
   */
  cnv.addEventListener('mousemove', drag);

});
// ------------------------
/**
 * При нажатой клавише контрол включаем переменую "activeControlPoint" что позваляет 
 * передвигать обычные и контрольные точки без нажатой клавиши контрол
 * Для контрольных точек которые ещё не разделены с обычными должна срабатывать
 * функция "dragAllPoint"
 * Для уже разделёных обычные точки управляются функцией "dragPoint"
 * Для уже разделёных контрольные точки управляются функцией "dragControlPoint"
 */
// --------------------------
/**
 * Функция колбэк Слушателя события "mousemove"
 * 
 * @param {object} e Объкт события мыши
 */
function drag(e) {
  //
}

function dragAllPoint() {
  //
}

function dragControlPoint() {
  //
}

function dragPoint() {
  //
}

/**
 * Слушатель события "mouseup"
 */
cnv.addEventListener('mouseup', (e) => {
  cnv.removeEventListener('mousemove', drag);
  getCursorPosition(e);

  if (clickCounter > 0 && clickPointIndex != null) {
    сomparisonСoordinates(cursor, curves[clickFigureIndex][clickCurveIndex][clickPointIndex]);
  }

  newFigure ? addFigure() : false;

  clickCounter == 0 && clickPointIndex == null && create == true ? addCurve(false) : false;
  clickCounter > 1 && clickPointIndex == null && create == true ? addCurve(true) : false;
  
  clickCounter < 2 && clickPointIndex == null && create == true ? addPoint(cursor, [0, 1]) : false;
  clickCounter > 1 && clickPointIndex == null && create == true ? addPoint(cursor, [0, 1, 2, 3]) : false;

  clickPointIndex != null && create == true ? compoundPoint([1, 2, 3, 4]) : false;

  // console.log('figure ', currentFigureIndex, 'Curve ', currentCurveIndex)
  console.log(curves)

  // console.log(create)

  clickCounter++;
});

/**
 * Добваляет в массив "curves" новый массив "figure"
 */
function addFigure() {
  curves.push(figure = []);
  newFigure = false;
  currentFigureIndex = curves.length - 1;
}

/**
 * Добавляет новый массив "curve" в массив "figure"
 * 
 * @param {boolean} hasCurve Если в значение "true" то переменая "newCurve" меняем на "true" и содаём в массиме "figure" новый массив "curve" 
 */

function addCurve(hasCurve) {
  let figureIndex = currentFigureIndex;
  curves[figureIndex].push(curve = []);
  hasCurve ? newCurve = true : newCurve = false;
  currentCurveIndex = curves[figureIndex].length - 1;
}

/**
 * Добавляет точки в массив "curve" 
 * 
 * @param {object} cursor Объкт хранящий координаты курсора 
 * @param {object} pointNumber  Массив для определения количества создаваемых точек
 */

function addPoint(cursor, pointNumber) {
  let figureIndex = currentFigureIndex;
  let curveIndex  = currentCurveIndex;
  console.log(curves[figureIndex][curveIndex])
  
  let prevCurveLastPoint = null;
  pointNumber.length > 2 ? prevCurveLastPoint = curves[figureIndex][curveIndex - 1][3] : false ;

  for (let i = 0; i < pointNumber.length; i++) {

    if (prevCurveLastPoint == null) {
      curves[figureIndex][curveIndex].push({
        x : cursor.x,
        y : cursor.y
      })
    } else {
      if (i < 2) {
        curves[figureIndex][curveIndex].push({
          x : prevCurveLastPoint.x,
          y : prevCurveLastPoint.y
        })
      } else {
        curves[figureIndex][curveIndex].push({
          x : cursor.x,
          y : cursor.y
        })
      }
    }
  }
}

/**
 * Соеденяет конечную точку с той по которой произошёл клик
 * 
 * @param {object} pointNumber  Массив для определения количества создаваемых точек
 */

function compoundPoint(pointNumber) {
  addCurve(true);

  let figureIndex = clickFigureIndex;
  let curveIndex  = currentCurveIndex;
  let pointIndex  = clickPointIndex;

  console.log(clickCurveIndex, pointIndex)



  let prevCurveLastPoint = curves[figureIndex][curveIndex - 1][3]

  for (let i = 0; i < pointNumber.length; i++) {
    if (i < 2) {
      curves[figureIndex][curveIndex].push({
        x : prevCurveLastPoint.x,
        y : prevCurveLastPoint.y
      })
    } else {
      curves[figureIndex][curveIndex].push({
        x : curves[figureIndex][clickCurveIndex][pointIndex].x,
        y : curves[figureIndex][clickCurveIndex][pointIndex].y
      })
    }
  }

  if (clickCurveIndex == 0 && (pointIndex == 0 || pointIndex == 1)) {
    newFigure = true;
    clickCounter = -1;
  }

}

/**
 * 
 * @param {object} cursor 
 * @param {object} point 
 */
function сomparisonСoordinates(cursor, point) {

  if (
    cursor.x > point.x - 15 &&
    cursor.x < point.x + 15 &&
    cursor.y > point.y - 15 &&
    cursor.y < point.y + 15 
  ) {
    create = true;
  } else {
    create = false;
  }

}

/**
 * Получает координаты курсора
 * 
 * @param {object} e Объкт события мыши 
 * @returns {object} Возвращает координаты курсора
 */

function getCursorPosition(e) {
  cursorX  = e.clientX - rect.left;
  cursorY  = e.clientY - rect.top;
  cursor.x = cursorX;
  cursor.y = cursorY;
  return { x : cursorX, y : cursorY };
}