module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react"
    ],
    "parser": "babel-eslint",
    "rules": {
      "max-len": [1, 80, 2, {ignoreComments: true}],
      "react/forbid-prop-types": 0 
//      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],d
    },
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
    }
};

