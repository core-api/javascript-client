const URL = require('url-parse')

const determineTransport = function (transports, url) {
  const parsedUrl = new URL(url)
  const scheme = parsedUrl.protocol.replace(':', '')

  for (let transport of transports) {
    if (transport.schemes.includes(scheme)) {
      return transport
    }
  }

  throw Error(`Unsupported scheme in URL: ${url}`)
}

const negotiateDecoder = function (decoders, contentType) {
  if (contentType === undefined) {
    return decoders[0]
  }

  const fullType = contentType.toLowerCase().split(';')[0].trim()
  const mainType = fullType.split('/')[0] + '/*'
  const wildcardType = '*/*'
  const acceptableTypes = [fullType, mainType, wildcardType]

  for (let decoder of decoders) {
    if (acceptableTypes.includes(decoder.mediaType)) {
      return decoder
    }
  }

  throw Error(`Unsupported media in Content-Type header: ${contentType}`)
}

const csrfSafeMethod = function (method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method))
}

module.exports = {
  determineTransport: determineTransport,
  negotiateDecoder: negotiateDecoder,
  csrfSafeMethod: csrfSafeMethod
}
