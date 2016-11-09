const axios = require('axios');

const action = function (url, decoder) {
  return axios.get(url)
    .then((response) => {
      return decoder.decode(response.statusText);
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
