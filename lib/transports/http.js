require('isomorphic-fetch');

const axios = require('axios');
const utils = require('../utils');

const action = function (url, decoders) {
  return fetch(url)
    .then(function(response) {
      if(response.ok) {
        return response.text().then(function(text) {
          const contentType = response.headers.get('Content-Type');
          const decoder = utils.negotiateDecoder(decoders, contentType);
          return decoder.decode(text);
        });
      } else {
        throw Error('Network response was not ok.');
      }
    });
};

module.exports = function () {
  return {
    action: action,
    schemes: ['http', 'https'],
  };
};
