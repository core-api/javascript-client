class TextCodec {
  constructor () {
    this.mediaType = 'text/*'
  }

  decode (text, options = {}) {
    return text
  }
}

module.exports = {
  TextCodec: TextCodec
}
