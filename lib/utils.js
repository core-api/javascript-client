const determineTransport = function(transports, url) {
  return transports[0];
};

const negotiateDecoder = function(decoders, contentType) {
  if (contentType === undefined) {
    return decoders[0];
  }

  const fullType = contentType.toLowerCase().split(';')[0].trim();
  const mainType = fullType.split('/')[0] + '/*';
  const wildcardType = '*/*';
  const acceptableTypes = [fullType, mainType, wildcardType];

  for (let decoder of decoders) {
    if (acceptableTypes.includes(decoder.mediaType)) {
      return decoder;
    }
  }

  throw Error(`Unsupported media in Content-Type header: ${contentType}`);
};

module.exports = {
  determineTransport: determineTransport,
  negotiateDecoder: negotiateDecoder,
}
