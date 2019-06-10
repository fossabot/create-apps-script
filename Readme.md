<h1 align="center">
  create-apps-script
</h1>

<p align="center"><b>-</b> Project-Scaffolder <b>|</b> Config-Contraptionator <b>|</b> DevTool-Assimilator <b>-</b></p>
<h2 align="center">Create a Local Apps Script Development Package in Seconds</h2>
</p>

<br>

<p align="center">

  

  <a href="https://www.npmjs.org/package/create-gas-project">
    <img src="https://img.shields.io/npm/l/create-gas-project.svg?style=flat-square" alt="npm License">
  </a>

  <a href="https://www.npmjs.org/package/create-gas-project">
    <img src="https://img.shields.io/npm/v/create-gas-project.svg?style=flat-square" alt="npm version">
  </a>

  <br />

  <a href="https://travis-ci.org/csmith14/create-gas-project">
    <img src="https://img.shields.io/travis/csmith14/create-gas-project.svg?style=flat-square" alt="Build Status (Travis CI)">
  </a>

  <a href="">
    <img src="https://img.shields.io/codecov/c/github/csmith14/create-gas-project.svg?style=flat-square" alt="Test Coverage (codecov)">
  </a>

  <br />

  <a href="https://david-dm.org/csmith14/create-gas-project">
    <img src="https://img.shields.io/david/csmith14/create-gas-project.svg?style=flat-square" alt="David (Dependencies)">
  </a>

  <a href="https://david-dm.org/csmith14/create-gas-project?type=dev">
    <img src="https://img.shields.io/david/dev/csmith14/create-gas-project.svg?style=flat-square" alt="David (Dev Dependencies)">
  </a>

  <br />

  <a href="http://standardjs.com">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="Standard Code Style">
  </a>

</p>

<br>
<hr>


## ⭐️ Features
- Combines the most popular and effective development tools 

  🤖 Use **Babel** to write and compile modern Javascript to Google Apps Script's ECMA spec.

  💬 Leverage **ESLint** to catch syntax errors and future bugs before deployment.

  ☕️ Use **Mocha** to follow Test-Driven-Development practices.

  - **Webpack** combines transpiling, minification, linting, and bundling into a single process.

<br>

## Construct a Development Environment :construction_worker:

1. <b>Run command</b> to `init` a project:
    >  - <b>npm</b>: <b>`npm init gas-project [destination] [options]`</b>
    >  - <b>yarn</b>: <b>`yarn create gas-project [destination] [options]`</b>
    ><br><br><b>Note</b> - *If <b>`destination`</b> default is the <b>current working directory</b>*
2. <b>Answer</b> the prompts and configure your development workspace.
3. <b>Install</b> dependencies using preferred package manager

<br>

## Project Directory, Hard Defaults

The output directory will have the following structure:

```text
  [target]/
    - .babelrc
    - .editorconfig
    - .eslintrc
    - .eslintignore
    - .gitignore
    - webpack.config.js
    + config/
     - appsscript.json
     - .clasp.json
       [ ... ]
    + dist/

    + src/
      - index.js
      - main.js

```

<br>

---

# Detailed Usage Information
## Arguments & Options 🏁

### Arguments
| Name | Required | Default Value | Description |
|--|--|--|--|
| `target` | <b>No</b> | Current working directory | <p>Local path. Relative paths are resolved from the current working directory.
<br/>
Path's leafnode must be directory. If the leafnode does not exist, it is created.
<br/></p>|

## CLI Prompt & Package.json Field Default Values

### <b>Default Responses</b> : <small>How `.npmrc` and `.yarnrc` values are resolved</small>

This program uses the `'rc'` package internally to locate and utilize `.npmrc` / `.yarnrc` files/content at run time.


--

# 📑
# Detailed File Creation Information

### Package.json

> #### devDependencies
> A series of prompts regarding field values for the generated package.json file follow.
>
> Aside from these fields, the package file contains a number of predefined properties within <b>`devDependencies`<b>.
> The majority of these modules are webpack loaders/plugins, eslint configurations/plugins, babel plugins, or `@types/*` definitions.
>
> Detail of the provided dependencies, their version, and a brief explanation of their necessity is provided in the table below.
>
> | <b>devDependency</b> package                          | <b>Version</b> | <b>Purpose</b>              |
> |----------------------------------------------------|-------------|--------------------------|
> | @babel/core                                        | ^7.1.5      |   *Coming Soon*          |
> | @babel/plugin-proposal-class-properties            | ^7.1.0      |   *Coming Soon*          |
> | @babel/plugin-proposal-object-rest-spread          | ^7.0.0      |   *Coming Soon*          |
> | @babel/plugin-transform-member-expression-literals | ^7.0.0      |   *Coming Soon*          |
> | @babel/plugin-transform-object-assign              | ^7.0.0      |   *Coming Soon*          |
> | @babel/plugin-transform-property-literals          | ^7.0.0      |   *Coming Soon*          |
> | @babel/preset-env                                  | ^7.1.5      |   *Coming Soon*          |
> | @google/clasp                                      | ^1.6.3      |   *Coming Soon*          |
> | @types/google-apps-script                          | ^0.0.31     |   *Coming Soon*          |
> | babel-eslint                                       | ^10.0.1     |   *Coming Soon*          |
> | babel-loader                                       | ^8.0.4      |   *Coming Soon*          |
> | babel-plugin-add-module-exports                    | ^1.0.0      |   *Coming Soon*          |
> | babel-plugin-array-includes                        | ^2.0.3      |   *Coming Soon*          |
> | clean-webpack-plugin                               | ^0.1.19     |   *Coming Soon*          |
> | copy-webpack-plugin                                | ^4.6.0      |   *Coming Soon*          |
> | eslint                                             | ^5.9.0      |   *Coming Soon*          |
> | eslint-loader                                      | ^2.1.1      |   *Coming Soon*          |
> | eslint-plugin-googleappsscript                     | ^1.0.1      |   *Coming Soon*          |
> | gas-lib                                            | ^2.0.2      |   *Coming Soon*          |
> | gas-webpack-plugin                                 | ^0.3.0      |   *Coming Soon*          |
> | uglifyjs-webpack-plugin                            | ^2.0.1      |   *Coming Soon*          |
> | webpack                                            | ^4.25.1     |   *Coming Soon*          |
> | webpack-cli                                        | ^3.1.2      |   *Coming Soon*          |

<br/>
<br/>

### Eslint

In order to provide an eslint configuration file for the environment, `create-gas-project` exposes a partial eslint configuration object, containing properties and values specific to the Apps Script environment & tooling.

<b>*-- Base ESlint Configuration Object --<b>*
>```JSON
>    {
>      "root" : true,
>      "plugins": [
>        "googleappsscript"
>      ],
>      "globals": {
>        "Calendar": true,
>        "CalendarApp": true,
>        "CardService": true,
>        "Charts": true,
>        "ContactsApp": true,
>        "DataStudioApp": true,
>        "DocumentApp": true,
>        "Drive": true,
>        "DriveApp": true,
>        "FirebaseApp": true,
>        "FormApp": true,
>        "Gmail": true,
>        "GmailApp": true,
>        "GroupsApp": true,
>        "HtmlService": true,
>        "LanguageApp": true,
>        "MailApp": true,
>        "Maps": true,
>        "OAuth1": true,
>        "OAuth2": true,
>        "PropertiesService": true,
>        "SitesApp": true,
>        "Slides": true,
>        "SlidesApp": true,
>        "SpreadsheetApp": true
>      },
>      "env": {
>        “googleappsscript/googleappsscript” : true
>      },
>      "parser": "babel-eslint",
>      "parseroptions" : {
>        "sourceType" : "module"
>      }
>    }
>```

In order to provide a complete and valid configuration to eslint, `create-gas-project` then adds an `extends` property to the object and prompts the user to select a value from the following:
- 'eslint:recommended' (default)
- 'standard'
- 'airbnb-base'
- A file system path to another configuration file





Once confirmed to be valid, the resolved absolute path is then assigned as the value of the `"``extends``"` field for the project’s eslint configuration.

<b>Project Eslint Configuration<b>
The following settings are required in the Apps Script project’s development directory eslint configuration to ensure all tooling works as expected:

<br>


#### CREATING NEW

<br>
<br>

# Actions

If existing files, confirm modification

