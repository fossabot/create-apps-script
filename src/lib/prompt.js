const chalk = require( 'chalk' )
const inq = require( 'inquirer' )
const prompts = require( './prompt-script' )

async function displayPrompts ( workDir ) {
	const workspace = process.env.projectRoot
	console.log( `Creating Local Apps Script project at ${chalk.default.blueBright( workspace )}\n` )

	const promptAnswers = await inq.prompt( prompts().prompts )

	return promptAnswers
}

module.exports = displayPrompts