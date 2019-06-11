const path = require('path')

const defaultConfigProfile = { /*
  'dir': '.',
  'dot': false,
  'extension': 'json',
  'name': 'default-name',
  'pathAbs': undefined
  */ }

const configurable = false
const enumerable = false

Object.defineProperties(defaultConfigProfile, {
  'root': {
    'configurable': false,
    'enumerable': true,
    'value': (process.env.target || process.cwd())
  },

  'dir': {
    configurable,
    enumerable,
    'value': '.'
  },

  'dot': {
    configurable,
    enumerable,
    'value': false
  },

  'extension': {
    configurable,
    enumerable,
    'value': 'json'
  },

  'name': {
    configurable,
    enumerable,
    'value': 'default-name'
  },

  'filename': {
    'configurable': false,
    'enumerable': true,
    get () {
      return (this.dot ? '.' : '') +
        (this.name) +
        (this.extension.length ? '.' + this.extension : '')
    }
  },

  'pathSet': {
    'configurable': false,
    'enumerable': false,
    'value': false
  },

  'path': {
    'configurable': false,
    'enumerable': true,
    get () {
      return String(this.pathAbs)
    },
    set ({ root, dir, filename }) {
      if (!this.pathSet) {
        this.pathAbs = path.resolve(root, dir, filename)
        this.pathSet = true
      }
    }
  }
})

const root = (process.env.target || process.cwd())
const dir = '.'
const filename = defaultConfigProfile.filename

defaultConfigProfile.path = { root, dir, filename }

/**
 * @module Config-default-obj Exports a frozen Config object mock with default values set for required properties, against which comparisons can be made
 */

// ANCHOR module.exports
module.exports = Object.freeze(defaultConfigProfile)
