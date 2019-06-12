const pathToClasp = require('global-modules-path').getPath('@google/clasp');

// ANCHOR module.exports
module.exports = () => {
	return Boolean(pathToClasp);
};
