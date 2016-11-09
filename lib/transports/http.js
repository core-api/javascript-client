const fetch = require('isomorphic-fetch')
const utils = require('../utils')

class HTTPTransport {
  constructor () {
    this.schemes = ['http', 'https']
  }

  action (url, decoders) {
    return fetch(url)
      .then(function (response) {
        if (response.ok) {
          return response.text().then(function (text) {
            const contentType = response.headers.get('Content-Type')
            const decoder = utils.negotiateDecoder(decoders, contentType)
            return decoder.decode(text)
          })
        } else {
          throw Error('Network response was not ok.')
        }
      })
  }
}

module.exports = {
  HTTPTransport: HTTPTransport
}
