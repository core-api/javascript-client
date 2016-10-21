const coreapi = require('../coreapi/coreapi');
const expect = require('expect.js');

const client = coreapi.client({foo: "bar"});

client.get("http://httpbin.org/")
  .then((statusText) => {
    expect(statusText).to.equal("OK");
    console.log('Passed ✔︎');
  })
  .catch((error) => {
    expect().fail();
  });
