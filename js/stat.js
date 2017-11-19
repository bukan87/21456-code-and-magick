'use strict';

/**
 * Выдача позиции максимального значения в массиве
 * @param {number[]}arr массив чисел
 * @return {number} позиция максимального числа
 * */
var getPositionOfMaxValue = function (arr) {
  var maxVal = -1;
  var position;
  for (var i = 0; i < arr.length; i++) {
    if (maxVal < arr[i]) {
      maxVal = arr[i];
      position = i;
    }
  }
  return position;
};

/**
 * Генерация случайного числа в диапозоне
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @return {number} случайное значение
 */
var getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
};

/**
 * Отрисовка таблицы результатов
 * @param {object}   ctx   объект canvas
 * @param {string[]} names массив имён игроков
 * @param {number[]} times массив времени игры
 * */
window.renderStatistics = function (ctx, names, times) {
  var baseX = 100;
  var baseY = 10;
  var width = 420;
  var height = 270;
  var margin = 34;
  var fontSize = 16;
  // Тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(baseX + 10, baseY + 10, width, height);
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.fillRect(baseX, baseY, width, height);
  ctx.font = fontSize + 'px PT Mono';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', baseX + margin, baseY + margin);
  ctx.fillText('Список результатов:', baseX + margin, baseY + margin + fontSize);
  // Гистограмма
  var chartHeight = 150;
  var chartStartY = baseY + margin + fontSize * 2;
  var columnWidth = 40;
  var betweenColumnSpace = 50;
  var highestTime = Math.round(times[getPositionOfMaxValue(times)]);
  var textMargin = 3;
  for (var i = 0; i < times.length; i++) {
    // Определим высоту столбца
    var columnHeight = chartHeight * times[i] / highestTime;
    // Определим начальные позиции столбцов
    var columnStartY = chartStartY + chartHeight - columnHeight;
    var columnStartX = baseX + margin + (columnWidth * i) + (betweenColumnSpace * i);
    if (names[i].toString() === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandom(0.1, 1) + ')';
    }
    // Столбцы
    ctx.fillRect(columnStartX, columnStartY + textMargin, columnWidth, columnHeight);
    ctx.fillStyle = 'black';
    // Надписи над столбцами с результатами
    ctx.fillText(Math.round(times[i]).toString(), columnStartX, columnStartY);
    // Подписи под столбцами с именами игроков
    ctx.fillText(names[i].toString(), columnStartX, chartStartY + chartHeight + fontSize + textMargin);
  }
};
