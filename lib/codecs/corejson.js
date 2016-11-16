const document = require('../document')

function getString (obj, key) {
  const value = obj[key]
  if (typeof (value) === 'string') {
    return value
  }
  return ''
}

function getContent (data) {
  const excluded = ['_type', '_meta']
  var content = {}
  for (var property in data) {
    if (data.hasOwnProperty(property) && !excluded.includes(property)) {
      content[property] = primitiveToNode(data[property])
    }
  }
  return content
}

function primitiveToNode (data) {
  const isObject = data instanceof Object && !(data instanceof Array)
  if (isObject && data._type === 'document') {
    const url = getString(data._meta, 'url')
    const title = getString(data._meta, 'title')
    const content = getContent(data)
    return new document.Document(url, title, content)
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
