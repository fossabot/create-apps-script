const chalk = require( 'chalk' );
const homedir = require( 'os' ).homedir();
const fs = require( 'fs' );
const path = require( 'path' );
// ──────────────────────────────────────────────────
const prompts = require( './prompts' );
// ──────────────────────────────────────────────────
const inq = require( 'inquirer' );
// ──────────────────────────────────────────────────

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
  }

  return ensureKeys( readrcFile( rcPath, delimiter ), fileType );
}

/**
 * Prompts for package.json field values
 */
async function displayPrompts( workDir ) { // eslint-disable-line no-unused-vars
  const workspace = path.resolve( workDir );

  console.log( `Creating Apps Script project at ${chalk.blue( workspace )}`, '\n' );

  const rcObjects = {};

  [ '.yarnrc', '.npmrc' ].forEach(
    name => rcObjects[ name ] = getRcFile( name, workspace )
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
    console.info( `${chalk.bold( 'Working Dir' )}: ${workspace}` );
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


  const promptAnswers = await inq.prompt(
    prompts( rcFile ).prompts
  );

  return promptAnswers;
}



// ( async() => {
//   const options = await getPackageValues();
//   print( newPackage( options ) );
// } )();

module.exports = displayPrompts;
