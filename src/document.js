'use strict';

(function () {

  var chalk = require('chalk');
  var Immutable = require('immutable');
  var Map = Immutable.Map;

  var stringUtils = require('./utils/strings');
  var formatClass = stringUtils.formatClass;
  var formatContent = stringUtils.formatContent;
  var padWithLinebreaks = stringUtils.padWithLinebreaks;
  var joinWithLinebreaks = stringUtils.joinWithLinebreaks;

  var miscUtils = require('./utils/misc');
  var setDefault = miscUtils.setDefault;
  var defineReadOnlyProperties = miscUtils.defineReadOnlyProperties;

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
          return padWithLinebreaks(
            joinWithLinebreaks(
              chalk.green(formatClass(this)),
              formatContent(content)
            )
          );
        }
      }
    );

    return this;
  };

  module.exports = Document;

})();
