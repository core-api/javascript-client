const client = require('./client');
const document = require('./document');

const coreapi = {
  client: client,
  Document: document.Document,
};

module.exports = coreapi;
