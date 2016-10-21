const coreapi = function () {
  return fetch('http://httpbin.org/');
    // .then(response => {
    //   if (!response.ok) {
    //     throw Error(response.statusText);
    //   }
    //   return response.statusText;
    // })
    // .catch(error => {
    //   console.log(error);
    //   return error;
    // });
};

module.exports = window.coreapi = coreapi;
