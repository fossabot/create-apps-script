const createConfig = require( '../lib/classes/config' )
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

const appsscript = createConfig( {
	'dir': './dist',
	'name': 'appsscript',
	'content': {
		'timezone': tz
	}
} )

/*
  Vary the output dependent on:
    - Server engine ???
    - Script type
      - Sheets
      - Webapp
      - DataStudio
    - Dependencies
      - Advanced Services
      - Script libraries
    - OAuth Scopes

*/

// ANCHOR module.exports
module.exports = appsscript