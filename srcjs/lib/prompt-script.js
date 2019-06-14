const fs = require("fs")
const path = require("path")

// ANCHOR module.exports
module.exports = defaults => {
	return {
		prompts: [
			{
				default: "new-gas-project",
				message: "Package name",
				name: "name",
				type: "text"
			},
			{
				default: defaults.author,
				message: "Author",
				name: "author",
				type: "text"
			},
			{
				default: defaults.version,
				message: "Version",
				name: "version",
				type: "text"
			},
			{
				default: defaults.license,
				message: "License",
				name: "license",
				type: "text"
			},
			{
				message: "Repository",
				name: "repository",
				type: "text"
			},
			{
				choices: ["eslint:recommended", "standard", "airbnb-base"],
				default: "eslint:recommended",
				message: "Extend ESLint Configuration:",
				name: "eslintConfigType",
				type: "list"
			}
			// {
			//   'message'  : 'Path to local file: ',
			//   'name'     : 'eslintPath',
			//   'type'     : 'text',
			//   'validate' : input => fs.existsSync( path.resolve( input ) ) &&
			//     path.basename( input ).includes( 'eslint' ),

			//   'when': answers => answers.eslintConfigType === 'local-file'
			// }
		]
	}
}
