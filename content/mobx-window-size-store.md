---
layout: post
title: Mobx Window Size Store
date: 2017-09-18 11:02:21
published: true
tags: [mobx]
author: Ian Jones
description: ''
slug: '/mobx-window-size-store'
type: post
---

We will create a store that keeps track of the window size in an application. We will call this store `WindowSizeStore`.

The store will need a screenWindow observable to keep track of the window:

```js
// windowSizeStore.js

import { extendObservable, computed } from 'mobx';

export default class WindowSizeStore {
  constructor(){
    extendObservable(this, {
      screenWindow: null
    }
  }
}
```

Next we will need a setter for screenWindow, this is all basic mobx:

```js
// windowSizeStore.js
export default class WindowSizeStore {
  constructor(){
    extendObservable(this, {
      screenWindow: null
    }
  }

  setWindow = () => {
    // make sure the window is available
    if(typeof window === 'object'){
      this.screenWindow = window
    }
  }
}
```

We need to check if the window is an object (it will be null if the window is not available). If you are using this store in React, you will call this `setWindow` method in `componentDidMount` lifecycle method. This is the first safe method if you are using Server Side Rendering.

Next we will need an observable for the window width:

```js
// windowSizeStore.js
export default class WindowSizeStore {
  constructor(){
    extendObservable(this, {
      screenWindow: null,
      windowWidth: null
    }
  }

  setWindowWidth = (width) => {
    this.windowWidth = width
    return this.windowWidth
  }

  //...
}
```

Now that we have screenWindow and windowWidth, we need a method that changes windowWidth based on a given width.

```js
// windowSizeStore.js
export default class WindowSizeStore {
  constructor(){
    extendObservable(this, {
      screenWindow: null,
      windowWidth: null
    }
  }

  setWindow = () => {
    // make sure the window is available
    if(typeof window === 'object'){
      this.screenWindow = window
      this.handleWindowWidthChange()
    }
  }

  setWindowWidth = (width) => {
    this.windowWidth = width
    return this.windowWidth
  }

  handleWindowWidthChange = () => {
    const width = this.screenWindow.innerWidth
    this.setWindowWidth(width)
  }

}
```

Notice that we called `handleWindowWidthChange` in `setWindow`. This sets the inital value of `windowWidth`. Now we need the to call this method everytime the window size changes:

```js
// windowSizeStore.js
export default class WindowSizeStore {
  constructor(){
    extendObservable(this, {
      screenWindow: null,
      windowWidth: null
    }
  }

  setWindow = () => {
    // make sure the window is available
    if(typeof window === 'object'){
      this.screenWindow = window
      this.handleWindowWidthChange()
      this.screenWindow.addEventListener("resize", this.handleWindowWidthChange)
    }
  }

  //...

}
```

We dont need `handleWindowWidthChange` to fire while the user is changing screen sizes, so we should [debounce](https://lodash.com/docs/4.17.4#debounce) our method.

```js
//...
import debounce from 'lodash/debounce'

export default class WindowSizeStore {
  constructor() {
    extendObservable(this, {
      windowWidth: null,
      screenWindow: null,
    })
  }

  //...

  handleWindowWidthChange = debounce(() => {
    const width = this.screenWindow.innerWidth
    this.setWindowWidth(width)
  }, 100)
}
```

Now we are ready for the store to compute what size the screen currently is.

```js
;() => {
  const SIZES = {
    sm: inRange(this.windowWidth, 0, 639),
    m: inRange(this.windowWidth, 640, 1023),
    l: inRange(this.windowWidth, 1024, 1250),
    xl: inRange(this.windowWidth, 1250, Number.POSITIVE_INFINITY),
    ns: inRange(this.windowWidth, 640, Number.POSITIVE_INFINITY),
  }

  return reduce(
    SIZES,
    (result, value, key) => {
      if (value) {
        result = [...result, key]
      }
      return result
    },
    []
  )
}
```

This method uses lodashes `inRange` method to tell if the current `windowWidth` is between a screen range. Next we reduce over these sizes. Say out `windowWidth` was 530 then the `SIZES` object would look like this:

```js
{
  'sm': true,
  'm': false,
  'l': false,
  'xl': false,
  'ns': false
}
```

This method would return `['sm']`. We will use this method as a [computed](https://mobx.js.org/refguide/computed-decorator.html) mobx property.

Here is the full store we've build:

```js
import { extendObservable, computed } from 'mobx'
import debounce from 'lodash/debounce'
import inRange from 'lodash/inRange'
import reduce from 'lodash/reduce'

export default class WindowSizeStore {
  constructor() {
    extendObservable(this, {
      windowWidth: null,
      screenWindow: null,
      windowSizes: computed(() => {
        const SIZES = {
          sm: inRange(this.windowWidth, 0, 639),
          m: inRange(this.windowWidth, 640, 1023),
          l: inRange(this.windowWidth, 1024, 1250),
          xl: inRange(this.windowWidth, 1250, Number.POSITIVE_INFINITY),
          ns: inRange(this.windowWidth, 640, Number.POSITIVE_INFINITY),
        }

        return reduce(
          SIZES,
          (result, value, key) => {
            if (value) {
              result = [...result, key]
            }
            return result
          },
          []
        )
      }),
    })
  }

  setWindow = () => {
    if (typeof window === 'object') {
      this.screenWindow = window
      this.handleWindowWidthChange()
      this.screenWindow.addEventListener('resize', this.handleWindowWidthChange)
    }
  }

  handleWindowWidthChange = debounce(() => {
    const width = this.screenWindow.innerWidth
    this.setWindowWidth(width)
  }, 100)

  setWindowWidth = (width) => {
    this.windowWidth = width
    return this.windowWidth
  }
}
```

Now that we have the store set up, it is pretty easy to use.

Heres how you would use it with react:

```js
// App.js
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import includes from 'lodash/includes'

class App extends Component {
  componentDidMount() {
    this.props.windowSizeStore.setWindow()
  }

  render() {
    const { windowSizeStore } = this.props
    const isMobileView = includes(windowSizeStore.windowSizes, 'sm')
    const isMediumView = includes(windowSizeStore.windowSizes, 'm')
    const isLargeView = includes(windowSizeStore.windowSizes, 'l')
    const isExtraLargeView = includes(windowSizeStore.windowSizes, 'xl')
    const isNotSmallView = includes(windowSizeStore.windowSizes, 'ns')
    return (
      <div>
        <p>The window width is: </p>
        {isMobileView && `Mobile!`}
        {isMediumView && `Medium`}
        {isLargeView && `Large`}
        {isExtraLargeView && `Extra Large`}
        {isNotSmallView && `, Not Small`}
      </div>
    )
  }
}

export default observer(App)

// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import WindowSizeStore from './windowSizeStore'
import './index.css'
import App from './App'

const windowSizeStore = new WindowSizeStore()

ReactDOM.render(
  <App windowSizeStore={windowSizeStore} />,
  document.getElementById('root')
)
```

We create the store in the index of the app, then you can use the store in any of the sub components that need to know about screen size.

[Heres a working demo on Github](https://github.com/ijones16/mobx-window-size-store)
