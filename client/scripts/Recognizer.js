define(function() {
  'use strict';

  var Recognizer = function() {
    var self = this;

    this.instanceId = null;
    this.timeoutId = null;

    this.xhr = new XMLHttpRequest();

    this.xhr.onreadystatechange = function() {
      self.onreadystatechange();
    };
  };

  Recognizer.prototype = {

    // public API

    run: function(locale, strokes) {
      if (this.isThrottling() || this.isBusy()) {
        this.queueRequest(locale, strokes);
      } else {
        this.sendRequest(locale, strokes);
      }
    },

    clear: function() {
      this.cancelRequest();
      this.instanceId = null;
    },

    isBusy: function() {
      return this.xhr.readyState !== 0 && this.xhr.readyState !== 4;
    },

    // throttle timer

    triggerThrottleTimer: function() {
      var self = this;
      this.timeoutId = window.setTimeout(function() {
        self.timeoutId = null;
        self.ontimeout();
      }, 100);
    },

    cancelThrottleTimer: function() {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    },

    isThrottling: function() {
      return this.timeoutId !== null;
    },

    // handwriting recognition request

    sendRequest: function(locale, strokes) {
      var params = [
        'locale=' + encodeURIComponent(locale),
        'strokes=' + encodeURIComponent(JSON.stringify(strokes))
      ];

      var data = params.join('&');

      this.xhr.open('POST', '/hwr', true);
      this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      this.xhr.send(data);
    },

    queueRequest: function(locale, strokes) {
      this.pendingRequest = function() {
        this.sendRequest(locale, strokes);
      };
    },

    cancelRequest: function() {
      this.pendingRequest = null;
      this.xhr.abort();
    },

    // internal callbacks

    ontimeout: function() {
      if (this.pendingRequest) {
        this.pendingRequest();
        this.pendingRequest = null;
      }
    },

    onreadystatechange: function() {
      if (this.xhr.readyState === 4) {
        if (this.xhr.status === 200) {
          this.onsuccess();
        } else {
          this.onfailure();
        }
        this.triggerThrottleTimer();
      }
    },

    onsuccess: function() {
      var json = JSON.parse(this.xhr.responseText);

      this.instanceId = json.instanceId;

      var text;
      var candidates = json.result.textSegmentResult.candidates;
      if (candidates && candidates.length) {
        text = candidates[0].label;
      } else {
        text = '';
      }

      this.onresult && this.onresult.call(this, text);
    },

    onfailure: function() {
      this.onfail && this.onfail.call(this, this.xhr.statusText);
    }

  };

  return Recognizer;
});