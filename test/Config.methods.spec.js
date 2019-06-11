const path = require('path')
const homedir = require('os').homedir()

const Config = require('../lib/classes/Config')

const config = new Config()
const testp = path.resolve(__dirname, '../Readme.md')

/* eslint-disable no-undef */

describe('Class Methods', () => {
  describe('import', () => {
    describe('Input validation', () => {
      it('Should reject invalid paths', (done) => { // eslint-disable-line consistent-return
        const testpath = path.join(homedir, 'some', 'ridiculous', 'path', 'which', 'is-nonexistent', 'supercalifragilistic.expialidocious.json')

        try {
          config.import({ 'filepath': testpath })
        } catch (err) {
          return done()
        }

        done(Error(`Method accepted provided path: ${testpath}`))
      }) // > End-Test: Should reject bad paths

      it('Should reject unsupported extensions', (done) => { // eslint-disable-line consistent-return
        const testpath = path.resolve(__dirname, '../Readme.md')

        try {
          config.import({ 'filepath': testpath })
        } catch (err) {
          return done()
        }

        done(Error(`Method accepted an unsupported file type: ${testpath}`))
      }) // > End-Test: Should reject unsupported extensions
    }) /* Input validation */

    it('Should fail', (done) => { // eslint-disable-line consistent-return
      try {
        const obj = config.importFile(testp)
        console.log(obj)
      } catch (e) {
        console.log(e)
        done()
      }

      done(Error())
    }) // > End-Test: Should fail
  }) /* importFile */
}) /* Class Methods */
