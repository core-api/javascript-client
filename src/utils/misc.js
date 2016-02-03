'use strict';

(function () {

  var setDefault = function (value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
  };

  var argumentsToArray = function (args) {
    return Array.prototype.slice.call(args);
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
      );
    }
  };

  var defineEditableProperties = defineProperties.bind(null, true);
  var defineReadOnlyProperties = defineProperties.bind(null, false);

  module.exports = {
    setDefault: setDefault,
    argumentsToArray: argumentsToArray,
    defineProperties: defineProperties,
    defineReadOnlyProperties: defineReadOnlyProperties,
    defineEditableProperties: defineEditableProperties
  };

})();
