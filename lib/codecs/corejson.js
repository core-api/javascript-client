const document = require('../document');

const decode = function (text) {
  return new document.Document(text);
};

module.exports = function () {
  return {
    decode: decode,
    mediaType: 'application/coreapi+json',
  };
};
