

#  create-gas-project :node

  [![npm](https://img.shields.io/npm/l/create-gas-project.svg?style=flat-square)](https://www.npmjs.org/package/create-gas-project) **|** [![npm](https://img.shields.io/npm/v/create-gas-project.svg?style=flat-square)](https://www.npmjs.org/package/create-gas-project)

  ➡️ Deploy local Google Apps Script development environments featuring delivery, integraion & tooling
--

## To initialize a local Apps Script Evironment:
#### **⚠️ *No Install Required***
  > **`create-gas-project`** **doesn't need to be installed as a global or local module** to start configuring new projects or organizing existing projects.


1. **Run** the init script:
     - Using **npm**: **`npm init gas-project [destination]`**
     - Using **yarn**: **`yarn create gas-project [destination]`**
2. **Answer** the prompts to configure your development workspace.
3. **Install** node dependencies
#### *Setup Finished!*

---

<br>


[![Travis CI](https://img.shields.io/travis/csmith14/create-gas-project.svg?style=flat-square)](https://travis-ci.org/csmith14/create-gas-project) [![Codecov](https://img.shields.io/codecov/c/github/csmith14/create-gas-project.svg?style=flat-square)]() [![David](https://img.shields.io/david/csmith14/create-gas-project.svg?style=flat-square)](https://david-dm.org/csmith14/create-gas-project)

⚙️ [![David](https://img.shields.io/david/dev/csmith14/create-gas-project.svg?style=flat-square)](https://david-dm.org/csmith14/create-gas-project?type=dev)

🕶 [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

  <br>


# Usage



## 🚀 **Init A Script Project**
**`<npm init|yarn create> gas-project [target]`**

### Arguments
| Name | Required | Description |
|--|--|--|
| `target` | **No** <br> **Default** : CWD when invoked | a relative or absolute path to an existing directory to initialize as the root of a new development environment. |

<br/>

## CLI Prompt & Package.json Field Default Values
#### Package manager rc files --[ `.npmrc` , `.yarnrc` ]
The script will search the user's home directory, as well as the `target` directory, for both `.yarnrc` and `.npmrc` files.
In the scenario that rc files are found accross multiple searched directories, project-level configuration is preferred over user-level.
Should both rc file types be located **and** both have equal preference, the user is prompted to select an rc file from a list.

The values from the resulting rc file are parsed into JSON, and the relevant properties are supplied as default responses to following prompts

---

# Resulting Project
## Files & Directory Tree
```
  project/
    - .babelrc
    - .editorconfig
    - .eslintrc
    - .eslintignore
    - .gitignore
    - webpack.config.js
    + config/
      appsscript.json
      .clasp.json
        [ ... ]
    + dist/
      [ if existing Script Project, files are pulled here -- else am empty dir ]
    + src/
      - index.js
      - main.js
```

## Environment & Configuration

### Package.json

> #### devDependencies
> A series of prompts regarding field values for the generated package.json file follow.
>
> Aside from these fields, the package file contains a number of predefined properties to the **`devDependencies`** object.
> The majority of these modules are webpack loaders/plugins, eslint configurations/plugins, babel plugins, or are type definition modules.
>
> Detail of the provided dependencies, their version, and a brief explanation of their necessity is provided in the table below.
>
> | **devDependency** property assigned                | **Version** | **Purpose**              |
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

***-- Base ESlint Configuration Object --***
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

**Project Eslint Configuration**
The following settings are required in the Apps Script project’s development directory eslint configuration to ensure all tooling works as expected:

<br>


#### CREATING NEW

<br>
<br>

# Actions

If existing files, confirm modification


