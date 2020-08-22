---
layout: post
title: "NodeJS: Factory Function Pattern, Dependency Registry and Hot Reloading"
slug: /post/function-factory-getters-hot-reloading
summary: "This article shows how to combine Factory Functions with a rapid feedback loop using hot reloading."
date: 2016-01-20
---

Factory Functions Pattern are a great way to structure applications in NodeJS. This [In-Depth article](https://medium.com/@pyrolistical/factory-functions-pattern-in-depth-356d14801c91#.3193wonrd) describes how they are used. In short, the advantages of this pattern are:

- All external dependencies of a module are stated explicitly
- External dependencies can be replaced without changing the module
- Unittesting works by passing in mocked/testing dependencies
- No global references
- [Inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control)

This post shows how to:

1.  Code using the Factory Function pattern
2.  Wire up dependencies in one place
3.  Hot reload a server for fast iteration

Example screencast how to use hot reloading in PHPStorm or Webstorm:

![run-with-hot-reload](https://cloud.githubusercontent.com/assets/133832/12606723/df0e20d0-c4cf-11e5-9905-97150c0738d8.gif)

## Wiring up dependencies

More complex NodeJS applications can gain maintainability and testability from such a structure.
Dependencies of the app can be wired up in one place.

An example which runs with NodeJS > 4.x looks like this:

```js
// In file ./index.js

// Wire up dependencies
const leveldb = require("leveldb");
const express = require("express");
const User = require("./model/User")();
const userRepository = require("./repository/UserRepository")(leveldb);
const userService = require("./service/UserService")(userRepository, User);
const userController = require("./controller/UserController")(userService);

const app = express();
// Attach routes
userController.routes(app);

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
```

## Example UserService implementation

To illustrate how injected dependencies can be used, an example implementation of a `UserService` could be something like this:

```js
// In file ./src/service/UserService.js

// userRepository and User are external dependencies.
module.exports = (userRepository, User) => {
  return {
    /**
     * Login a user with the given login provider and user profile.
     *
     * @param  {string} provider Login provider which was used (google, facebook, ...)
     * @param  {Object} profile User profile from that provider.
     * @return {User} Logged in user.
     */
    loginWithProvider: (provider, profile) => {
      return (
        userRepository
          .findByProvider(provider, profile)
          // If not found, this is a new user.
          .then((user) => user || User.fromProvider(provider, profile))
          .then((user) => user.updateLastLogin())
          .then((user) => userRepository.store(user))
      );
    },
  };
};
```

There are two injected dependencies, the `userRepository` and a `User` model. These dependencies can be accessed in the returned object with currently one function `loginWithProvider`. Other function could be added here, they would share the same dependencies.

## Example usage of the `UserService`

A wired up instance of the example `UserService` can then be used in other places of the app, like for example
controllers. The same principles applies there:

```js
// In file ./src/controllers/UserController.js

module.exports = (userService) => {
  function login(req, res, next) {
    return userService
      .loginWithProvider(req.query.provider, req.query.profile)
      .then((user) => res.json(user))
      .catch(next);
  }

  return {
    routes: (app) => {
      app.get("/login", login);
    },
  };
};
```

Now all dependencies are injected and wired up at one place. Nice!

## Refactor to support Hot Reloading

When apps grow, the startup cost increases due to parsing javascript files
and making connections to databases and servies. Hot reloading NodeJS apps **avoids the startup costs** and
lets you **iterate quicker**. To make this possible the previous structure needs a little refactoring.

We have to **move out the dependencies** into another file which can be reloaded on file changes.
The dependencies then need to be exported to be used:

```js
// In ./src/dependencies.js

// Static dependencies, changing these requires a restart
// in hot reloading mode.
const level = require("level");
const leveldb = require("level-promisify")(level);
const express = require("express");

const app = express();

const deps = {
  // Dynamic dependencies which will be hot reloaded.
  // Use ES6 getters to require when needed.

  app,

  get routes() {
    deps.userController.routes(deps.app);
    return app;
  },

  get User() {
    return require("./model/User")();
  },
  get userRepository() {
    return require("./repository/UserRepository")(leveldb);
  },
  get userService() {
    return require("./service/UserService")(deps.userRepository, deps.User);
  },
  get userController() {
    return require("./controller/UserController")(deps.userService);
  },
};

module.exports = deps;
```

This is how the `./index.js` looks like after the refactoring:

```js
// In file ./index.js

// Start with hot reloading: node index hotreload
const isHot = process.argv[2] === "hotreload";
const app = isHot ? require("./hotreload") : require("./src/server");

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
```

```js
// In file ./src/server.js

const dependencies = require("./dependencies");
const app = dependencies.app;
const routes = dependencies.routes;

app.use(routes);

module.exports = app;
```

For hot reloading, create a new file:

```js
// In file ./src/hotreload.js
const chokidar = require("chokidar");
const dependencies = require("./src/dependencies");
const app = dependencies.app;

// Include server routes as a middleware
app.use((req, res, next) => {
  // Require all dependencies.
  dependencies.routes(req, res, next);
});

// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
const watcher = chokidar.watch(["./src"]);
watcher.on("ready", () => {
  watcher.on("all", () => {
    console.log("Clearing module cache from server");
    Object.keys(require.cache).forEach((file) => {
      if (/src/.test(file) && file.indexOf("node_modules") === -1) {
        delete require.cache[file];
      }
    });
  });
});

module.exports = app;
```

## Complete example

A complete example can be found [on github](https://github.com/adri/node-hotreload-example).
