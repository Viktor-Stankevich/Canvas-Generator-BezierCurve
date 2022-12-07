/**
 * Сравнивает координаты курсора в момент нажатия с координатами в момент отпускания кнопки мыши
 * Погрешность отклонения +/- 5 пикселеё
 * @param {object} down Координаты курсора в момент нажатия кнопки мыши
 * @param {object} up Координаты курсора в момент отпускания кнопки мыши
 * @return {boolean} Если возвращает "true" то кнопка отпущена там же где и нажата
 */

export const comparisobDownAndUp = ((down, up) => down.x > up.x - 5
                                                  && down.x < up.x + 5
                                                  && down.y > up.y - 5
                                                  && down.y < up.y + 5);

/**
 * Сравнивает координаты курсора и точки
 * Погрешность +/- 15 пикселей
 * @param {object} mouse Координаты курсора
 * @param {object} point Координаты точик
 * @return {boolean} Если координаты курсора совпдают с координатами точки то возвращает
 *                   "true" иначе "false"
 */
export const comparisonMouseAndPoint = ((mouse, point) => mouse.x > point.x - 15
                                                          && mouse.x < point.x + 15
                                                          && mouse.y > point.y - 15
                                                          && mouse.y < point.y + 15);
