const getInit = require( './lib/get-init-options' ),
  eslintOptions = require( './config/eslint-config-deps.json' ),
  createPkgObj = require( './config/package-stub' );

( async () => {
  const initOptions = await getInit();

  if ( !initOptions.eslintUseExisting ) {
    const eslintConfig = initOptions.eslintConfigType;
    initOptions.eslint = eslintOptions[ eslintConfig ].package.devDependencies;
  } else {
    initOptions.eslint = { }
  }
  const package = createPkgObj( initOptions );


} )();
