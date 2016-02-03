'use strict';

(function () {

  var constants = require('../constants');
  var INDENT = constants.INDENT;
  var LINEBREAK = constants.LINEBREAK;

  var miscUtils = require('./misc');
  var argumentsToArray = miscUtils.argumentsToArray;

  var formatClass = function (myClass) {
    return '<' + myClass.title + ' ' + myClass.url + '>';
  };

  var formatContent = function (content) {
    return content.map(function (value, key) {
      return INDENT + key + ': ' + value;
    }).join(LINEBREAK);
  };

  var padWithLinebreaks = function (string) {
    return LINEBREAK + string + LINEBREAK;
  };

  var joinWithLinebreaks = function () {
    var args = argumentsToArray(arguments);
    var returnString = args[0];

    for (var i = 1; i < args.length; i += 1) {
      returnString += LINEBREAK + args[i];
    }

    return returnString;
  };

  module.exports = {
    formatClass: formatClass,
    formatContent: formatContent,
    padWithLinebreaks: padWithLinebreaks,
    joinWithLinebreaks: joinWithLinebreaks
  };


})();
