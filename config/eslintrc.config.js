const fs = require( 'fs' );
const path = require( 'path' );
const yaml = require( 'js-yaml' );
const ajv = require( 'ajv' );
const configOptions = require( './eslint-config-associations.json' );
// SECTION Development modules
const { print } = require( 'q-i' );
const chalk = require( 'chalk' );
// !SECTION Development modules

const defaultConfig = {
  'env': {
    'amd'                               : true,
    'es6'                               : true,
    'googleappsscript/googleappsscript' : true,
    'node'                              : true
  },
  'extends' : '',
  'globals' : {
    'Calendar'          : true,
    'CalendarApp'       : true,
    'CardService'       : true,
    'Charts'            : true,
    'ContactsApp'       : true,
    'DataStudioApp'     : true,
    'DocumentApp'       : true,
    'Drive'             : true,
    'DriveApp'          : true,
    'FirebaseApp'       : true,
    'FormApp'           : true,
    'Gmail'             : true,
    'GmailApp'          : true,
    'GroupsApp'         : true,
    'HtmlService'       : true,
    'LanguageApp'       : true,
    'MailApp'           : true,
    'Maps'              : true,
    'OAuth1'            : true,
    'OAuth2'            : true,
    'PropertiesService' : true,
    'SitesApp'          : true,
    'Slides'            : true,
    'SlidesApp'         : true,
    'SpreadsheetApp'    : true
  },
  'parser'  : 'babel-eslint',
  'plugins' : [ 'googleappsscript' ],
  'root'    : true
};

/**
 * Imports the eslintrc file and converts it to an object
 * @param {*} filePath
 */
function importConfig( filePath ) {
  const extension = path.ext( filePath );
  /* Support .eslintrc.yaml */
  const load = ( extension.match( /(ya?ml)/u ) ) ?
    p => yaml.safeLoad( fs.readFileSync( p, 'utf8' ) ) :
    // eslint-disable-next-line global-require
    p => require( p );

  const eslintObj = load( filePath );

  return eslintObj;
}

/**
 * Modifies the imported eslintrc config object with rules specialized for GAS development
 * @param {*} config The configuration object
 */
function modifyConfig( config ) {
  Object.keys( defaultConfig ).forEach( ( key ) => {
    if ( key === 'extends' ) {
      /* Don't overwrite the user's existing base config */
      return;
    }

    if ( key === 'plugins' ) {
      if ( config[ key ] instanceof Array ) {
        /* Only add to the existing plugin array - don't overwrite it */
        config[ key ] = config[ key ].concat( defaultConfig[ key ] );
      } else config[ key ] = defaultConfig[ key ]; /* Unless there isn't one */

      return;
    }

    /* Overwrite */
    config[ key ] = defaultConfig[ key ];
  } );
}

/**
 * Handle the import-existing strategy
 * @param {*} options
 * @returns
 */
function useExistingEslintObj( options ) {
  const eslintRulePath = options.eslintPath;
  const eslintObj = importConfig( eslintRulePath );

  if ( options.eslintShouldModify ) modifyConfig( eslintObj );

  return eslintObj;
}

/**
 * Handle the create-new strategy
 * @param {*} options
 * @returns
 */
function createNewEslintObj( options ) {
  const configType = options.eslintConfigType;
  defaultConfig.extends = configType;

  const optionsExtensions = configOptions[ configType ].eslintrc;
  defaultConfig.plugins = defaultConfig.plugins.concat( optionsExtensions.plugins );

  return defaultConfig;
}

/**
 * Validated the produced object against the official schema
 * @param {*} rules
 */
function verifyRuleObject( rules ) {

}

/**
 * User-specified options from prompt interface
 * @param {*} options
 * @returns
 */
function eslintConfigObj( options ) {
  const eslintObj = options.useExistingEslintObj ?
    useExistingEslintObj( options ) :
    createNewEslintObj( options );

  console.log( chalk.grey( `Printed from ${__filename}` ) );
  print( eslintObj );

  return eslintObj;
};

module.exports = eslintConfigObj;
