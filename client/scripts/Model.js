define(function() {
  'use strict';

  var Model = function() {
    this.strokes = [];
  };

  Model.prototype = {

    // add a stroke to the list of strokes
    add: function(stroke) {
      this.strokes.push(stroke);
      this.onchange && this.onchange.call(this);
    },

    // clear the list of strokes
    clear: function() {
      this.strokes = [];
      this.onclear && this.onclear.call(this);
    },

    // return true if the list of strokes is empty
    isEmpty: function() {
      return this.strokes.length === 0;
    },

    // return a JSON representation of the model
    toJSON: function() {
      var json = [];
      for (var i=0; i<this.strokes.length; i++) {
        var stroke = this.strokes[i];
        json.push({
          type: 'stroke',
          x: stroke.x,
          y: stroke.y
        });
      }
      return json;
    }

  };

  return Model;
});
