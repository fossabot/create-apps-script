const path = require( 'path' )
const fs = require( 'fs' )
// ──────────────────────────────────────────────────
const schemas = {}
const dir = path.resolve( __dirname )
fs.readdirSync( dir )
  .filter( filename => filename.includes( 'schema' ) )
  .forEach( ( filename ) => {
    const filePath = path.join( dir, filename )

    const content = fs.readFileSync( filePath, 'utf8' )
    const schemaObj = JSON.parse( content )

    const name = filename.split( '.' )[0]

    Object.assign( schemas, {
      [ name ]: schemaObj
    } )
  } )

// ANCHOR module.exports
module.exports = schemas
