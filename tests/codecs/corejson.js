const codecs = require('../../lib/codecs')
const document = require('../../lib/document')

describe('Test the CoreJSON Codec', function () {
  const codec = new codecs.CoreJSONCodec()

  it('should test decoding a document', function () {
    const text = '{"_type": "document", "_meta": {"title": "Example"}, "value": 123}'
    const node = codec.decode(text)

    expect(node instanceof document.Document).toBeTruthy()
    expect(node.url).toEqual('')
    expect(node.title).toEqual('Example')
    expect(node.content).toEqual({value: 123})
  })

  it('should test decoding a document (escapes content)', function () {
    const text = '{"_type": "document", "__meta": 123}'
    const node = codec.decode(text)

    expect(node instanceof document.Document).toBeTruthy()
    expect(node.content).toEqual({_meta: 123})
  })

  it('should test decoding a document (including a link)', function () {
    const text = '{"_type": "document", "link": {"_type": "link", "url": "http://example.com/"}}'
    const node = codec.decode(text)

    expect(node instanceof document.Document).toBeTruthy()
    expect(node.content).toEqual({link: new document.Link('http://example.com/', 'get')})
  })

  it('should test decoding a document (including a link with a query parameter)', function () {
    const text = '{"_type": "document", "link": {"_type": "link", "url": "http://example.com/", "fields": [{"name": "page", "location": "query"}]}}'
    const node = codec.decode(text)

    expect(node instanceof document.Document).toBeTruthy()
    expect(node.content).toEqual({link: new document.Link('http://example.com/', 'get', 'application/json', [new document.Field('page', false, 'query')])})
  })

  it('should test decoding a document (including a nested link)', function () {
    const text = '{"_type": "document", "nested": {"link": {"_type": "link", "url": "http://example.com/"}}}'
    const node = codec.decode(text)

    expect(node instanceof document.Document).toBeTruthy()
    expect(node.content).toEqual({nested: {link: new document.Link('http://example.com/', 'get')}})
  })

  it('should test decoding a document (including an array nested link)', function () {
    const text = '{"_type": "document", "nested": [{"_type": "link", "url": "http://example.com/"}]}'
    const node = codec.decode(text)

    expect(node instanceof document.Document).toBeTruthy()
    expect(node.content).toEqual({nested: [new document.Link('http://example.com/', 'get')]})
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

  it('should test decoding a link (invalid url)', function () {
    const text = '{"_type": "link", "url": 123}'
    const node = codec.decode(text)
    expect(node instanceof document.Link).toBeTruthy()
    expect(node.url).toEqual('')
  })

  it('should test decoding a link with a required field', function () {
    const text = '{"_type": "link", "url": "http://example.com/", "fields": [{"name": "foo", "required": true}]}'
    const node = codec.decode(text)
    expect(node instanceof document.Link).toBeTruthy()
    expect(node.fields).toEqual([new document.Field('foo', true)])
  })

  it('should test decoding a primitive', function () {
    const text = '123'
    const node = codec.decode(text)
    expect(node).toEqual(123)
  })
})
