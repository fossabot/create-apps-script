const path = require( 'path' );
const fs = require( 'fs' );

const schemaDir = path.resolve( __dirname );

const schemas = {};
fs.readdirSync( schemaDir )
  .filter( filename => filename.includes( 'schema' ) )
  .forEach( ( filename ) => {
    // eslint-disable-next-line global-require
    schemas[ filename.replace( '.schema.json', '' ) ] = require( path.join( schemaDir, filename ) );
  } );

// ANCHOR module.exports
module.exports = schemas;
