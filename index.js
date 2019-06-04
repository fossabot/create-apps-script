const process = require( 'process' );

const getInit = require( './lib/get-init-options' );
const createPkgObj = require( './config/package.config' );
const createEslintObj = require( './config/eslintrc.config' );
const eslintOptions = require( './config/eslint-config-associations.json' );

const schemas = require( './schemas' );

( async() => {
  const args = process.argv.slice( 2 );
  const workDir = args[ 0 ] || process.cwd();

  const initOptions = await getInit( workDir );

  if ( !initOptions.eslintUseExisting ) {
    const eslintConfig = initOptions.eslintConfigType;
    initOptions.eslint = eslintOptions[ eslintConfig ].package.devDependencies;
  } else {
    initOptions.eslint = { };
  }
  const pkg = createPkgObj( initOptions );

  const eslintrc = createEslintObj( initOptions );
} )();
