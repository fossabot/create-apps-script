<div style="text-align: center;">

  <h1 style="font-size: 3rem">
   create-gas-project
  </h1>

  [![npm](https://img.shields.io/npm/l/create-gas-project.svg?style=flat-square)](https://www.npmjs.org/package/create-gas-project) [![npm](https://img.shields.io/npm/v/create-gas-project.svg?style=flat-square)](https://www.npmjs.org/package/create-gas-project) [![Travis CI](https://img.shields.io/travis/csmith14/create-gas-project.svg?style=flat-square)](https://travis-ci.org/csmith14/create-gas-project) [![Codecov](https://img.shields.io/codecov/c/github/csmith14/create-gas-project.svg?style=flat-square)]()

  *A tool to initialize a local environment and configure tools to assist development of new and existing Google Apps Script projects.*
  --
  [![David](https://img.shields.io/david/csmith14/create-gas-project.svg?style=flat-square)](https://david-dm.org/csmith14/create-gas-project) [![David](https://img.shields.io/david/dev/csmith14/create-gas-project.svg?style=flat-square)](https://david-dm.org/csmith14/create-gas-project?type=dev)
  [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
  ---
</div>
<br>

# Usage


## No Installation Required :no_entry_sign:
As package initializers, `create-gas-project` and other packages published under a `create-*` name, is handled slightly differently by package managers. Intended to establish the foundation of a **new and specialized projec**t, `create-*` modules are typically not installed within the projects they configure, and therefore add **no extra dependency maintenance overhead**.

## **Command**
**`[npm|yarn] [init|create] gas-project [target]`**

Where `package manager` is `yarn` or `npm`, and `init command` is `create` or `init` respectively,
and `target` is a relative or absolute path to an existing directory to initialize as the root of a new development environment.

**If not specified, `target` will default to the current working directory.**

| **Action** | **Command ( npm )** | **Command ( yarn )** |
|---|-----|------|
| **Initialize**            | `npm init gas-project [target]`  | `yarn create gas-project [target]`       |
| *cd target, if specified* | *`cd [target]`*                  | *`cd [target]`*   |
| **Install Dependencies**  | `npm install`                    | `yarn add`        |

<br/>

## CLI Prompt & Package.json Field Default Values
#### Package manager rc files --[ `.npmrc` , `.yarnrc` ]
The script will search the user's home directory, as well as the `target` directory, for both `.yarnrc` and `.npmrc` files. If there are multiple results found within or accross the searched directories,project-level configuration is preferred over user-level.
Should both rc file types be located **and** both have equal preference, the user is prompted to select an rc file from a list.

The values from the resulting rc file are parsed, and the relevant fields are used as defaults during the following prompts.

In the case that no rc files are found, general fallback defaults are provided.


---
# Results
## Environment & Configuration

### Package.json

A series of prompts regarding field values for the generated package.json file follow.

Aside from these fields, the package file contains a number of predefined properties to the `devDependencies` object.
The majority of these modules are webpack loaders/plugins, eslint configurations/plugins, babel plugins, or are type definition modules.

Detail of the provided dependencies, their version, and a brief explanation of their necessity is provided in the table below.


| **devDependency** property assigned                | **Version** | **Purpose** |
|----------------------------------------------------|-------------|-------------|
| @babel/core                                        | ^7.1.5      |   *Coming Soon*          |
| @babel/plugin-proposal-class-properties            | ^7.1.0      |   *Coming Soon*          |
| @babel/plugin-proposal-object-rest-spread          | ^7.0.0      |   *Coming Soon*          |
| @babel/plugin-transform-member-expression-literals | ^7.0.0      |   *Coming Soon*          |
| @babel/plugin-transform-object-assign              | ^7.0.0      |   *Coming Soon*          |
| @babel/plugin-transform-property-literals          | ^7.0.0      |   *Coming Soon*          |
| @babel/preset-env                                  | ^7.1.5      |   *Coming Soon*          |
| @google/clasp                                      | ^1.6.3      |   *Coming Soon*          |
| @types/google-apps-script                          | ^0.0.31     |   *Coming Soon*          |
| babel-eslint                                       | ^10.0.1     |   *Coming Soon*          |
| babel-loader                                       | ^8.0.4      |   *Coming Soon*          |
| babel-plugin-add-module-exports                    | ^1.0.0      |   *Coming Soon*          |
| babel-plugin-array-includes                        | ^2.0.3      |   *Coming Soon*          |
| clean-webpack-plugin                               | ^0.1.19     |   *Coming Soon*          |
| copy-webpack-plugin                                | ^4.6.0      |   *Coming Soon*          |
| eslint                                             | ^5.9.0      |   *Coming Soon*          |
| eslint-loader                                      | ^2.1.1      |   *Coming Soon*          |
| eslint-plugin-googleappsscript                     | ^1.0.1      |   *Coming Soon*          |
| gas-lib                                            | ^2.0.2      |   *Coming Soon*          |
| gas-webpack-plugin                                 | ^0.3.0      |   *Coming Soon*          |
| uglifyjs-webpack-plugin                            | ^2.0.1      |   *Coming Soon*          |
| webpack                                            | ^4.25.1     |   *Coming Soon*          |
| webpack-cli                                        | ^3.1.2      |   *Coming Soon*          |

<br/>
<br/>

### Eslint

At project initialization, the user is asked whether the script should create a new eslint configuration for this project, or import the values of an existing configuration.


#### EXTENDING

The user is prompted for the path to their preferred configuration. Relative paths are resolved internally.
Once confirmed to be valid, the resolved absolute path is then assigned as the value of the `"``extends``"` field for the project’s eslint configuration.

**Project Eslint Configuration**
The following settings are required in the Apps Script project’s development directory eslint configuration to ensure all tooling works as expected:

- **plugins:** “googleappsscript”
- **globals:** A number of properties assigned to the globals object, including:
    - Symbols for globally exposed classes for interacting with Google services within the Apps Script runtime (*i.e., CalendarApp, SpreadsheetApp, etc., as well as utilities such as PropertiesService, HtmlOutput, and so on*).
    - Symbols for “Advanced service” API-wrapper classes (*Such as Calendar*)
    - Symbols for the user-defined libraries, if applicable (see section Existing Script Project Setup)
- **env:** property “googleappsscript/googleappsscript” assigned value `true`
- **parser:** assigned `"``babel-eslint``"`

<br>


#### CREATING NEW

<br>
<br>

# Actions

If existing files, confirm modification


