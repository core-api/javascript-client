const fetch = require('isomorphic-fetch')
const utils = require('../utils')

const parseResponse = (response, decoders) => {
  return response.text().then(text => {
    const contentType = response.headers.get('Content-Type')
    const decoder = utils.negotiateDecoder(decoders, contentType)
    return decoder.decode(text)
  })
}

class HTTPTransport {
  constructor (_fetch) {
    this.schemes = ['http', 'https']
    this.fetch = _fetch || fetch
  }

  action (url, decoders) {
    return this.fetch(url)
      .then(function (response) {
        if (response.ok) {
          return parseResponse(response, decoders)
        } else {
          throw Error('Network response was not ok.')
        }
      })
  }
}

module.exports = {
  HTTPTransport: HTTPTransport
}
