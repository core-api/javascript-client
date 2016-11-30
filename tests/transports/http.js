const transports = require('../../lib/transports')
const codecs = require('../../lib/codecs')
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
    const fields = [new document.Field('page', 'query')]
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
    const fields = [new document.Field('user', 'path')]
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

  xit('should check the action function of an HTTP transport (json) with invalid path params', function () {

  })

  xit('should check the action function of an HTTP transport (json) with ignored query params', function () {

  })
})
