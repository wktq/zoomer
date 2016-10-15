$(function(){
  $('.zoomer-modal').bind('touchstart', function() {
      touchStartX = event.changedTouches[0].pageX;
  });

  $('.zoomer-modal').bind('touchmove', function() {
      touchMoveX = event.changedTouches[0].pageX;
  });

  $('.zoomer-modal').bind('touchend', function() {
    var imageIndex = $('.zoomer-modal').find('.zoomer-image-wrapper').index($('.current-image'));
    var amountMove = touchMoveX - touchStartX;
    if (amountMove > 60) {
      if (imageIndex == 0) {
      } else {
        openZoomerModal(imageIndex - 1);
      }
    } if (amountMove < -60) {
      if (imageIndex == imageLength-1) {
      } else {
        openZoomerModal(imageIndex + 1);
      }
    } else {
      return false;
    }
  });

  var imageLength = $('.zoomer').find('img').length;

  $('.zoomer').find('img').wrap('<div class="zoomer-image-wrapper"></div>');
  $('.zoomer').find('img').addClass('zoomer-image');

  $('.zoomer-modal').html($('#zoomer').html());
  $('.zoomer-modal').find('img').hide();

  $('.zoomer').find('.zoomer-image-wrapper').prepend('<div class="zoomer-overlay"><i class="icon ion-android-search"></i></div>');

  $('.zoomer').find('.zoomer-image-wrapper').click(function() {
    var imageIndex = $('.zoomer-image-wrapper').index(this);
    openZoomerModal(imageIndex);
  });

  $('.zoomer-image-wrapper').hover(function() {
    $(this).find('.zoomer-overlay').toggleClass('zoomer-overlay-focused');
  });

  function openZoomerModal(index) {
    $('.zoomer-modal').fadeIn();
    $('.image-index').text(index + 1);
    $('.image-length').text(imageLength);
    $('.zoomer-modal').find('img').hide();
    $('.zoomer-image-wrapper').removeClass('current-image');

    $('.zoomer-modal').find('img').eq(index).show();
    $('.zoomer-modal').find('img').eq(index).parents('.zoomer-image-wrapper').addClass('current-image');
  }

  function closeZoomerModal() {
    $('.zoomer-modal').fadeOut();
    $('.zoomer-image-wrapper').removeClass('current-image');
  }

  $(document).on('click','.zoomer-close-btn',function(){
    closeZoomerModal();
  });

  $(document).on('click','.zoomer-prev-btn',function(){
    var imageIndex = $('.zoomer-modal').find('.zoomer-image-wrapper').index($('.current-image'));
    if (imageIndex == 0) {
    } else {
      openZoomerModal(imageIndex - 1);
    }
  });

  $(document).on('click','.zoomer-next-btn',function(){
    var imageIndex = $('.zoomer-modal').find('.zoomer-image-wrapper').index($('.current-image'));
    if (imageIndex == imageLength-1) {
    } else {
      openZoomerModal(imageIndex + 1);
    }
  });

  $('.zoomer-modal').on('mousedown', function(e) {
    if (!$(e.target).closest('.zoomer-image').length) {
      if (!$(e.target).closest('.zoomer-prev-btn').length) {
        if (!$(e.target).closest('.zoomer-next-btn').length) {
          if (!$(e.target).closest('.zoomer-close-btn').length) {
            $('.zoomer-modal').fadeOut();
            $('.zoomer-image-wrapper').removeClass('current-image');
          }
        }
      }
    }
  });

  $('.zoomer-modal').bind('touchstart', function(e) {
    if (!$(e.target).closest('.zoomer-image').length) {
      if (!$(e.target).closest('.zoomer-prev-btn').length) {
        if (!$(e.target).closest('.zoomer-next-btn').length) {
          if (!$(e.target).closest('.zoomer-close-btn').length) {
            $('.zoomer-modal').fadeOut();
            $('.zoomer-image-wrapper').removeClass('current-image');
          }
        }
      }
    }
  });

  $('.zoomer-modal').append('<a class="zoomer-close-btn"><i class="icon ion-ios-close-empty"></i></a><a class="zoomer-prev-btn"><i class="icon ion-ios-arrow-left"></i></a><a class="zoomer-next-btn"><i class="icon ion-ios-arrow-right"></i></a><div class="zoomer-image-number"><span class="image-index"></span> / <span class="image-length"></span></div>');

  $(window).on("load",function(){
    $(function(){
    	setTimeout(function(){
      var overlayHeight = $('.zoomer-overlay').height();

      $('.zoomer-overlay').css('line-height', overlayHeight + 'px');
    	},1000);
    });
  });

  $(document).on("keydown", function(e) {
    var imageIndex = $('.zoomer-modal').find('.zoomer-image-wrapper').index($('.current-image'));

  	if(e.keyCode === 37) {
      if (imageIndex == 0) {
      } else {
        openZoomerModal(imageIndex - 1);
      }
      return false;
    } else if (e.keyCode === 39) {
      if (imageIndex == imageLength-1) {
      } else {
        openZoomerModal(imageIndex + 1);
      }
      return false;
    }
  });

});
