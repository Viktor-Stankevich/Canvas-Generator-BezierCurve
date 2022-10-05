const canvas = new CreateCanvas();

const cnvGrid  = canvas.cnv;
const ctxGrid  = canvas.ctx;
const sizeGrid = canvas.size;

let breakpoints = {lg : mediaQueris(sizeGrid).lg, md : mediaQueris(sizeGrid).md, sm : mediaQueris(sizeGrid).sm};
let gridStep = { X : step().gridStepX, Y : step().gridStepY };

ctxGrid.fillStyle  = 'rgba(212, 220, 255, 0.4)';
ctxGrid.shadowColor = 'rgba(138, 162, 158, 0.5)';
ctxGrid.shadowBlur = 10;
for (let i = gridStep.X; i < sizeGrid.w; i += gridStep.X) {
  for (let j = gridStep.Y; j < sizeGrid.h; j += gridStep.Y) {
    ctxGrid.beginPath();
    ctxGrid.arc([i], [j], 5, 0, Math.PI * 2)
    ctxGrid.fill();
  }
}

function step() {
  let numberDotsX;
  let numberDotsY;
  (breakpoints.lg) ? numberDotsX = 20 :
  (breakpoints.md) ? numberDotsX = 10 :
  (breakpoints.sm) ? numberDotsX = 5  : numberDotsX = 25;

  (sizeGrid.h < 700) ? numberDotsY = 5 : numberDotsY = 9;
  
  return { gridStepX : Math.round(sizeGrid.w / numberDotsX), gridStepY : Math.round(sizeGrid.h / numberDotsY)};
}

function mediaQueris(sizeGrid) {

  let breakpoints = { lg : false, md : false, sm : false};

  (sizeGrid.w > 992) ? breakpoints.lg = true :
  (sizeGrid.w < 992 && sizeGrid.w > 576) ? breakpoints.md = true :
  (sizeGrid.w < 576) ? breakpoints.sm = true : false ;

  return breakpoints;
}