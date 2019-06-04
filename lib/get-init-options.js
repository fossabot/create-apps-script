const homedir = require( 'os' ).homedir();
const fs = require( 'fs' );
const { print } = require( 'q-i' );
const path = require( 'path' );
const inq = require( 'inquirer' );
const prompts = require( '../config/init-prompts' );
const newPackage = require( '../config/package.json.config' );

/**
 * @param {string} filePath
 * @returns {*} A key-value object of the file's contents
 */
function readrcFile( filePath, delimiter ) {
  const file = fs.readFileSync( filePath, {
    'encoding': 'UTF-8'
  } )
    .replace( /(\r\n)/gu, '\n' )
    .split( '\n' )
    .filter( line => line.trim().includes( delimiter ) )
    .map( line => [
      line.split( delimiter )[ 0 ].replace( '--', '' ),
      line.split( delimiter ).slice( 1, line.split( delimiter ).length )
        .join( ' ' )
        .replace( /("|')/gu, '' )
    ] );
  const fileObj = {};
  file.forEach( line => fileObj[ line[ 0 ] ] = line[ 1 ] );

  return fileObj;
}


/**
 * Ensures the expected keys exist in the rc file object by assigning non-existent keys to defaults
 * @param {*} obj
 * @param {*} type
 * @returns
 */
function ensureKeys( obj, type ) { // eslint-disable-line no-unused-vars
  normalizeKeys( obj, type );

  const defaults = {
    'author'  : '',
    'license' : 'MIT',
    'version' : '1.0.0'
  };

  Object.keys( defaults ).forEach( ( key ) => {
    if ( !obj[ key ] ) obj[ key ] = defaults[ key ];
  } );

  return obj;
}

/**
 * Normalizes key names for predictability across rc-file versions
 * @param {*} obj
 * @param {string} type
 */
function normalizeKeys( obj, type ) { // eslint-disable-line no-unused-vars
  const keys = {
    'npm': {
      'init-author-name' : 'author',
      'init-license'     : 'license',
      'init-version'     : 'version'
    },
    'yarn': {
      'init.author'  : 'author',
      'init.license' : 'license',
      'init.version' : 'version'
    }
  };

  const guide = keys[ type ];

  Object.keys( obj ).forEach( okey => obj[ guide[ okey ] ] = obj[ okey ] );
}

/**
 * @returns
 */
function getYarnrc() { // eslint-disable-line no-unused-vars
  const yarnrcPath = path.join( homedir, '.yarnrc' );
  const exists = fs.existsSync( yarnrcPath );
  if ( !exists ) return null;

  return ensureKeys( readrcFile( yarnrcPath, ' ' ), 'yarn' );
};

/**
 * @returns
 */
function getNpmrc() { // eslint-disable-line no-unused-vars
  const npmrcPath = path.join( homedir, '.npmrc' );
  const exists = fs.existsSync( npmrcPath );
  if ( !exists ) return null;

  return ensureKeys( readrcFile( npmrcPath, '=' ), 'npm' );
};

/**
 * Prompts for package.json field values
 */
async function getPackageValues() { // eslint-disable-line no-unused-vars
  const rcObjects = {
    '.npmrc'  : getNpmrc(),
    '.yarnrc' : getYarnrc()
  };

  const npmrc = rcObjects[ '.npmrc' ];
  const yarnrc = rcObjects[ '.yarnrc' ];

  let rcFile;
  if ( npmrc && yarnrc ) {
    await inq.prompt( {
      'choices': [
        '.npmrc',
        '.yarnrc'
      ],
      'default' : '.npmrc',
      'message' : 'Found both .yarnrc and .npmrc -- which would you like to use for default values?',
      'name'    : 'rc',
      'type'    : 'list'
    } ).then( ans => rcFile = rcObjects[ ans.rc ] );
  } else if ( npmrc || yarnrc ) {
    console.log( `Using defaults found in ${npmrc ? 'npmrc' : 'yarnrc'}` );
    rcFile = npmrc || yarnrc;
  } else {
    console.warn( `No .npmrc or .yarnrc file detected in home directory ${homedir}` );
    rcFile = {
      'none': true
    };
  }


  const promptAnswers = await inq.prompt(
    prompts( rcFile ).prompts
  );

  return promptAnswers;
}



// ( async() => {
//   const options = await getPackageValues();
//   print( newPackage( options ) );
// } )();

module.exports = getPackageValues;
