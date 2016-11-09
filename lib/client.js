const codecs = require('./codecs');
const transports = require('./transports');
const utils = require('./utils');

const get = function (url) {
  const transport = utils.determineTransport(this.transports, url);
  return transport.action(url, this.decoders);
};

const action = function (document, index, params) {
  throw Error("Not implemented yet.");
};

module.exports = function () {
  return {
    get: get,
    action: action,
    decoders: [codecs.coreJsonCodec(), codecs.jsonCodec(), codecs.textCodec()],
    transports: [transports.httpTransport()],
  };
};
