const process = require('process')

const prompt = require('./lib/prompt')
const packageConfig = require('./config/package.config')
// const eslintrcConfig = require( './config/eslintrc.config' );
const eslintOptions = require('./config/eslintrc.options.json')

const schemas = require('./lib/schemas')

const configFileObjs = { /*
  'filename'  : ''
  'dir'       : '.',
  'dot'       : true,
  'extension' : '',
  'content'   : {},
*/ };

(async () => {
  const args = process.argv.slice(2)
  const target = args[ 0 ] || process.cwd()

  const initOptions = await prompt(target)

  if (!initOptions.eslintUseExisting) {
    const eslintConfig = initOptions.eslintConfigType
    initOptions.eslint = eslintOptions[ eslintConfig ].package.devDependencies
  } else {
    // initOptions.eslint = eslintrcConfig( initOptions );
  }

  const pkg = packageConfig(initOptions)
})()
