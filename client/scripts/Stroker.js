define(function() {
  'use strict';

  var Stroker = function(options) {
    options = options || {};

    var defaults = {
      inkWidth: 4,
      inkColor: '#33b5e5',
      shadow: false,
      shadowColor: '#000000',
      shadowDx: 1,
      shadowDy: 1,
      minDistance: 1,
      maxDistance: 100
    };

    for (var key in defaults) {
      options[key] = (key in options ? options[key] : defaults[key]);
    }

    this.options = options;
  };

  Stroker.prototype = {

    // return true if the given point should be filtered
    filter: function(x, y) {
      var dx = x - this.lastX;
      var dy = y - this.lastY;
      var d = dx*dx + dy*dy;
      var min = this.options.minDistance * this.options.minDistance;
      var max = this.options.maxDistance * this.options.maxDistance;
      return d < min || d > max;
    },

    // begin incremental drawing of the stroke
    begin: function(ctx, x, y) {
      this.lastX = this.lastMidX = x;
      this.lastY = this.lastMidY = y;
    },

    // incrementally add a point to the stroke, return true if this is a new point
    add: function(ctx, x, y) {
      if (this.filter(x, y)) {
        return false;
      } else {
        var dx = this.options.shadowDx;
        var dy = this.options.shadowDy;
        var midX = (this.lastX + x)/2;
        var midY = (this.lastY + y)/2;
        // draw shadow
        if (this.options.shadow) {
          ctx.lineWidth = this.options.inkWidth;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'butt';
          ctx.beginPath();
          ctx.moveTo(this.lastMidX + dx, this.lastMidY + dy);
          ctx.quadraticCurveTo(this.lastX + dx, this.lastY + dy, midX + dx, midY + dy);
          ctx.strokeStyle = this.options.shadowColor;
          ctx.stroke();
        }
        // draw ink
        ctx.lineWidth = this.options.inkWidth;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.lastMidX, this.lastMidY);
        ctx.quadraticCurveTo(this.lastX, this.lastY, midX, midY);
        ctx.strokeStyle = this.options.inkColor;
        ctx.stroke();
        this.lastX = x;
        this.lastY = y;
        this.lastMidX = midX;
        this.lastMidY = midY;
        return true;
      }
    },

    // end incremental drawing of the stroke
    end: function(ctx, length) {
      var dx = this.options.shadowDx;
      var dy = this.options.shadowDy;
      if (length === 1) {
        // draw shadow
        if (this.options.shadow) {
          ctx.beginPath();
          ctx.arc(this.lastX + dx, this.lastY + dy, this.options.inkWidth/2, 0, 2*Math.PI);
          ctx.fillStyle = this.options.shadowColor;
          ctx.fill();
        }
        // draw ink
        ctx.beginPath();
        ctx.arc(this.lastX, this.lastY, this.options.inkWidth/2, 0, 2*Math.PI);
        ctx.fillStyle = this.options.inkColor;
        ctx.fill();
      } else {
        // draw shadow
        if (this.options.shadow) {
          ctx.lineWidth = this.options.inkWidth;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'butt';
          ctx.beginPath();
          ctx.moveTo(this.lastMidX + dx, this.lastMidY + dy);
          ctx.lineTo(this.lastX + dx, this.lastY + dy);
          ctx.strokeStyle = this.options.shadowColor;
          ctx.stroke();
        }
        // draw ink
        ctx.lineWidth = this.options.inkWidth;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.lastMidX, this.lastMidY);
        ctx.lineTo(this.lastX, this.lastY);
        ctx.strokeStyle = this.options.inkColor;
        ctx.stroke();
      }
    }

  };

  return Stroker;
});
