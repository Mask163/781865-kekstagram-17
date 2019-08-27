'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigImage = bigPicture.querySelector('img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialCommentsBlock = bigPicture.querySelector('.social__comments');
  var socialComments = socialCommentsBlock.querySelectorAll('.social__comment');
  
  var getBigPicture = function (images) {
    bigPicture.classList.remove('hidden');
    bigImage.src = images[0].url;
    likesCount.textContent = images[0].likes;
    commentsCount.textContent = images[0].comments.length;
    createComments(images);
  };
  
  var createComments = function (data) {
    for (var i = 0; i < data[0].comments.length; i++) {
      var socialCommentsBlock = document.querySelector('.social__comments');
      var socialPicture = document.querySelector('.social__picture');
      var socialText = document.querySelector('.social__text');
      var socialCommentTemplate = document.querySelector('.social__comment').cloneNode(true);
      window.util.deleteAllElements(socialComments);
      socialPicture.src = 'img/avatar-' + window.util.getRandomInt(1, 6) + '.svg';
      socialText.textContent = data[0].comments[i].message;
      
      socialCommentsBlock.appendChild(socialCommentTemplate);
    };
  };
  
  window.load(getBigPicture);
})();
