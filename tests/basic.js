const coreapi = require('../coreapi/coreapi');
const expect = require('expect.js');

coreapi()
  .then((statusText) => {
    expect(statusText).to.equal("OK");
    console.log('Passed ✔︎');
  })
  .catch((error) => {
    expect().fail();
  });
