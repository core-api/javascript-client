const transports = require('../../lib/transports')
const codecs = require('../../lib/codecs')
const testUtils = require('../__helpers__/utils')

describe('Test the HTTPTransport', function () {
  it('should check the action function of an HTTP transport (text/html)', function () {
    const url = 'http://www.example.com/'
    const transport = new transports.HTTPTransport(testUtils.mockedFetch('Hello, world', 'text/html'))
    const decoders = [new codecs.JSONCodec(), new codecs.JSONCodec(), new codecs.TextCodec()]

    return transport.action(url, decoders)
      .then((res) => {
        expect(res).toEqual('Hello, world')
      })
  })

  it('should check the action function of an HTTP transport (json)', function () {
    const url = 'http://www.example.com/'
    const transport = new transports.HTTPTransport(testUtils.mockedFetch('{"text": "Hello, world"}', 'application/json'))
    const decoders = [new codecs.JSONCodec(), new codecs.JSONCodec(), new codecs.TextCodec()]

    return transport.action(url, decoders)
      .then((res) => {
        expect(res).toEqual({text: 'Hello, world'})
      })
  })

  it('should check the action function of an HTTP transport (network fail)', function () {
    const url = 'http://www.example.com/'
    const transport = new transports.HTTPTransport(testUtils.mockedFetch('ERROR', 'text/html', 500))
    const decoders = [new codecs.JSONCodec(), new codecs.JSONCodec(), new codecs.TextCodec()]
    expect(transport.action(url, decoders).then(() => {}).catch(() => {})).toThrow()
  })
})
