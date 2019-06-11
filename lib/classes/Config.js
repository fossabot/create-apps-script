/* @flow */

const path = require( 'path' )
const fs = require( 'fs' )

const chalk = require( 'chalk' )
const {
  print
} = require( 'q-i' )

const configurable = false
const enumerable = true

const prop = ( value, obj ) => ( Object.assign( {
  configurable,
  enumerable,
  value
}, obj ) )

const accessor = ( obj ) => ( Object.assign( {
  configurable,
  enumerable
}, obj ) )

function report ( thisArg ) {
  if ( !( parseInt( process.env.LOG_LEVEL, 10 ) < 2 ) ) {
    console.group( chalk.green( `Config-Base-Object, file: ${chalk.white.bold( thisArg.filename )}` ) )

    console.log( chalk.blue( 'Meta Info:' ) )
    thisArg.info()
    console.log( chalk.blue( 'File Content:' ) )
    thisArg.print()

    console.groupEnd( '\n\n' )
  }
}

const configPrototype = {
  'content': {},

  /**
   * Writes the data/Object stored in `content` to a file at `path`
   * Creates the file if none exists. **Overwrites existing files.**
   */
  writeFile () {
    fs.writeFileSync( this.path, this.toString() )
  },

  toString () {
    return JSON.stringify( this.content )
  },

  /**
   * Prints **`this.content[key]`** to `stdout` (if it exists). If no `key` property exists, print **`this.content`** to `stdout`.
   * *Note - The console output of this method is **exactly** the data/Object that will be written to the disk upon calling `this.writeFile`*
   * @param {string} [key] ***optional***  A property name of `this.content` to individually inspect the value of.
   */
  print ( key /*: string */ = null ) {
    if ( key ) {
      print( this.content[ key ] )
    } else print( this.content )
  },

  /**
   * Prints value of **`this[key]`** to `stdout` (if it exists). If no `key` property exists, the
   * method prints **`this`** Object's enumerable props to `stdout`.
   * @param {string} [key] ***optional***  A property name defined on `this`, to individually inspect the value of.
   */
  info ( key /*: string */ ) {
    if ( key ) {
      print( this[ key ] )
    } else print( this )
  },

  report () {
    report( this )
  }
}

/*:: type configArg = {
  dir: string,
  dot: boolean,
  extension: string,
  name: string
} */

function Config ( { dir, dot, extension, name } = {} ) {
  dir = dir instanceof String ? dir : '.'
  extension = extension instanceof String ? extension : 'json'
  name = name instanceof String ? name : 'default-name'
  dot = dot instanceof Boolean ? dot : false

  const config = Object.create( configPrototype )

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

  return config
}

// ANCHOR module.exports
module.exports = Config
