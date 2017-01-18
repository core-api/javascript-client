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
  constructor (options = {}) {
    this.schemes = ['http', 'https']
    this.csrf = options.csrf
    this.fetch = options.fetch || fetch
  }

  action (link, decoders, params = {}) {
    const fields = link.fields
    const method = link.method.toUpperCase()
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
      } else if (field.location === 'body') {
        formParams = params[field.name]
        hasBody = true
      }
    }

    // Check for any parameters that did not have a matching field
    for (var property in params) {
      if (params.hasOwnProperty(property) && !fieldNames.includes(property)) {
        throw new errors.ParameterError(`Unknown parameter: "${property}"`)
      }
    }

    let options = {method: method, headers: {}}

    if (hasBody) {
      if (link.encoding === 'application/json') {
        options.body = JSON.stringify(formParams)
        options.headers = {
          'Content-Type': 'application/json'
        }
      } else if (link.encoding === 'multipart/form-data') {
        // FIXME!
      } else if (link.encoding === 'application/x-www-form-urlencoded') {
        var formBody = []
        for (var paramKey in formParams) {
          var encodedKey = encodeURIComponent(paramKey)
          var encodedValue = encodeURIComponent(formParams[paramKey])
          formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')

        options.body = formBody
        options.headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }

    if (this.csrf) {
      options.credentials = 'same-origin'
      if (!utils.csrfSafeMethod(method)) {
        Object.assign(options.headers, this.csrf)
      }
    }

    let parsedUrl = urlTemplate.parse(link.url)
    parsedUrl = parsedUrl.expand(pathParams)
    parsedUrl = new URL(parsedUrl)
    parsedUrl.set('query', queryParams)
    const finalUrl = parsedUrl.toString()

    return this.fetch(finalUrl, options)
      .then(function (response) {
        return parseResponse(response, decoders).then(function (data) {
          if (response.ok) {
            return data
          } else {
            const title = response.status + ' ' + response.statusText
            const error = new errors.ErrorMessage(title, data)
            return Promise.reject(error)
          }
        })
      })
  }
}

module.exports = {
  HTTPTransport: HTTPTransport
}
