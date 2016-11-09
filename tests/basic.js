const coreapi = require('../lib/index');
const expect = require('expect');

const client = coreapi.client();

client.get("http://httpbin.org/")
  .then((statusText) => {
    expect(statusText).toEqual("OK");
    console.log('Get: Passed ✔︎');
  })
  .catch((error) => {
    expect(error).toNotExist();
  });

client.transport.action("http://httpbin.org/", client.decoder)
  .then((statusText) => {
    expect(statusText).toEqual("OK");
    console.log('Transport: Passed ✔︎');
  })
  .catch((error) => {
    expect(error).toNotExist();
  });

expect(client.decoder.decode("Hello")).toEqual("Hello");
console.log('Decoder: Passed ✔︎');
