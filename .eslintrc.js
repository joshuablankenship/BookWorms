module.exports = {
  extends: "airbnb",
  env: {
    browser: true
  },
  globals: {
    angular: false,
    react: true
  },
 parser: "babel-eslint",
   "extends": "airbnb",
   "rules": {
     "no-unused-vars": 0,
     "max-len": [1, 120, 2, {
       ignoreComments: true
     }],
   }
 }