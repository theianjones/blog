---
layout: post
title: Set Up React Router in Rails
date: 2017-09-22 11:02:21
published: true
tags: [rails, react]
author: Ian Jones
description: ''
slug: '/set-up-react-on-rails-routes'
type: post
---

Heres the situation: We have a react screen that has been developed using mock data. It's finished, now you need to get it into production. At [egghead.io](https://egghead.io), we are using [React on Rails](https://github.com/shakacode/react_on_rails) to communicate between Rails and React. I'll be stepping through how to replace an old Rails feature with React.

First thing that you need to do is replace the resource routes to point to React Router. I like to start with checking all of the routes that your resource has: `rake routes | grep :resource`. Now that you are sure of all of the routes, head over to `config/routes.rb` to make the changes. You will need to add `get '/resource(/*id)', to: 'resource#index'` under all of the routes that you care to keep. The order of the routes matter in `config/routes.rb` so be sure you have any routes for that resource you care about above `get '/resource(/*id)', to: 'resource#index'` because it will catch all sub routes and point that action to `resource#index`.

It's important to note that if you are replacing a `:show` page, you should route the corresponding actions to the right controller actions. If you are routing multiple actions i.e. `:index`, `:show`, `:edit`, ect. to React Router, doing it through `:index` seems to make the most sense.

Next, you will need to edit the corresponding `index.html.erb` file. `app/views/resource/index.html.erb` will be where Rails renders your React application. This is where you call `<%= react_component(':resource-component', props: {} )>`.

We have our React app live under the `/client` folder in our application. This is where things get interesting. You can split your app up however you want into separate routes or with a global router. While you are integrating React into an existing Rails app, it is nice to be able to add, per React app routes. Once you get a big enough React front end, it makes sense to add a global React Router.

We use a global router that lives under `client/routes/index.js` and have all of your sub routes in their respective screen folders so:

```
|/client
|-- routes/
|   |--index.js
|--screens
|  |--resource1
|     |--routes/
|        |--index.js
|  |--resource2
|     |--routes/
|        |--index.js
```

Routes in `client/routes/index.js` will look like this:

```js
import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Resource1routes from '../screens/Resource1Routes/routes'

// Can be a functional component but sometimes you need react lifecycle methods to load things such as error tracking or whatever!
class SiteRouter extends React.Component {
  render() {
    // props that you can pass in from Rails
    const { resource1Data } = this.props
    return (
      <Switch>
        <Route
          path={`/resource1`}
          render={(routeProps) => (
            <Resource1Routes {...routeProps} {...resource1Data} />
          )}
        />
        <Redirect to={`/resource1`} />
      </Switch>
    )
  }
}

export default SiteRouter
```

Resource1Routes would look like this:

```js
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Resource1App from '../../screens/Resource1App'

export default (props) => (
  <Switch>
    <Route
      exact
      path="/"
      render={(routeProps) => <Recourse1App {...props} />}
    />
    <Redirect to="/" />
  </Switch>
)
```

Now you have a client rendered React App rendering under your Rails routes! There is an option to pre-render your React app. You will need to set up things up a little differently using railsContext and StaticRouter from React Router.
