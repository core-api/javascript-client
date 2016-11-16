const document = require('../document')

function primitiveToNode (data) {
  if (data instanceof Object && data._type === 'document') {
    return new document.Document('', '', data)
  } else if (data instanceof Object && data._type === 'link') {
    return new document.Link('')
  }
  return data
}

class CoreJSONCodec {
  constructor () {
    this.mediaType = 'application/coreapi+json'
  }

  decode (text) {
    const data = JSON.parse(text)
    return primitiveToNode(data)
  }
}

module.exports = {
  CoreJSONCodec: CoreJSONCodec
}
