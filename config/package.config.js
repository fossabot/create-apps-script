const { print } = require( 'q-i' );
const chalk = require( 'chalk' );

/**
 * @param {*} options
 */
function createPackageFile( options ) { // eslint-disable-line no-unused-vars
  const packageObj = {
    'author'       : options.author || 'Cam Smith',
    'dependencies' : {

    },
    'description'     : 'Default package.json file for projects created by create-gas-project',
    'devDependencies' : {
      '@babel/core'                                        : '^7.1.5',
      '@babel/plugin-proposal-class-properties'            : '^7.1.0',
      '@babel/plugin-proposal-object-rest-spread'          : '^7.0.0',
      '@babel/plugin-transform-member-expression-literals' : '^7.0.0',
      '@babel/plugin-transform-object-assign'              : '^7.0.0',
      '@babel/plugin-transform-property-literals'          : '^7.0.0',
      '@babel/preset-env'                                  : '^7.1.5',
      '@google/clasp'                                      : '^1.6.3',
      '@types/google-apps-script'                          : '^0.0.31',
      'babel-eslint'                                       : '^10.0.1',
      'babel-loader'                                       : '^8.0.4',
      'babel-plugin-add-module-exports'                    : '^1.0.0',
      'babel-plugin-array-includes'                        : '^2.0.3',
      'clean-webpack-plugin'                               : '^0.1.19',
      'copy-webpack-plugin'                                : '^4.6.0',
      'eslint'                                             : '^5.9.0',
      'eslint-loader'                                      : '^2.1.1',
      'eslint-plugin-googleappsscript'                     : '^1.0.1',
      'gas-lib'                                            : '^2.0.2',
      'gas-webpack-plugin'                                 : '^0.3.0',
      'uglifyjs-webpack-plugin'                            : '^2.0.1',
      'webpack'                                            : '^4.25.1',
      'webpack-cli'                                        : '^3.1.2'
    },
    'keywords'   : [], //ANCHOR
    'license'    : options.license || 'MIT',
    'main'       : 'src/index.js',
    'name'       : options.name || 'apps-script-template',
    'repository' : options.repository || {
      'type' : 'git',
      'url'  : 'https://github.com/csmith14/create-gas-project'
    },
    'scripts': {
      'build'  : 'webpack -p',
      'deploy' : 'npm run build && npm run upload',
      'upload' : 'clasp push'
    },
    'version': options.version || '0.0.1'
  };

  Object.keys( options.eslint ).forEach( ( dep ) => {
    packageObj.devDependencies[ dep ] = options.eslint[ dep ];
  } );

  console.log( chalk.grey( `Printed from ${__filename}` ) );
  print( packageObj );

  return packageObj;
}

// ANCHOR module.exports
module.exports = options => createPackageFile( options );
