const decode = function (text) {
  return JSON.parse(text);
};

module.exports = function () {
  return {
    decode: decode,
    mediaType: 'application/json',
  };
};
