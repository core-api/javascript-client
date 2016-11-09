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
    const doDetermine = function (url) {
      return utils.determineTransport([new coreapi.transports.HTTPTransport()], url)
    }
    expect(doDetermine).toThrow()
  })
})
