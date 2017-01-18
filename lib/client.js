const document = require('./document')
const codecs = require('./codecs')
const errors = require('./errors')
const transportsModule = require('./transports')
const utils = require('./utils')

function lookupLink (node, keys) {
  for (let key of keys) {
    if (node instanceof document.Document) {
      node = node.content[key]
    } else {
      node = node[key]
    }
    if (node === undefined) {
      throw new errors.LinkLookupError(`Invalid link lookup: ${JSON.stringify(keys)}`)
    }
  }
  if (!(node instanceof document.Link)) {
    throw new errors.LinkLookupError(`Invalid link lookup: ${JSON.stringify(keys)}`)
  }
  return node
}

class Client {
  constructor (decoders = null, transports = null, csrf = null) {
    this.decoders = decoders || [new codecs.CoreJSONCodec(), new codecs.JSONCodec(), new codecs.TextCodec()]
    this.transports = transports || [new transportsModule.HTTPTransport({csrf: csrf})]
  }

  action (document, keys, params = {}) {
    const link = lookupLink(document, keys)
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
