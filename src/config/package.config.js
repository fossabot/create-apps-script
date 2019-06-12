const path = require('path');

const {
	print
} = require('q-i');
const chalk = require('chalk');
const Config = require('../lib/classes/Config');

const dependencies = {
	'@babel/core': '^7.1.5',
	'@babel/plugin-proposal-class-properties': '^7.1.0',
	'@babel/plugin-proposal-object-rest-spread': '^7.0.0',
	'@babel/plugin-transform-member-expression-literals': '^7.0.0',
	'@babel/plugin-transform-object-assign': '^7.0.0',
	'@babel/plugin-transform-property-literals': '^7.0.0',
	'@babel/preset-env': '^7.1.5',
	'@google/clasp': '^1.6.3',
	'@types/google-apps-script': '^0.0.31',
	'babel-eslint': '^10.0.1',
	'babel-loader': '^8.0.4',
	'babel-plugin-add-module-exports': '^1.0.0',
	'babel-plugin-array-includes': '^2.0.3',
	'clean-webpack-plugin': '^0.1.19',
	'copy-webpack-plugin': '^4.6.0',
	eslint: '^5.9.0',
	'eslint-loader': '^2.1.1',
	'eslint-plugin-googleappsscript': '^1.0.1',
	'gas-lib': '^2.0.2',
	'gas-webpack-plugin': '^0.3.0',
	'uglifyjs-webpack-plugin': '^2.0.1',
	webpack: '^4.25.1',
	'webpack-cli': '^3.1.2'
};

const packageContent = defaults => {
	const content = {
		name: defaults.name || 'apps-script-template',
		version: defaults.version || '0.0.1',
		author: defaults.author || 'Cam Smith',
		license: defaults.license || 'MIT',
		repository: defaults.repository || '',
		description: 'Default package.json file for projects created by create-gas-project',
		keywords: [],
		main: 'src/index.js'
	};

	Object.defineProperty(content, 'scripts', {
		configurable: false,
		enumerable: true,
		value: Object.freeze({
			build: 'webpack -p',
			deploy: 'npm run build && npm run upload',
			upload: 'clasp push'
		})
	});

	Object.defineProperty(content, 'dependencies', {
		configurable: true,
		enumerable: true,
		value: dependencies
	});

	Object.defineProperty(content, 'devDependencies', {
		configurable: true,
		enumerable: true,
		value: {}
	});

	return content;
};

const modifyDependencies = thisArg => ({
	addDependency: ({
		name,
		version
	}) => {
		const {dependencies} = thisArg.content;
		if (dependencies[name]) {
			throw new Error('Dependency already exists');
		}

		thisArg.content.dependencies[name] = version;
	},

	removeDependency: name => {
		const {dependencies} = thisArg.content;
		if (!dependencies[name]) {
			throw new Error(`No such dependency: ${name}`);
		}

		delete dependencies[name];
	}
});

/**
 * @param {*} defaults
 */
function PackageJson(defaults) { // eslint-disable-line no-unused-vars
	const obj = Config({
		dir: '.',
		dot: false,
		name: 'package',
		extension: 'json'
	});

	Object.assign(obj, modifyDependencies(obj));

	Object.assign(obj.content, packageContent(defaults));

	Object.freeze(obj.content);
	Object.seal(obj);

	return obj;
}

process.env.target = path.resolve('.');

const pkgjson = PackageJson({});
pkgjson.print();

pkgjson.content.name = 'Butthoe';
pkgjson.addDependency({
	name: 'TEST-DEPENDENCY',
	version: '9.9.9'
});

pkgjson.print();

// ANCHOR module.exports
// module.exports = options => createPackageFile(options)
