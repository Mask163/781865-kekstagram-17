'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var NONE_FILTER = 'effects__preview--none';
  var CHROME_FILTER = 'effects__preview--chrome';
  var SEPIA_FILTER = 'effects__preview--sepia';
  var MARVIN_FILTER = 'effects__preview--marvin';
  var PHOBOS_FILTER = 'effects__preview--phobos';
  var HEAT_FILTER = 'effects__preview--heat';
  var EFFECT_LVL_LINE_WIDTH = 453;
  
  var deleteAllElements = function (elements) {
    elements.forEach(function (element) {
      element.remove();
    });
  };
  
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  
  var giveInvisibility = function (object) {
    object.classList.add('visually-hidden');
  };
  
  var shuffleArray = function (elements) {
    var number = elements.length;
    while (number--) {
      var j = window.util.getRandomInt(0, number);
      var temp = elements[j];
      elements[j] = elements[number];
      elements[number] = temp;
    }
    return elements;
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    NONE_FILTER: NONE_FILTER,
    CHROME_FILTER: CHROME_FILTER,
    SEPIA_FILTER: SEPIA_FILTER,
    MARVIN_FILTER: MARVIN_FILTER,
    PHOBOS_FILTER: PHOBOS_FILTER,
    HEAT_FILTER: HEAT_FILTER,
    EFFECT_LVL_LINE_WIDTH: EFFECT_LVL_LINE_WIDTH,
    deleteAllElements: deleteAllElements,
    getRandomInt: getRandomInt,
    giveInvisibility: giveInvisibility,
    shuffleArray: shuffleArray
  };
})();
