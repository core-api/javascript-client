const codecs = require('../../lib/codecs')
const document = require('../../lib/document')

const codec = new codecs.CoreJSONCodec()

describe('Test the CoreJSON Codec', function () {
  it('should check the decode function', function () {
    const text = 'Hello World!'
    const data = codec.decode(text)

    expect(data instanceof document.Document).toBeTruthy()
    expect(data).toEqual(new document.Document('Hello World!'))
  })
})
