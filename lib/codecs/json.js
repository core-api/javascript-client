class JSONCodec {
  constructor () {
    this.mediaType = 'application/json'
  }

  decode (text, options = {}) {
    return JSON.parse(text)
  }
}

module.exports = {
  JSONCodec: JSONCodec
}
