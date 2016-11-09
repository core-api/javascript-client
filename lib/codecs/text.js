export class TextCodec {
  constructor () {
    this.mediaType = 'text/*'
  }

  decode (text) {
    return text
  }
}
