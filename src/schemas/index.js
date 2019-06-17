/**
 * @typedef {Object} Schemas
 * @property {SchemaObj} eslint
 * @property {SchemaObj} appsscript
 * @property {SchemaObj} clasp
 * @property {SchemaObj} markdownlint
 * @property {SchemaObj} package
 * @property {SchemaObj} prettier
 */

/**
 * @typedef {Object} SchemaObj
 * @property {import('ajv').ValidateFunction} validator
 */

const path = require( 'path' )
const fs = require( 'fs' )
//  ──────────────────────────────────────────────────
const ajv = new ( require( 'ajv' ) )()
// ──────────────────────────────────────────────────

/**
@param {string} name name string
@returns {string} Formatted name string
*/
function fmt ( name ) {
	let base = name[0] === '.' ? name.slice( 1 ) : name
	base = base.includes( '.' ) ? base.split( '.' )[0] : base

	return base.slice( base.length - 2, base.length ) === 'rc'
		? base.slice( 0, base.length - 2 )
		: base
}

/**
@param {Schemas} obj The recipient object
@param {string} filename The file name
@returns {Schemas} Refernce to the `obj` param, for use in `Array.reduce`
*/
function reducer ( obj, filename ) {
	const filePath = path.join( __dirname, filename )
	const schema = JSON.parse( fs.readFileSync( filePath, 'utf8' ) )

	const key = fmt( filename )
	const value = ajv.compile( schema )

	Object.defineProperty( obj, key, {
		'configurable': false,
		'enumerable': true,
		'value': {
			'validator': value
		}
	} )

	/** @type {Schemas} */
	const out = obj
	return out
}

/** @type {Schemas} */
const baseObj = {
	/*	{String} name : {Function} validator, */
}

const SchemaCollection = fs
	.readdirSync( __dirname ) // ANCHOR module.exports
	.filter( str => str.includes( 'schema' ) )
	.reduce( ( prev, curr ) => reducer( prev, curr ), baseObj )

module.exports = SchemaCollection