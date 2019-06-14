const path = require("path")
const fs = require("fs")
const chalk = require("chalk")
// ──────────────────────────────────────────────────
// ──────────────────────────────────────────────────
const inq = require("inquirer")
const prompts = require("./prompt-script")
// ──────────────────────────────────────────────────

const defaults = JSON.parse(
	Buffer.from(
		fs.readFileSync(
			path.join(__filename, "../../config/default-prompt-values.json")
		)
	).toString("utf8")
)

async function displayPrompts(workDir) {
	const workspace = path.resolve(workDir)

	console.log(
		`Creating Apps Script project at ${chalk.default.bgBlueBright(workspace)}`,
		"\n"
	)

	const promptAnswers = await inq.prompt(prompts(defaults).prompts)

	return promptAnswers
}

;(async () => {
	await displayPrompts(process.cwd())
})()

// module.exports = displayPrompts;
