const {
  print
} = require( 'q-i' )

const enumerable = true
const configurable = true
const value = true
const globalsPropDescriptor = () => {
  const desc = Object.create( {} )
  Object.assign( desc, {
    enumerable,
    configurable,
    value
  } )
  return desc
}

const reduceFn = ( prev, curr ) => {
  return Object.assign( prev, {
    [ curr ]: globalsPropDescriptor()
  } )
}

const globalSymbols = [
  'Calendar', 'CalendarApp', 'CardService', 'Charts', 'ContactsApp', 'DataStudioApp', 'DocumentApp', 'Drive', 'DriveApp', 'FirebaseApp', 'FormApp', 'Gmail', 'GmailApp', 'GroupsApp', 'HtmlService', 'LanguageApp', 'MailApp', 'Maps', 'OAuth1', 'OAuth2', 'PropertiesService', 'SitesApp', 'Slides', 'SlidesApp', 'SpreadsheetApp'
]

const globals = Object.defineProperties(
  Object.create( null ),
  Object.assign( {},
    globalSymbols.reduce( ( p, c ) => reduceFn( p, c ),
      Object.create( {} ) /* <== Initial value */
    )
  )
)


print( globals )

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

// globals.

// ANCHOR module.exports
module.exports = Object.create( config );
