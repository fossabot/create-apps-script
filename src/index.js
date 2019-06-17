#!/usr/bin/env node

const path = require( 'path' )

const prompt = require( './lib/prompt' )
const eslint = require( './lib/classes/eslint.file' )
const appsscript = require( './config/appsscript.config' )

console.log( process.argv )
;( async () => {
	process.env.projectRoot = path.resolve( process.argv[2] || process.cwd() )
	const answers = await prompt( '.' )
	const files = []
	files.push( eslint( answers.eslintExtends ) )
	files.push( appsscript )
} )()