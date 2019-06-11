const path = require('path')

const chalk = require('chalk')
const fs = require('fs')
const {
  print
} = require('q-i')

const configurable = false
const enumerable = true

const prop = (value, obj) => (Object.assign({
  configurable,
  enumerable,
  value
}, obj))

const accessor = (obj) => (Object.assign({
  configurable,
  enumerable
}, obj))

function report (thisArg) {
  if (!(parseInt(process.env.LOG_LEVEL, 10) < 2)) {
    console.group(chalk.green(`Config-Base-Object, file: ${chalk.white.bold(thisArg.filename)}`))

    console.log(chalk.blue('Meta Info:'))
    thisArg.info()
    console.log(chalk.blue('File Content:'))
    thisArg.print()

    console.groupEnd('\n\n')
  }
}

const configPrototype = {
  'content': {},
  writeFile () {
    fs.writeFileSync(this.path, this.toString())
  },
  toString () {
    return JSON.stringify(this.content)
  },

  /**
   * Prints **`this.content[key]`** to `stdout` (if it exists). If no `key` property exists, print **`this.content`** to `stdout`.
   * Takes an optional parameter `key`, allowing specificity when logging.
   * @param {string} [key] ***optional***  A property name of `this.content` to individually inspect the value of.
   *
   * *Note - The console output of this method is **exactly** the data/Object that will be written to the disk upon calling `this.writeFile`*
   *
   */
  print (key = null) {
    if (key) {
      print(this.content[ key ])
    } else print(this.content)
  },

  /**
   * Prints value of **`this[key]`** to `stdout` (if it exists). If no `key` property exists, the
   * method prints **`this`** Object's enumerable props to `stdout`.
   * Takes an optional parameter `key`, allowing specificity when logging.
   *
   * @param {string} [key] ***optional***  A property name defined on `this`, to individually inspect the value of.
   */
  info (key) {
    if (key) {
      print(this[ key ])
    } else print(this)
  },

  report () {
    report(this)
  }
}

/**
 * @param {string} target
 * @param {string} dir
 * @param {string} name
 * @returns
 */
function Config ({
  dir = '.',
  dot = false,
  extension = 'json',
  name = 'default-name'
} = {}) {
  dir = dir instanceof String ? dir : '.'
  extension = extension instanceof String ? extension : 'json'
  name = name instanceof String ? name : 'default-name'
  dot = dot instanceof Boolean ? dot : false

  const config = Object.create(configPrototype)

  Object.defineProperties(config,
    {
      'root': prop(process.env.target || process.cwd(), {
        'writable': false
      }),

      'dir': prop(dir),

      'name': prop(name),

      'extension': prop(extension),

      'filename': accessor({
        get () {
          return (this.dot ? '.' : '') + this.name + (this.extension && this.extension.length ? '.' + this.extension : '')
        }
      }),

      'path': accessor({
        get () {
          return path.resolve(this.root, this.dir, this.filename)
        }
      })

    })

  config.report()

  /* Roll outta the facorty */
  return config
}

// ANCHOR module.exports
module.exports = Config
