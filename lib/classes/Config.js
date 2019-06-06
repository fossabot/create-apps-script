const crypto = require( 'crypto' );
const util = require( 'util' );
const Ajv = require( 'ajv' );
const chalk = require( 'chalk' );
const yaml = require( 'js-yaml' );
const fs = require( 'fs' );
const path = require( 'path' );
const { print } = require( 'q-i' );

const ConfigFile = require( './Config-file' );
const ESLintrc = require( './ESLintrc' );



/**
 * @export
 * @description
 * @class Config
 */
class Config extends ConfigFile { // eslint-disable-line no-unused-vars

  /**
   * Creates an instance of Config.
   * @param {string} type
   * @memberof Config
   */
  constructor( type ) {
    super( type );

    /* Stores a hash of objects created by calling the 'import' method  */
    this.importStore = { /*
        [type] : {
          'absPath' : { ... object ... },
          'absPath' : { ... object ... },
        },
        [type_2]: {
          'absPath' : { ... object ... },
          'absPath' : { ... object ... },
        },
      }
    */ };

    this.lastImport = null;

    Object.defineProperty( this, 'importFile', {
      'configurable' : false,
      'enumerable'   : false,
      'value'        : importFile
    } );
  }

  /**
   * @readonly
   * @memberof Config
   */
  get imports() {
    return Object.create( this.importStore );
  }

  /**
   * @memberof Config
   */
  set imports( obj ) {
    this.importStore = obj;
  }

  /**
   * @param {string} key
   * @param {Object} value
   * @memberof Config
   */
  storeImport( type, key, value ) {
    this.importStore[ type ][ key ] = value;

    console.log( chalk.green( 'Added new config to internal store:' )
      .concat( `\n${type}: {` )
      .concat( `\n  ${key} : ${value}` )
      .concat( '\n}' )
    );

    print( this.imports );
  }

  /**
   * @param {string} pathKey The relative (from cwd) or absolute path to the file
   * @returns {Object} The value, or null if none is found
   * @memberof Config
   */
  getImportByPath( pathKey ) {
    const key = path.isAbsolute( pathKey ) ?
      pathKey :
      path.resolve( process.cwd(), pathKey );

    if ( Object.keys( this.imports ).includes( key ) ) {
      return Object.create( this.imports[ key ] );
    }

    return null;
  }

  /**
   *
   * @param {Object} [object] A base configuration object to start from.
   * @returns
   * @memberof Config
   */
  create( object ) {
    let base;
    if ( object ) base = object;
    else if ( this.importedObject ) base = this.importedObject;
    else base = null;

    return {
      // 'appsscript': obj => new AppsScript(obj),
      // 'clasp'    : obj => new Clasp( obj ),
      'eslintrc': obj => new ESLintrc( obj )
      // 'package'  : obj => new Package( obj )

    }[ this.type ]( base );
  }

  /**
   * Imports the config file from filepath and converts it to an object.
   * Either a configuration object or a path must be provided.
   * Stores the result in `this.imports` under the resolved absolute path as the key.
   *
   * @param {string} type A string denoting which config type the input applies to. Must match a predefined config type name.
   * @param {Object} [object] A rule/config object to provide to the instance.
   * @param {string} [filepath] The absolute path to a file that should be loaded.
   * @param {string} [encoding] [Optional] The file encoding. Default is 'utf8'.
   *
   * @returns {Object} A copy of the resultig object
   * ( **not a reference** to the stored config in `this.imports`)
   * Returns `null` if import fails.
   */
  import( options ) {
    // eslint-disable-next-line prefer-const
    let { object, filepath, encoding } = options;
    encoding = encoding || 'utf8';

    let result;
    if ( filepath ) {
      filepath = this.util.checkExists( filepath );
      result = this.importFile( filepath, encoding );
    }
    else if ( object ) result = Object.create( object );
    else throw Error( 'Insufficient arguments supplied.' );

    this.storeImport( this.type, 'tempKey', result );

  }


}


/**
 * Imports the config file from filepath and converts it to an object.
 * @param {string} filepath The absolute path
 * @param {string} [ encoding ] [ Optional ] The file encoding. Default is 'utf8'.
 *
 * @returns {Object} A copy of the resultig object
 */
function importFile( filePath, encoding = 'utf8' ) {
  /* Validate path with filesystem */

  const fpath = this.util.checkExists( filePath );
  if ( !fpath ) throw Error( `File not found: ${filePath}` );

  let result = null;
  try {
    const options = {
      'encoding'    : encoding || null,
      'validateExt' : true
    };

    result = this.loadFile( fpath, options );
  } catch ( err ) {
    console.error( chalk.red( 'File import failed' ) + `\nMessage: ${err.message}` );
  }

  return result;
}



// ANCHOR module.exports
module.exports = Config;
