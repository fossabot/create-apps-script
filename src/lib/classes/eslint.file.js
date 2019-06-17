const createConfig = require( './config' )

const baseValues = {
	'env': {
		'es6': true,
		'node': true,
		'googleappsscript/googleappsscript': true
	},
	'globals': {
		'Calendar': true,
		'CalendarApp': true,
		'CardService': true,
		'Charts': true,
		'ContactsApp': true,
		'DataStudioApp': true,
		'DocumentApp': true,
		'Drive': true,
		'DriveApp': true,
		'FirebaseApp': true,
		'FormApp': true,
		'Gmail': true,
		'GmailApp': true,
		'GroupsApp': true,
		'HtmlService': true,
		'LanguageApp': true,
		'MailApp': true,
		'Maps': true,
		'OAuth1': true,
		'OAuth2': true,
		'PropertiesService': true,
		'SitesApp': true,
		'Slides': true,
		'SlidesApp': true,
		'SpreadsheetApp': true
	},
	'parser': 'babel-eslint',
	'parserOptions': {
		'ecmaVersion': 2019,
		'sourceType': 'module'
	},
	'plugins': ['googleappsscript'],
	'root': true
}

function ESLint ( extend ) {
	const eslintConfig = createConfig( {
		'dotfile': true,
		'name': 'eslint',
		'rc': true,
		'extension': '',
		'content': baseValues
	} )

	eslintConfig.update( {
		'extends': extend
	} )

	eslintConfig.view()
}

// ANCHOR module.exports
module.exports = ESLint