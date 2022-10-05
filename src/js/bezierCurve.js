const canvasCurve = new CreateCanvas();

const cnvCurve  = canvasCurve.cnv;
const ctxCurve  = canvasCurve.ctx;
const sizeCurve = canvasCurve.size;
const rect      = cnvCurve.getBoundingClientRect();
var index;

var cp = [
  {
    px: 10,
    py: 50,
    r:  5
  },
  {
    px: 40,
    py: 40,
    r:  5
  },
  {
    px: 70,
    py: 60,
    r:  5
  },
  {
    px: 90,
    py: 50,
    r:  5
  }
];

drawCP();

cnvCurve.addEventListener('mousedown', mouseDownHandler);
cnvCurve.addEventListener('mouseup', mouseUpHandler);

function mouseDownHandler(e) {
  let mx = e.clientX - rect.left;
  let my = e.clientY - rect.top;
  for (let i = 0; i < cp.length; i++) {
    // console.log(cp[i].px)
    let px =  percentageConversion(sizeCurve.w, cp[i].px);
    let py =  percentageConversion(sizeCurve.h, cp[i].py);
    let r  = cp[i].r;

    let ifx = mx > px - r - 10 && mx < px + r + 10;
    let ify = my > py - r - 10 && my < py + r + 10;
    
    if (ifx && ify) {
      index = [i]
      cnvCurve.addEventListener('mousemove', mouseMoveHandler);
    }

  }

}

function mouseMoveHandler(e) {
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  cp[index].px = (x / sizeCurve.w) * 100;
  cp[index].py = (y / sizeCurve.h) * 100;
}

cnvCurve.addEventListener('mousemove', () => {
  drawCP();
})

function mouseUpHandler() {
  cnvCurve.removeEventListener('mousemove', mouseMoveHandler);
}


function drawCP() {
  ctxCurve.clearRect(0, 0, sizeCurve.w, sizeCurve.h);
  for (let i = 0; i < cp.length; i++) {
    let px = percentageConversion(sizeCurve.w, cp[i].px);
    let py = percentageConversion(sizeCurve.h, cp[i].py);

    ctxCurve.beginPath();
    ctxCurve.arc(px, py, cp[i].r, 0, Math.PI * 2);
    ctxCurve.fillStyle = '#7D83FF'
    ctxCurve.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctxCurve.shadowBlur = '10'
    ctxCurve.fill();
    ctxCurve.closePath();
  }

  drawBezierCurve();
}
drawBezierCurve();

function drawBezierCurve() {
  for (let i = 0; i < cp.length; i++) {
    let pxStart = percentageConversion(sizeCurve.w, cp[0].px);
    let pyStart = percentageConversion(sizeCurve.h, cp[0].py);
    let px1     = percentageConversion(sizeCurve.w, cp[1].px);
    let py1     = percentageConversion(sizeCurve.h, cp[1].py);
    let px2     = percentageConversion(sizeCurve.w, cp[2].px);
    let py2     = percentageConversion(sizeCurve.h, cp[2].py);
    let pxEnd   = percentageConversion(sizeCurve.w, cp[3].px);
    let pyEnd   = percentageConversion(sizeCurve.h, cp[3].py);
    
    ctxCurve.beginPath();
    ctxCurve.moveTo(pxStart, pyStart);
    ctxCurve.bezierCurveTo(px1, py1, px2, py2, pxEnd, pyEnd);
    ctxCurve.lineWidth  = 0.2;
    ctxCurve.shadowBlur = 0
    ctxCurve.strokeStyle  = '#7D83FF';
    ctxCurve.stroke();
    ctxCurve.closePath();
    
    
  }

}



function percentageConversion(size, val) {

  let res = size * (val / 100);

  return res;

}