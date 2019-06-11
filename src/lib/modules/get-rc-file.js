const homedir = require( 'os' ).homedir();
const path = require( 'path' );
const fs = require( 'fs' );

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
 * Ensures the expected keys exist in the object by assigning non-existent keys a default value
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
 * Normalizes property keys for predictability despite differing rc file formats
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

  Object.keys( obj ).forEach( ( key ) => {
    obj[ guide[ key ] ] = obj[ key ];
    delete obj[ key ];
  } );
}

function combineProperties( preferred, other ) {

}

/**
 * @param {string} fileName
 * @param {string} workDir
 * @returns
 */
function getRcFile( fileName, workDir ) {
  /* Get the rc type by stripping the '.' and 'rc' */
  const fileType = fileName.slice( 1, fileName.length - 2 );
  const delimiter = fileType === 'yarn' ? ' ' : '=';

  let rcPath = path.join( workDir, fileName );

  let exists = fs.existsSync( rcPath );
  if ( !exists ) {
    rcPath = path.join( homedir, fileName );
    exists = fs.existsSync( rcPath );

    if ( !exists ) return null;
  } else if ( fs.existsSync( path.join( homedir, fileName ) ) ) {
    }

  return ensureKeys( readrcFile( rcPath, delimiter ), fileType );
}

/**
 *
 *
 */
async function index( directory ) {
  const rcObjects = {};

  [ '.yarnrc', '.npmrc' ].forEach(
    name => rcObjects[ name ] = getRcFile( name, directory )
  );

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
      'message' : `${chalk.blue( 'Found both .yarnrc and .npmrc.' )} Which to use?`,
      'name'    : 'rc',
      'type'    : 'list'
    } ).then( ans => rcFile = rcObjects[ ans.rc ] );
  } else if ( npmrc || yarnrc ) {
    console.log( `Using defaults found in ${npmrc ? 'npmrc' : 'yarnrc'}` );
    rcFile = npmrc || yarnrc;
  } else {
    console.group( chalk.yellow( 'No .npmrc or .yarnrc file detected. Searched paths:' ) );
    // console.warn();
    console.info( `${chalk.bold( 'Working Dir' )}: ${directory}` );
    console.info( `${chalk.bold( '$HOME' )}: ${homedir}` );
    console.groupEnd();
    console.info( '\n', chalk.yellow( 'Falling back to hard-coded defaults.' ) );
    console.info(
      chalk.grey( 'To take advantage of npm or yarn\'s default init options, create the appropriate rc file.', '\n' )
    );

    rcFile = {
      'none': true
    };
  }
}

// ANCHOR module.exports
module.exports = getRcFile;
