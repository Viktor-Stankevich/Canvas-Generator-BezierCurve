const canvasCurve = new CreateCanvas();

const cnv  = canvasCurve.cnv;
const ctx  = canvasCurve.ctx;
const size = canvasCurve.size;
const rect = cnv.getBoundingClientRect();

/**
 * --------------------------------------------------------------
 * Глобальные переменые
 */

// Координаты мыши
var cursor;

// Курсор над точкой или нет
var over;

// Координаты начальных и конечных точек
var points      = [];

// Координаты контрольных точек
var checkpoints = [];

// Индекс точки по которой кликнули
var pointIndex;
var checkPointIndex;

/**
 * --------------------------------------------------------------
 * Добовления событий
 */

// Событие получения Координаты мыши
cnv.addEventListener('mousedown', cursorPosition);

// Событие проверки находится ли курсор над точкой
cnv.addEventListener('mousedown', overPoint);

// Событие Создания точек
cnv.addEventListener('mousedown', createPoints);

// Событие Рисования Кривой
// cnv.addEventListener('mousedown', drawCurve);

// Событие отпускание кнопки мыши
cnv.addEventListener('mouseup', mouseUpHandler);


// Событе нажатия клавиш на клавиатуре
document.addEventListener('keydown', keyDownHandler);
// document.addEventListener('keyup', keyUpHandler);

cnv.addEventListener('mousemove', () => {
  drawCurve();
})

/**
 * --------------------------------------------------------------
 * Удаление событий
 */

  function mouseUpHandler(e) {
    cnv.removeEventListener('mousemove', dragPoints);
    cnv.removeEventListener('mousemove', dragCheckPoints);

  }
  
  function keyDownHandler(e) {
    if (e.ctrlKey) {
      cnv.removeEventListener('mousemove', dragPoints);
    }
  }



/**
 * --------------------------------------------------------------
 * Создание точек
 */

function createPoints(e) {
  points.push({ x : cursor.x, y : cursor.y, r : 5 });
  checkpoints.push({ x : cursor.x, y : cursor.y, r : 5 });



  console.log(checkpoints)
  drawCurve();
}


/**
 * --------------------------------------------------------------
 * Проверка находиться ли курсор над точкой
 */

function overPoint() {

  // Перебераем масивв точек циклом
  for (let i = 0; i < points.length; i++) {

    // if ( i > 0 && i < points.length ) {
    //   checkpoints.splice(i, 0, {x : cursor.x, y : cursor.y, r : 5});
    // }


    if (cursor.x > points[i].x - points[i].r - 15 && cursor.x < points[i].x + points[i].r + 15 && cursor.y > points[i].y - points[i].r - 15 && cursor.y < points[i].y + points[i].r + 15) {
      // Удалаем событе создание точек
      cnv.removeEventListener('mousedown', createPoints);
      cnv.removeEventListener('mousedown', drawCurve);

      // Добаляем событе создание точек
      cnv.addEventListener('mousedown', createPoints);
      cnv.addEventListener('mousedown', drawCurve);

      // Получение индекса текущей точки
      pointIndex = i;

      // console.log('Points: ', points[i], 'Checkpoints: ', checkpoints[i])

      // Событие перетаскивания точек
      cnv.addEventListener('mousemove', dragPoints);


      
    } else {
      // Добаляем событе создание точек
      cnv.addEventListener('mousedown', createPoints);
    }

    if (cursor.x > checkpoints[i].x - checkpoints[i].r - 15 && cursor.x < checkpoints[i].x + checkpoints[i].r + 15 && cursor.y > checkpoints[i].y - checkpoints[i].r - 15 && cursor.y < checkpoints[i].y + checkpoints[i].r + 15) {
      // Удалаем событе создание точек
      cnv.removeEventListener('mousedown', createPoints);
      cnv.removeEventListener('mousedown', drawCurve);

      // Добаляем событе создание точек
      cnv.addEventListener('mousedown', createPoints);
      cnv.addEventListener('mousedown', drawCurve);
      
      checkPointIndex = i;


      // console.log('Points: ', points[i], 'Checkpoints: ', checkpoints[i])


      cnv.addEventListener('mousemove', dragCheckPoints);
    }  else {
      // Добаляем событе создание точек
      cnv.addEventListener('mousedown', createPoints);
    }

  } 

}

/**
 * --------------------------------------------------------------
 * Перетаскивание точек
 */

 function dragPoints(e) {
    
    let x = e.clientX - rect.left
    let y = e.clientY - rect.top

    points[pointIndex].x = x;
    points[pointIndex].y = y;
}

/**
 * --------------------------------------------------------------
 * Перетаскивание контрольных точек
 */

 function dragCheckPoints(e) {
    
    let x = e.clientX - rect.left
    let y = e.clientY - rect.top


    checkpoints[checkPointIndex].x = x;
    checkpoints[checkPointIndex].y = y;
}


/**
 * --------------------------------------------------------------
 * Рисование кривой
 */

 function drawCurve() {
  ctx.clearRect(0, 0, size.w, size.h);

  for (let i = 0; i < points.length; i++) {
    if ( i > 0 ) {
      ctx.beginPath();
      ctx.moveTo(points[i - 1].x, points[i - 1].y);
      ctx.bezierCurveTo(checkpoints[i - 1].x, checkpoints[i - 1].y, checkpoints[i].x, checkpoints[i].y, points[i].x, points[i].y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, points[i].r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(checkpoints[i].x, checkpoints[i].y, checkpoints[i].r, 0, Math.PI * 2);
    ctx.moveTo(points[i].x, points[i].y);
    ctx.lineTo(checkpoints[i].x,  checkpoints[i].y)
    ctx.stroke();
  }

}



/**
 * --------------------------------------------------------------
 * Получение координат мыши
 */

function cursorPosition(e) {
  let x      = e.clientX - rect.left;
  let y      = e.clientY - rect.top;

  cursor = { x: x, y: y };
}