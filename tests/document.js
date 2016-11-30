const document = require('../lib/document')

describe('Test the Link', function () {
  it('should raise an exception if the url is missing', function () {
    const callTransport = () => new document.Link()
    expect(callTransport).toThrowError(new Error('url argument is required'))
  })

  it('should raise an exception if the method is missing', function () {
    const callTransport = () => new document.Link('http://example.com/')
    expect(callTransport).toThrowError(new Error('method argument is required'))
  })
})

describe('Test the Field', function () {
  it('should raise an exception if the name is missing', function () {
    const callTransport = () => new document.Field()
    expect(callTransport).toThrowError(new Error('name argument is required'))
  })
})
