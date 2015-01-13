require(['text!../templates/panel.html', 'PanelView'], function(template, PanelView) {
  'use strict';

  // custom HTML attributes
  var hwr = {
    id: 'hwr-id',
    apiKey: 'hwr-apikey',
    locales: 'hwr-locales',
    inkWidth: 'hwr-inkwidth',
    inkColor: 'hwr-inkcolor',
    shadow: 'hwr-shadow',
    shadowColor: 'hwr-shadowcolor',
    shadowDx: 'hwr-shadowdx',
    shadowDy: 'hwr-shadowdy',
    autoCommit: 'hwr-autocommit',
    autoCommitDelay: 'hwr-autocommitdelay'
  };

  function parseHwrOptions(el) {
    var options = {};
    if (el.hasAttribute(hwr.apiKey)) {
      options.apiKey = el.getAttribute(hwr.apiKey);
    }
    if (el.hasAttribute(hwr.locales)) {
      options.locales = el.getAttribute(hwr.locales).trim().split(/\s+/);
    }
    if (el.hasAttribute(hwr.inkWidth)) {
      options.inkWidth = parseInt(el.getAttribute(hwr.inkWidth), 10);
    }
    if (el.hasAttribute(hwr.inkColor)) {
      options.inkColor = el.getAttribute(hwr.inkColor);
    }
    if (el.hasAttribute(hwr.shadow)) {
      options.shadow = el.getAttribute(hwr.shadow) === 'true';
    }
    if (el.hasAttribute(hwr.shadowColor)) {
      options.shadowColor = el.getAttribute(hwr.shadowColor);
    }
    if (el.hasAttribute(hwr.shadowDx)) {
      options.shadowDx = parseInt(el.getAttribute(hwr.shadowDx), 10);
    }
    if (el.hasAttribute(hwr.shadowDy)) {
      options.shadowDy = parseInt(el.getAttribute(hwr.shadowDy), 10);
    }
    if (el.hasAttribute(hwr.autoCommit)) {
      options.autoCommit = el.getAttribute(hwr.autoCommit) === 'true';
    }
    if (el.hasAttribute(hwr.autoCommitDelay)) {
      options.autoCommitDelay = parseInt(el.getAttribute(hwr.autoCommitDelay), 10);
    }
    return options;
  }

  function findInputByHwrId(id) {
    var inputs = document.getElementsByTagName('input');
    for (var i=0; i<inputs.length; i++) {
      if (inputs[i].hasAttribute(hwr.id) && inputs[i].getAttribute(hwr.id) === id) {
        return inputs[i];
      }
    }
  }

  function onload() {
    var divs = document.getElementsByTagName('div');
    for (var i=0; i<divs.length; i++) {
      if (divs[i].hasAttribute(hwr.id)) {
        var target = findInputByHwrId(divs[i].getAttribute(hwr.id));
        if (target) {
          divs[i].innerHTML = template;
          var options = parseHwrOptions(divs[i]);
          new PanelView(divs[i], target, options);
        }
      }
    }
  }

  if (document.readyState === 'complete') {
    onload();
  } else {
    window.addEventListener('load', onload);
  }
});
