const coreapi = require('../lib/index');
const expect = require('expect.js');

const client = coreapi.client();

client.get("http://httpbin.org/")
  .then((statusText) => {
    expect(statusText).to.equal("OK");
    console.log('Passed ✔︎');
  })
  .catch((error) => {
    expect().fail();
  });
