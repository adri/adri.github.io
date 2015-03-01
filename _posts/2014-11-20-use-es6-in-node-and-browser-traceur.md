# How to use ES6 in Node and in your Browser with traceur


## How to make it work in node

Install traceur and save it to your `package.json`. 

```
npm install traceur --save
```

Add the following code to your node entry point, in my case `server.js`. This will transpile required files to valid ES5 syntax on the fly but ignores your dependencies to not spend time transpiling those. 

```
var traceur = require('traceur');
traceur.require.makeDefault(function(filename) {
  // don't transpile our dependencies, just our app
  return filename.indexOf('node_modules') === -1;
});


require('./src/app.js');
```

Start the server with `node server.js` and enjoy the new features.

## How to make it work in the browser

It makes sense to transpile your app into a ES5 javascript file once, which is then loaded by a browser in order to not have users waiting for the transpiling process every time. For that I like to use webpack and the `traceur-loader` package:

```
npm install --save-dev webpack traceur-loader
```

Create a `webpack.config.js`, here I'm using a different entry point `src/web/app.js` which should be loaded. Webpack will automatically include all required dependencies in the resulting javascript bundle. The most interesting line is the loader definition where all javascript files in the `src` directory will be run through traceur.
 
```
module.exports = {
  entry: {
    bundle: './src/web/app.js'
  },
  output: {
    path: 'build/js',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /src\/.*\.js$/, loader: 'traceur?experimental=true&runtime=true'}
    ]
  }
};
```

For development I recommend running webpack with the `-d` flag which generates source maps and the `--watch` flag to recompile changed files incrementally. 

```
node_modules/.bin/webpack --config webpack.config.js --watch -d --progress
```

The resulting ES5 javascript file will be in `build/js/bundle.js` and can be included in a browser:
```
<script src="build/js/bundle.js" />
```

For a list of possible language features see https://github.com/google/traceur-compiler/wiki/LanguageFeatures. 