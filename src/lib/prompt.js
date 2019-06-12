const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
// ──────────────────────────────────────────────────
// ──────────────────────────────────────────────────
const inq = require('inquirer');
const prompts = require('./prompt-script');
// ──────────────────────────────────────────────────

const defaults = JSON.parse(fs.readFileSync(path.join(__filename, '../../config/default-prompt-values.json')));

/**
 * Prompts for package.json field values
 */
async function displayPrompts(workDir) {
	const workspace = path.resolve(workDir);

	console.log(`Creating Apps Script project at ${chalk.blue(workspace)}`, '\n');

	const promptAnswers = await inq.prompt(
		prompts(defaults).prompts
	);

	return promptAnswers;
}

module.exports = displayPrompts;