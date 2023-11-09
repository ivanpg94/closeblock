(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.closeblock = {
    attach: function (context, settings) {
      var $blockSettings = settings.closeBlockSettings,
          $close_button = $('<span />').addClass('closeblock-button').html($blockSettings.close_block_button_text),
          $close_container = $('<div />').addClass('closeblock').append($close_button);

      $('.close-block').each(function () {
        if ($.cookie('closeblock-' + this.id)) {
          $('#' + this.id).hide();
        } else {
          $('#' + this.id).show();
          $('.close-block').once().prepend($close_container);
        }
      });

      $('.closeblock-button').once().click(function () {
        switch ($blockSettings.close_block_type){
          case 'fadeOut':
            $(this).closest('.close-block').fadeOut($blockSettings.close_block_speed);
            break;
          case 'slideUp':
            $(this).closest('.close-block').slideUp($blockSettings.close_block_speed);
            break;
          default:
            $(this).closest('.close-block').hide();
            break;
        }
        $.cookie('closeblock-' + $(this).closest('.close-block').attr('id'), '1', { path: '/', expires: parseInt($blockSettings.reset_cookie_time) });
      });

      $('#closeblock-clear-cookie-button').once().click(function () {
        for (var $item in $.cookie()) {
          if ($item.indexOf('closeblock-') >= 0) {
            $.removeCookie($item, { path: '/' });
          }
        }
      });
    }
  }
}) (jQuery, Drupal);
