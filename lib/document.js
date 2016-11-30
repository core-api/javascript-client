class Document {
  constructor (url = '', title = '', content = {}) {
    this.url = url
    this.title = title
    this.content = content
  }
}

class Link {
  constructor (url, method, fields = []) {
    if (url === undefined) {
      throw new Error('url argument is required')
    }

    if (method === undefined) {
      throw new Error('method argument is required')
    }

    this.url = url
    this.method = method
    this.fields = fields
  }
}

class Field {
  constructor (name, required = false, location = '') {
    this.name = name
    this.required = required
    this.location = location
  }
}

module.exports = {
  Document: Document,
  Link: Link,
  Field: Field
}
