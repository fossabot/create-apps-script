const fs = require( 'fs' );
const path = require( 'path' );
const yaml = require( 'js-yaml' );
const ajv = require( 'ajv' );
const configOptions = require( './eslintrc.options.json' );
// SECTION Development modules
const { print } = require( 'q-i' );
const chalk = require( 'chalk' );
// !SECTION Development modules



let config = {};


/**
 * Modifies the imported eslintrc config object with rules specialized for GAS development
 */
function modifyConfig() {
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
function useExistingEslintObj( filePath, modify ) {
  const eslintRulePath = filePath;
  config = importConfig( eslintRulePath );

  if ( modify ) modifyConfig();

}

/**
 * Handle the create-new strategy
 * @param {*} options
 * @returns
 */
function createNewEslintObj( extendsConfig ) {
  config = defaultConfig;

  const configType = extendsConfig;
  config.extends = configType;

  const associatedPlugins = configOptions.extendsValueDependencies[ configType ].eslintrc;
  associatedPlugins.plugins.forEach( plugin => config.plugins.push( plugin ) );

}

/**
 * Validated the produced object against the official schema
 * @param {*} rules
 */
function verifyRuleObject( rules ) {

}


module.exports = eslintConfigObj;

