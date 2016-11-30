const coreapi = require('../lib/index')
const errors = require('../lib/errors')
const transportsModule = require('../lib/transports')
const testUtils = require('./__helpers__/utils')

describe('Test the Client', function () {
  it('should get the content of page (text/html)', function () {
    const fetch = testUtils.mockedFetch('Hello, world', 'text/html')
    const transport = new transportsModule.HTTPTransport(fetch)
    const client = new coreapi.Client(null, [transport])
    const url = 'http://example.com'

    client.get(url)
      .then((data) => {
        expect(typeof data).toEqual('string')
        expect(data).toEqual('Hello, world')
      })
      .catch((error) => {
        expect(error).toNotExist()
      })
  })

  it('should get the content of page (application/json)', function () {
    const fetch = testUtils.mockedFetch('{"text": "hello"}', 'application/json')
    const transport = new transportsModule.HTTPTransport(fetch)
    const client = new coreapi.Client(null, [transport])
    const url = 'http://example.com'

    client.get(url)
      .then((data) => {
        expect(typeof data).toEqual('object')
        expect(data).toEqual({'text': 'hello'})
      })
      .catch((error) => {
        expect(error).toNotExist()
      })
  })

  it('action should get the content of page (application/json)', function () {
    const fetch = testUtils.mockedFetch('{"text": "hello"}', 'application/json')
    const transport = new transportsModule.HTTPTransport(fetch)
    const client = new coreapi.Client(null, [transport])
    const document = new coreapi.Document('', '', '', {nested: {link: new coreapi.Link('http://example.com', 'get')}})

    client.action(document, ['nested', 'link'])
      .then((data) => {
        expect(typeof data).toEqual('object')
        expect(data).toEqual({'text': 'hello'})
      })
      .catch((error) => {
        expect(error).toNotExist()
      })
  })

  it('action should raise an error for invalid link keys', function () {
    const fetch = testUtils.mockedFetch('{"text": "hello"}', 'application/json')
    const transport = new transportsModule.HTTPTransport(fetch)
    const client = new coreapi.Client(null, [transport])
    const document = new coreapi.Document('', '', '', {nested: {link: new coreapi.Link('http://example.com', 'get')}})

    client.action(document, ['nested', 'link'])
      .then((data) => {
        expect(typeof data).toEqual('object')
        expect(data).toEqual({'text': 'hello'})
      })
      .catch((error) => {
        expect(error).toNotExist()
      })

    let callAction = () => client.action(document, ['hello', 'world'])
    expect(callAction).toThrowError(new errors.LinkLookupError('Invalid link lookup: ["hello","world"]'))

    callAction = () => client.action(document, ['nested'])
    expect(callAction).toThrowError(new errors.LinkLookupError('Invalid link lookup: ["nested"]'))
  })
})
