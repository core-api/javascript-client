const fetch = require('isomorphic-fetch')
const utils = require('../utils')

const parseResponse = (response, decoders) => {
  return response.text().then(text => {
    const contentType = response.headers.get('Content-Type')
    const decoder = utils.negotiateDecoder(decoders, contentType)
    return decoder.decode(text)
  })
}

export class HTTPTransport {
  constructor () {
    this.schemes = ['http', 'https']
  }

  action (url, decoders) {
    return fetch(url)
      .then(function (response) {
        if (response.ok) {
          return parseResponse(response, decoders)
        } else {
          throw Error('Network response was not ok.')
        }
      })
  }
}
