const document = require('../document')

function unescapeKey (key) {
  if (key.match(/__(type|meta)$/)) {
    return key.substring(1)
  }
  return key
}

function getString (obj, key) {
  const value = obj[key]
  if (typeof (value) === 'string') {
    return value
  }
  return ''
}

function getObject (obj, key) {
  const value = obj[key]
  if (typeof (value) === 'object') {
    return value
  }
  return {}
}

function getContent (data) {
  const excluded = ['_type', '_meta']
  var content = {}
  for (var property in data) {
    if (data.hasOwnProperty(property) && !excluded.includes(property)) {
      const key = unescapeKey(property)
      const value = primitiveToNode(data[property])
      content[key] = value
    }
  }
  return content
}

function primitiveToNode (data) {
  const isObject = data instanceof Object && !(data instanceof Array)
  if (isObject && data._type === 'document') {
    const meta = getObject(data, '_meta')
    const url = getString(meta, 'url')
    const title = getString(meta, 'title')
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
