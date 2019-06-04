const getInit = require( './lib/get-init-options' ),
  createPkgObj = require( './config/package.json.config' ),
  createEslintObj = require( './config/eslintrc.config' ),
  eslintOptions = require( './config/eslintrc.config.opts.json' );

( async() => {
  const initOptions = await getInit();

  if ( !initOptions.eslintUseExisting ) {
    const eslintConfig = initOptions.eslintConfigType;
    initOptions.eslint = eslintOptions[ eslintConfig ].package.devDependencies;
  } else {
    initOptions.eslint = { };
  }
  const pkg = createPkgObj( initOptions );

  const eslintrc = createEslintObj( initOptions );
} )();
