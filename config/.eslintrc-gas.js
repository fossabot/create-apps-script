module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "extends": [
        "eslint:recommended"
    ],
    "plugins": [
        "googleappsscript",
    ],
    "env": {
        "googleappsscript/googleappsscript": true,
        "es6": true,
        "node": true,
        "amd": true
    },
    "globals": {
        "CardService": true,
        "Gmail": true,
        "Drive": true,
        "Slides": true,
        "OAuth1": true,
        "OAuth2": true,
        "FirebaseApp": true,
        "Calendar": false
    }
}
