const path = require('path')
const homedir = require('os').homedir()
const assert = require('assert')
const Configfile = require('../lib/classes/Config')

/* eslint-disable no-undef */
describe('Class: Config', () => {
  const testConfigDescriptor = {
    'dir': '.',
    'dot': false,
    'extension': 'json',
    'name': 'test-config'
  }
  const config = new Configfile(testConfigDescriptor)

  describe('Constructor', () => {
    describe('Input validation', () => {
      describe('Reject non-string arguments', () => {
        [
          {
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
        [
          {
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
              } catch (err) { }
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
})
