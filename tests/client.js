const expect = require('expect')
const coreapi = require('../lib/index')

const client = new coreapi.Client()


describe("Test the Client", function() {

  it("should get the content of page (text/html)", function() {
    const url = 'http://www.mocky.io/v2/582321ea1000008610ccfea6'

    client.get(url)
      .then((data) => {
        expect(typeof data).toEqual('string')
        expect(data).toEqual('<h1>Hello World!</h1>')
      })
      .catch((error) => {
        expect(error).toNotExist()
      })
  });

  it("should get the content of page (application/json)", function() {
    const url = 'http://www.mocky.io/v2/582321ba1000006310ccfea5'

    client.get(url)
      .then((data) => {
        expect(typeof data).toEqual('object')
        expect(data).toEqual({'text': 'hello'})
      })
      .catch((error) => {
        expect(error).toNotExist()
      })
  });

});
