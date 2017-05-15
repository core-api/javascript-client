const coreapi = require('../lib/index')
const utils = require('../lib/utils')

describe('Test the Utils/determineTransport function', function () {
  it('should return the http transport (https)', function () {
    const url = 'http://www.coreapi.com/'
    const result = utils.determineTransport([new coreapi.transports.HTTPTransport()], url)
    expect(result instanceof coreapi.transports.HTTPTransport).toBeTruthy()
  })

  it('should return the http transport (https)', function () {
    const url = 'https://www.coreapi.com/'
    const result = utils.determineTransport([new coreapi.transports.HTTPTransport()], url)
    expect(result instanceof coreapi.transports.HTTPTransport).toBeTruthy()
  })

  it('should throw an error if it is an unsupported url', function () {
    const doDetermine = url => utils.determineTransport([new coreapi.transports.HTTPTransport()], url)
    expect(doDetermine).toThrow()
  })
})

describe('Test the Utils/negotiateDecoder function', function () {
  const decoders = new coreapi.Client().decoders

  it('should return the default decoder if content type is undefined', function () {
    const contentType = undefined
    const result = utils.negotiateDecoder(decoders, contentType)
    expect(result instanceof coreapi.codecs.CoreJSONCodec).toBeTruthy()
  })

  it('should return the default decoder if content type is null', function () {
    const contentType = null
    const result = utils.negotiateDecoder(decoders, contentType)
    expect(result instanceof coreapi.codecs.CoreJSONCodec).toBeTruthy()
  })

  it('should return the decoder for a content type (application/json)', function () {
    const contentType = 'application/json'
    const result = utils.negotiateDecoder(decoders, contentType)
    expect(result instanceof coreapi.codecs.JSONCodec).toBeTruthy()
  })

  it('should return the decoder for a content type (text/html)', function () {
    const contentType = 'text/html'
    const result = utils.negotiateDecoder(decoders, contentType)
    expect(result instanceof coreapi.codecs.TextCodec).toBeTruthy()
  })

  it('should throw an error if it is an unsupported url', function () {
    const contentType = 'hello/world'
    const doDetermine = url => utils.negotiateDecoder(decoders, contentType)
    expect(doDetermine).toThrow()
  })
})
