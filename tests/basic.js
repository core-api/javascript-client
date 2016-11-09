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

client.transports[0].action("http://httpbin.org/", client.decoders)
  .then((document) => {
    expect(document.text).toEqual("OK");
    console.log('Transport: Passed ✔︎');
  })
  .catch((error) => {
    expect(error).toNotExist();
  });

expect(client.decoders[0].decode("Hello").text).toEqual("Hello");
console.log('Decoders: Passed ✔︎');

expect(client.decoders[0].decode("Hello")).toEqual(coreapi.document("Hello"));
console.log('Document: Passed ✔︎');
