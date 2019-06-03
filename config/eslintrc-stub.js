const path = require('path');
const yaml = require('js-yaml');

/**
 * @param {*} options
 * @returns
 */
function createEslintObj( options ) { // eslint-disable-line no-unused-vars
  const defaultConfig = {
    'env': {
      'amd'                               : true,
      'es6'                               : true,
      'googleappsscript/googleappsscript' : true,
      'node'                              : true
    },
    'extends' : '', // REVIEW
    'globals' : {
      'Calendar'    : false,
      'CardService' : true,
      'Drive'       : true,
      'FirebaseApp' : true,
      'Gmail'       : true,
      'OAuth1'      : true,
      'OAuth2'      : true,
      'Slides'      : true
    },
    'parser'  : 'babel-eslint',
    'plugins' : [ 'googleappsscript' ],
    'root'    : true
  };

  if ( options.eslintUseExisting ) {
    // eslint-disable-next-line global-require
    const eslintRulePath = options.eslintPath;
    const extension = path.ext(options.eslintPath);
    const loader = (extension === 'yaml' || extension === 'yml') ?
        (p) => yaml.safeLoad(fs.readFileSync(p, 'utf8')) :
        (p) => require(p);
 
    const eslintObj = loader(eslintRulePath);

    if ( options.eslintShouldModify ) {
      // Load eslintrc file into object and perform transformation
      Object.keys(defaultConfig).forEach(key => {
        if (key === 'extends') return;
        if (key === 'plugins') {
           eslintObj[key] = eslintObj[key].concat(defaultConfig[key]);
           return;
        }

        eslintObj[key] = defaultConfig[key];
      });
    }
    
    return eslintObj;
  }


  defaultConfig['extends'] = options.eslintConfigType;
  
  return defaultConfig;
  
};

 module.exports = createEslintObj;
