'use strict';

var ESC_KEYCODE = 27;
var photos = [];

var getRandomArbitrary = function (min, max) { // создание случайного числа
  return Math.random() * (max - min) + min;
};

var createArray = function () { // создание массива случайных данных
  var fotoComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var fotoNames = ['Антон', 'Алексей', 'Екатерина', 'Зульфия', 'Даздраперма', 'Дмитрий', 'Ольга', 'Евгений', 'Светлана', 'Азам'];

  for (var i = 0; i < 25; i++) {
    photos[i] = {url: 'photos/' + (i + 1) + '.jpg',
      likes: Math.round(getRandomArbitrary(15, 200)),
      comments: fotoComments[Math.round(getRandomArbitrary(0, 5))],
      name: fotoNames[Math.round(getRandomArbitrary(0, 9))]};
  }
};

createArray();

var createFotos = function () { // заполнение блока DOM-элементами на основе массива JS-объектов
  var photoContainer = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  for (var i = 0; i < photos.length; i++) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.children[0].src = photos[i].url;
    photoElement.querySelector('.picture__comments').textContent = photos[i].comments;
    photoElement.querySelector('.picture__likes').textContent = photos[i].likes;
    photoContainer.appendChild(photoElement);
  }
};

createFotos();

// открытие и закрытие формы редактирования изображения

var uploadImgForm = document.querySelector('.img-upload__overlay');
var uploadFile = document.querySelector('#upload-file');
var uploadImgFormClose = uploadImgForm.querySelector('#upload-cancel');

var onFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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

var NONE_FILTER = 'effects__preview--none';
var CHROME_FILTER = 'effects__preview--chrome';
var SEPIA_FILTER = 'effects__preview--sepia';
var MARVIN_FILTER = 'effects__preview--marvin';
var PHOBOS_FILTER = 'effects__preview--phobos';
var HEAT_FILTER = 'effects__preview--heat';
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
    } else {
      previewImg.classList.add(effect);
      previewImg.style.filter = '';
    }

    if (previewImg.classList[0] === NONE_FILTER) {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
  });
};

for (var i = 0; i < radioEffects.length; i++) {
  setFilter(radioEffects[i], previewEffects[i].classList[1]);
}

var setEffectLevel = function () { // изменяет уровень насыщенности фильтра для изображения при отпускании спина
  effectLevelPin.addEventListener('mouseup', function () {
    var coefficient = effectLevelPin.style.left.substr(0, effectLevelPin.style.left.length - 1) / 100;
    var currentFilter = previewImg.className;
    effectLevelValue.textContent = coefficient;

    if (currentFilter === CHROME_FILTER) {
      previewImg.style.filter = 'grayscale(' + 1 * coefficient + ')';
    } else if (currentFilter === SEPIA_FILTER) {
      previewImg.style.filter = 'sepia(' + 1 * coefficient + ')';
    } else if (currentFilter === MARVIN_FILTER) {
      previewImg.style.filter = 'invert(' + 100 * coefficient + '%)';
    } else if (currentFilter === PHOBOS_FILTER) {
      previewImg.style.filter = 'blur(' + 3 * coefficient + 'px)';
    } else if (currentFilter === HEAT_FILTER) {
      previewImg.style.filter = 'brightness(' + ((1 - coefficient) + (3 * coefficient)) + ')';
    }
  });
};

setEffectLevel();

// валидация поля "Комментарий" в форме

var textArea = uploadImgForm.querySelector('.text__description');

textArea.addEventListener('keydown', function () { // ограничение в 140 символов
  textArea.value = textArea.value.substr(0, 140);
});

textArea.addEventListener('focus', function () { // убирает закрытие формы по нажатию Esc при фокусе на textarea
  document.removeEventListener('keydown', onFormEscPress);
});

textArea.addEventListener('blur', function () { // возвращает закрытие формы по нажатию Esc при смене фокуса с textarea
  document.addEventListener('keydown', onFormEscPress);
});
