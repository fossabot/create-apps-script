const path = require( 'path' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const GasPlugin = require( 'gas-webpack-plugin' );
const { version } = require( './package.json' );

const destination = 'dist';
const mode = 'none'; // or production

module.exports = {
  'context' : __dirname,
  'entry'   : './src/index.js',
  'mode'    : mode,
  'module'  : {
    'rules': [
      {
        'enforce' : 'pre',
        'exclude' : /node_modules/u,
        'loader'  : 'eslint-loader',
        'options' : {
          'cache'       : true,
          'failOnError' : false
        },
        'test': /\.js$/u
      }, {
        'exclude' : /node_modules/u,
        'test'    : /\.js$/u,
        'use'     : {
          'loader': 'babel-loader'
        }
      }
    ]
  },
  'optimization' : {},
  'output'       : {
    'filename'      : `code-${version}.js`,
    'libraryTarget' : 'this',
    'path'          : path.resolve( __dirname, destination )
  },
  'plugins': [
    new CleanWebpackPlugin( [ destination ] ), new CopyWebpackPlugin( [
      {
        'from' : './conf/appsscript.json',
        'to'   : path.resolve( __dirname, destination )
      }
    ] ), new GasPlugin( {
      'comments': false
    } )
  ],
  'resolve': {
    'extensions': [ '.js' ]
  }
};
