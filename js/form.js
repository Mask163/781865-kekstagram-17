'use strict';

(function () {
  // открытие и закрытие формы редактирования изображения

  var uploadImgForm = document.querySelector('.img-upload__overlay');
  var uploadFile = document.querySelector('#upload-file');
  var uploadImgFormClose = uploadImgForm.querySelector('#upload-cancel');

  var onFormEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeForm();
    }
  };

  var openForm = function () {
    uploadImgForm.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscPress);
  };

  var closeForm = function () {
    uploadImgForm.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscPress);
    uploadFile.textContent = '';
  };

  uploadFile.addEventListener('change', openForm);

  uploadImgFormClose.addEventListener('click', closeForm);

  // работа с фильтрами

  var radioEffects = uploadImgForm.querySelectorAll('.effects__radio');
  var previewImg = uploadImgForm.querySelector('.img-upload__preview').children[0];
  var previewEffects = uploadImgForm.querySelectorAll('.effects__preview');
  var effectLevel = uploadImgForm.querySelector('.effect-level');
  var effectLevelPin = uploadImgForm.querySelector('.effect-level__pin');
  var effectLevelValue = uploadImgForm.querySelector('.effect-level__value');
  var effectLevelDepth = uploadImgForm.querySelector('.effect-level__depth');

  effectLevel.classList.add('hidden');
  effectLevelDepth.style.width = '100%';
  effectLevelPin.style.left = '100%';

  var setFilter = function (radio, effect) { // устанавливает на изображение класс выбранного фильтра
    radio.addEventListener('change', function () {
      if (previewImg.classList) {
        previewImg.classList.remove(previewImg.classList[0]);
        previewImg.classList.add(effect);
        previewImg.style.filter = '';
        effectLevelPin.style.left = '100%';
        effectLevelDepth.style.width = '100%';
      } else {
        previewImg.classList.add(effect);
        previewImg.style.filter = '';
      }

      if (previewImg.classList[0] === window.util.NONE_FILTER) {
        effectLevel.classList.add('hidden');
      } else {
        effectLevel.classList.remove('hidden');
      }
    });
  };

  for (var i = 0; i < radioEffects.length; i++) {
    setFilter(radioEffects[i], previewEffects[i].classList[1]);
  }

  var setEffectLevel = function (action) { // изменяет уровень насыщенности фильтра для изображения
    effectLevelPin.addEventListener(action, function () {
      var coefficient = effectLevelPin.style.left.substr(0, effectLevelPin.style.left.length - 1) / 100;
      var currentFilter = previewImg.className;
      effectLevelValue.textContent = coefficient;

      if (currentFilter === window.util.CHROME_FILTER) {
        previewImg.style.filter = 'grayscale(' + 1 * coefficient + ')';
      } else if (currentFilter === window.util.SEPIA_FILTER) {
        previewImg.style.filter = 'sepia(' + 1 * coefficient + ')';
      } else if (currentFilter === window.util.MARVIN_FILTER) {
        previewImg.style.filter = 'invert(' + 100 * coefficient + '%)';
      } else if (currentFilter === window.util.PHOBOS_FILTER) {
        previewImg.style.filter = 'blur(' + 3 * coefficient + 'px)';
      } else if (currentFilter === window.util.HEAT_FILTER) {
        previewImg.style.filter = 'brightness(' + ((1 - coefficient) + (3 * coefficient)) + ')';
      }
    });
  };

  // валидация поля "Комментарий" в форме

  var textArea = uploadImgForm.querySelector('.text__description');
  textArea.setAttribute('maxlength', '140');

  textArea.addEventListener('focus', function () { // убирает закрытие формы по нажатию Esc при фокусе на textarea
    document.removeEventListener('keydown', onFormEscPress);
  });

  textArea.addEventListener('blur', function () { // возвращает закрытие формы по нажатию Esc при смене фокуса с textarea
    document.addEventListener('keydown', onFormEscPress);
  });

  // перетаскивание ползунка

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoord = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoord.x - moveEvt.clientX
      };

      startCoord = {
        x: moveEvt.clientX
      };

      effectLevelPin.style.left = ((effectLevelPin.offsetLeft - shift.x) / window.util.EFFECT_LVL_LINE_WIDTH * 100) + '%';
      if (effectLevelPin.offsetLeft > window.util.EFFECT_LVL_LINE_WIDTH) {
        effectLevelPin.style.left = 100 + '%';
      } else if (effectLevelPin.offsetLeft < 0) {
        effectLevelPin.style.left = 0 + '%';
      }

      effectLevelDepth.style.width = effectLevelPin.style.left;

      setEffectLevel('mousemove');
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setEffectLevel('mouseup');

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
