const client = require('./client')
const document = require('./document')
const codecs = require('./codecs')
const transports = require('./transports')
const utils = require('./utils')

const coreapi = {
  Client: client.Client,
  Document: document.Document,
  codecs: codecs,
  transports: transports,
  utils: utils
}

module.exports = coreapi
