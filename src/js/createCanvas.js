class CreateCanvas {
  constructor() {
    this.cnv  = document.createElement('canvas');
    this.ctx  = this.cnv.getContext('2d');
    this.size = { w: 0, h: 0 };

    let container = document.querySelector('#wrapper');
    
    container.appendChild(this.cnv);

    this.setCanvasSize();
    window.onresize = () => {
      this.setCanvasSize();
    }
  }

  setCanvasSize() {
    this.size.w = this.cnv.width  = document.body.offsetWidth;
    this.size.h = this.cnv.height = document.body.offsetHeight;
  }
}