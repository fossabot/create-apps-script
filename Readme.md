---
---

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
<a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fcsmith14%2Fcreate-apps-script?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcsmith14%2Fcreate-apps-script.svg?type=shield"/></a>

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

    	[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<!-- mardkownlint-endable MD013 -->
</p>

<br>

<hr>


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcsmith14%2Fcreate-apps-script.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcsmith14%2Fcreate-apps-script?ref=badge_large)

# Overview

## Features

- Combines the most popular and effective development tools

  🤖 Use **Babel** to write and compile modern Javascript to Google Apps Script's ECMA spec.

  💬 Leverage **ESLint** to catch syntax errors and future bugs before deployment.

  ☕️ Use **Mocha** to follow Test-Driven-Development practices.

  - **Webpack** combines transpiling, minification, linting, and bundling into a single process.

<br>

## Construct a Development Environment :construction_worker:

1. <b>Run command</b> to `init` a project:
   > - <b>npm</b>: <b>`npm init gas-project [destination] [options]`</b>
   > - <b>yarn</b>: <b>`yarn create gas-project [destination] [options]`</b>
   >   <br><br><b>Note</b> - _If <b>`destination`</b> default is the <b>current working directory</b>_
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

* * *

# Detailed Usage Information

## Arguments & Options 🏁

### Arguments

| Name     | Required  | Default Value             | Description                                                                                                                             |
| -------- | --------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `target` | <b>No</b> | Current working directory | <p>Directory. Relative paths are resolved from the current working directory. Will create non-existent directory (but not recursively). |

## CLI Prompt & Package.json Field Default Values

### <b>Default Responses</b> : <small>How `.npmrc` and `.yarnrc` values are resolved</small>

This program uses the `'rc'` package internally to locate and utilize `.npmrc` / `.yarnrc` files/content at run time.

\--

# 📑

# Detailed File Creation Information

### Package.json

> #### devDependencies
>
> A series of prompts regarding field values for the generated package.json file follow.
>
> Aside from these fields, the package file contains a number of predefined properties within <b>`devDependencies`<b>.
> The majority of these modules are webpack loaders/plugins, eslint configurations/plugins, babel plugins, or `@types/*` definitions.
>
> Detail of the provided dependencies, their version, and a brief explanation of their necessity is provided in the table below.
>
> | <b>devDependency</b> package                       | <b>Version</b> | <b>Purpose</b> |
> | -------------------------------------------------- | -------------- | -------------- |
> | @babel/core                                        | ^7.1.5         | _Coming Soon_  |
> | @babel/plugin-proposal-class-properties            | ^7.1.0         | _Coming Soon_  |
> | @babel/plugin-proposal-object-rest-spread          | ^7.0.0         | _Coming Soon_  |
> | @babel/plugin-transform-member-expression-literals | ^7.0.0         | _Coming Soon_  |
> | @babel/plugin-transform-object-assign              | ^7.0.0         | _Coming Soon_  |
> | @babel/plugin-transform-property-literals          | ^7.0.0         | _Coming Soon_  |
> | @babel/preset-env                                  | ^7.1.5         | _Coming Soon_  |
> | @google/clasp                                      | ^1.6.3         | _Coming Soon_  |
> | @types/google-apps-script                          | ^0.0.31        | _Coming Soon_  |
> | babel-eslint                                       | ^10.0.1        | _Coming Soon_  |
> | babel-loader                                       | ^8.0.4         | _Coming Soon_  |
> | babel-plugin-add-module-exports                    | ^1.0.0         | _Coming Soon_  |
> | babel-plugin-array-includes                        | ^2.0.3         | _Coming Soon_  |
> | clean-webpack-plugin                               | ^0.1.19        | _Coming Soon_  |
> | copy-webpack-plugin                                | ^4.6.0         | _Coming Soon_  |
> | eslint                                             | ^5.9.0         | _Coming Soon_  |
> | eslint-loader                                      | ^2.1.1         | _Coming Soon_  |
> | eslint-plugin-googleappsscript                     | ^1.0.1         | _Coming Soon_  |
> | gas-lib                                            | ^2.0.2         | _Coming Soon_  |
> | gas-webpack-plugin                                 | ^0.3.0         | _Coming Soon_  |
> | uglifyjs-webpack-plugin                            | ^2.0.1         | _Coming Soon_  |
> | webpack                                            | ^4.25.1        | _Coming Soon_  |
> | webpack-cli                                        | ^3.1.2         | _Coming Soon_  |

<br/>
<br/>

### Eslint

In order to provide an eslint configuration file for the environment, `create-gas-project` exposes a partial eslint configuration object, containing properties and values specific to the Apps Script environment & tooling.

<b>_-- Base ESlint Configuration Object --<b>_

> ```JSON
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
> ```

In order to provide a complete and valid configuration to eslint, `create-gas-project` then adds an `extends` property to the object and prompts the user to select a value from the following:

- 'eslint:recommended' (default)
- 'standard'
- 'airbnb-base'
- A file system path to another configuration file

Once confirmed to be valid, the resolved absolute path is then assigned as the value of the ```"``extends``"``` field for the project’s eslint configuration.

<b>Project Eslint Configuration<b>
The following settings are required in the Apps Script project’s development directory eslint configuration to ensure all tooling works as expected:

<br>

#### CREATING NEW

<br>
<br>

# Actions

If existing files, confirm modification