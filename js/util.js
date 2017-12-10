'use strict';

(function () {
  window.util = {
    /**
     * Генерация случайного числа в диапозоне
     * @param {number} min минимальное значение
     * @param {number} max максимальное значение
     * @return {number} случайное значение
     */
    getRandom: function (min, max) {
      return Math.random() * (max - min) + min;
    },
    /**
     * Выборка случайного элемента массива
     * @param {object} arr массив, из которого нужно выбрать случайный элемент
     * @return {*} случайный элемент
     */
    getRandomItem: function (arr) {
      return arr[Math.floor(window.util.getRandom(0, arr.length - 1))];
    },
    /**
     * Выдача позиции максимального значения в массиве
     * @param {number[]}arr массив чисел
     * @return {number} позиция максимального числа
     * */
    getPositionOfMaxValue: function (arr) {
      var maxVal = -1;
      var position;
      for (var i = 0; i < arr.length; i++) {
        if (maxVal < arr[i]) {
          maxVal = arr[i];
          position = i;
        }
      }
      return position;
    }
  };
}());
