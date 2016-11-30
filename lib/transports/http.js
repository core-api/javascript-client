const fetch = require('isomorphic-fetch')
const utils = require('../utils')
const URL = require('url-parse')
const urlTemplate = require('url-template')

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
    const fields = link.fields
    let queryParams = {}
    let pathParams = {}
    for (let idx = 0, len = fields.length; idx < len; idx++) {
      const field = fields[idx]
      if (field.location === 'query') {
        queryParams[field.name] = params[field.name]
      } else if (field.location === 'path') {
        pathParams[field.name] = params[field.name]
      }
    }

    let parsedUrl = urlTemplate.parse(link.url)
    parsedUrl = parsedUrl.expand(pathParams)
    parsedUrl = new URL(parsedUrl)
    parsedUrl.set('query', queryParams)
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
