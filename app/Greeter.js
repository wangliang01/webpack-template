// Greeter.js
var config = require('./data.json');

module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = config.text;
  return greet;
};