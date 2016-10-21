const axios = require('axios');

const get = function (url) {
  return axios.get(url)
    .then((response) => {
      return response.statusText;
    })
    .catch((error) => {
      return error;
    });
};

module.exports = function () {
  return {
    get: get
  };
};
