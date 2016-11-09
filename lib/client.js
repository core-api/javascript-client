const axios = require('axios');
const codecs = require('./codecs');
const transports = require('./transports');
const utils = require('./utils');

const get = function (url) {
  const transport = utils.determineTransport(this.transports, url);
  return transport.action(url, this.decoders);
};

module.exports = function () {
  return {
    get: get,
    decoders: [codecs.coreJsonCodec(), codecs.jsonCodec(), codecs.textCodec()],
    transports: [transports.httpTransport()],
  };
};
