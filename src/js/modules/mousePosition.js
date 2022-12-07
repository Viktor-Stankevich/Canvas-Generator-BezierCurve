import canvas from '../classes/canvas.js';

/**
 * Получает координаты курсора
 * @param {object} e Объкт события мыши
 * @returns {object} Возвращает координаты курсора
 */
export default function mousePosition(e) {
  let cursorX = e.clientX - canvas.cnv.getBoundingClientRect().left;
  let cursorY = e.clientY - canvas.cnv.getBoundingClientRect().top;
  return { x: cursorX, y: cursorY };
}
