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

const coreapi = {
  client(options) {
    return {
      get,
      options
    };
  }
};

try {
  window.coreapi = coreapi;
}
catch(err) {
  module.exports = coreapi;
}
