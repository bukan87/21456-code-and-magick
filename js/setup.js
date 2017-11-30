'use strict';
var WIZARDS_COUNT = 4;
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var KEYCODES = {
  ESC: 27,
  ENTER: 13
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
 * Выборка случайного элемента массива
 * @param {object} arr массив, из которого нужно выбрать случайный элемент
 * @return {*} случайный элемент
 */
var getRandomItem = function (arr) {
  return arr[Math.floor(getRandom(0, arr.length - 1))];
};

/**
 * Генерация волшебника
 * @return {{name: string, coatColor: string, eyesColor: string}} волшебник со случайным именем и цветами глаз и пальто
 */
var getRandomWizard = function () {
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  return {
    name: getRandomItem(FIRST_NAMES) + ' ' + getRandomItem(LAST_NAMES),
    coatColor: getRandomItem(COAT_COLORS),
    eyesColor: getRandomItem(EYES_COLORS)
  };
};

/**
 * Генерация необходимого количества случайных волшебников
 * @param {number} wizardCount необходимое количество волшебников
 * @return {Array}
 */
var generateWizards = function (wizardCount) {
  var wizards = [];
  for (var i = 0; i < wizardCount; i++) {
    wizards.push(getRandomWizard());
  }
  return wizards;
};

/**
 * Генерация ноды на основе шаблона
 * @param {object} wizard данные волшебника, которые будут полставляться в шаблон
 * @return {Node} сгенерируемая нода
 */
var getNodeWizardByTemplate = function (wizard) {
  var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content;
  var element = SIMILAR_WIZARD_TEMPLATE.cloneNode(true);
  element.querySelector('.setup-similar-label').textContent = wizard.name;
  element.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return element;
};

/**
 * Генерация фрагмента с похожими волшебниками
 * @param {Array} wizards массив волшебников
 * @return {DocumentFragment} фрагмент
 */
var getSimilarWizardsFragment = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(getNodeWizardByTemplate(wizards[i]));
  }
  return fragment;
};

var setup = document.querySelector('.setup');

/**
 * Закрытие окна настроек по нажатию кнопки Esc
 * @param {Object} evt Контекс события
 * @constructor
 */
var OnSetupEscPress = function (evt) {
  if (evt.keyCode === KEYCODES.ESC && !evt.target.classList.contains('setup-user-name')) {
    closeSetup();
  }
};

/**
 * Отображение меню настроек
 */
var showSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', OnSetupEscPress);
};

/**
 * Закрытие меню настроек
 */
var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', OnSetupEscPress);
};

var openSetupButton = document.querySelector('.setup-open');
// Открыте меню настроек
openSetupButton.addEventListener('click', function () {
  showSetup();
});
openSetupButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODES.ENTER) {
    showSetup();
  }
});
// Закрытие меню натсроек
var closeSetupButton = setup.querySelector('.setup-close');
closeSetupButton.addEventListener('click', function () {
  closeSetup();
});
closeSetupButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODES.ENTER) {
    closeSetup();
  }
});
setup.querySelector('.setup-submit').addEventListener('click', function () {
  var isFormCorrect = true;
  var formInputs = setup.querySelectorAll('input');
  for (var i = 0; i < formInputs.length; i++) {
    if (!formInputs[i].validity.valid) {
      isFormCorrect = false;
    }
  }
  if (isFormCorrect) {
    setup.querySelector('.setup-wizard-form').submit();
  }
});
// Изменение цветов
var playerCoat = setup.querySelector('.setup-wizard .wizard-coat');
playerCoat.addEventListener('click', function () {
  playerCoat.style.fill = getRandomItem(COAT_COLORS);
});
var playerEyes = setup.querySelector('.setup-wizard .wizard-eyes');
playerEyes.addEventListener('click', function () {
  playerEyes.style.fill = getRandomItem(EYES_COLORS);
});
var playerFireball = setup.querySelector('.setup-fireball-wrap');
playerFireball.addEventListener('click', function () {
  playerFireball.style.backgroundColor = getRandomItem(FIREBALL_COLORS);
});
// Сгенерируем волшебников
var wizards = generateWizards(WIZARDS_COUNT);
// Добавим волшебников в интерфейс
var similarWizards = setup.querySelector('.setup-similar-list');
similarWizards.appendChild(getSimilarWizardsFragment(wizards));
setup.querySelector('.setup-similar').classList.remove('hidden');
