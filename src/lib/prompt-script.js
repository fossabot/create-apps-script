const fs = require( 'fs' )
const path = require( 'path' )

// ANCHOR module.exports
module.exports = defaults => {
	if ( !defaults ) {
		defaults = {
			'author': 'Author Name',
			'version': '1.0.0',
			'license': 'MIT'
		}
	}
	return {
		'prompts': [
			{
				'default': 'new-gas-project',
				'message': 'Package name',
				'name': 'name',
				'type': 'text'
			},
			{
				'default': defaults.author,
				'message': 'Author',
				'name': 'author',
				'type': 'text'
			},
			{
				'default': defaults.version,
				'message': 'Version',
				'name': 'version',
				'type': 'text'
			},
			{
				'default': defaults.license,
				'message': 'License',
				'name': 'license',
				'type': 'text'
			},
			{
				'message': 'Repository',
				'name': 'repository',
				'type': 'text'
			},
			{
				'choices': [
					'eslint:recommended', 'standard', 'airbnb-base'
				],
				'default': 'eslint:recommended',
				'message': 'Extend ESLint Configuration:',
				'name': 'eslintExtends',
				'type': 'list'
			}
		]
	}
}