const coreJsonCodec = require('./corejson');
const jsonCodec = require('./json');
const textCodec = require('./text');

module.exports = {
    coreJsonCodec: coreJsonCodec,
    jsonCodec: jsonCodec,
    textCodec: textCodec,
};
