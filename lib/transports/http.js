const axios = require('axios');
const utils = require('../utils');

const action = function (url, decoders) {
  return axios.get(url)
    .then((response) => {
      const contentType = response.headers['content-type'];
      const decoder = utils.negotiateDecoder(decoders, contentType);
      return decoder.decode(response.data);
    })
    .catch((error) => {
      return error;
    });
};

module.exports = function () {
  return {
    action: action,
    schemes: ['http', 'https'],
  };
};
