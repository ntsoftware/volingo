var
  express = require('express'),
  request = require('request');

exports = module.exports = function(apiKey) {

  var _bodyParser = express.bodyParser();

  var _hwr = function(req, res, next) {
    var hwrInput = {
      hwrParameter: {
        language: req.body.locale,
        hwrInputMode: 'CURSIVE',
        hwrProperties: {},
        resultDetail: 'TEXT',
        contentTypes: ['text']
      },
      inputUnits: [{
        hwrInputType: 'MULTI_LINE_TEXT',
        components: JSON.parse(req.body.strokes)
      }]
    };

    var form = {
      apiKey: apiKey,
      hwrInput: JSON.stringify(hwrInput)
    };

    if (req.body.instanceId) {
      form.instanceId = req.body.instanceId;
    }

    var url = 'http://myscript-webservices.visionobjects.com/api/myscript/v2.0/hwr/doSimpleRecognition.json';

    request.post(url).form(form).pipe(res);
  };

  return function(req, res, next) {
    _bodyParser(req, res, function(err) {
      if (err) return next(err);
      _hwr(req, res, next);
    });
  }
};
