var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
var appsscript = {
    timezone: tz
};
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
//> Some thing.
// Some other thing
/* Some blocky thing */
/** Some doc-y thing! */
var clasp = function (scriptId, projectId) {
    return {
        scriptId: scriptId,
        projectId: projectId,
        rootDir: "./dist"
    };
};
module.exports = clasp;
var fs = require("fs");
var path = require("path");
var yaml = require("js-yaml");
var ajv = require("ajv");
// SECTION Development modules
var print = require("q-i").print;
var chalk = require("chalk");
var configOptions = require("./eslintrc.options.json");
// !SECTION Development modules
var config = {};
/**
 * Modifies the imported eslintrc config object with rules specialized for GAS development
 */
function modifyConfig() {
    Object.keys(config).forEach(function (key) {
        if (key === "extends") {
            /* Don't overwrite the user's existing base config */
            return;
        }
        if (key === "plugins") {
            if (Array.isArray(config[key])) {
                /* Only add to the existing plugin array - don't overwrite it */
                config[key] = config[key].concat(config[key]);
            }
            else {
                config[key] = config[key];
            } /* Unless there isn't one */
            return;
        }
        /* Overwrite */
        config[key] = config[key];
    });
}
/**
 * Handle the import-existing strategy
 * @param {*} options
 * @returns
 */
function useExistingEslintObj(filePath, modify) {
    var eslintRulePath = filePath;
    config = importConfig(eslintRulePath);
    if (modify) {
        modifyConfig();
    }
}
/**
 * Handle the create-new strategy
 * @param {*} options
 * @returns
 */
function createNewEslintObj(extendsConfig) {
    config = config;
    var configType = extendsConfig;
    config["extends"] = configType;
    var associatedPlugins = configOptions.extendsValueDependencies[configType].eslintrc;
    associatedPlugins.plugins.forEach(function (plugin) { return config.plugins.push(plugin); });
}
/**
 * Validated the produced object against the official schema
 * @param {*} rules
 */
function verifyRuleObject(rules) { }
module.exports = eslintConfigObj;
var path = require("path");
var print = require("q-i").print;
var chalk = require("chalk");
var Config = require("../lib/classes/Config");
var dependencies = {
    "@babel/core": "^7.1.5",
    "@babel/plugin-proposal-class-properties": "^7.1.0",
    "@babel/plugin-proposal-object-rest-spread": "^7.0.0",
    "@babel/plugin-transform-member-expression-literals": "^7.0.0",
    "@babel/plugin-transform-object-assign": "^7.0.0",
    "@babel/plugin-transform-property-literals": "^7.0.0",
    "@babel/preset-env": "^7.1.5",
    "@google/clasp": "^1.6.3",
    "@types/google-apps-script": "^0.0.31",
    "babel-eslint": "^10.0.1",
    "babel-loader": "^8.0.4",
    "babel-plugin-add-module-exports": "^1.0.0",
    "babel-plugin-array-includes": "^2.0.3",
    "clean-webpack-plugin": "^0.1.19",
    "copy-webpack-plugin": "^4.6.0",
    eslint: "^5.9.0",
    "eslint-loader": "^2.1.1",
    "eslint-plugin-googleappsscript": "^1.0.1",
    "gas-lib": "^2.0.2",
    "gas-webpack-plugin": "^0.3.0",
    "uglifyjs-webpack-plugin": "^2.0.1",
    webpack: "^4.25.1",
    "webpack-cli": "^3.1.2"
};
var packageContent = function (defaults) {
    var content = {
        name: defaults.name || "apps-script-template",
        version: defaults.version || "0.0.1",
        author: defaults.author || "Cam Smith",
        license: defaults.license || "MIT",
        repository: defaults.repository || "",
        description: "Default package.json file for projects created by create-gas-project",
        keywords: [],
        main: "src/index.js"
    };
    Object.defineProperty(content, "scripts", {
        configurable: false,
        enumerable: true,
        value: Object.freeze({
            build: "webpack -p",
            deploy: "npm run build && npm run upload",
            upload: "clasp push"
        })
    });
    Object.defineProperty(content, "dependencies", {
        configurable: true,
        enumerable: true,
        value: dependencies
    });
    Object.defineProperty(content, "devDependencies", {
        configurable: true,
        enumerable: true,
        value: {}
    });
    return content;
};
var modifyDependencies = function (thisArg) { return ({
    addDependency: function (_a) {
        var name = _a.name, version = _a.version;
        var dependencies = thisArg.content.dependencies;
        if (dependencies[name]) {
            throw new Error("Dependency already exists");
        }
        thisArg.content.dependencies[name] = version;
    },
    removeDependency: function (name) {
        var dependencies = thisArg.content.dependencies;
        if (!dependencies[name]) {
            throw new Error("No such dependency: " + name);
        }
        delete dependencies[name];
    }
}); };
/**
 * @param {*} defaults
 */
function PackageJson(defaults) {
    // eslint-disable-line no-unused-vars
    var obj = Config({
        dir: ".",
        dot: false,
        name: "package",
        extension: "json"
    });
    Object.assign(obj, modifyDependencies(obj));
    Object.assign(obj.content, packageContent(defaults));
    Object.freeze(obj.content);
    Object.seal(obj);
    return obj;
}
process.env.target = path.resolve(".");
var pkgjson = PackageJson({});
pkgjson.print();
pkgjson.content.name = "Butthoe";
pkgjson.addDependency({
    name: "TEST-DEPENDENCY",
    version: "9.9.9"
});
pkgjson.print();
// ANCHOR module.exports
// module.exports = options => createPackageFile(options)
var path = require("path");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var GasPlugin = require("gas-webpack-plugin");
var version = require("./package.json").version;
var destination = "dist";
var mode = "none"; // or production
module.exports = {
    context: __dirname,
    entry: "./src/index.js",
    mode: mode,
    module: {
        rules: [
            {
                enforce: "pre",
                exclude: /node_modules/u,
                loader: "eslint-loader",
                options: {
                    cache: true,
                    failOnError: false
                },
                test: /\.js$/u
            },
            {
                exclude: /node_modules/u,
                test: /\.js$/u,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    optimization: {},
    output: {
        filename: "code-" + version + ".js",
        libraryTarget: "this",
        path: path.resolve(__dirname, destination)
    },
    plugins: [
        new CleanWebpackPlugin([destination]),
        new CopyWebpackPlugin([
            {
                from: "./conf/appsscript.json",
                to: path.resolve(__dirname, destination)
            }
        ]),
        new GasPlugin({
            comments: false
        })
    ],
    resolve: {
        extensions: [".js"]
    }
};
var pathToClasp = require("global-modules-path").getPath("@google/clasp");
// ANCHOR module.exports
module.exports = function () {
    return Boolean(pathToClasp);
};
var fs = require("fs");
var path = require("path");
// ANCHOR module.exports
module.exports = function (defaults) {
    return {
        prompts: [
            {
                "default": "new-gas-project",
                message: "Package name",
                name: "name",
                type: "text"
            },
            {
                "default": defaults.author,
                message: "Author",
                name: "author",
                type: "text"
            },
            {
                "default": defaults.version,
                message: "Version",
                name: "version",
                type: "text"
            },
            {
                "default": defaults.license,
                message: "License",
                name: "license",
                type: "text"
            },
            {
                message: "Repository",
                name: "repository",
                type: "text"
            },
            {
                choices: ["eslint:recommended", "standard", "airbnb-base"],
                "default": "eslint:recommended",
                message: "Extend ESLint Configuration:",
                name: "eslintConfigType",
                type: "list"
            }
            // {
            //   'message'  : 'Path to local file: ',
            //   'name'     : 'eslintPath',
            //   'type'     : 'text',
            //   'validate' : input => fs.existsSync( path.resolve( input ) ) &&
            //     path.basename( input ).includes( 'eslint' ),
            //   'when': answers => answers.eslintConfigType === 'local-file'
            // }
        ]
    };
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var path = require("path");
var fs = require("fs");
var chalk = require("chalk");
// ──────────────────────────────────────────────────
// ──────────────────────────────────────────────────
var inq = require("inquirer");
var prompts = require("./prompt-script");
// ──────────────────────────────────────────────────
var defaults = JSON.parse(Buffer.from(fs.readFileSync(path.join(__filename, "../../config/default-prompt-values.json"))).toString("utf8"));
function displayPrompts(workDir) {
    return __awaiter(this, void 0, void 0, function () {
        var workspace, promptAnswers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    workspace = path.resolve(workDir);
                    console.log("Creating Apps Script project at " + chalk["default"].bgBlueBright(workspace), "\n");
                    return [4 /*yield*/, inq.prompt(prompts(defaults).prompts)];
                case 1:
                    promptAnswers = _a.sent();
                    return [2 /*return*/, promptAnswers];
            }
        });
    });
}
;
(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, displayPrompts(process.cwd())];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
// module.exports = displayPrompts;
/**
 * @typedef {Object} Schemas
 * @property {SchemaObj} eslint
 * @property {SchemaObj} appsscript
 * @property {SchemaObj} clasp
 * @property {SchemaObj} markdownlint
 * @property {SchemaObj} package
 * @property {SchemaObj} prettier
 */
/**
 * @typedef {Object} SchemaObj
 * @property {import('ajv').ValidateFunction} validator
 */
var path = require("path");
var fs = require("fs");
//  ──────────────────────────────────────────────────
var ajv = new (require("ajv"))();
// ──────────────────────────────────────────────────
/** @type {Schemas} */
var baseObj = {
/*
    {String} name : {Function} validator,
*/
};
var fmt = /**
@param {string} name name string
@returns {string} Formatted name string
*/ function (/**
@param {string} name name string
@returns {string} Formatted name string
*/ name) {
    var base = name[0] === "." ? name.slice(1) : name;
    base = base.includes(".") ? base.split(".")[0] : base;
    return base.slice(base.length - 2, base.length) === "rc"
        ? base.slice(0, base.length - 2)
        : base;
};
var reducer = /**
@param {Schemas} obj The recipient object
@param {string} filename The file name
@returns {Schemas} Refernce to the `obj` param, for use in `Array.reduce`
*/ function (obj, filename) {
    var filePath = path.join(__dirname, filename);
    var schema = JSON.parse(fs.readFileSync(filePath, "utf8"));
    var key = fmt(filename);
    var value = ajv.compile(schema);
    Object.defineProperty(obj, key, {
        configurable: false,
        enumerable: true,
        value: { validator: value }
    });
    /** @type {Schemas} */
    var out = obj;
    return out;
};
var SchemaCollection = fs
    .readdirSync(__dirname) // ANCHOR module.exports
    .filter(function (str) { return str.includes("schema"); })
    .reduce(
/**
@param {Schemas} prev previous return value
@param {string} curr current value
@returns {Schemas} The full Schemas Object */
function (prev, curr) { return reducer(prev, curr); }, baseObj);
module.exports = SchemaCollection;
// @ts-check
/**
@file ConfigFactory --- produces a Config instance.
Configs are subsequently adapted into specific files
*/
var path = require("path");
var fs = require("fs");
var chalk = require("chalk");
var print = require("q-i").print;
var Schemas = require("../../schemas");
/**
@typedef {Object} PropertyDescriptor
@prop {Boolean} configurable
@prop {Boolean} enumerable
@prop {Boolean} [writable]
@prop {any} value
@prop {Function} [get]
@prop {Function} [set]
*/
/**
@callback JsonReplacer1
@param {Object} this
@param {string} key
@param {*} value
@returns {Object}
*/
/**
@callback JsonReplacer2
@param {Array<string|number>} id
@void
*/
/**
@typedef {Object} WriteFileParamObj
@prop {|(string|number)[]} [replacer]
@prop {string|number} [space]
*/
var Config = function () { };
Config.prototype = {
    content: {},
    /** Writes the enumerable properties in `this.content` to a file at `this.path`.
    @param {WriteFileParamObj} [argObj]
    @returns {Promise<void|Error>} */
    writeFile: function (_a) {
        var _this = this;
        var replacer = _a.replacer, space = _a.space;
        var stringify = JSON.stringify;
        return new Promise(function (resolve, reject) {
            fs.writeFile(_this.path, stringify(_this, replacer, space), { encoding: "utf8", mode: 666, flag: "w" }, function (err) { return (err ? reject(err) : resolve()); });
        });
    },
    /**
    Pretty-prints the enumerable properties of `this.content` to stdout.
    @param {string} [key] optional - A property on `this.content` to inspect.
    @void */
    print: function (key) {
        if (key === void 0) { key = null; }
        if (key) {
            print(this.content[key]);
        }
        else {
            print(this.content);
        }
    },
    /**
    Pretty-prints the enumerable properties of `this` to stdout.
    @param {string} [key] optional - A property on `this` to inspect closely.
    @void */
    info: function (key) {
        if (key === void 0) { key = null; }
        if (key) {
            print(this[key]);
        }
        else {
            print(this);
        }
    }
};
/* Assign new property */
var prop = 
/**
@param {any} value
@param {PropertyDescriptor} [obj] Optionally include other descriptor properties, which will overwrite defaults
@returns {PropertyDescriptor}
*/
function (value, obj) {
    if (typeof value !== "boolean" && !value) {
        throw new TypeError("Invalid Argument for Property Value: " + value);
    }
    return Object.assign({
        configurable: false,
        enumerable: false,
        value: value
    }, obj);
};
var accessor = 
/**
Create a property descriptor for a **new getter and/or setter**
@param {PropertyDescriptor} obj An object with a `get` and/or `set` method. May include other properties as well.
@returns {PropertyDescriptor}
*/
function (obj) {
    return Object.assign({
        configurable: false,
        enumerable: false
    }, obj);
};
/**
@class
@name ConfigFile
@prop {string} path
@prop {string} name
*/
/** @constructs */
var Config = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.dir, dir = _c === void 0 ? "." : _c, _d = _b.dot, dot = _d === void 0 ? false : _d, _e = _b.extension, extension = _e === void 0 ? "json" : _e, _f = _b.name, name = _f === void 0 ? "default-name" : _f;
    var configInstance = {};
    /* Configure properties describing instance's basic information */
    Object.defineProperties(configInstance, 
    /** @lends Config.prototype  */
    {
        /** @member {string} root */
        root: /* Project root */ prop(process.env.target, {
            writable: false
        }),
        dir: /* File path relative to `root` */ prop(dir),
        name: /* File name (e.g., 'eslintrc', 'package', ...) */ prop(name),
        extension: /* File extension */ prop(extension),
        filename: /* Getter for the full filename */ accessor({
            /** @this Config  */
            get: function () {
                return ((this.dot ? "." : "") +
                    this.name +
                    (this.extension && this.extension.length
                        ? "." + this.extension
                        : ""));
            }
        }),
        path: /* Getter for the full absolute path */ accessor({
            get: function () {
                return path.resolve(this.root, this.dir, this.filename);
            }
        })
    });
    Object.defineProperty(configInstance, "validate", {
        configurable: false,
        enumerable: false,
        value: Schemas[configInstance.filename].validator
    });
    return configInstance;
};
// ANCHOR module.exports
module.exports = Config;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Configfile = require("./Config-file");
var defaultConfig = {
    env: {
        amd: true,
        es6: true,
        "googleappsscript/googleappsscript": true,
        node: true
    },
    "extends": "",
    globals: {
        Calendar: true,
        CalendarApp: true,
        CardService: true,
        Charts: true,
        ContactsApp: true,
        DataStudioApp: true,
        DocumentApp: true,
        Drive: true,
        DriveApp: true,
        FirebaseApp: true,
        FormApp: true,
        Gmail: true,
        GmailApp: true,
        GroupsApp: true,
        HtmlService: true,
        LanguageApp: true,
        MailApp: true,
        Maps: true,
        OAuth1: true,
        OAuth2: true,
        PropertiesService: true,
        SitesApp: true,
        Slides: true,
        SlidesApp: true,
        SpreadsheetApp: true
    },
    parser: "babel-eslint",
    plugins: ["googleappsscript"],
    root: true
};
/**
 * User-specified options from prompt interface
 * @param {*} options
 * @returns
 */
function eslintConfigObj(options) {
    var eslintObj = options.filePath
        ? useExistingEslintObj(options)
        : createNewEslintObj(options);
    console.log(chalk.grey("Printed from " + __filename));
    print(eslintObj);
    return eslintObj;
}
/** @class ESLintrc */
var ESLintrc = /** @class */ (function (_super) {
    __extends(ESLintrc, _super);
    /**
     * Creates an instance of ESLintrc.
     * @param {Object} object An eslint ruleset to use for generating the eslintrc instance.
     * @memberof ESLintrc
     */
    function ESLintrc(object) {
        var _this = _super.call(this) || this;
        _this["default"] = defaultConfig;
        if (object && _this.validate()) {
            _this.importedObject = object;
        }
        else {
            _this.importedObject = defaultConfig;
        }
        return _this;
    }
    /**
     * @param {string} value The value for the "extends" rule
     * @memberof ESLintrc
     */
    ESLintrc.prototype.setExtendsRule = function (value) {
        var acceptValues = ["standard", "eslint:recommended", "airbnb-base"];
        if (acceptValues.includes(value)) {
            if (typeof value === "string") {
                this.content["extends"] = value;
            }
            else {
                throw new TypeError("Input must be of type string. Received: " + typeof value);
            }
        }
        else {
            throw new Error("Unrecognized value for the \"extends\" rule: " + value + " Available values: " +
                acceptValues.reduce(function (prev, cur) { return prev + "\n" + cur; }));
        }
    };
    /**
     * Adds the 'googleappsscript' environment rule
     * @memberof ESLintrc
     */
    ESLintrc.prototype.addEnvProp = function () {
        var env = this.importedObject.env;
        var propKey = "googleappsscript/googleappsscript";
        if (!env[propKey]) {
            env[propKey] = true;
        }
    };
    /**
     * Modifies the rule set to be ideal for local Apps Script dev tooling
     * @memberof ESLintrc
     */
    ESLintrc.prototype.modify = function () {
        var _this = this;
        Object.keys(this["default"]).forEach(function (key) {
            if (key === "extends") {
                /* Don't overwrite the user's existing base config */
                if (_this.importedObject["extends"]) {
                    return;
                }
            }
            if (key === "plugins") {
                if (Array.isArray(_this.importedObject[key])) {
                    /* Only add to the existing plugin array - don't overwrite it */
                    _this.importedObject[key] = _this.importedObject[key].concat(_this["default"][key]);
                }
                else {
                    _this.importedObject[key] = _this["default"][key];
                } /* Unless there isn't one */
                return;
            }
            /* Overwrite */
            _this.importedObject[key] = _this["default"][key];
        });
    };
    return ESLintrc;
}(Configfile));
// ANCHOR module.exports
module.exports = ESLintrc;
var homedir = require("os").homedir();
var path = require("path");
var fs = require("fs");
/**
 * @param {string} filePath
 * @returns {*} A key-value object of the file's contents
 */
function readrcFile(filePath, delimiter) {
    var file = fs
        .readFileSync(filePath, {
        encoding: "UTF-8"
    })
        .replace(/(\r\n)/gu, "\n")
        .split("\n")
        .filter(function (line) { return line.trim().includes(delimiter); })
        .map(function (line) { return [
        line.split(delimiter)[0].replace("--", ""),
        line
            .split(delimiter)
            .slice(1, line.split(delimiter).length)
            .join(" ")
            .replace(/("|')/gu, "")
    ]; });
    var fileObj = {};
    file.forEach(function (line) { return (fileObj[line[0]] = line[1]); });
    return fileObj;
}
/**
 * Ensures the expected keys exist in the object by assigning non-existent keys a default value
 * @param {*} obj
 * @param {*} type
 * @returns
 */
function ensureKeys(obj, type) {
    // eslint-disable-line no-unused-vars
    normalizeKeys(obj, type);
    var defaults = {
        author: "",
        license: "MIT",
        version: "1.0.0"
    };
    Object.keys(defaults).forEach(function (key) {
        if (!obj[key]) {
            obj[key] = defaults[key];
        }
    });
    return obj;
}
/**
 * Normalizes property keys for predictability despite differing rc file formats
 * @param {*} obj
 * @param {string} type
 */
function normalizeKeys(obj, type) {
    // eslint-disable-line no-unused-vars
    var keys = {
        npm: {
            "init-author-name": "author",
            "init-license": "license",
            "init-version": "version"
        },
        yarn: {
            "init.author": "author",
            "init.license": "license",
            "init.version": "version"
        }
    };
    var guide = keys[type];
    Object.keys(obj).forEach(function (key) {
        obj[guide[key]] = obj[key];
        delete obj[key];
    });
}
function combineProperties(preferred, other) { }
/**
 * @param {string} fileName
 * @param {string} workDir
 * @returns
 */
function getRcFile(fileName, workDir) {
    /* Get the rc type by stripping the '.' and 'rc' */
    var fileType = fileName.slice(1, fileName.length - 2);
    var delimiter = fileType === "yarn" ? " " : "=";
    var rcPath = path.join(workDir, fileName);
    var exists = fs.existsSync(rcPath);
    if (!exists) {
        rcPath = path.join(homedir, fileName);
        exists = fs.existsSync(rcPath);
        if (!exists) {
            return null;
        }
    }
    else if (fs.existsSync(path.join(homedir, fileName))) {
    }
    return ensureKeys(readrcFile(rcPath, delimiter), fileType);
}
/**
 *
 *
 */
function index(directory) {
    return __awaiter(this, void 0, void 0, function () {
        var rcObjects, npmrc, yarnrc, rcFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rcObjects = {};
                    [".yarnrc", ".npmrc"].forEach(function (name) { return (rcObjects[name] = getRcFile(name, directory)); });
                    npmrc = rcObjects[".npmrc"];
                    yarnrc = rcObjects[".yarnrc"];
                    if (!(npmrc && yarnrc)) return [3 /*break*/, 2];
                    return [4 /*yield*/, inq
                            .prompt({
                            choices: [".npmrc", ".yarnrc"],
                            "default": ".npmrc",
                            message: chalk.blue("Found both .yarnrc and .npmrc.") + " Which to use?",
                            name: "rc",
                            type: "list"
                        })
                            .then(function (ans) { return (rcFile = rcObjects[ans.rc]); })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    if (npmrc || yarnrc) {
                        console.log("Using defaults found in " + (npmrc ? "npmrc" : "yarnrc"));
                        rcFile = npmrc || yarnrc;
                    }
                    else {
                        console.group(chalk.yellow("No .npmrc or .yarnrc file detected. Searched paths:"));
                        // Console.warn();
                        console.info(chalk.bold("Working Dir") + ": " + directory);
                        console.info(chalk.bold("$HOME") + ": " + homedir);
                        console.groupEnd();
                        console.info("\n", chalk.yellow("Falling back to hard-coded defaults."));
                        console.info(chalk.grey("To take advantage of npm or yarn's default init options, create the appropriate rc file.", "\n"));
                        rcFile = {
                            none: true
                        };
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
// ANCHOR module.exports
module.exports = getRcFile;
var path = require("path");
var ajv = require("ajv");
var schemas = require(path.resolve(__dirname, "../schemas"));
/**
 * Compares the provided data object against the schema denoted by schemaType
 * @param {Object} data The object to validate
 * @param {string} schemaType The name of the file (*i.e., 'eslintrc', 'clasp', 'appsscript'*)
 * @returns {boolean} Valid schema
 */
function validateSchema(data, schemaType) {
    // eslint-disable-next-line new-cap
    return new ajv().validate(schemas[schemaType], data);
}
// ANCHOR module.exports
module.exports = validateSchema;
