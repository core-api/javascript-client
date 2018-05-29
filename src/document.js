class Document {
  constructor (url = '', title = '', description = '', content = {}) {
    this.url = url
    this.title = title
    this.description = description
    this.content = content
  }
}

class Link {
  constructor (url, method, encoding = 'application/json', fields = [], title = '', description = '') {
    if (url === undefined) {
      throw new Error('url argument is required')
    }

    if (method === undefined) {
      throw new Error('method argument is required')
    }

    this.url = url
    this.method = method
    this.encoding = encoding
    this.fields = fields
    this.title = title
    this.description = description
  }
}

class Field {
  constructor (name, required = false, location = '', description = '') {
    if (name === undefined) {
      throw new Error('name argument is required')
    }

    this.name = name
    this.required = required
    this.location = location
    this.description = description
  }
}

module.exports = {
  Document: Document,
  Link: Link,
  Field: Field
}
