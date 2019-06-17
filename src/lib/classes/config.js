const path = require( 'path' )
const { print } = require( 'q-i' )
const chalk = require( 'chalk' )
const fs = require( 'fs' )

const schemas = require( path.resolve( __dirname, '../..', 'schemas' ) )

function createConfig ( {
	root = process.env.projectRoot || process.cwd(),
	dir = '.',
	dotfile = false,
	name,
	rc = false,
	extension = '.json',
	content = {
	}
} ) {
	const config = {
	}

	const validator = ( () => {
		return Object.keys( schemas ).includes( name )
			? schemas[name].validator
			: d => true
	} )()

	Object.defineProperties( config, {
		/* Non-enumerable, non-configurable property to store the configuration object */
		'_content': {
			'configurable': false,
			'writable': true,
			'enumerable': false,
			'value': content
		},

		/* Accessor property for interacting with the configuration object */
		'content': {
			'enumerable': false,
			get () {
				return JSON.stringify( this._content, null, 2 )
			},
			set ( v ) {
				this._content = v
			}
		},

		/* Assign/reassign properties of the configuration object */
		'update': {
			'value': function ( obj ) {
				Object.assign( this._content, obj )
			}
		},

		/* Configuration type */
		'type': {
			'configurable': false,
			'enumerable': true,
			'value': name
		},

		/* Full filename according to argument properties */
		'filename': {
			'value': ( dotfile ? '.' : '' ) + name + ( rc ? 'rc' : '' ) + extension,
			'enumerable': true,
			'configurable': false
		},

		/* Project-root relative path */
		'pathRelative': {
			'configurable': false,
			'enumerable': true,
			'value': dir
		},

		/* Absolute path */
		'path': {
			'configurable': false,
			'enumerable': true,
			get () {
				return path.join( path.resolve( root, dir ), this.filename )
			}
		},

		/* Print to stdout */
		'view': {
			'value': function () {
				console.group( '\nInternal configuration content:' )
				print( this._content )
				console.log( '\n' )
				console.groupEnd()
			}
		},

		/* Compare against associated schema */
		'validate': {
			'value': function ( print = false ) {
				const valid = validator( this._content )
				if ( print ) {
					console.log( `This ${chalk.yellow.bold( name )} configuration ${
						valid ? 'is' : 'is not'
					} valid.` )
				}
				return valid
			}
		},

		/* Create file and write content to disk */
		'create': {
			'value': function () {
				if ( this.validate() ) {
					console.log( chalk.blue( `Writing to disk >> ${this.path}` ) )
					fs.writeFileSync( this.path, this.content )
					console.log( chalk.yellow.bold( '// DONE' ) )
				} else {
					console.log( chalk.red.bold( 'ERROR:\nFile failed validation check, write operation aborted' ) )
				}
			}
		}
	} )

	return config
}

// ANCHOR module.exports
module.exports = createConfig