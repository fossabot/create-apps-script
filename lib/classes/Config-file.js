const fs = require( 'fs' );

const Ajv = require( 'ajv' );
const yaml = require( 'js-yaml' );
const pathModule = require( 'path' );


/**
 * @export
 * @description
 * @class ConfigFile
 */
class ConfigFile { // eslint-disable-line no-unused-vars
  /**
   * Creates an instance of ConfigFile.
   * @memberof ConfigFile
   */
  constructor( type ) {
    this.prependDot = false;
    this.extension = null;

    this.util = {
      checkExists,
      formatTypeName,
      normalizePath,
      validateExtension,
      validateTypeName
    };
    this.loadFile = loadFile;

    this.type = this.util.formatTypeName( type );
    this.schema = this.loadFile( `../schemas/${type}.schema.json` );
    this.validate = data => new Ajv().validate( this.schema, data );

    this.projectDir = null;

    this.content = {};

  }

  /**
   * @readonly
   * @memberof ConfigFile
   */
  get filename() {
    return (
      ( this.prependDot ? '.' : '' ) + this.type + this.extension
    );
  }
}

const yamlLoader = p => yaml.safeLoad( fs.readFileSync( p, 'utf8' ) );

/**
 * @param {string} path
 * @param {string} [encoding='utf8'] [ Optional ] The file encoding. Default is 'utf8'.
 * @param {boolean} [validateExt=false] [ Optional ] Whether to validate the file's extension. Validator throws an Error if the extension is not supported.
 * @returns {object|null} The object, or null if loading fails
 */
function loadFile( path, options ) {
  // eslint-disable-next-line no-param-reassign
  options = options || { 'encoding': 'utf8', 'validateExt': false };
  const { encoding, validateExt } = options;

  let ext = pathModule.extname( path );

  if ( validateExt ) validateExtension( ext );

  ext = [ '', '.json', '.yml' ].includes( ext ) ? '.yaml' : ext;
  return {
    // eslint-disable-next-line global-require
    '.js'   : p => require( p ),
    '.yaml' : yamlLoader
  }[ ext ]( checkExists( path ), encoding ) || null;
};

/**
 * Verifies a path
 * @param {string} string
 * @returns
 */
function normalizePath( string ) {
  if ( !pathModule.isAbsolute( string ) ) {
    return pathModule.resolve( __dirname, string );
  }

  return string;
}

/**
 * @param {string} filepath
 * @returns {string|null} The path (absolute) or null if path is invalid
 */
function checkExists( filepath ) {
  const fpath = normalizePath( filepath );
  if ( fs.existsSync( fpath ) ) return fpath;
  return null;
}

/**
 * @param {string} type
 * @throws {Error} If input is invalid
 */
function validateTypeName( type ) {
  const validTypes = [
    'appsscript',
    'clasp',
    'eslintrc',
    'package'
  ];
  if ( !validTypes.includes( type ) ) throw Error( `Type name ${type} is not one of accepted type names: ${validTypes.reduce( ( prev, cur ) => prev + '\n' + cur )}` );
}

/**
 * @param {string} ext
 * @throws {Error} If input is invalid
 */
function validateExtension( ext ) {
  const validExtensions = [
    '',
    '.js',
    '.json',
    '.yml',
    '.yaml'
  ];
  if ( !validExtensions.includes( ext ) ) throw Error( `File extension ${ext} is not one of accepted values: ${validExtensions.reduce( ( prev, cur ) => prev + '\n' + cur )}` );
}

/**
   * @param {string} input input
   * @returns {string} Sanitized value
   * @example
    let str = '.eslintrc.json';
    sanitizeTypeName(str) // => 'eslintrc's
   */
function formatTypeName( input ) {
  if ( !( typeof input === 'string' ) ) throw Error( 'Input must be string' );

  let output = input.toLowerCase();
  const ext = pathModule.extname( input );
  if ( ext ) {
    output = output.slice( 0, input.length - ext.length );
  }
  if ( input[ 0 ] === '.' ) output = output.slice( 1 );

  validateTypeName( output );
  validateExtension( ext );

  return output;
}

// ANCHOR module.exports
module.exports = ConfigFile;
