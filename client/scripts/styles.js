require(['text!../styles/styles.css'], function(css) {
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
});
