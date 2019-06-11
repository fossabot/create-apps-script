const chalk = require('chalk')

/* DEFINE LOGGING LEVEL */
process.env.LOG_LEVEL = 1

const Config = require('../lib/classes/Config')
const ConfigDefault = require('./resources/Config-defaults-obj')

/* eslint-disable no-undef */
describe(chalk.bold('Config Files Base Object Props & Methods' + '\n   ' + chalk.yellow(('──').repeat(14)) + '\n'), () => {
  const testConfigDescriptor = {
    'dir': '.',
    'dot': false,
    'extension': 'json',
    'name': 'test-config'
  }

  /** @type {Config} The master Config instance   */
  const config = new Config(testConfigDescriptor)

  describe('Constructor', () => {
    describe('Default values', () => {
      /** @type {Config} The instance to test default value assignment */
      // eslint-disable-next-line camelcase
      const testInstance_defaults = new Config({})

      const defKeys = Object.keys(testInstance_defaults)

      it('Has Exactly 6 Enumerable-Own-Properties', (done) => { // eslint-disable-line consistent-return
        if (defKeys.length < 6) return done(Error('Too few properties'))
        else if (defKeys.length > 6) return done(Error('Too many properties'))

        done()
      }) // End Has 6 Enumerable Own Propertie

      describe('Instance with default values', () => {
        it('Should have prop-values identical to defaults.', (done) => { // eslint-disable-line cosistent-return
          const nonMatches = defKeys.map(key => {
            return ((String(ConfigDefault[ key ]) === String(testInstance_defaults[ key ])))
          }).map((v, i) => {
            /* Replace any non-matches with the key label */
            return !v ? defKeys[ i ] : null
          }).filter(v => v) /* Then simply remove null values */

          if (nonMatches.length > 0) return done(Error(`${nonMatches.length} property values are not identical to expected.`))

          done()
        }) // End: Should have prop-values identical to defaults.
      }) /* Instance from {} arg */
    }) /* Default values */

    describe('Input validation', () => {
      describe('Reject non-string arguments', () => {
        [ {
          'type': 'Null',
          'value': null
        },
        {
          'type': 'Undefined',
          'value': undefined // eslint-disable-line no-undefined
        },
        {
          'type': 'Number',
          'value': 42
        },
        {
          'type': 'Array',
          'value': []
        },
        {
          'type': 'Object',
          'value': {
            'key': 'value'
          }
        },
        {
          'type': 'Function',
          'value': arg => 'blue fish'
        }
        ].forEach((argObj) => {
          it(argObj.type, (done) => { // eslint-disable-line consistent-return
            try {
              config.util.formatTypeName(argObj.value)
            } catch (err) {
              if (err.message === 'Input must be string') return done()
            }
            done(Error('Constructor did not throw for invalid input'))
          })
        })
      }) /* Reject non-string arguments */

      describe('Reject unknown config types', () => {
        [ {
          'testData': [ '.config.json', 'shwoop.yaml', 'gobbledigook.js' ],
          'testName': 'Invalid Name'
        },
        {
          'testData': [ '.eslintrc.txt', 'appsscript.pdf', 'clasp.mp4' ],
          'testName': 'Invalid Extension'
        }
        ].forEach((testObj) => {
          it(testObj.testName, (done) => {
            testObj.testData.forEach((value) => {
              try {
                config.util.formatTypeName(value)
                done(
                  Error(`${testObj.testName} was accepted by the constructor. Value: ${value}`)
                )
              } catch (err) {}
            })

            done()
          })
        })
      }) /* Reject unknown config types */
    }) /* Input validation */

    describe('Input formatting', () => {
      const output = config.type

      it('Should remove leading "."', (done) => {
        if (output.includes('.')) {
          done(
            new Error('Found dot(s) in output string')
          )
        }

        done()
      })

      it('Should fully remove extension', (done) => {
        if (output.includes(testString.split('.')[ 2 ])) {
          done(
            new Error('Output contains extension')
          )
        }

        done()
      })
    }) /* Input formatting */

    describe('Schema Resolution', () => {
      it('Should load the object into own property "schema"', (done) => { // eslint-disable-line consistent-return
        if (!config.schema) return done(Error('No schema property'))

        done()
      }) // End Should load the object into own property "schema"
    }) /* Schema Resolution */
  }) /* Constructor */
}) /* Config Files Base Object Props & Methods */
