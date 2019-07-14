'use strict';

(function () {
  var createFotos = function (photos) { // заполнение блока DOM-элементами на основе массива JS-объектов
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

  var errorHandler = function (errorMessage) { // сообщение об ошибке
    var node = document.createElement('div');
    node.style = 'z-index: 100; padding: 7px; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(createFotos, errorHandler);
})();
