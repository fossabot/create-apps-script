const Configfile = require("./Config-file")

const defaultConfig = {
	env: {
		amd: true,
		es6: true,
		"googleappsscript/googleappsscript": true,
		node: true
	},
	extends: "",
	globals: {
		Calendar: true,
		CalendarApp: true,
		CardService: true,
		Charts: true,
		ContactsApp: true,
		DataStudioApp: true,
		DocumentApp: true,
		Drive: true,
		DriveApp: true,
		FirebaseApp: true,
		FormApp: true,
		Gmail: true,
		GmailApp: true,
		GroupsApp: true,
		HtmlService: true,
		LanguageApp: true,
		MailApp: true,
		Maps: true,
		OAuth1: true,
		OAuth2: true,
		PropertiesService: true,
		SitesApp: true,
		Slides: true,
		SlidesApp: true,
		SpreadsheetApp: true
	},
	parser: "babel-eslint",
	plugins: ["googleappsscript"],
	root: true
}

/**
 * User-specified options from prompt interface
 * @param {*} options
 * @returns
 */
function eslintConfigObj(options) {
	const eslintObj = options.filePath
		? useExistingEslintObj(options)
		: createNewEslintObj(options)

	console.log(chalk.grey(`Printed from ${__filename}`))
	print(eslintObj)

	return eslintObj
}

/** @class ESLintrc */
class ESLintrc extends Configfile {
	/**
	 * Creates an instance of ESLintrc.
	 * @param {Object} object An eslint ruleset to use for generating the eslintrc instance.
	 * @memberof ESLintrc
	 */
	constructor(object) {
		super()
		this.default = defaultConfig

		if (object && this.validate()) {
			this.importedObject = object
		} else {
			this.importedObject = defaultConfig
		}
	}

	/**
	 * @param {string} value The value for the "extends" rule
	 * @memberof ESLintrc
	 */
	setExtendsRule(value) {
		const acceptValues = ["standard", "eslint:recommended", "airbnb-base"]
		if (acceptValues.includes(value)) {
			if (typeof value === "string") {
				this.content.extends = value
			} else {
				throw new TypeError(
					"Input must be of type string. Received: " + typeof value
				)
			}
		} else {
			throw new Error(
				`Unrecognized value for the "extends" rule: ${value} Available values: ` +
					acceptValues.reduce((prev, cur) => prev + "\n" + cur)
			)
		}
	}

	/**
	 * Adds the 'googleappsscript' environment rule
	 * @memberof ESLintrc
	 */
	addEnvProp() {
		const { env } = this.importedObject
		const propKey = "googleappsscript/googleappsscript"
		if (!env[propKey]) {
			env[propKey] = true
		}
	}

	/**
	 * Modifies the rule set to be ideal for local Apps Script dev tooling
	 * @memberof ESLintrc
	 */
	modify() {
		Object.keys(this.default).forEach(key => {
			if (key === "extends") {
				/* Don't overwrite the user's existing base config */
				if (this.importedObject.extends) {
					return
				}
			}

			if (key === "plugins") {
				if (Array.isArray(this.importedObject[key])) {
					/* Only add to the existing plugin array - don't overwrite it */
					this.importedObject[key] = this.importedObject[key].concat(
						this.default[key]
					)
				} else {
					this.importedObject[key] = this.default[key]
				} /* Unless there isn't one */

				return
			}

			/* Overwrite */
			this.importedObject[key] = this.default[key]
		})
	}
}

// ANCHOR module.exports
module.exports = ESLintrc
