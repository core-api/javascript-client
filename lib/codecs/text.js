class TextCodec {
  constructor() {
    this.mediaType = 'text/*';
  }

  decode(text) {
    return text;
  }
}

module.exports = {
  TextCodec: TextCodec,
};
