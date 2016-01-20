---
layout: post
title: "NodeJS: Factory Function Pattern, Dependency Registry and Hot Reloading"
summary: "This article shows how to combine Factory Functions with a rapid feedback loop using hot reloading" 
published: false
---

Factory Functions Pattern are a great way to structure applications in NodeJS. [This In-Depth article](https://medium.com/@pyrolistical/factory-functions-pattern-in-depth-356d14801c91#.3193wonrd) describes how they are used. In short, advantages of this pattern are:

 * All external dependencies of a module are stated explicitly
 * External dependencies can be replaced without changing the module 
 * Unittesting is easy/possible
 * No global references
 * [Inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control)

## Wireing up dependencies

More complex NodeJS applications can gain maintainability and testability from such a structure.
Dependencies of the app can be wired up in one place. 

An example which runs with NodeJS > 4.x looks like this:

```
# In file ./src/index.js

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

```
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

```
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
and making connections to databases and servies. Hot reloading NodeJS apps **avoids the startup costs** and lets you **iterate quicker**. To make this possible the previous structure needs a little refactor.

To do this we have to move out 

```js
# In file ./src/index.js
const dependencies = require('./dependencies');
const app = dependencies.app;

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
```



module.exports = {
    express,
    app,
    db,
    mailer,
    routes,
    search,
    server
};

If you want you can run unit tests in the same process 

## Complete example

