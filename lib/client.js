const axios = require('axios');
const transport = require('./transport');
const decoder = require('./decoder');

const get = function (url) {
  return this.transport.action(url, this.decoder);
};

module.exports = function () {
  return {
    get: get,
    transport: transport(),
    decoder: decoder(),
  };
};
