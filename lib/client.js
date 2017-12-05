const document = require('./document')
const codecs = require('./codecs')
const errors = require('./errors')
const transports = require('./transports')
const utils = require('./utils')

function lookupLink (node, schema_keys) {
  for (let key of schema_keys) {
    if (node instanceof document.Document) {
      node = node.content[key]
    } else {
      node = node[key]
    }
    if (node === undefined) {
      throw new errors.LinkLookupError(`Invalid link lookup: ${JSON.stringify(schema_keys)}`)
    }
  }
  if (!(node instanceof document.Link)) {
    throw new errors.LinkLookupError(`Invalid link lookup: ${JSON.stringify(schema_keys)}`)
  }
  return node
}

class Client {
  constructor (options = {}) {
    const transportOptions = {
      auth: options.auth || null,
      headers: options.headers || {},
      requestCallback: options.requestCallback,
      responseCallback: options.responseCallback
    }

    this.decoders = options.decoders || [new codecs.CoreJSONCodec(), new codecs.JSONCodec(), new codecs.TextCodec()]
    this.transports = options.transports || [new transports.HTTPTransport(transportOptions)]
  }

  action (document, schema_keys, params = {}) {
    const link = lookupLink(document, schema_keys)
    const transport = utils.determineTransport(this.transports, link.url)
    return transport.action(link, this.decoders, params)
  }

  get (url) {
    const link = new document.Link(url, 'get')
    const transport = utils.determineTransport(this.transports, url)
    return transport.action(link, this.decoders)
  }
}

module.exports = {
  Client: Client
}
