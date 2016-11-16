const document = require('../document')

function primitiveToNode (data) {
  if (data instanceof Object && data._type === 'document') {
    return new document.Document('', '', data)
  } else if (data instanceof Object && data._type === 'link') {
    const url = data.url
    return new document.Link(url)
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
