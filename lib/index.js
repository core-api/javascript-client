const client = require('./client');

const coreapi = {
  client
};

try {
  window.coreapi = coreapi;
}
catch(err) {
  module.exports = coreapi;
}
