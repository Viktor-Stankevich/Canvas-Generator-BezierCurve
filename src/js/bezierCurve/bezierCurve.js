const canvasCurve = new CreateCanvas();

const params = {
  cnv  : canvasCurve.cnv,
  ctx  : canvasCurve.ctx,
  size : canvasCurve.size
}

let point = new CreatePoint(params);

params.cnv.onmousedown = () => {
  let curve = point;
  drawCurve(params.ctx, curve.curveIndex, curve.curves);
}

// СДЕЛАТЬ ПЕРЕТАСКИВАНИЯ ТОЧЕК !!!!!!!!!!!!!!!!!!!!!!!

/**
 * Функция отрисовки кривых
 * 
 * @param {object} ctx контекст
 * @param {object} curve параметры кривых
 */
function drawCurve(ctx, index, curve) {
  ctx.clearRect(0, 0, params.size.w, params.size.h);
  for (let i = 0; i < curve[index][3].length; i++) {
    ctx.beginPath();
    ctx.moveTo(curve[index][0][i].x, curve[index][0][i].y);
    ctx.bezierCurveTo(curve[index][1][i].x, curve[index][1][i].y, curve[index][2][i].x, curve[index][2][i].y, curve[index][3][i].x, curve[index][3][i].y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(curve[index][3][i].x, curve[index][3][i].y, 5, 0, Math.PI * 2);
    ctx.stroke();

  }

  for (let i = 0; i < curve[index][0].length; i++) {
    if (i < 1) {
      ctx.beginPath();
      ctx.arc(curve[index][0][i].x, curve[index][0][i].y, 5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

}