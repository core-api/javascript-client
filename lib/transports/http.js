const axios = require('axios');

const action = function (url, decoders) {
  return axios.get(url)
    .then((response) => {
      return decoders[0].decode(response.statusText);
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
