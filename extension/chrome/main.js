window.addEventListener('load', function() {
  var url = 'http://volingo.herokuapp.com';

  var volingo = {
    hwrUrl: url + '/hwr',
    contactUrl: 'mailto:contact@example.com',
    contactText: 'contact'
  };

  var configScript = document.createElement('script');
  configScript.text = 'window.volingo=' + JSON.stringify(volingo) + ';';
  document.body.appendChild(configScript);

  var contentScript = document.createElement('script');
  contentScript.src = url + '/volingo/build/content-script.js';
  document.body.appendChild(contentScript);
});
