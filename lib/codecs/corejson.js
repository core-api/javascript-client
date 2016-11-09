const document = require('../document')

export class CoreJSONCodec {
  constructor () {
    this.mediaType = 'application/coreapi+json'
  }

  decode (text) {
    return new document.Document(text)
  }
}
