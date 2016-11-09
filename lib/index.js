const client = require('./client');
const document = require('./document');
const codecs = require('./codecs');
const transports = require('./transports');

const coreapi = {
  Client: client.Client,
  Document: document.Document,
  codecs: codecs,
  transports: transports,
};

module.exports = coreapi;
