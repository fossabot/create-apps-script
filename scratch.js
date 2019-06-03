const fs = require( 'fs' );
( () => {
  const path = 'C:\\Users\\camer\\.npmrc';
  const file = fs.readFileSync( path, { 'encoding': 'UTF-8' } )
    .split( '\n' )
    .filter( line => line.includes( '=' ) )
    .map( line => [ line.split( '=' )[ 0 ], line.split( '=' )[ 1 ] ] );
  const fileObj = {};
  file.forEach( line => fileObj[ line[ 0 ] ] = line[ 1 ] );
} )();
