var
  config = require('./config'),
  hwr = require('./hwr'),
  livepatch = require('./livepatch'),
  httpProxy = require('http-proxy'),
  express = require('express'),
  path = require('path');

// Proxy code

var proxy = new httpProxy.RoutingProxy();

proxy.on('proxyResponse', function(req, res, response) {
  var location = response.headers.location;
  if (location) {

    // make sure redirect URLs point to our domain
    location = location.replace('www.duolingo.com', config.SERVER);

    response.headers.location = location;
  }
});

proxy.on('proxyError', function(err, req, res) {
  console.log('Proxy error (' + err.message + ')');
});

// Server code

var app = express();

app.use(express.logger('dev'));

app.use('/volingo', express.static(path.join(__dirname, '../client')));

app.use('/hwr', hwr(config.API_KEY));

var headText =
  '<meta name="apple-mobile-web-app-capable" content="yes"/>' +
  '<link rel="apple-touch-icon" href="/volingo/images/icon.png"/>';

var bodyText =
  '<script src="/volingo/build/content-script.js"></script>';

app.use(livepatch(headText, bodyText));

app.all('*', function(req, res) {
  proxy.proxyRequest(req, res, {
    host: 'www.duolingo.com',
    port: 80,
    changeOrigin: true
  });
});

app.listen(config.PORT, function() {
  console.log('Server listening on port ' + config.PORT);
});
