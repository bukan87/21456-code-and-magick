'use strict';

(function () {
  /**
   * Изменение цвета у элемента на случайны из массива
   * @param {Element} element элемент, у которого нужно изменить цвет
   * @param {Array} colors возможные цвета
   * @param {Function} callback функция, в которой будет выполняться закрашивание
   */
  window.colorizeElement = function (element, colors, callback) {
    if (!element || !colors || !callback) {
      throw new Error('Не все параметры заданы');
    }
    element.addEventListener('click', function () {
      var color = window.util.getRandomItem(colors);
      callback(element, color);
    });
  };
}());
