---
slug: urql
date: 2020-02-24
title: 'Introduction to Urql: A Robust GraphQL Client'
description: 'Urql is a flexible alternative to Apollo'
categories: []
keywords: ['urql', 'graphql']
published: true
author: 'Ian Jones'
banner: './images/banner.png'
---

## Introduction to useQuery

If you would prefer to watch this post, you can do so with this [community resource lesson on egghead.io](https://egghead.io/lessons/graphql-query-graphql-data-with-urql-using-react-hooks?pl=introduction-to-urql-a-react-graphql-client-faaa2bf5&af=ay44db).

The first thing we need to do is `import {useQuery} from 'urql`.

Heres what our React component looks like:

```js
import React from 'react'
import { useQuery } from 'urql'

function App() {
  let result
  return (
    <div>
      <h1>egghead courses</h1>
      {result && result.data && (
        <ul style={{ listStyle: 'none' }}>
          {result.data.courses.map(({ title }) => (
            <li
              key={title}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 16,
                fontFamily: 'sans-serif',
                marginBottom: 10,
              }}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

You can see that we have a `result` variable that we are going to get our data off of.

We are going to assign `useQuery` to result.

```js
const [result] = useQuery({})
```

`useQuery` takes a configuration object. This is how we tell urql what to query along with some other things we aren't going over in this post.

The `query` key is required for `useQuery` to actually run a GraphQL query.

It is unimportant but here's what our query looks like:

```js
const courseQuery = `
  query courses {
    courses {
      title
    }
  }
`
function App() {
  //...
}
```

We are defining this query above our app component. We need to pass this query to `useQuery`.

```js
const [result] = useQuery({ query: courseQuery })
```

Now that we've passed this query in, if you `console.log(result)` you will see 3 log statements:

```js
{fetching: true, stale: false, error: undefined, data: undefined, extensions: undefined}
{fetching: true, stale: false, error: undefined, data: undefined, extensions: undefined}
{fetching: false, stale: false, error: undefined, data: {…}, extensions: undefined}
```

You can see that there are a couple of properties on `result` that are useful to use.

You can use `result.fetching` to check the status of our query. We can return `'Loading...'` to our users so they know that something is happening.

```js
function App() {
  const [result] = useQuery({
    query: courseQuery,
  })

  if (result.fetching) {
    return 'Loading...'
  }

  return (
    // ...
  )
}
```

If there is an error, it will show up in `result.error`. Let's add this check so we display a message to our users if something terrible happens.

```js
function App() {
  const [result] = useQuery({
    query: courseQuery,
  })

  if (result.fetching) {
    return 'Loading...'
  } else if (result.error) {
    return 'There was an error :('
  }

  return (
    // ...
  )
}
```

Lastly, if all of these checks return false, you can presume that the query loaded successfully.

As you've seen before, you can access the data with `result.data` and display the result to your users!
