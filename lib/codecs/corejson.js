const document = require('../document')

function getString (obj, key) {
  const value = obj[key]
  if (typeof (value) === 'string') {
    return value
  }
  return ''
}

function primitiveToNode (data) {
  const isObject = data instanceof Object && !(data instanceof Array)
  if (isObject && data._type === 'document') {
    const title = getString(data._meta, 'title')
    return new document.Document('', title, data)
  } else if (isObject && data._type === 'link') {
    const url = getString(data, 'url')
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
