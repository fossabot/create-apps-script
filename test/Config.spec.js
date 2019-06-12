/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */

const assert = require( 'assert' );
const Config = require( '../src/lib/classes/Config' );

function testSuite() {

	return describe( 'Config Class', () => {

		const testArgument = {
			dir: '.',
			dot: false,
			extension: 'json',
			name: 'test-config'
		};

		/** @type {Config} The master Config instance   */
		const config = new Config( testArgument );

		describe( 'Config Class', () => {

			describe( 'Constructor', () => {

				describe( 'Default values', () => {

					/** @type {Config} The instance to test default value assignment */
					const defaultInstance = new Config( {} );
					const defaultInstanceKeys = Object.keys( defaultInstance );

					it( 'Should have prop-values identical to defaults', done => {
						const nonMatches = defaultInstanceKeys.map( key => {
							return ( ( String( Config[key] ) === String( defaultInstance[key] ) ) );
						} ).map( ( v, i ) => {

							/* Replace any non-matches with the key label */
							return v ? null : defaultInstanceKeys[i];

						} ).filter( v => v ); /* Then simply remove null values */
						if ( nonMatches.length > 0 ) {
							return done( new Error( `${nonMatches.length} property values are not identical to expected.` ) );
						}

						done();
					} ); // End-Test: Should have prop-values identical to defaults |>
				} ); // End-Suite: Default values ||

				describe( 'Schema Resolution', () => {

					it( 'Should load the object into own property "schema"', done => {

						if ( !config.schema ) {
							return done( new Error( 'No schema property' ) );
						}

						done();

					} ); // End-Test: Should load the object into own property "schema" |>

				} ); // End-Suite: Schema Resolution ||

			} ); // End-Suite: Constructor ||

		} ); // End-Suite: Config Files Base Object Props & Methods ||

	} ); // End-Suite: Config Class ||

}

module.exports = /* >> | << */ testSuite;
