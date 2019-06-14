const fs = require("fs")
const path = require("path")
const yaml = require("js-yaml")
const ajv = require("ajv")
// SECTION Development modules
const { print } = require("q-i")
const chalk = require("chalk")
const configOptions = require("./eslintrc.options.json")
// !SECTION Development modules

let config = {}

/**
 * Modifies the imported eslintrc config object with rules specialized for GAS development
 */
function modifyConfig() {
	Object.keys(config).forEach(key => {
		if (key === "extends") {
			/* Don't overwrite the user's existing base config */
			return
		}

		if (key === "plugins") {
			if (Array.isArray(config[key])) {
				/* Only add to the existing plugin array - don't overwrite it */
				config[key] = config[key].concat(config[key])
			} else {
				config[key] = config[key]
			} /* Unless there isn't one */

			return
		}

		/* Overwrite */
		config[key] = config[key]
	})
}

/**
 * Handle the import-existing strategy
 * @param {*} options
 * @returns
 */
function useExistingEslintObj(filePath, modify) {
	const eslintRulePath = filePath
	config = importConfig(eslintRulePath)

	if (modify) {
		modifyConfig()
	}
}

/**
 * Handle the create-new strategy
 * @param {*} options
 * @returns
 */
function createNewEslintObj(extendsConfig) {
	config = config

	const configType = extendsConfig
	config.extends = configType

	const associatedPlugins =
		configOptions.extendsValueDependencies[configType].eslintrc
	associatedPlugins.plugins.forEach(plugin => config.plugins.push(plugin))
}

/**
 * Validated the produced object against the official schema
 * @param {*} rules
 */
function verifyRuleObject(rules) {}

module.exports = eslintConfigObj
