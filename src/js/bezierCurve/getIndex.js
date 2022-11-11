class GetIndex {
  /**
   * Создаёт экземпляр класса GetIndex
   * 
   * @constructor
   * @this {GetIndex}
   * @param {object} rect   Объект предоставляющий информацию о размере элемента и его положении относительно окна просмотра
   * @param {object} curves Массив с координатами кривых
   * @param {object} e      Объект события мыши
   */
  constructor(rect, curves, e) {
    this.e      = e;
    this.rect   = rect;
    this.curves = curves;

    this.cursor = { x: 0, y : 0 };

    this.figureIndex = null;
    this.curveIndex  = null;
    this.pointIndex  = null;

    this.init();

  }

  /**
   * Стартовый метод
   * 
   * @this {GetIndex}
   */
  init() {
    this.getCursorPosition();
    this.cycle();
  }

  /**
   * Метод переберающий массив Curves
   * 
   * @this {GetIndex}
   */
  cycle() {
    for (let i = 0; i < this.curves.length; i++) {
      for (let j = 0; j < this.curves[i].length; j++) {
        for (let k = 0; k < this.curves[i][j].length; k++) {
          if (this.сomparison(this.cursor, curves[i][j][k])) {
            this.figureIndex = i;
            this.curveIndex  = j;
            this.pointIndex  = k
          }
        }
      }
    }
  }

  /**
   * Метод cравнивающий координаты курсора с координатами точек массива Curves
   * 
   * @this {GetIndex}
   * @param {object} cursor Объект хранящий координаты курсора в момент клика
   * @param {object} point  Объект хранящий координаты каждой точки
   * @return {boolean}
   */
  сomparison(cursor, point) {
    if (
      cursor.x > point.x - 15 &&
      cursor.x < point.x + 15 &&
      cursor.y > point.y - 15 &&
      cursor.y < point.y + 15 
    ) {
      return true;
    }
  }

  /**
   * Метод записывающий координаты курсора
   */
  getCursorPosition() {
    this.cursor.x = this.e.clientX - this.rect.left;
    this.cursor.y = this.e.clientY - this.rect.top;
  }

}