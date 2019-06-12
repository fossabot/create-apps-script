/** ---------------------------------------------------------------------------------------
@module Factory that produces a Config instance. Configs are then adapted into a specific file-type
*/

/**
@typedef {Object} PropertyDescriptor
@prop {Boolean} configurable
@prop {Boolean} enumerable
@prop {Boolean} [writable]
@prop {any} value
@prop {Function} [get]
@prop {Function} [set]
*/

const path = require('path');
const fs = require('fs');

const chalk = require('chalk');
const {print} = require('q-i');

const Schemas = require('../../schemas');

const configPrototype = {
	content: {},

	/** Writes the data/Object stored in `content` to a file at `path`
   * @returns {Promise<void>} Promise */
	writeFile() {
		return new Promise((resolve, reject) => {
			fs.writeFile(this.path, this.stringify(), {encoding: 'utf8'},
				err => err ? reject(err) : resolve()
			);
		});
	},

	stringify() {
		return JSON.stringify(this.content);
	},

	/** @param {string} [key] OPTIONAL - A property key within `this.content` */
	print(key = null) {
		if (key) {
			print(this.content[key]);
		} else {
			print(this.content);
		}
	},

	/** @param {string} [key] OPTIONAL - An individual value to inspect */
	info(key = null) {
		if (key) {
			print(this[key]);
		} else {
			print(this);
		}
	}
};

/* Assign new property */
const prop = /**
@param {any} value
@param {PropertyDescriptor} [obj] Optionally include other descriptor properties, which will overwrite defaults
@returns {PropertyDescriptor}
*/ (value, obj) => {
		if (typeof value !== 'boolean' && !value) {
			throw new TypeError(`Invalid Argument for Property Value: ${value}`); // > Verify {value} != null or undefined -
		}

		return Object.assign({
			configurable: false,
			enumerable: false,
			value
		}, obj);
	};

const accessor = /**
Create a property descriptor for a **new getter and/or setter**
@param {PropertyDescriptor} obj An object with a `get` and/or `set` method. May include other properties as well.
@returns {PropertyDescriptor}
*/ obj => Object.assign({
		configurable: false,
		enumerable: false
	}, obj);

/**
@class
@name ConfigFile
@prop {string} path
@prop {string} name
*/

/** @constructs */
const Config = function ({dir = '.', dot = false, extension = 'json', name = 'default-name'} = {}) {
	const configInstance = {};
	Object.setPrototypeOf(configInstance, configPrototype);

	/* Configure properties describing instance's basic information */
	Object.defineProperties(configInstance,
		/** @lends Config.prototype  */
		{
			/** @member {string} root */
			root: /* Project root */
        prop(process.env.target, {
        	writable: false
        }),

			dir: /* File path relative to `root` */
        prop(dir),

			name: /* File name (e.g., 'eslintrc', 'package', ...) */
        prop(name),

			extension: /* File extension */
        prop(extension),

			filename: /* Getter for the full filename */
        accessor({
        	/** @this Config  */
        	get() {
        		return (
        			(this.dot ? '.' : '') +
              this.name +
              (this.extension && this.extension.length ? '.' + this.extension : '')
        		);
        	}
        }),

			path: /* Getter for the full absolute path */
        accessor({
        	get() {
        		return path.resolve(this.root, this.dir, this.filename);
        	}
        })

		});

	Object.defineProperty(configInstance, 'validate', {
		configurable: false,
		enumerable: false,
		value: Schemas[configInstance.filename].validator
	});

	return configInstance;
};

// ANCHOR module.exports
module.exports = Config;
