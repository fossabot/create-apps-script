const path = require( 'path' );
const fs = require( 'fs' );

const schemaDir = path.resolve( __dirname );

const { print } = require( 'q-i' );

const schemas = {};
fs.readdirSync( schemaDir )
  .filter( filename => filename.includes( 'schema' ) )
  .forEach( ( filename ) => {
    const filePath = path.join( schemaDir, filename );
    const content = fs.readFileSync( filePath, 'utf8' );
    const configType = filename.replace( '.schema.json', '' );

    schemas[ configType ] = JSON.parse(
      content
    );

  } );

// ANCHOR module.exports
module.exports = schemas;
