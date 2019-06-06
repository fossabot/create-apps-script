const defaultConfig = {
  'env': {
    'amd': true,
    'es6': true,
    'googleappsscript/googleappsscript': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Calendar': true,
    'CalendarApp': true,
    'CardService': true,
    'Charts': true,
    'ContactsApp': true,
    'DataStudioApp': true,
    'DocumentApp': true,
    'Drive': true,
    'DriveApp': true,
    'FirebaseApp': true,
    'FormApp': true,
    'Gmail': true,
    'GmailApp': true,
    'GroupsApp': true,
    'HtmlService': true,
    'LanguageApp': true,
    'MailApp': true,
    'Maps': true,
    'OAuth1': true,
    'OAuth2': true,
    'PropertiesService': true,
    'SitesApp': true,
    'Slides': true,
    'SlidesApp': true,
    'SpreadsheetApp': true
  },
  'parser': 'babel-eslint',
  'plugins': [ 'googleappsscript' ],
  'root': true
};

// ANCHOR module.exports
module.exports = Object.create(defaultConfig);
