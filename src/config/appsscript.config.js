const tz = Intl.dateTimeFormat().resolvedOptions().timeZone;
const appsscript = {
  'timezone': tz
  ''
}

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
