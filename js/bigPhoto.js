'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigImage = bigPicture.querySelector('img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialComments = bigPicture.querySelectorAll('.social__comment');
  var description = bigPicture.querySelector('.social__caption');
  var commentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  
  
  var getBigPicture = function (images) {
    
    
    
    
    bigPicture.classList.remove('hidden');
    bigImage.src = images[0].url;
    likesCount.textContent = images[0].likes;
    commentsCount.textContent = images[0].comments.length;
    description.textContent = images[0].description;
    createComments(images);
    window.util.deleteAllElements(socialComments);
    window.util.giveInvisibility(commentCount);
    window.util.giveInvisibility(commentsLoader);
  };
  
  var createComments = function (data) {
    var socialCommentsBlock = bigPicture.querySelector('.social__comments');
    var socialComment = socialCommentsBlock.querySelector('.social__comment');

    for (var i = 0; i < data[0].comments.length; i++) {
      var socialCommentTemplate = socialComment.cloneNode(true);
      var socialPicture = socialCommentTemplate.querySelector('.social__picture');
      var socialText = socialCommentTemplate.querySelector('.social__text');

      socialPicture.src = 'img/avatar-' + window.util.getRandomInt(1, 6) + '.svg';
      socialText.textContent = data[0].comments[i].message;
      socialCommentsBlock.appendChild(socialCommentTemplate);
    };
  };
  
  window.load(getBigPicture);
})();
