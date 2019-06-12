const path = require( 'path' )
const fs = require( 'fs' )

const chalk = require( 'chalk' )
const {print} = require( 'q-i' )

const configPrototype = {
  'content': {},

  /** Writes the data/Object stored in `content` to a file at `path`
   * @returns {Promise<void>} Promise */
  writeFile () {
    return new Promise( (resolve, reject) => {
      fs.writeFile( this.path, this.stringify(), {
        'encoding': 'utf8'
      }, ( err ) => {
          if ( err ) reject( err )
          else resolve()
      } )
    } );
  },

  stringify () {
    return JSON.stringify( this.content )
  },

  /** @param {string} [key] OPTIONAL - A property key within `this.content` */
  print ( key /*: string */ = null ) {
    if ( key ) {
      print( this.content[ key ] )
    } else print( this.content )
  },

  /** @param {string} [key] OPTIONAL - An individual value to inspect */
  info ( key /*: string */ ) {
    if ( key ) {
      print( this[ key ] )
    } else print( this )
  }
}

/** @class Config */
function Config ( {
  dir = '.',
  dot = false,
  extension = 'json',
  name = 'default-name'
} = {} ) {
  /* Establish default propterty settings */
  const configurable = false
  const enumerable = true

  /* Assign new property */
  const prop =
    /** @param {*} value @param {Object} [obj] Other property settings */
    ( value, obj ) => ( Object.assign( {
    configurable,
    enumerable,
    value
  }, obj ) )

  /* Assign new getter or setter */
  const accessor =
    /** @param {Object} obj */
    ( obj ) => ( Object.assign( {
    configurable,
    enumerable
  }, obj ) )

  const method =
    ( obj ) => {
    Object.assign(target, source)
  }

  const config = Object.create( configPrototype )

  /** Configure properties describing instance's basic information */
  Object.defineProperties( config, {
    /* Project root */
    'root': prop( process.env.target || process.cwd(), {
      'writable': false
    } ),
    'dir': prop( dir ), /* File path relative to `root` */

    'name': prop( name ), /* File name (e.g., 'eslintrc', 'package', ...) */

    'extension': prop( extension ), /* File extension */

    'filename': accessor( { /* getter for the full filename */
      get () {
        return ( this.dot ? '.' : '' ) + this.name + ( this.extension && this.extension.length ? '.' + this.extension : '' )
      }
    } ),

    'path': accessor( { /* getter for the full absolute path */
      get () {
        return path.resolve( this.root, this.dir, this.filename )
      }
    } )
  } )

  Object.defineProperties( config, {
    ''
  })

  return config
}

// ANCHOR module.exports
module.exports = Config
