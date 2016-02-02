'use strict';

(function () {

  var chalk = require('chalk');
  var Immutable = require('immutable');
  var fromJS = Immutable.fromJS;
  var Map = Immutable.Map;

  var INDENT = '    ';
  var LINEBREAK = '\n';

  var setDefault = function (value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
  };

  var defineProperties = function (writable, obj, properties) {
    writable = setDefault(writable, true);

    for (var key in properties) {
      Object.defineProperty(
        obj,
        key,
        {
          writable: writable,
          enumerable: true,
          value: properties[key]
        }
      )
    }
  };

  var defineEditableProperties = defineProperties.bind(null, true);
  var defineReadOnlyProperties = defineProperties.bind(null, false);

  var argumentsToArray = function (args) {
    return Array.prototype.slice.call(args);
  };

  var stringUtils = {
    formatClass: function (myClass) {
      return '<' + myClass.title + ' ' + myClass.url + '>';
    },
    formatContent: function (content) {
      return content.map(function (key, value) {
        return INDENT + key + ': ' + value;
      }).join(LINEBREAK);
    },
    padWithLinebreaks: function (string) {
      return LINEBREAK + string + LINEBREAK;
    },
    joinWithLinebreaks: function () {
      var args = argumentsToArray(arguments);
      var returnString = args[0];

      for (var i = 1; i < args.length; i += 1) {
        returnString += LINEBREAK + args[i];
      }

      return returnString;
    }
  };

  var Document = function (title, url, data) {
    title = setDefault(title, '');
    url = setDefault(url, '');
    data = setDefault(data, {});

    if (typeof title !== 'string') {
      throw new Error('Title must be a string');
    }
    if (typeof url !== 'string') {
      throw new Error('URL must be a string');
    }
    if (typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Data must be an object');
    }

    var content = Map(data);

    defineReadOnlyProperties(
      this,
      {
        title: title,
        url: url,
        get: function (key, defaultValue) {
          return content.get(key, defaultValue);
        },
        toString: function () {
          return stringUtils.padWithLinebreaks(
            stringUtils.joinWithLinebreaks(
              chalk.green(stringUtils.formatClass(this)),
              stringUtils.formatContent(content)
            )
          );
        }
      }
    );

    return this;
  };

  module.exports = {
    Document: Document
  };

})();
