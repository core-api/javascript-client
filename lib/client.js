const codecs = require('./codecs');
const transports = require('./transports');
const utils = require('./utils');


class Client {
  constructor() {
    this.decoders = [new codecs.CoreJSONCodec(), new codecs.JSONCodec(), new codecs.TextCodec()];
    this.transports = [new transports.HTTPTransport()];
  }

  action(document, index, params) {
    throw Error("Not implementd yet.");
  }

  get(url) {
    const transport = utils.determineTransport(this.transports, url);
    return transport.action(url, this.decoders);
  }
}

module.exports = {
  Client: Client
};
