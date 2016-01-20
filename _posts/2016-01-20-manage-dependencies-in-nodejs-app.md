---
layout: post
title: "NodeJS: Factory Function Pattern, Dependency Registry and Hot Reloading"
summary: "This article shows how to combine Factory Functions with a rapid feedback loop using hot reloading." 
---

Factory Functions Pattern are a great way to structure applications in NodeJS. This [In-Depth article](https://medium.com/@pyrolistical/factory-functions-pattern-in-depth-356d14801c91#.3193wonrd) describes how they are used. In short, the advantages of this pattern are:

 * All external dependencies of a module are stated explicitly
 * External dependencies can be replaced without changing the module 
 * Unittesting is easy/possible
 * No global references
 * [Inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control)

This post shows how to:

 - Code using the Factory Function pattern
 - Wire up dependencies in one place
 - Hot reload a server for fast iteration

## Wiring up dependencies

More complex NodeJS applications can gain maintainability and testability from such a structure.
Dependencies of the app can be wired up in one place. 

An example which runs with NodeJS > 4.x looks like this:

```js ./src/index.js
// In file ./src/index.js

// Wire up dependencies
const leveldb = require('leveldb');
const express = require('express');
const User = require('./model/User')();
const userRepository = require('./service/UserRepository')(leveldb);
const userService = require('./service/UserService')(userRepository, User);
const userController = require('./controller/UserController')(userService);

const app = express();
// Attach routes
userController.routes(app);

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
```

## Example `UserService` implementation

To illustrate how injected dependencies can be used, an example implementation of a `UserService` could be something like this:

```js
# In file ./src/service/UserService.js
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
        return userRepository
          .findByProvider(provider, profile.id)
          // There is no User, this is a new user.
          .then(user => {
            if (!user) {
              return User.fromProvider(provider, profile)
            }
            return user;
          )
          // There is an existing user.
          .then(user => user.updateLastLogin())
          .then(user => userRepository.store(user))
    }
  }
} 
```

There are two injected dependencies, the `userRepository` and a `User` model. These dependencies can be accessed in the returned object with currently one function `loginWithProvider`. Other function could be added here, they would share the same dependencies. 

## Example usage of the `UserService`

A wired up instance of the example `UserService` can then be used in other places of the app like controllers. The same principile applies there:

```js
# In file ./src/controllers/UserController.js
module.exports = (userService) => {
  function login(req, res, next) {
    return userService
      .loginWithProvider(req.query.provider, req.query.profile)
      .then(user => res.json(user))
      .catch(next);
  }
  
  return {
    routes: (app) => {
      app.post('/login', login);
    },
  }
}
```

Now all dependencies are injected and wired up at one place. Nice!

## Refactor to support Hot Reloading

The larger apps grow, the longer the startup costs due to parsing javascript files
and making connections to databases and servies. Hot reloading NodeJS apps **avoids the startup costs** and lets you **iterate quicker**. To make this possible the previous structure needs a little refactoring.

We have to move out the dependencies into another file which can be reloaded on file changes.
The dependencies then need to be exported to be us

```js
// Wire up dependencies
const leveldb = require('leveldb');
const express = require('express');
const app = express();
// Attach routes
userController.routes(app);

const deps = {
  app,

  // Use ES6 getters to require up the dependency when needed. 

  get User() {
    return require('./model/User')()
  },
  get userRepository() { 
    return require('./service/UserRepository')(leveldb) 
  },
  get userService() { 
    return require('./service/UserService')(deps.userRepository, deps.User);
  },
  get userController() {
    return require('./controller/UserController')(deps.userService);
  }
};

module.exports = deps;
```

This is how the `./src/index.js` looks like after the refactoring:

```js
# In file ./src/index.js

// Start with hot reloading: node index hotreload 
const isHot = process.argv[2] === 'hotreload';
const app = isHot ? require('./hotreload') : require('./dependencies').app;

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
```

For hot reloading, create a new file:

```js
# In file ./src/hotreload.js
const dependencies = require('./src/dependencies');

// Include server routes as a middleware
app.use((req, res, next) => {
  dependencies.app(req, res, next);
});

// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
const watcher = chokidar.watch(['./src']);
watcher.on('ready', () => {
  watcher.on('all', () => {
    console.log('Clearing module cache from server');
    Object.keys(require.cache).forEach((file) => {
      if (/src/.test(file) && file.indexOf('node_modules') === -1) {
        delete require.cache[file];
      }
    });
  });
});
```

If you want you can run unit tests in the same process 

## Complete example

