define(['InkView', 'ButtonView', 'Model', 'Recognizer'], function(InkView, ButtonView, Model, Recognizer) {
  'use strict';

  var PanelView = function(el, target, options) {
    var self = this;

    options = options || {};

    var defaults = {
      locales: ['en_US']
    };

    for (var key in defaults) {
      options[key] = (key in options ? options[key] : defaults[key]);
    }

    this.el = el;
    this.target = target;

    this.recognizer = new Recognizer(options.apiKey);

    this.recognizer.onresult = function(text) {
      self.onrecoresult(text);
    };
    this.recognizer.onfail = function(error) {
      self.onrecofail(error);
    };

    this.model = new Model();

    this.model.onchange = function() {
      self.onmodelchange();
    };
    this.model.onclear = function() {
      self.onmodelclear();
    };

    this.inkView = new InkView(el.querySelector('.ink-view'), options);

    this.inkView.ondrawbegin = function() {
      self.ondrawbegin();
    };
    this.inkView.ondrawend = function() {
      self.ondrawend();
    };

    this.localeButtonView = new ButtonView(el.querySelector('.locale-btn'));
    this.clearButtonView = new ButtonView(el.querySelector('.clear-btn'));
    this.deleteButtonView = new ButtonView(el.querySelector('.delete-btn'));
    this.spaceButtonView = new ButtonView(el.querySelector('.space-btn'));

    this.localeButtonView.onclick = function() {
      self.onlocaleclick();
    };
    this.clearButtonView.onclick = function() {
      self.onclearclick();
    };
    this.deleteButtonView.onclick = function() {
      self.ondeleteclick();
    };
    this.spaceButtonView.onclick = function() {
      self.onspaceclick();
    };

    this.setAvailableLocales(options.locales);
    this.setLocale(options.locales[0]);
  };

  PanelView.prototype = {

    // public API

    setLocale: function(locale) {
      if (!this.isLocaleAvailable(locale)) {
        this.setAvailableLocales([locale]);
      }

      this.locale = locale;

      var localeNames = {
        'en_US': 'English',
        'es_ES': 'Español',
        'fr_FR': 'Français',
        'it_IT': 'Italiano',
        'ko_KR': '한국의'
      };

      this.localeButtonView.setText(localeNames[locale] || locale);

      this.onlocalechange && this.onlocalechange.call(this);
    },

    setAvailableLocales: function(locales) {
      this.availableLocales = locales;
    },

    isLocaleAvailable: function(locale) {
      return this.availableLocales && this.availableLocales.indexOf(locale) >= 0;
    },

    // commit timer

    triggerCommitTimer: function() {
      var self = this;
      this.timeoutId = window.setTimeout(function() {
        self.timeoutId = null;
        self.ontimeout();
      }, 2000);
    },

    cancelCommitTimer: function() {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    },

    shouldCommit: function() {
      return !this.timeoutId && !this.inkView.drawing && !this.recognizer.isBusy();
    },

    // target field

    refreshText: function() {
      this.text = this.target.value;
    },

    setText: function(text) {
      this.text = text;
      this.target.value = text;
      this.notifyTextChange();
    },

    setComposingText: function(text) {
      this.target.value = this.text + text;
      this.notifyTextChange();
    },

    commitComposingText: function() {
      this.model.clear();
      this.inkView.clear();
      this.text = this.target.value;
      this.notifyTextCommit();
    },

    notifyTextChange: function() {
      this.ontextchange && this.ontextchange.call(this);
    },

    notifyTextCommit: function() {
      this.ontextcommit && this.ontextcommit.call(this);
    },

    // internal callbacks

    ontimeout: function() {
      if (this.shouldCommit()) {
        this.commitComposingText();
      }
    },

    onrecoresult: function(text) {
      this.setComposingText(text.replace('\n', ' '));
      if (this.shouldCommit()) {
        this.commitComposingText();
      }
    },

    onrecofail: function(error) {
      console.log('Handwriting recognition failure (' + error + ')');
    },

    onmodelchange: function() {
      this.recognizer.run(this.locale, this.model.toJSON());
    },

    onmodelclear: function() {
      this.recognizer.clear();
    },

    ondrawbegin: function() {
      this.cancelCommitTimer();
      if (this.model.isEmpty()) {
        this.refreshText();
      }
    },

    ondrawend: function() {
      this.triggerCommitTimer();
      this.model.add(this.inkView.stroke);
    },

    // buttons

    onlocaleclick: function() {
      if (this.availableLocales) {
        var i = this.availableLocales.indexOf(this.locale) + 1;
        this.setLocale(this.availableLocales[i % this.availableLocales.length]);
      }
    },

    onclearclick: function() {
      this.cancelCommitTimer();
      this.commitComposingText();
      this.setText('');
    },

    ondeleteclick: function() {
      this.cancelCommitTimer();
      this.commitComposingText();
      this.setText(this.text.slice(0, -1));
    },

    onspaceclick: function() {
      this.cancelCommitTimer();
      this.commitComposingText();
      this.setText(this.text + ' ');
    }

  };

  return PanelView;
});
