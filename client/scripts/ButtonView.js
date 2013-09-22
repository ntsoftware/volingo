define(function() {
  'use strict';

  var ButtonView = function(el) {
    var self = this;

    this.el = el;

    this.className = {
      normal: el.className,
      pressed: el.className + ' pressed'
    };

    this.repeatDelay = 600;
    this.repeatRate = 100;
    this.repeatCount = 0;

    var listenTo = function(name) {
      el.addEventListener(name, function(e) {
        self[name](e);
      });
    };

    listenTo('click');
    listenTo('touchstart');
    listenTo('touchmove');
    listenTo('touchend');
  };

  ButtonView.prototype = {

    setText: function(text) {
      this.el.textContent = text;
    },

    setPressed: function(pressed) {
      this.el.className = this.className[pressed ? 'pressed' : 'normal'];
    },

    hitTest: function(e) {
      var touch = e.changedTouches[0];
      var x = touch.pageX - window.pageXOffset;
      var y = touch.pageY - window.pageYOffset;
      var rect = this.el.getBoundingClientRect();
      return rect.left < x && x < rect.right && rect.top < y && y < rect.bottom;
    },

    click: function(e) {
      e.preventDefault();
      this.onclick && this.onclick.call(this);
    },

    touchstart: function(e) {
      e.preventDefault();
      this.setPressed(true);
    },

    touchmove: function(e) {
      e.preventDefault();
      this.setPressed(this.hitTest(e));
    },

    touchend: function(e) {
      e.preventDefault();
      this.setPressed(false);
      if (this.hitTest(e)) {
        this.onclick && this.onclick.call(this);
      }
    }

  };

  return ButtonView;
});
