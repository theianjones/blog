---
slug: urql
date: 2020-02-24
title: 'Introduction to Urql: A Robust GraphQL Client'
description: 'Urql is a flexible alternative to Apollo'
categories: []
tags: [urql, graphql]
growthStage: evergreen
published: true
author: 'Ian Jones'
type: post
banner: './assets/2020-02-24-urql-with-react/banner.png'
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

## Pass Parameters to useQuery

[Watch "Pass Parameters to urql's useQuery React Hook" (community resource) on egghead.](https://egghead.io/lessons/graphql-pass-parameters-to-urql-s-usequery-react-hook?pl=introduction-to-urql-a-react-graphql-client-faaa2bf5&af=ay44db)

We have this GraphQL Query:

```js
const courseQuery = `
  query courses {
    courses {
      title
    }
  }
`
```

To pass a parameter to a graphql query, we will add `(limit: 2)` to `courses`.

```js
const courseQuery = `
  query courses {
    courses(limit: 2) {
      title
    }
  }
`
```

This parameter will limit the number of courses that come back. Next we are going to pass an `offset` to this query. Offset is 0 based so we will pass get our first page of courses with `0`.

```js
const courseQuery = `
  query courses {
    courses(limit: 2, offset: 0) {
      title
    }
  }
`
```

Incrementing offset to `1` will give use the next page of courses and so on. We dont want to hard code our query like this though. We need to pass a variable from our React component to our GraphQL query. Just as a reminder, here's what our component looks like right now:

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
    <div>
      <h1>egghead courses</h1>
      <button onClick={() => setOffset(offset + 2)}>Next Page</button>
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

The first thing we need to do is update our `coursesQuery` to accept a variable. We will declare an `$offset: Int` variable in our query declaration. GraphQL query variables are always denoted with a `$`. They also always need to be assigned a type. In this case, we are using an integer (`Int` is the syntax).

```js
const courseQuery = `
  query courses($offset: Int) {
  }
`
```

Now that we have a parameter of `$offset` declared, we are going to pass this parameter to our query with `courses(offset: $offset)`.

```js
const courseQuery = `
  query courses($offset: Int) {
    courses(offset: $offset, limit: 2) {
      title
    }
  }
`
```

Inside of our component, we need to pass a `variables` object with a key of `offset` to our `useQuery` hook.

```js
const [result] = useQuery({
  query: courseQuery,
  variables: {
    offset: 0,
  },
})
```

Urql will handle running the query for us every time this offset variable changes. So if we create some local component state and pass that state to our useQuery hook, any time this variable is updated Urql will run our query.

```js
const [offset, setOffset] = React.useState(0)
const [result] = useQuery({
  query: courseQuery,
  variables: {
    offset,
  },
})
```

Now lets increment the offset every time someone clicks our `Next Page` button.

```js
return (
    <div>
      <h1>egghead courses</h1>
      <button onClick={() => setOffset(offset + 1)}>Next Page</button>
      {result && result.data && (
        //...
      )}
    </div>
  )
```

And thats it! now we have pagination set up with a couple simple hooks.

## Write a GraphQL Mutation using React Hooks with Urql

[Watch "Write a GraphQL Mutation using React Hooks with Urql" (community resource) on egghead.](https://egghead.io/lessons/graphql-write-a-graphql-mutation-using-react-hooks-with-urql?pl=introduction-to-urql-a-react-graphql-client-faaa2bf5&af=ay44db)

The first thing we need to do is `import {useMutation} from 'urql'`.

We will call the `useMutation` hook in our component. This hook returns an array with the result in the first slot and a function to execute the mutation in the second.

```js
const App = () => {
  const [res, executeMutation] = useMutation()
}
```

Now we need to define a query that we are going to use. Here is the one I am going to use:

```js
const addCourse = `
  mutation addCourse($slug: String!, $title: String!){
    insert_courses(objects: {slug: $slug, title: $title}) {
      returning {
        title
        slug
      }
    }
  }
```

This query takes a slug and a title as a string (they are both required). The Hasura api I am using defines are `returning` object. So we will grab the title and slug off of the returned object.

Now we can pass this query to our `useMutation` hook.

```js
const [res, executeMutation] = useMutation(addCourse)
```

Lets wire up the wire up the execution method to a button. `executeMutation` takes an object with keys `slug` and `title`. These are the variables we defined in our GraphQL query earlier. We are going to log our `res` variable to see whats returned.

```js
const App = () => {
  const [res, executeMutation] = useMutation(addCourse)
  console.log({ res })
  return (
    <button
      onClick={() => executeMutation({ title: 'My Course', slug: 'my-course' })}
    >
      Create Course
    </button>
  )
}
```

```js
{res: {fetching: true, stale: false, error: undefined, data: undefined, extensions: undefined}}
{res: {fetching: false, stale: false, data: {…}, error: undefined, extensions: undefined}}
```

You can see the result updates when the request starts and again when the query returns the data. This is what the data object looks like:

```js
console.log(res.data)
{
  insert_courses: {
    returning: {
      slug: 'my-course',
      title: 'My Course'
    }
  }
}
```

## Write a GraphQL Subscription with React Hooks using Urql

[Watch "Write a GraphQL Subscription with React Hooks using Urql" (community resource) on egghead.](https://egghead.io/lessons/graphql-write-a-graphql-subscription-with-react-hooks-using-urql?pl=introduction-to-urql-a-react-graphql-client-faaa2bf5&af=ay44db)

Urql provides a `useSubscription` hook for us to subscribe to a GraphQL subscription. The first thing we need to do is `import {useSubscription} from 'urql'`.
`useSubscription` takes an object, like `useQuery` this object expects a property of `query` and `variables` to be defined on it. In our particularly query, we are subscribing to the comments on a course. So we need to pass the slug of the course to our subscription query.

```js
function App(){
  const course_slug = 'usesubscription-example'
  useSubscription({
    query: commentSubscriptionQuery,
    variables: {course_slug}
  })
  return (
    // ...
  )
}
```

Heres what our subscription query looks like:

```js
const commentSubscriptionQuery = `
  subscription subscribeToComments($course_slug: String!) {
    comments(where: {course_slug: {_eq: $course_slug}}){
      text
    }
}`
```

`useSubscription` returns an array with the first element in that array being the `result`.
`const [result] = useSubscription({})`
Like the the result of `useQuery`, this result has a couple methods on it that are useful to use.
We can use `result.error` to display any errors that the my have ran into.

```js
const commentSubscriptionQuery = `
  subscription subscribeToComments($course_slug: String!) {
    comments(where: {course_slug: {_eq: $course_slug}}){
      text
    }
  }
`

function App(){
  const course_slug = 'usesubscription-example'
  const [result] useSubscription({
    query: commentSubscriptionQuery,
    variables: {course_slug}
  })

  if (result.error !== undefined) {
    return <div>{res.error.message}</div>
  }
  return (
    // ...
  )
}
```

Next, we need to tell the user if the query is fetching or if the data hasn't arrived yet.

```js
function App(){
  // ...
  if (!res.fetching && res.data === undefined) {
    return <p>Loading...</p>
  }
  return (//...)
```

If `result` passes all of these checks, we know that we have `result.data.comments` and we can display them in a list.

## Understand Urql's Exchanges and Request Policies

[Watch "Understand Urql's Document Cache Exchange and Request Policies" (community resource) on egghead.](https://egghead.io/lessons/graphql-understand-urql-s-document-cache-exchange-and-request-policies?af=ay44db)

When you are setting up an `urql` client, the client comes with default exchanges that your operations go through.

These exchanges are `[dedupExchange, cacheExchange, fetchExchange]`. The order of the array matters.

```js
const client = new Client({
  url: 'http://graphql.org/swapi-graphql/',
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
})
```

In this case, the `dedupExchange` is the first exchange that graphql operation will pass through. This exchange has one job: to remove accidental duplicate requests. If you didn't manage your inputs correctly a user can cause many requests at once.

The next exchange the operation goes through is the `cacheExchange`. This exchange caches any successful requests. This is a **Document Cache**[01]. This sort of cache takes the query you've written and the variables and hashes them together. Whenever `urql` finds an operation hash coming through that matches a hash in the `cacheExchange`, it will return that value based on the `requestPolicy`.

The `requestPolicy` for the `cacheExchange` can be 1 of 4 things:

- cache-first
- cache-only
- network-only
- cache-and-network

`cache-first` is the default policy. It tells urql that if an operation passed to the `cacheExchange` has been stored already, the data found should be returned and **the operation should not be passed to the `fetchExchange`**. If the operation hash hasn't been stored in the cache, then its passed to the `fetchExchange`

`cache-only` operates like it sounds: it will only look in the cache for data matching the operation hash and will not pass the operation to the `fetchExchange.

`network-only` will always skip the cache and pass the operation to the `fetchExchange`.

`cache-and-network` will return any value in the cache and pass the operation to the `fetchExchange` even if there was a successful cache hit. The `fetchExchange` will then update the cache when the request comes back.

To change the default `requestPolicy` you can pass one of these values through the `Client` configuration object.

```js
const client = new Client({
  url: 'http://graphql.org/swapi-graphql/',
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
  requestPolicy: 'cache-and-network',
})
```

The last default exchange that your graphql operation passes through is the `fetchExchange`. This exchanges uses `fetch` to make an http request to the url defined on the client.

Other exchanges to look at per the [documentation](https://formidable.com/open-source/urql/docs/concepts/exchanges/).

- `retryExchange`: Allows operations to be retried
- `devtoolsExchange`: Provides the ability to use the urql-devtools
- `multipartFetchExchange`: Provides multipart file upload capability
- `suspenseExchange` (experimental): Allows the use of React Suspense on the client-side with urql's built-in suspense mode
- graph cache `cacheExchange`

## Resources

- https://formidable.com/open-source/urql/docs/basics/document-caching/
- https://formidable.com/open-source/urql/docs/graphcache/
- https://formidable.com/open-source/urql/docs/concepts/exchanges/
