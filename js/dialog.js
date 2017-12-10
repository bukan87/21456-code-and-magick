'use strict';

(function () {
  var userPic = window.setup.root.querySelector('.upload');
  userPic.querySelector('input[type=file]').addEventListener('click', function (evt) {
    evt.preventDefault();
  });
  if (userPic) {
    userPic.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startPosition = {
        x: evt.clientX,
        y: evt.clientY
      };
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startPosition.x - moveEvt.clientX,
          y: startPosition.y - moveEvt.clientY
        };
        startPosition = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        window.setup.root.style.top = (window.setup.root.offsetTop - shift.y) + 'px';
        window.setup.root.style.left = (window.setup.root.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
}());
