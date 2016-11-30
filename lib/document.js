class Document {
  constructor (url = '', title = '', content = {}) {
    this.url = url
    this.title = title
    this.content = content
  }
}

class Link {
  constructor (url = '', fields = []) {
    this.url = url
    this.fields = fields
  }
}

class Field {
  constructor (name, location = '') {
    this.name = name
    this.location = location
  }
}

module.exports = {
  Document: Document,
  Link: Link,
  Field: Field
}
