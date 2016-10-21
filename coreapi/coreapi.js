const axios = require('axios');

const coreapi = function () {
  return axios.get('http://httpbin.org/')
    .then((response) => {
      return response.statusText;
    })
    .catch((error) => {
      return error;
    });
};

try {
  window.coreapi = coreapi;
}
catch(err) {
  module.exports = coreapi;
}
