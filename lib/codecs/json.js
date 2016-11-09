class JSONCodec {
  constructor() {
    this.mediaType = 'application/json';
  }

  decode(text) {
    return JSON.parse(text);
  }
}

module.exports = {
  JSONCodec: JSONCodec,
};
