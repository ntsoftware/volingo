var
  tamper = require('tamper');

exports = module.exports = function(headText, bodyText) {

  var _tamper = tamper(function(req, res) {
    return function(body) {
      return body
        .replace('</head>', headText + '</head>')
        .replace('</body>', bodyText + '</body>');
    };
  });

  return function(req, res, next) {
    if (req.headers['accept'].indexOf('text/html') >= 0) {
      delete req.headers['accept-encoding']; // disable compression
      _tamper(req, res, next);
    } else {
      next();
    }
  }
};
