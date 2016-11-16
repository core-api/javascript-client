const codecs = require('../../lib/codecs')
const document = require('../../lib/document')

describe('Test the CoreJSON Codec', function () {
  const codec = new codecs.CoreJSONCodec()

  it('should test decoding a document', function () {
    const text = '{"_type": "document"}'
    const node = codec.decode(text)
    expect(node instanceof document.Document).toBeTruthy()
  })

  it('should test decoding an object', function () {
    const text = '{"text": "Hello World!"}'
    const node = codec.decode(text)
    expect(node instanceof Object).toBeTruthy()
  })

  it('should test decoding a link', function () {
    const text = '{"_type": "link", "url": "http://example.com/"}'
    const node = codec.decode(text)
    expect(node instanceof document.Link).toBeTruthy()
    expect(node.url).toEqual('http://example.com/')
  })

  it('should test decoding a primitive', function () {
    const text = '123'
    const node = codec.decode(text)
    expect(node).toEqual(123)
  })
})
