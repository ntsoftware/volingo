define(['Stroker'], function(Stroker) {
  'use strict';

  var InkView = function(el, options) {
    var self = this;

    this.stroker = new Stroker(options);

    this.el = el;
    this.el.width = this.el.clientWidth;
    this.el.height = this.el.clientHeight;
    this.ctx = this.el.getContext('2d');

    var listenTo = function(obj, name) {
      obj.addEventListener(name, function(e) {
        self[name](e);
      });
    };

    // install move event handlers
    listenTo(el, 'mousedown');
    listenTo(el, 'mousemove');
    listenTo(window, 'mouseup');

    // install touch event handlers
    listenTo(el, 'touchstart');
    listenTo(el, 'touchmove');
    listenTo(window, 'touchend');
  };

  InkView.prototype = {

    // mouse event handlers
    mousedown: function(e) {
      if (!this.drawing) {
        e.preventDefault();
        this.drawing = true;
        var x = e.clientX + window.pageXOffset;
        var y = e.clientY + window.pageYOffset;
        this.pendown(x, y);
      }
    },
    mousemove: function(e) {
      if (this.drawing) {
        e.preventDefault();
        var x = e.clientX + window.pageXOffset;
        var y = e.clientY + window.pageYOffset;
        this.penmove(x, y);
      }
    },
    mouseup: function(e) {
      if (this.drawing) {
        e.preventDefault();
        this.drawing = false;
        this.penup();
      }
    },

    // touch event handlers
    touchstart: function(e) {
      if (!this.drawing) {
        e.preventDefault();
        var touch = e.changedTouches[0];
        this.drawing = true;
        this.touchId = touch.identifier;
        var x = touch.pageX;
        var y = touch.pageY;
        this.pendown(x, y);
      }
    },
    touchmove: function(e) {
      if (this.drawing) {
        e.preventDefault();
        var touches = e.changedTouches;
        for (var i=0; i<touches.length; i++) {
          if (touches[i].identifier === this.touchId) {
            var x = touches[i].pageX;
            var y = touches[i].pageY;
            this.penmove(x, y);
            break;
          }
        }
      }
    },
    touchend: function(e) {
      if (this.drawing) {
        e.preventDefault();
        var touches = e.changedTouches;
        for (var i=0; i<touches.length; i++) {
          if (touches[i].identifier === this.touchId) {
            this.drawing = false;
            this.penup();
            break;
          }
        }
      }
    },

    // process mouse/finger down event
    pendown: function(x, y) {
      if (this.el.width === 0 || this.el.height === 0) {
        this.resize();
      }
      var rect = this.el.getBoundingClientRect();
      this.offsetLeft = rect.left + window.pageXOffset;
      this.offsetTop = rect.top + window.pageYOffset;
      x -= this.offsetLeft;
      y -= this.offsetTop;
      this.stroker.begin(this.ctx, x, y);
      this.stroke = {
        x: [x],
        y: [y],
        options: this.stroker.options
      };
      this.ondrawbegin && this.ondrawbegin.call(this);
    },

    // process mouse/finger move event
    penmove: function(x, y) {
      x -= this.offsetLeft;
      y -= this.offsetTop;
      if (this.stroker.add(this.ctx, x, y)) {
        this.stroke.x.push(x);
        this.stroke.y.push(y);
      }
    },

    // process mouse/finger up event
    penup: function() {
      this.stroker.end(this.ctx, this.stroke.x.length);
      this.ondrawend && this.ondrawend.call(this);
    },

    // clear this view
    clear: function() {
      this.ctx.clearRect(0, 0, this.el.width, this.el.height);
    },

    // resize this view (also clear the view)
    resize: function() {
      this.el.width = this.el.clientWidth;
      this.el.height = this.el.clientHeight;
      this.ctx = this.el.getContext('2d');
    }

  };

  return InkView;
});
