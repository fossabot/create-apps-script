

#  `create-gas-project`
> ## A Project-Scaffolder, Config-Contraptionator, and Dev-Tool Wrangler for Google Apps Script Development in the Modern Age
<br>

[![npm](https://img.shields.io/npm/l/create-gas-project.svg?style=flat-square)](https://www.npmjs.org/package/create-gas-project)
[![npm](https://img.shields.io/npm/v/create-gas-project.svg?style=flat-square)](https://www.npmjs.org/package/create-gas-project)
[![Travis CI](https://img.shields.io/travis/csmith14/create-gas-project.svg?style=flat-square)](https://travis-ci.org/csmith14/create-gas-project)
[![Codecov](https://img.shields.io/codecov/c/github/csmith14/create-gas-project.svg?style=flat-square)]()
[![David](https://img.shields.io/david/csmith14/create-gas-project.svg?style=flat-square)](https://david-dm.org/csmith14/create-gas-project)
[![David](https://img.shields.io/david/dev/csmith14/create-gas-project.svg?style=flat-square)](https://david-dm.org/csmith14/create-gas-project?type=dev)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
<br>

## ✔️ Create sophisticated and highly-tooled environments specially  towards developing <b>Google Apps Script</b> projects

## ⭐️ Features
- ❌ <b>Won't</b> trample existing files if passed a directory that already contains a project
  - ✔️ <b>Will</b> compare directory configs against internal opinions prompt with suggested actions

<br>

## :construction_worker: Using `create-gas-project`

1. <b>Run command to `init` a new project</b>, using your package manager of choice:
    >   - <b>npm</b>: <b>`npm init gas-project [destination] [options]`</b>
    >  - <b>yarn</b>: <b>`yarn create gas-project [destination] [options]`</b>
    ><br><br><b>Note</b> - *If <b>`destination`</b> is omitted, the <b>current working directory</b> is used as the new project's root*
2. <b>Answer</b> the prompts and configure your development workspace.
3. <b>Install</b> dependencies using preferred package manager
<!-- slide -->


<br>

<p style="font-size: 26px;">Resulting Project Directory Tree</p>

```text
  project/
    - .babelrc
    - .editorconfig
    - .eslintrc
    - .eslintignore
    - .gitignore
    - webpack.config.js
    + config/
     + appsscript.json
     + .clasp.json
       [ ... ]
    + dist/

    + pull/
      - [ When creating local env for existing Script Project files are pulled here using clasp ]

    + src/
      - index.js
      - main.js

```
><em><small> The directory tree above represents results of an execution without modification of behaviors by arguments, options, or related prompt responses. The resulting project structure, content, and file/directory names are expected vary significantly in accordance to user input, provided options, invocation conditions, etc.</small></em>

<br>

---

# Detailed Use Information
##  Accepted Arguments & Available Options 🏁
<b>`<npm init|yarn create> gas-project [target] [options]`</b>

### Arguments
| Name | Required | Description |
|--|--|--|
| `target` | <b>No</b> <br> <b>Default</b> : CWD when invoked | Path on local filesystem, may be relative or absolute. If the directory does not exist, it will be created after confirmation propmt. <!-- TODO: Bypass prompt with flag --> <br> <blockquote><b>*Note<b>* - *Creating target directory is not recursive; A path with nested non-existent directories is invalid.*</blockquote> |

<br/>

## CLI Prompt & Package.json Field Default Values
#### Package manager rc files --[ `.npmrc` , `.yarnrc` ]
The script will search the user's home directory, as well as the `target` directory, for both `.yarnrc` and `.npmrc` files.
In the scenario that rc files are found accross multiple searched directories, project-level configuration is preferred over user-level.
Should both rc file types be located <b>and</b> both have equal preference, the user is prompted to select an rc file from a list.

The values from the resulting rc file are parsed into JSON, and the relevant properties are supplied as default responses to following prompts

--

## Environment & Configuration

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


