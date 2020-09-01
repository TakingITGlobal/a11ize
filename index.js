// eslint-disable-next-line import/no-unresolved
const bare = require('./dist/bare');

// Only export the bare version, anything else should be imported from dist
module.exports = bare;
