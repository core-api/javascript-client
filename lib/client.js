const document = require('./document')
const codecs = require('./codecs')
const transportsModule = require('./transports')
const utils = require('./utils')

function lookupLink (node, keys) {
  for (let key of keys) {
    if (node instanceof document.Document) {
      node = node.content[key]
    } else {
      node = node[key]
    }
  }
  return node
}

class Client {
  constructor (decoders = null, transports = null) {
    this.decoders = decoders || [new codecs.CoreJSONCodec(), new codecs.JSONCodec(), new codecs.TextCodec()]
    this.transports = transports || [new transportsModule.HTTPTransport()]
  }

  action (document, keys) {
    const link = lookupLink(document, keys)
    return this.get(link.url)
  }

  get (url) {
    const transport = utils.determineTransport(this.transports, url)
    return transport.action(url, this.decoders)
  }
}

module.exports = {
  Client: Client
}
