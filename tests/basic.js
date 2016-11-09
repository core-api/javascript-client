const expect = require('expect');
const coreapi = require('../lib/index');

const client = coreapi.client();

client.get("http://httpbin.org/")
  .then((document) => {
    expect(document.text).toEqual("OK");
    console.log('Get: Passed ✔︎');
  })
  .catch((error) => {
    expect(error).toNotExist();
  });

client.transport.action("http://httpbin.org/", client.decoder)
  .then((document) => {
    expect(document.text).toEqual("OK");
    console.log('Transport: Passed ✔︎');
  })
  .catch((error) => {
    expect(error).toNotExist();
  });

expect(client.decoder.decode("Hello").text).toEqual("Hello");
console.log('Decoder: Passed ✔︎');

expect(client.decoder.decode("Hello")).toEqual(coreapi.document("Hello"));
console.log('Document: Passed ✔︎');
