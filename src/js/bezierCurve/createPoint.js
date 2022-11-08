class CreatePoint {
  /**
   * Создаёт экземпляр класса CreatePoint.
   * 
   * @constructor
   * @param {object} params параметры canvas (cnv - Canvas, ctx - Context, size - Размеры)
   */
  constructor(params) {
    this.cnv  = params.cnv;
    this.ctx  = params.ctx;
    this.size = params.size;

    this.curves   = [];
    this.curveIndex    = null;
    this.cursor   = { x: 0, y: 0 };
    this.newCurve = true;
    this.clickCounter = 0;


    this.init()
  }

  init() {
    this.cnv.addEventListener('mousedown', (e) => {
      this.getCursorPosition(e)
      this.createNewCurve();

      let over = new OverPoint(this.cursor, this.curves).init();

     if (over != undefined && over == 0) {
        let lastCurveEndPoint = this.curves[this.curves.length - 1][3][this.curves[this.curves.length - 1][3].length - 1];
        let lastCurveStartPoint = this.curves[this.curves.length - 1][0][0];
        this.createCurveParams(lastCurveEndPoint.x, lastCurveEndPoint.y, 1);
        this.createCurveParams(lastCurveEndPoint.x, lastCurveEndPoint.y, 0);
        this.createCurveParams(lastCurveStartPoint.x, lastCurveStartPoint.y, 2);
        this.createCurveParams(lastCurveStartPoint.x, lastCurveStartPoint.y, 3);

        this.curves[this.curves.length - 1][0].pop();
        this.curves[this.curves.length - 1][1].pop();
        this.curves[this.curves.length - 1][2].pop();
        this.curves[this.curves.length - 1][3].pop();

        this.newCurve     = true;
        this.clickCounter = -1;
      }

      if (over != undefined) {
        let lastCurveEndPoint = this.curves[this.curves.length - 1][3][this.curves[this.curves.length - 1][3].length - 1];
        let lastCurveStartPoint = this.curves[this.curves.length - 1][0][over];
        this.createCurveParams(lastCurveEndPoint.x, lastCurveEndPoint.y, 0);
        this.createCurveParams(lastCurveEndPoint.x, lastCurveEndPoint.y, 1);
        this.createCurveParams(lastCurveStartPoint.x, lastCurveStartPoint.y, 2)
        this.createCurveParams(lastCurveStartPoint.x, lastCurveStartPoint.y, 3)
      }

      this.clickCounter == 0 && over == undefined  ? this.createCurveParams(this.cursor.x, this.cursor.y, 0) + this.createCurveParams(this.cursor.x, this.cursor.y, 1) : false;
      this.clickCounter == 1 && over == undefined  ? this.createCurveParams(this.cursor.x, this.cursor.y, 2) + this.createCurveParams(this.cursor.x, this.cursor.y, 3) : false;

      let lastCurveEndPoint = this.curves[this.curves.length - 1][3][this.curves[this.curves.length - 1][3].length - 1];
      this.clickCounter > 1 && over == undefined  ? this.createCurveParams(lastCurveEndPoint.x, lastCurveEndPoint.y, 0) + this.createCurveParams(lastCurveEndPoint.x, lastCurveEndPoint.y, 1) + this.createCurveParams(this.cursor.x, this.cursor.y, 2) + this.createCurveParams(this.cursor.x, this.cursor.y, 3) : false;


      this.clickCounter++;
    })
  }

  /**
   *  Создание новой фигуры
   */
  createNewCurve() {
    if ( this.newCurve == true ) {
      this.curves.push([ [], [], [], [] ]);
      this.newCurve = false;
    }
  }

  /**
   * Создание точек
   * 
   * @param {number} index индекс точек (0 - начальные, 1 - первые контрольные точки, 2 - вторые контрольные точки, 3 - конечные точки)
   * @param {number} x координаты курсора по оси X
   * @param {number} y координаты курсора по оси Y
   */

  createCurveParams(x, y, index) {
    this.curveIndex = this.curves.length - 1;
    this.curves[this.curveIndex][index].push({
      x : x,
      y : y
    })


  }

  /**
   * Получает координаты мыши.
   * 
   * @param {object} e объект события мыши
   */
  getCursorPosition(e) {
    const rect = this.cnv.getBoundingClientRect();
    this.cursor.x = e.clientX - rect.left;
    this.cursor.y = e.clientY - rect.top;
  }

}

