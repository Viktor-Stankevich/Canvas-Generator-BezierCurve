class Canvas {
  /**
   * Создаёт экземпляр класса Canvas
   * @this {Canvas}
   * @constructor
   */
  constructor() {
    this.cnv = document.createElement('canvas');
    this.ctx = this.cnv.getContext('2d');
    this.size = { w: 0, h: 0 };

    let container = document.querySelector('#wrapper');
    container.appendChild(this.cnv);

    this.setCanvasSize();
    window.onresize = () => {
      this.setCanvasSize();
    };
  }

  /**
   * Задаёт размеры для canvas
   */
  setCanvasSize() {
    this.cnv.width = document.body.offsetWidth;
    this.cnv.height = document.body.offsetHeight;
    this.size.w = this.cnv.width;
    this.size.h = this.cnv.height;
  }
}

const canvas = new Canvas();

export default canvas;
