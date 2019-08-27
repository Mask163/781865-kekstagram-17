'use strict';

(function () {
  var QUANTITY_OF_NEW_PHOTOS = 10;

  var imgFilters = document.querySelector('.img-filters');
  var filterPopular = imgFilters.querySelector('#filter-popular');
  var filterNew = imgFilters.querySelector('#filter-new');
  var filterDiscussed = imgFilters.querySelector('#filter-discussed');
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var images = [];

  var successHandler = function (data) {
    imgFilters.classList.remove('img-filters--inactive');
    images = data;
    updateImages();
  };

  var createFotos = window.debounce(function (photos) { // заполнение блока DOM-элементами на основе массива JS-объектов
    var photoContainer = document.querySelector('.pictures');
    var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

    for (var i = 0; i < photos.length; i++) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.children[0].src = photos[i].url;
      photoElement.querySelector('.picture__comments').textContent = photos[i].comments;
      photoElement.querySelector('.picture__likes').textContent = photos[i].likes;
      photoContainer.appendChild(photoElement);
    }
  });

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

  var getActive = function (button) {
    button.addEventListener('click', function () {
      var activeButton = document.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');
      updateImages();
    });
  };

  for (var i = 0; i < filterButtons.length; i++) {
    getActive(filterButtons[i]);
  }

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

  var updateImages = window.debounce(function () {
    for (var j = 0; j < filterButtons.length; j++) {
      var activeButton = document.querySelector('.img-filters__button--active');
      var currentImages = document.querySelectorAll('.picture');

      window.util.deleteAllElements(currentImages);

      if (activeButton.id === filterPopular.id) {
        createFotos(images);
      }
      if (activeButton.id === filterNew.id) {
        var randomImages = images.slice();
        createFotos(shuffleArray(randomImages).slice(0, QUANTITY_OF_NEW_PHOTOS));
      }
      if (activeButton.id === filterDiscussed.id) {
        var discussedImages = images.slice();
        discussedImages.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });

        createFotos(discussedImages);
      }
    }
  });

  window.load(successHandler, errorHandler);
})();
