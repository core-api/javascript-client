const coreapi = require('../lib/index');
const expect = require('expect');

const client = coreapi.client();

client.get("http://httpbin.org/")
  .then((statusText) => {
    expect(statusText).toEqual("OK");
    console.log('Passed ✔︎');
  })
  .catch((error) => {
    expect(error).toNotExist();
  });
