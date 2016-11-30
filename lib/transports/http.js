const fetch = require('isomorphic-fetch')
const errors = require('../errors')
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
    let formParams = {}
    let fieldNames = []
    let hasBody = false

    for (let idx = 0, len = fields.length; idx < len; idx++) {
      const field = fields[idx]

      // Ensure any required fields are included
      if (!params.hasOwnProperty(field.name)) {
        if (field.required) {
          throw new errors.ParameterError(`Missing required field: "${field.name}"`)
        } else {
          continue
        }
      }

      fieldNames.push(field.name)
      if (field.location === 'query') {
        queryParams[field.name] = params[field.name]
      } else if (field.location === 'path') {
        pathParams[field.name] = params[field.name]
      } else if (field.location === 'form') {
        formParams[field.name] = params[field.name]
        hasBody = true
      }
    }

    // Check for any parameters that did not have a matching field
    for (var property in params) {
      if (params.hasOwnProperty(property) && !fieldNames.includes(property)) {
        throw new errors.ParameterError(`Unknown parameter: "${property}"`)
      }
    }

    let options = {method: link.method}
    if (hasBody) {
      options.body = JSON.stringify(formParams)
    }

    let parsedUrl = urlTemplate.parse(link.url)
    parsedUrl = parsedUrl.expand(pathParams)
    parsedUrl = new URL(parsedUrl)
    parsedUrl.set('query', queryParams)
    const finalUrl = parsedUrl.toString()

    return this.fetch(finalUrl, options)
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
