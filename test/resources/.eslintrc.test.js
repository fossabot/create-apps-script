const Config = require( '../../src/lib/classes/Config' )
const {
  print
} = require( 'q-i' )

/* Some default property settings */
const enumerable = true
const configurable = true
const value = true

/* And a handy factory */
const globalDescriptor = () => {
  const desc = Object.create( {} )
  Object.assign( desc, {
    enumerable,
    configurable,
    value
  } )
  return desc
}

const gSuiteSymbols = [
  'CalendarApp',
  'CardService',
  'Charts',
  'ContactsApp',
  'DataStudioApp',
  'DocumentApp',
  'DriveApp',
  'FirebaseApp',
  'FormApp',
  'GmailApp',
  'GroupsApp',
  'LanguageApp',
  'MailApp',
  'Maps',
  'SitesApp',
  'SlidesApp',
  'SpreadsheetApp'
]

const utilSymbols = [
  'HtmlService',
  'OAuth1',
  'OAuth2',
  'PropertiesService',
]

const globalSymbols = [
  'Calendar', 'CalendarApp', 'CardService', 'Charts', 'ContactsApp', 'DataStudioApp', 'DocumentApp', 'Drive', 'DriveApp', 'FirebaseApp', 'FormApp', 'Gmail', 'GmailApp', 'GroupsApp', 'HtmlService', 'LanguageApp', 'MailApp', 'Maps', 'OAuth1', 'OAuth2', 'PropertiesService', 'SitesApp', 'Slides', 'SlidesApp', 'SpreadsheetApp'
]

const reducer = ( prev, curr ) => {
  return Object.assign( prev, {
    [ curr ]: globalDescriptor()
  } )
}

const globals = Object.defineProperties(
  Object.create( null ),
  Object.assign( {},
    globalSymbols.reduce( ( p, c ) => reducer( p, c ),
      Object.create( {} )
    )
      ) )

const env = Object.freeze( {
  'amd': true,
  'googleappsscript/googleappsscript': true,
  'node': true
} )

const parser = 'babel-eslint'

const parserOptions = Object.freeze( {
  'sourceType': 'module'
} )

const plugins = [].push( 'googleappsscript' )

const root = true

const config = {
  'extends': '',
  'root': true
};

function Eslint() {

}

// globals.

// ANCHOR module.exports
module.exports = Object.create( config );
