const env = ['node', 'commonjs'].reduce((p, v) => {
	p[v] = true
	return p
}, {})

const overrides = {
	files: './test/**',
	rules: {
		'max-nested-callbacks': 'off'
	}
}

const extend = ['standard', 'prettier']

const plugins = ['standard', '@typescript-eslint/eslint-plugin', 'prettier']

const parser = '@typescript-eslint/parser'

const parserOptions = {
	ecmaVersion: 2019,
	sourceType: 'module'
}

// ANCHOR module.exports
module.exports = {
	env,
	extends: extend,
	overrides,
	plugins,
	parser,
	parserOptions
}
