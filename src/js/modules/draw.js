import canvas from '../classes/canvas.js';
import * as arrStore from './arrayStorage.js';

/**
 * Очистка канваса
 */
export const clear = (() => {
  canvas.ctx.clearRect(0, 0, canvas.size.w, canvas.size.h);
});

export const drawCurve = (() => {
  for (let i = 0; i < arrStore.point.length; i += 1) {
    for (let j = 0; j < arrStore.point[i].length; j += 1) {
      // canvas.ctx.strokeStyle = '#f2efe9';
      // canvas.ctx.fillStyle = '#f2efe9';
      // canvas.ctx.shadowColor = '#f2efe9';
      canvas.ctx.lineWidth = 0.5;
      canvas.ctx.shadowBlur = 0;
      canvas.ctx.shadowOffsetX = 0;
      canvas.ctx.shadowOffsetY = 0;
      if (arrStore.point[i][j].length > 2) {
        canvas.ctx.beginPath();
        canvas.ctx.moveTo(
          arrStore.point[i][j][0].x,
          arrStore.point[i][j][0].y
        );
        canvas.ctx.bezierCurveTo(
          arrStore.point[i][j][1].x,
          arrStore.point[i][j][1].y,
          arrStore.point[i][j][3].x,
          arrStore.point[i][j][3].y,
          arrStore.point[i][j][2].x,
          arrStore.point[i][j][2].y
        );
        canvas.ctx.stroke();
        canvas.ctx.closePath();

        canvas.ctx.beginPath();
        canvas.ctx.moveTo(
          arrStore.point[i][j][0].x,
          arrStore.point[i][j][0].y
        );
        canvas.ctx.lineTo(
          arrStore.point[i][j][1].x,
          arrStore.point[i][j][1].y
        );
        canvas.ctx.stroke();

        canvas.ctx.beginPath();
        canvas.ctx.moveTo(
          arrStore.point[i][j][2].x,
          arrStore.point[i][j][2].y
        );
        canvas.ctx.lineTo(
          arrStore.point[i][j][3].x,
          arrStore.point[i][j][3].y
        );
        canvas.ctx.stroke();

        canvas.ctx.shadowBlur = 2;
        canvas.ctx.shadowOffsetX = 0;
        canvas.ctx.shadowOffsetY = 0;
        canvas.ctx.beginPath();
        canvas.ctx.arc(
          arrStore.point[i][j][2].x,
          arrStore.point[i][j][2].y,
          2,
          0,
          Math.PI * 2
        );
        canvas.ctx.fill();
        canvas.ctx.closePath();

        canvas.ctx.beginPath();
        canvas.ctx.arc(
          arrStore.point[i][j][3].x,
          arrStore.point[i][j][3].y,
          2,
          0,
          Math.PI * 2
        );
        canvas.ctx.stroke();
        canvas.ctx.closePath();
      }
      canvas.ctx.shadowBlur = 2;
      canvas.ctx.shadowOffsetX = 0;
      canvas.ctx.shadowOffsetY = 0;
      canvas.ctx.beginPath();
      canvas.ctx.arc(
        arrStore.point[i][j][0].x,
        arrStore.point[i][j][0].y,
        2,
        0,
        Math.PI * 2
      );
      canvas.ctx.fill();
      canvas.ctx.closePath();
      canvas.ctx.beginPath();
      canvas.ctx.arc(
        arrStore.point[i][j][1].x,
        arrStore.point[i][j][1].y,
        2,
        0,
        Math.PI * 2
      );
      canvas.ctx.stroke();
      canvas.ctx.closePath();
    }
  }
});
