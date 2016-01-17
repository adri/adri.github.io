---
layout: post
title: "Better back swiping with the React Native Navigator"
summary: "Swiping back works only close to the edge by default which can be hard to accomplish. It is easy to optimize this." 
---

When observing people testing out an React Native iOS app on a phone which uses the
[Navigator library](https://facebook.github.io/react-native/docs/navigator.html) 
I noticed that swiping back from a detail screen to an overview screen 
is a bit hard to acomplish. You have to swipe very close from the edge of the screen 
to navigate back. When there is a case around the the screen it gets even trickier.

Luckily it is easy to optimize this. The Navigator uses `ScreenConfigs` to describe 
screen transitions. Unfortunately I didn't find much documentation around scene configs
but the [`NavigatorSceneConfigs.js`](https://github.com/facebook/react-native/blob/master/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js)
is very descriptive. 

To adjust the area where a swipe from the edge should be counted as a back navigation, 
you can adjust the `edgeHitWidth` in the `gestures` part of the scene config. 

For example you can create a new SceneConfig which uses the default `FloatFromRight` scene config and 
overwrite the `edgeHitWidth` to be able to swipe anywhere in the left half of the screen.

```js
const SCREEN_WIDTH = require('Dimensions').get('window').width;

/**
 * Overwrite the default navigator scene config.
 * to use a wider area for back swiping.
 */
const FloatFromRight = {
  ...Navigator.SceneConfigs.FloatFromRight,
  gestures: {
    pop: {
      ...Navigator.SceneConfigs.FloatFromRight.gestures.pop,
      edgeHitWidth: SCREEN_WIDTH / 2,
    },
  },
};
```

You can use your own scene config in the `configureScene` callback as a property of the `Navigator`.

```js
  render() {
    return (
      <Navigator
        initialRoute = {...}
        configureScene={() => FloatFromRight}
        renderScene={this.renderScene}
      />
    );
  }
```

I recommend diving into the well written [`NavigatorSceneConfigs.js`](https://github.com/facebook/react-native/blob/master/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js) to find out how you can customize your animations.