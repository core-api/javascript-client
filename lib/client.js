const axios = require('axios');
const codecs = require('./codecs');
const transports = require('./transports');

const get = function (url) {
  return this.transports[0].action(url, this.decoders);
};

module.exports = function () {
  return {
    get: get,
    decoders: [codecs.coreJsonCodec()],
    transports: [transports.httpTransport()],
  };
};
