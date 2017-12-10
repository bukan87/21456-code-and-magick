'use strict';

(function () {
  var KEYCODES = {
    ESC: 27,
    ENTER: 13
  };
  var DEFAULT_SETUP_POSITION = {
    left: '50%',
    top: '80px'
  };
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
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
   * Установка окна настроек в позицию по умолчанию
   */
  var setPositionDefault = function () {
    root.style.left = DEFAULT_SETUP_POSITION.left;
    root.style.top = DEFAULT_SETUP_POSITION.top;
  };

  /**
   * Отображение меню настроек
   */
  var showSetup = function () {
    setPositionDefault();
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

  /**
   * Проверка дом элемента на возможность положить в него предмет инвентаря
   * @param {Element} element проверяемы dom-элемент
   * @return {boolean} признак возможности положить
   */
  var canDropItem = function (element) {
    if (element.tagName.toLowerCase() !== 'img' && element.childNodes.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Изменение цвета элемента
   * @param {Element} element элемент, у которого изменяется цвет
   * @param {string} color цвет, который необходим применить
   */
  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  /**
   * Изменение цвета фона у элемента
   * @param {Element} element элемент, у которого изменяется цвет фона
   * @param {string} color цвет, который необходим применить
   */
  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
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
  window.colorizeElement(playerCoat, COAT_COLORS, fillElement);
  var playerEyes = root.querySelector('.setup-wizard .wizard-eyes');
  window.colorizeElement(playerEyes, EYES_COLORS, fillElement);
  var playerFireball = root.querySelector('.setup-fireball-wrap');
  window.colorizeElement(playerFireball, FIREBALL_COLORS, changeElementBackground);
  // Drag'n'Drop в магазине
  var shop = root.querySelector('.setup-artifacts-shop');
  var playerInventory = root.querySelector('.setup-artifacts');
  if (shop && playerInventory) {
    var draggedItem = null;
    shop.addEventListener('dragstart', function (evt) {
      if (evt.target.tagName.toLowerCase() === 'img') {
        draggedItem = evt.target;
        evt.dataTransfer.setData('text/plain', 'shop');
      }
    });
    playerInventory.addEventListener('dragover', function (evt) {
      evt.preventDefault();
      return false;
    });
    playerInventory.addEventListener('dragstart', function (evt) {
      if (evt.target.tagName.toLowerCase() === 'img') {
        draggedItem = evt.target;
        evt.dataTransfer.setData('text/plain', 'inventory');
      }
    });
    playerInventory.addEventListener('drop', function (evt) {
      evt.target.style.backgroundColor = '';
      if (canDropItem(evt.target)) {
        if (evt.dataTransfer.getData('text/plain') === 'shop') {
          evt.target.appendChild(draggedItem.cloneNode(true));
        } else {
          evt.target.appendChild(draggedItem);
        }
      }
      draggedItem = null;
      evt.preventDefault();
    });
    playerInventory.addEventListener('dragenter', function (evt) {
      if (canDropItem(evt.target)) {
        evt.target.style.backgroundColor = 'yellow';
        evt.preventDefault();
      }
    });
    playerInventory.addEventListener('dragleave', function (evt) {
      evt.target.style.backgroundColor = '';
      evt.preventDefault();
    });
  }
  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    root: root
  };
}());
