const fs = require( 'fs' ),
  path = require( 'path' );

// ANCHOR module.exports
module.exports = ( rcFile ) => {
  return {
    'prompts': [
      {
        'default' : 'new-gas-project',
        'message' : 'Package name',
        'name'    : 'name',
        'type'    : 'text'
      }, {
        'default' : rcFile.author,
        'message' : 'Author',
        'name'    : 'author',
        'type'    : 'text'
      },
      {
        'default' : rcFile.version,
        'message' : 'Version',
        'name'    : 'version',
        'type'    : 'text'
      },
      {
        'default' : rcFile.license,
        'message' : 'License',
        'name'    : 'license',
        'type'    : 'text'
      },
      {
        'message' : 'Repository',
        'name'    : 'repository',
        'type'    : 'text'
      },
      {
        'default' : true,
        'message' : 'Create new ESLint ruleset for project? ( Recommended )',
        'name'    : 'eslintUseExisting',
        /* This value is used inversely from what its name implies so that should be fixed */
        'type'    : 'confirm'
      },
      {
        'choices': [
          'eslint:recommended',
          'standard',
          'airbnb-base'
        ],
        'default' : 'eslint:recommended',
        'message' : 'ESLint Configuration',
        'name'    : 'eslintConfigType',
        'type'    : 'list',
        'when'    : answers => answers.eslintUseExisting
      },
      {
        'message'  : 'Path to eslintrc file: ',
        'name'     : 'eslintPath',
        'type'     : 'text',
        'validate' : input => fs.existsSync( path.resolve( input ) ),
        'when'     : answers => !answers.eslintUseExisting
      },
      {
        'message' : 'Modify eslintrc file to include Apps-Script related settings?',
        'name'    : 'eslintShouldModify',
        'type'    : 'confirm',
        'when'    : answers => !answers.eslintUseExisting
      }
    ]
  }; };
