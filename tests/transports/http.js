const transports = require('../../lib/transports')
const codecs = require('../../lib/codecs')

const mockedFetch = (url) => {
  return new Promise((resolve, reject) => {
    const textPromise = () => {
      return new Promise((resolve, reject) => {
        process.nextTick(
          resolve('YEAAAH')
        )
      })
    }

    process.nextTick(
      resolve({
        status: 123,
        statusText: 'Nice!',
        ok: true,
        headers: {
          get (header) {
            return 'text/html'
          }
        },
        text: textPromise
      })
    )
  })
}

describe('Test the HTTPTransport', function () {
  it('should check the action function of an HTTP transport (text/html)', function () {
    const url = 'http://www.example.com/'

    const transport = new transports.HTTPTransport(mockedFetch)
    const decoders = [new codecs.JSONCodec(), new codecs.JSONCodec(), new codecs.TextCodec()]

    return transport.action(url, decoders)
      .then((res) => {
        expect(res).toEqual('YEAAAH')
      })
  })

  it('should check the action function of an HTTP transport (json)', function () {

  })
})
