class OverPoint {
  /**
   * Создаёт экземпляр класса OverPoint
   * 
   * @constructor
   * @param {object} cursor координаты мыши
   * @param {object} curves параметры кривых
   */
  constructor(cursor, curves) {
    this.cursor = cursor;
    this.curves = curves;

    this.curveIndex    = null;

    this.init();
  }

  /**
   * Проверяет произошел ли клик над точкой
   * 
   * @return {number} если клик произошёл над начальной точкой возвращает true
   * @return {number} если клик произошёл над первой контрольной точкой возвращает true
   * @return {number} если клик произошёл над второй контрольной точкой возвращает true
   * @return {number} если клик произошёл над конечной точкой возвращает true
   */

  init() {


    if (this.overStartPoint()) {
      return this.overStartPoint();
    } else if (this.overEndPoint()) {
      return this.overEndPoint();
    } else if (this.overControlPoint1Point) {
      return this.overControlPoint1Point();
    } else if (this.overControlPoint2Point) {
      return this.overControlPoint2Point();
    }


  }

  /**
   * Проверка произошёл ли клик над стартовой точкой
   * 
   * @return {number}
   */
  overStartPoint() {
    this.curveIndex = this.curves.length - 1;

    for (let i = 0; i < this.curves[this.curveIndex][0].length; i++) {
      if (this.condition(this.curves[this.curveIndex][0][i])) {
        return i;
      }
    }

  }

  /**
   * Проверка произошёл ли клик над первой контрольной точкой
   * 
   * @return {number}
   */
  overControlPoint1Point() {
    this.curveIndex = this.curves.length - 1;

    for (let i = 0; i < this.curves[this.curveIndex][1].length; i++) {
      if (this.condition(this.curves[this.curveIndex][1][i])) {
        return i;
      }
    }

  }

  /**
   * Проверка произошёл ли клик над второй контрольной точкой
   * 
   * @return {number}
   */
   overControlPoint2Point() {
    this.curveIndex = this.curves.length - 1;

    for (let i = 0; i < this.curves[this.curveIndex][2].length; i++) {
      if (this.condition(this.curves[this.curveIndex][2][i])) {
        return i;
      }
    }

  }

  /**
   * Проверка произошёл ли клик над конечными точкой
   * 
   * @return {number}
   */
  overEndPoint() {
    this.curveIndex = this.curves.length - 1;

    for (let i = 0; i < this.curves[this.curveIndex][3].length; i++) {
      if (this.condition(this.curves[this.curveIndex][3][i])) {
        return i;
      }
    }

  }

  /**
   * Условие для проверки клика по точки
   * 
   * @param {object} point набор координат (x, y) точки 
   * @return {boolean}
   */

  condition(point) {
    if (
      this.cursor.x > point.x - 15 &&
      this.cursor.x < point.x + 15 &&
      this.cursor.y > point.y - 15 &&
      this.cursor.y < point.y + 15
    ) {
      return true;
    }
  }



}