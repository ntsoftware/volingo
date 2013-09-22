require(['text!../templates/panel.html', 'PanelView'], function(template, PanelView) {
  'use strict';

  var $panel = $(template);
  var $target = $('#result');

  var panelView = new PanelView($panel[0], $target[0]);

  panelView.setAvailableLocales(['en_US', 'fr_FR', 'ko_KR']);

  panelView.setLocale(window.localStorage['hwr.locale'] || 'en_US');

  panelView.onlocalechange = function() {
    window.localStorage['hwr.locale'] = panelView.locale;
  };

  $panel.appendTo('body');
});
