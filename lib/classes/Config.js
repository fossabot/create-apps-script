const path = require('path')
const fs = require('fs')
const {
  print
} = require('q-i')

const configPrototype = {
  'content': {},
  write () {
    fs.writeFileSync(this.path, this.toString())
  },
  toString () {
    return JSON.stringify(this.content)
  },

  print (key) {
    if (key) {
      print(this.content[ key ])
    } else print(this.content)
  },
  info (key) {
    if (key) {
      print(this[ key ])
    } else print(this)
  }
}

Object.defineProperty(configPrototype, 'filename', {
  get () {
    return this.fileName
  },
  set ({
    dot,
    name,
    extension
  }) {
    this.fileName = (dot ? '.' : '') + name + (extension.length ? '.' + extension : '')
  }
})

/**
 * @param {string} target
 * @param {string} dir
 * @param {string} name
 * @returns
 */
function Config ({
  dir = '.',
  dot = false,
  extension = '',
  name = 'config'
} = {}) {
  const config = Object.create(configPrototype)

  Object.defineProperty(config, 'root', {
    'configurable': false,
    'enumerable': true,
    'writable': false,
    'value': path.resolve(process.env.target || process.cwd())
  })

  Object.defineProperty(config, 'dir', {
    'configurable': false,
    'enumerable': true,
    'value': dir
  })

  Object.defineProperty(config, 'name', {
    'configurable': false,
    'enumerable': true,
    'value': name
  })

  config.filename = {
    dot,
    name,
    extension
  }

  /* Computed values */
  Object.defineProperty(config, 'path', {
    'configurable': false,
    'enumerable': true,
    get () {
      return path.resolve(this.root, this.dir, this.filename)
    }
  })

  /* Return ********************/
  return config
}

/*
const arg = {
  'root': '.',
  'dir': '.',
  'dot': false,
  'name': 'package',
  'extension': 'json'
}
*/

// ANCHOR module.exports
module.exports = Config

// const config = new Config(arg)

// config.print()

// console.log(config)
// console.log(config.path)
