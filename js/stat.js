'use strict';

(function () {
  /**
   * Отрисовка прямоугольника в указанном объекте canvas по указанным координатам
   * @param {object} ctx    объект canvas
   * @param {number} x      координата по оси X
   * @param {number} y      координата по оси Y
   * @param {number} width  ширина прямоугольника
   * @param {number} height высота прямоугольника
   * @param {string} color  цвет заливки прямоугольника (по умолчанию белый)
   */
  var printRectangle = function (ctx, x, y, width, height, color) {
    ctx.fillStyle = color || 'white';
    ctx.fillRect(x, y, width, height);
  };

  /**
   * Печать текста в указанном объекте
   * @param {object} ctx      объект canvas
   * @param {string} text     печатемый текст
   * @param {number} x        координата печати по оси X
   * @param {number} y        координата печати по оси Y
   * @param {number} fontSize размер шрифта
   * @param {string} color    цвет шрифта
   */
  var printText = function (ctx, text, x, y, fontSize, color) {
    ctx.fillStyle = color || 'black';
    ctx.font = fontSize + 'px PT Mono';
    ctx.fillText(text, x, y);
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
    printRectangle(ctx, baseX + 10, baseY + 10, width, height, 'rgba(0, 0, 0, 0.7)');
    printRectangle(ctx, baseX, baseY, width, height);
    printText(ctx, 'Ура вы победили!', baseX + margin, baseY + margin, fontSize);
    printText(ctx, 'Список результатов:', baseX + margin, baseY + margin + fontSize, fontSize);
    // Гистограмма
    var chartHeight = 150;
    var chartStartY = baseY + margin + fontSize * 2;
    var columnWidth = 40;
    var betweenColumnSpace = 50;
    var highestTime = Math.round(times[window.util.getPositionOfMaxValue(times)]);
    var textMargin = 3;
    for (var i = 0; i < times.length; i++) {
      // Определим высоту столбца
      var columnHeight = chartHeight * times[i] / highestTime;
      // Определим начальные позиции столбцов
      var columnStartY = chartStartY + chartHeight - columnHeight;
      var columnStartX = baseX + margin + (columnWidth * i) + (betweenColumnSpace * i);
      if (names[i].toString() === 'Вы') {
        printRectangle(ctx, columnStartX, columnStartY + textMargin, columnWidth, columnHeight, 'rgba(255, 0, 0, 1)');
      } else {
        printRectangle(ctx, columnStartX, columnStartY + textMargin, columnWidth, columnHeight, 'rgba(0, 0, 255, ' + window.util.getRandom(0.1, 1) + ')');
      }
      // Надписи над столбцами с результатами
      printText(ctx, Math.round(times[i]).toString(), columnStartX, columnStartY, fontSize);
      // Подписи под столбцами с именами игроков
      printText(ctx, names[i].toString(), columnStartX, chartStartY + chartHeight + fontSize + textMargin, fontSize);
    }
  };
}());

