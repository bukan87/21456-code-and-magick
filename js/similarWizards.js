'use strict';

(function () {
  var WIZARDS_COUNT = 4;

  /**
   * Генерация волшебника
   * @return {{name: string, coatColor: string, eyesColor: string}} волшебник со случайным именем и цветами глаз и пальто
   */
  var getRandomWizard = function () {
    var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
    var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
    return {
      name: window.util.getRandomItem(FIRST_NAMES) + ' ' + window.util.getRandomItem(LAST_NAMES),
      coatColor: window.util.getRandomItem(window.setup.COAT_COLORS),
      eyesColor: window.util.getRandomItem(window.setup.EYES_COLORS)
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
  // Сгенерируем волшебников
  var wizards = generateWizards(WIZARDS_COUNT);
  var similarWizards = window.setup.root.querySelector('.setup-similar-list');
  if (similarWizards) {
    similarWizards.appendChild(getSimilarWizardsFragment(wizards));
  }
  window.setup.root.querySelector('.setup-similar').classList.remove('hidden');
}());
