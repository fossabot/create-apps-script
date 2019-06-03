const fs = require( 'fs' );

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
        'message' : 'Use existing .eslintrc file?',
        'name'    : 'eslintUseExisting',
        'type'    : 'confirm'
      },
      {
        'default' : 'eslint:recommended',
        'message' : 'ESLint Configuration',
        'name'    : 'eslintConfigType',
        'type'    : 'text',
        'when'    : answers => !answers.eslintUseExisting
      },
      {
        'message'  : 'Path to eslintrc file: ',
        'name'     : 'eslintPath',
        'type'     : 'text',
        'validate' : input => fs.existsSync( input ),
        'when'     : answers => answers.eslintUseExisting
      },
      {
        'message' : 'Modify eslintrc file to include Apps-Script related settings?',
        'name'    : 'eslintShouldModify',
        'type'    : 'confirm',
        'when'    : answers => answers.eslintUseExisting
      }
    ]
  }; };
