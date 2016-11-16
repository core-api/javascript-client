const document = require('../document')

class CoreJSONCodec {
  constructor () {
    this.mediaType = 'application/coreapi+json'
  }

  decode (text) {
    return new document.Document(text)
  }
}

module.exports = {
  CoreJSONCodec: CoreJSONCodec
}
