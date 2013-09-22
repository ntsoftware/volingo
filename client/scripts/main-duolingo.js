require(['text!../templates/panel.html', 'PanelView'], function(template, PanelView) {
  'use strict';

  var isMobile = /android|iphone|ipad/i.test(navigator.userAgent);

  var addHandwritingPanel = function(sessionView, $target) {
    var $panel = $(template);

    sessionView.$('#session-element-container').append($panel);

    var panelView = new PanelView($panel[0], $target[0], {
      inkWidth: 3,
      inkColor: '#99cc00',
      shadow: false
    });

    var locales = {
      'en': 'en_US',
      'es': 'es_ES',
      'fr': 'fr_FR',
      'it': 'it_IT',
      'pt': 'pt_BR',
      'zh': 'zh_CN',
      'ja': 'ja_JP',
      'ru': 'ru_RU',
      'ar': 'ar'
    };

    panelView.setLocale(locales[$target.attr('lang')] || 'en_US');

    panelView.ontextchange = function() {
      if ($target.val().trim() === '') {
        sessionView.notReady();
      }
    };
    panelView.ontextcommit = function() {
      if ($target.val().trim() !== '') {
        sessionView.ready();
      }
    };

    if (isMobile) {
      $target.on('focus', function(e) {
        e.preventDefault();
      });

      window.scrollTo(0, 1);
    }
  };

  var _render = duo.SessionView.prototype.render;

  duo.SessionView.prototype.render = function() {
    var result = _render.apply(this, arguments);

    var $textInput = this.$('#text-input');
    var $wordInput = this.$('#word-input');

    $textInput.length && addHandwritingPanel(this, $textInput);
    $wordInput.length && addHandwritingPanel(this, $wordInput);

    return result;
  };
});
