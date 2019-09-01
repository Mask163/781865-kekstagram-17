'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigImage = bigPicture.querySelector('img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var description = bigPicture.querySelector('.social__caption');
  var commentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var pictures = document.querySelector('.pictures');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var index;

  var openBigPicture = function (evt) {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  }; 

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      bigPicture.classList.add('hidden');
    }
  };

  pictures.addEventListener('click', function (evt) {
    var target = evt.target;

    var picture = target.closest('.picture');
    if (!picture) {
      return;
    }

    index = picture.dataset.index;
    window.load(getBigPicture);
    console.log(index);
  });

  bigPictureCancel.addEventListener('click', closeBigPicture);

  var getBigPicture = function (images) {
    openBigPicture();

    for (var i = 0; i < images.length; i++) {
      if (i == index) {
        var socialComments = bigPicture.querySelectorAll('.social__comment');

        bigImage.src = images[i].url;
        likesCount.textContent = images[i].likes;
        commentsCount.textContent = images[i].comments.length;
        description.textContent = images[i].desc ription;
        createComments(images[i].comments);
        window.util.deleteAllElements(socialComments);
        window.util.giveInvisibility(commentCount);
        window.util.giveInvisibility(commentsLoader);
      }
    }
  };

  var createComments = function (data) {
    var socialCommentsBlock = bigPicture.querySelector('.social__comments');
    var socialComment = socialCommentsBlock.querySelector('.social__comment');

    for (var j = 0; j < data.length; j++) {
    var socialCommentTemplate = socialComment.cloneNode(true);
    var socialPicture = socialCommentTemplate.querySelector('.social__picture');
    var socialText = socialCommentTemplate.querySelector('.social__text');

    socialPicture.src = 'img/avatar-' + window.util.getRandomInt(1, 6) + '.svg';
    socialText.textContent = data[j].message;
    socialCommentsBlock.appendChild(socialCommentTemplate);
    }
  };
})();
