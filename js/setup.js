'use strict';

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
 * Выборка случайного элемента массива
 * @param {object} arr массив, из которого нужно выбрать случайный элемент
 * @return {*} случайный элемент
 */
var getRandomItem = function (arr) {
  return arr[Math.floor(getRandom(0, arr.length - 1))];
};

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
// Сгенерируем волшебников
var WIZARDS_COUNT = 4;
var wizards = [];
for (var i = 0; i < WIZARDS_COUNT; i++) {
  wizards.push({
    name: getRandomItem(FIRST_NAMES) + ' ' + getRandomItem(LAST_NAMES),
    coatColor: getRandomItem(COAT_COLORS),
    eyesColor: getRandomItem(EYES_COLORS)
  });
}
setup.querySelector('.setup-similar').classList.remove('hidden');
// Добавим волшебников в интерфейс
var similarWizards = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
for (i = 0; i < wizards.length; i++) {
  var element = similarWizardTemplate.cloneNode(true);
  element.querySelector('.setup-similar-label').textContent = wizards[i].name;
  element.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  element.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
  similarWizards.appendChild(element);
}
