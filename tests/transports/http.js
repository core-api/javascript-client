const transports = require('../../lib/transports')
const codecs = require('../../lib/codecs')
const testUtils = require('../__helpers__/utils')

describe('Test the HTTPTransport', function () {
  it('should check the action function of an HTTP transport (text/html)', function () {
    const url = 'http://www.example.com/'

    const transport = new transports.HTTPTransport(testUtils.mockedFetch)
    const decoders = [new codecs.JSONCodec(), new codecs.JSONCodec(), new codecs.TextCodec()]

    return transport.action(url, decoders)
      .then((res) => {
        expect(res).toEqual('YEAAAH')
      })
  })

  xit('should check the action function of an HTTP transport (json)', function () {

  })
})
