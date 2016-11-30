const document = require('../document')
const URL = require('url-parse')

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

function getContent (data, baseUrl) {
  const excluded = ['_type', '_meta']
  var content = {}
  for (var property in data) {
    if (data.hasOwnProperty(property) && !excluded.includes(property)) {
      const key = unescapeKey(property)
      const value = primitiveToNode(data[property], baseUrl)
      content[key] = value
    }
  }
  return content
}

function primitiveToNode (data, baseUrl) {
  const isObject = data instanceof Object && !(data instanceof Array)

  if (isObject && data._type === 'document') {
    // Document
    const meta = getObject(data, '_meta')
    const url = getString(meta, 'url')
    const title = getString(meta, 'title')
    const content = getContent(data, baseUrl)
    return new document.Document(url, title, content)
  } else if (isObject && data._type === 'link') {
    // Link
    const relativeUrl = getString(data, 'url')
    const url = relativeUrl ? URL(relativeUrl, baseUrl).toString() : ''
    return new document.Link(url)
  } else if (isObject) {
    // Object
    let content = {}
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        content[key] = primitiveToNode(data[key], baseUrl)
      }
    }
    return content
  } else if (data instanceof Array) {
    // Object
    let content = []
    for (let idx = 0, len = data.length; idx < len; idx++) {
      content.push(primitiveToNode(data[idx], baseUrl))
    }
    return content
  }
  // Primitive
  return data
}

class CoreJSONCodec {
  constructor () {
    this.mediaType = 'application/coreapi+json'
  }

  decode (text, options = {}) {
    const data = JSON.parse(text)
    return primitiveToNode(data, options.url)
  }
}

module.exports = {
  CoreJSONCodec: CoreJSONCodec
}
