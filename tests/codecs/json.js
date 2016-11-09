const codecs = require('../../lib/codecs')

const codec = new codecs.JSONCodec()

describe('Test the JSON Codec', function () {
  it('should check the decode function', function () {
    const text = '{"text":"hello"}'
    const data = codec.decode(text)

    expect(typeof data).toEqual('object')
    expect(data).toEqual({text: 'hello'})
  })
})
