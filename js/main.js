'use strict';

var photos = [];

var getRandomArbitrary = function (min, max) { //создание случайного числа
  return Math.random() * (max - min) + min;
};

var createArray = function () { //создание массива случайных данных
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

var createFotos = function () { //заполнение блока DOM-элементами на основе массива JS-объектов
  var photoContainer = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  for (var i = 0; i < photos.length; i++) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.children[0].src = photos[i].url;
    photoElement.querySelector(".picture__comments").textContent = photos[i].comments;
    photoElement.querySelector(".picture__likes").textContent = photos[i].likes;
    photoContainer.appendChild(photoElement);
  }
};

createFotos();
