import 'popper.js';
import 'bootstrap';

// Components.
// TODO: Break this into libraries.
import '../components/form/fieldset';
import '../components/card/collapsible-card';

(function($, Drupal, drupalSettings) {
  Drupal.behaviors.side_menu = {
    attach: function(context, settings) {
      var pathName = location.pathname;
      $('.nav-link').each(function() {
        if ($(this).attr('href') == pathName) {
          $(this).parent().siblings().addClass('show');
          $(this).closest('li').addClass('expanded');
        }
      });

      $(context).find('.svg-inline--fa').once('icon-clicked').click(function() {
        var subMenu = $(this).parent().siblings();
        if (subMenu.hasClass('show')) {
          subMenu.removeClass('show');
          $(this).closest('li').removeClass('expanded');
        }
        else {
          subMenu.addClass('show');
          $(this).closest('li').addClass('expanded');
        }
      })
    }
  };

  Drupal.behaviors.block_scroll = {
    attach: function(context, settings) {
      if (location.hash) {
        var hash = location.hash.split('/');
        var openBlockElem = '#operations-' +hash[1] + '-' + hash[2];
        if ($(openBlockElem).length) {
          $('html, body').animate({
            scrollTop: $(openBlockElem).offset().top - 90
          }, 'medium');
        }
      }
    }
  };
  Drupal.behaviors.internal_block_scroll = {
    attach: function(context, settings) {
      $('.api-explorer__method.internal').click(function(event) {
        event.preventDefault();
        var clickedLink = $(this).attr('href').split('/');
        var method = $(this).data('method');
        var length = clickedLink.length;
        var blockToScroll = '#operations-' + clickedLink[length-2] + '-' + clickedLink[length-1];
        if ($(blockToScroll).length) {
          $(blockToScroll).click();
          $('html, body').animate({
            scrollTop: $(blockToScroll).offset().top - 90
          }, 400);
          var classes = $(blockToScroll).attr('class');
          if (!classes.includes('is-open')) {
            $(`${blockToScroll} .opblock-summary-${method}`).click();
          }
          event.stopPropagation();
        }
      });
    }
  };

  Drupal.behaviors.base_url = {
    attach: function(context, settings) {
      if ($('.base-url').length) {
        var text = $('.base-url').text();
        text = text.replace(/\[|\]/g, '');
        $('.swagger-ui:not(.swagger-container)').once().prepend(`<h4 class="base-path">${text}</h4>`);
      }
    }
  };
})(jQuery, Drupal, drupalSettings);
