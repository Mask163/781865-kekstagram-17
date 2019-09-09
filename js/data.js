'use strict';

(function () {
  var QUANTITY_OF_NEW_PHOTOS = 10;
  var LENGTH_WORD_FILTER_WITH_HYPHEN = 7;

  var photoContainer = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var activeFilterButton = imgFilters.querySelector('.img-filters__button--active');
  
  var renderedPhotos = [];

  var getDefaultPhoto = function (photo) {
    return photo;
  };

  var getNewPhoto = function (photo) {
    return window.util.shuffleArray(photo).slice(0, QUANTITY_OF_NEW_PHOTOS);
  };

  var getDiscussedPhoto = function (photo) {
    return photo.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var filtersMap = {
    popular: getDefaultPhoto,
    new: getNewPhoto,
    discussed: getDiscussedPhoto
  };

  var renderPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    return photoElement;
  };

  var createPhotos = window.debounce(function (photos) {
    var fragment = document.createDocumentFragment();
    
    if (renderedPhotos.length) {
      window.util.deleteAllElements(renderedPhotos);
      renderedPhotos = [];
    }

    photos.forEach(function (photo) {
      var element = renderPhoto(photo);
      element.addEventListener('click', window.bigPhoto.showBigPicture(photo));
      fragment.appendChild(element);
      renderedPhotos.push(element);
    });

    photoContainer.appendChild(fragment);
  });
  
  var changeFilter = window.debounce(function (evt, photos) {
    var targetId = evt.target.id.slice(LENGTH_WORD_FILTER_WITH_HYPHEN);
    var option = filtersMap[targetId];
    var changedData = option(photos.slice());
    createPhotos(changedData);
  });

  var successHandler = function (data) {
    imgFilters.classList.remove('img-filters--inactive');

    imgFilters.addEventListener('click', function (evt){
      if (evt.target.type === 'button') {
        activeFilterButton.classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
        activeFilterButton = evt.target;
        changeFilter(evt, data);
      }
    });

    createPhotos(data);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; padding: 7px; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);
})();
