const auth = require('./auth')
const client = require('./client')
const codecs = require('./codecs')
const document = require('./document')
const errors = require('./errors')
const transports = require('./transports')
const utils = require('./utils')

const coreapi = {
  Client: client.Client,
  Document: document.Document,
  Link: document.Link,
  auth: auth,
  codecs: codecs,
  errors: errors,
  transports: transports,
  utils: utils
}

module.exports = coreapi
