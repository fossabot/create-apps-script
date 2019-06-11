const path = require( 'path' );
const ajv = require( 'ajv' );

const schemas = require( path.resolve( __dirname, '../schemas' ) );

/**
 * Compares the provided data object against the schema denoted by schemaType
 * @param {Object} data The object to validate
 * @param {string} schemaType The name of the file (*i.e., 'eslintrc', 'clasp', 'appsscript'*)
 * @returns {boolean} Valid schema
 */
function validateSchema( data, schemaType ) {
  // eslint-disable-next-line new-cap
  return new ajv().validate( schemas[ schemaType ], data );
}

// ANCHOR module.exports
module.exports = validateSchema;
