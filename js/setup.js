'use strict';

(function () {
  var KEYCODES = {
    ESC: 27,
    ENTER: 13
  };
  var root = document.querySelector('.setup');
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
    root.classList.remove('hidden');
    document.addEventListener('keydown', OnSetupEscPress);
  };

  /**
   * Закрытие меню настроек
   */
  var closeSetup = function () {
    root.classList.add('hidden');
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
  // Закрытие меню настроек
  var closeSetupButton = root.querySelector('.setup-close');
  closeSetupButton.addEventListener('click', function () {
    closeSetup();
  });
  closeSetupButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODES.ENTER) {
      closeSetup();
    }
  });
  root.querySelector('.setup-submit').addEventListener('click', function () {
    var isFormCorrect = true;
    var formInputs = root.querySelectorAll('input');
    for (var i = 0; i < formInputs.length; i++) {
      if (!formInputs[i].validity.valid) {
        isFormCorrect = false;
      }
    }
    if (isFormCorrect) {
      root.querySelector('.setup-wizard-form').submit();
    }
  });
  // Изменение цветов
  var playerCoat = root.querySelector('.setup-wizard .wizard-coat');
  playerCoat.addEventListener('click', function () {
    playerCoat.style.fill = window.util.getRandomItem(window.setup.COAT_COLORS);
  });
  var playerEyes = root.querySelector('.setup-wizard .wizard-eyes');
  playerEyes.addEventListener('click', function () {
    playerEyes.style.fill = window.util.getRandomItem(window.setup.EYES_COLORS);
  });
  var playerFireball = root.querySelector('.setup-fireball-wrap');
  playerFireball.addEventListener('click', function () {
    playerFireball.style.backgroundColor = window.util.getRandomItem(window.setup.FIREBALL_COLORS);
  });
  window.setup = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    root: root
  };
}());
