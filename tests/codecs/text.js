const expect = require('expect')
const codecs = require('../../lib/codecs')

const codec = new codecs.TextCodec()

describe('Test the Text Codec', function () {
  it('should check the decode function', function () {
    const text = 'Hello World!'
    const data = codec.decode(text)

    expect(typeof data).toEqual('string')
    expect(data).toEqual('Hello World!')
  })
})
