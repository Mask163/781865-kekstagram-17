'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImage = bigPicture.querySelector('img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var description = bigPicture.querySelector('.social__caption');
  var commentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var socialCommentsBlock = bigPicture.querySelector('.social__comments');
  var socialCommentTemplate = bigPicture.querySelector('.social__comment');

  var renderComment = function (comment) {
    var socialCommentElement = socialCommentTemplate.cloneNode(true);

    socialCommentElement.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomInt(1, 6) + '.svg';
    socialCommentElement.querySelector('.social__text').textContent = comment.message;

    return socialCommentElement;
  };

  var createComments = function (comments) {
    var fragment = document.createDocumentFragment();
    var currentComments = socialCommentsBlock.querySelectorAll('.social__comment');

    if (currentComments.length) {
      window.util.deleteAllElements(currentComments);
    }

    comments.forEach(function (comment) {
      var element = renderComment(comment);
      fragment.appendChild(element);
    });

    socialCommentsBlock.appendChild(fragment);
  };
  
  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    bigPictureCancel.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    bigPictureCancel.removeEventListener('click', closeBigPicture);
    document.removeEventListener('keydown', onBigPictureEscPress);
  }; 

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var showBigPicture = function (photo) {
    return function () {
      openBigPicture();
      bigPictureImage.src = photo.url;
      likesCount.textContent = photo.likes;
      commentsCount.textContent = photo.comments.length;
      description.textContent = photo.description;
      createComments(photo.comments);
    };
  };

  window.bigPhoto = {
    showBigPicture: showBigPicture
  };
})();
