System.config({
  map: {
    "babel": "../node_modules/babel-core/browser",
    "babel-runtime": "../node_modules/babel-runtime",
    "json": "libs/plugins/json",
    "core-js": "../node_modules/core-js"
  }
});

System.config({
  "baseURL": ".",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js"
  }
});
