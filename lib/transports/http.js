const fetch = require('isomorphic-fetch')
const utils = require('../utils')
const URL = require('url-parse')

const parseResponse = (response, decoders) => {
  return response.text().then(text => {
    const contentType = response.headers.get('Content-Type')
    const decoder = utils.negotiateDecoder(decoders, contentType)
    const options = {url: response.url}
    return decoder.decode(text, options)
  })
}

class HTTPTransport {
  constructor (_fetch) {
    this.schemes = ['http', 'https']
    this.fetch = _fetch || fetch
  }

  action (link, decoders, params = {}) {
    const parsedUrl = new URL(link.url)
    parsedUrl.set('query', params)
    const finalUrl = parsedUrl.toString()

    return this.fetch(finalUrl)
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
