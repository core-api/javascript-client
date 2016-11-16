class Document {
  constructor (url = '', title = '', content = {}) {
    this.url = url
    this.title = title
    this.content = content
  }
}

class Link {
  constructor (url = '') {
    this.url = url
  }
}

module.exports = {
  Document: Document,
  Link: Link
}
