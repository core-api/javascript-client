const document = require('./document');

const decode = function (text) {
  return document(text);
};

module.exports = function () {
  return {
    decode: decode
  };
};
