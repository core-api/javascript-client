const transports = require('../../lib/transports')
const codecs = require('../../lib/codecs')
const errors = require('../../lib/errors')
const document = require('../../lib/document')
const testUtils = require('../__helpers__/utils')

describe('Test the HTTPTransport', function () {
  const decoders = [new codecs.JSONCodec(), new codecs.JSONCodec(), new codecs.TextCodec()]

  it('should check the action function of an HTTP transport (text/html)', function () {
    const url = 'http://www.example.com/'
    const link = new document.Link(url)
    const transport = new transports.HTTPTransport(testUtils.mockedFetch('Hello, world', 'text/html'))

    return transport.action(link, decoders)
      .then((res) => {
        expect(res).toEqual('Hello, world')
      })
  })

  it('should check the action function of an HTTP transport (json)', function () {
    const url = 'http://www.example.com/'
    const link = new document.Link(url)
    const transport = new transports.HTTPTransport(testUtils.mockedFetch('{"text": "Hello, world"}', 'application/json'))

    return transport.action(link, decoders)
      .then(res => expect(res).toEqual({text: 'Hello, world'}))
  })

  it('should check the action function of an HTTP transport (network fail)', function () {
    const url = 'http://www.example.com/'
    const link = new document.Link(url)
    const transport = new transports.HTTPTransport(testUtils.mockedFetch('ERROR', 'text/html', 500))

    expect(transport.action(link, decoders).then(() => {}).catch(() => {})).toThrow()
  })

  it('should check the action function of an HTTP transport (json) with query params', function () {
    const url = 'http://www.example.com/'
    const fields = [new document.Field('page', false, 'query')]
    const link = new document.Link(url, fields)
    const transport = new transports.HTTPTransport(testUtils.echoUrl)
    const params = {
      page: 23
    }

    return transport.action(link, decoders, params)
      .then((res) => {
        expect(res).toEqual({url: 'http://www.example.com/?page=23'})
      })
  })

  it('should check the action function of an HTTP transport (json) with path params', function () {
    const url = 'http://www.example.com/{user}/'
    const fields = [new document.Field('user', true, 'path')]
    const link = new document.Link(url, fields)
    const transport = new transports.HTTPTransport(testUtils.echoUrl)
    const params = {
      user: 23
    }

    return transport.action(link, decoders, params)
      .then((res) => {
        expect(res).toEqual({url: 'http://www.example.com/23/'})
      })
  })

  it('should check the action function of an HTTP transport (json) with missing optional query params', function () {
    const url = 'http://www.example.com/'
    const fields = [new document.Field('page', false, 'query')]
    const link = new document.Link(url, fields)
    const transport = new transports.HTTPTransport(testUtils.echoUrl)
    const params = {}

    return transport.action(link, decoders, params)
      .then((res) => {
        expect(res).toEqual({url: 'http://www.example.com/'})
      })
  })

  it('should check the action function of an HTTP transport (json) with missing required parameter', function () {
    const url = 'http://www.example.com/{user}/'
    const fields = [new document.Field('user', true, 'path')]
    const link = new document.Link(url, fields)
    const transport = new transports.HTTPTransport(testUtils.echoUrl)
    const params = {}

    const callTransport = () => transport.action(link, decoders, params)
    expect(callTransport).toThrowError(new errors.ParameterError('Missing required field: "user"'))
  })

  it('should check the action function of an HTTP transport (json) with unknown paramater', function () {
    const url = 'http://www.example.com/'
    const link = new document.Link(url)
    const transport = new transports.HTTPTransport(testUtils.echoUrl)
    const params = {
      hello: 'world'
    }

    const callTransport = () => transport.action(link, decoders, params)
    expect(callTransport).toThrowError(new errors.ParameterError('Unknown parameter: "hello"'))
  })
})
