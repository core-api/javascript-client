const axios = require('axios');
const codecs = require('./codecs');
const transports = require('./transports');

const get = function (url) {
  return this.transport.action(url, this.decoder);
};

module.exports = function () {
  return {
    get: get,
    decoder: codecs.coreJsonCodec(),
    transport: transports.httpTransport(),
  };
};
