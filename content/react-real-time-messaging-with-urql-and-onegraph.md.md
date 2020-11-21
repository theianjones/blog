---
date: 2020-11-20
title: Refactor a React application using urql and OneGraph
tags: [react, urql, OneGraph, featured, graphql]
---

I'm going to show you how to integrate a React component that uses GraphQL to fetch data from Github. We are working from an existing application so we will go through the process of refactoring the code to handle new functionality.

Specifically, we are working on a chat application that I built in my egghead course _[React real-time messaging with graphql using urql and onegraph](https://egghead.io/playlists/react-real-time-messaging-with-graphql-using-urql-and-onegraph-be5a)_. At the end of the course, we have a single chat feed that will update in real-time when new messages come in. Heres what the app looks like:

![image link](https://res.cloudinary.com/dzsq0psas/image/upload/v1605928488/blog/Image_202020-11-19_20at_205.18.57_20PM_hrgk11.png)

In this post, we are going to implement the ability to choose from multiple conversations. The application has hard coded values we need to refactor so we can accept props from a parent component. Controlling our components through props gives us the ability to dynamically switch what conversation the user is viewing.

## Course Summary

We learned how to use `urql`'s `useQuery` React hook to fetch data about the comments on a specific Github issue. We us OneGraph as a backend. OneGraph has provided has an auth package that we build into our app with React Context.

`urql` requires a little bit of set up. We create an `urql` `Client` that we put into React context so our query hooks can use them. We then set up `onegraph-auth` and pass the authentication headers we get from the `onegraph-auth` package to our `urql` client. This way we can fetch Github queries which require an authenticate user.

We need a way for our chat app to send messages. GraphQL mutations handle this for us. With mutations, we can create comments on a specific github issue.

Finally, we implement a subscription client in `urql`. This enables the `useSubscription` hook and allows us to see new messages without refreshing the browser!

We are using Github as our backend database to store our messages. We use OneGraph as our GraphQL server for our `urql` client to send queries to. OneGraph will then take care of sending queries to Github and fetching the responses we ask for.

## Set up the code

We will be working from code in [this Github repository](https://github.com/theianjones/egghead-graphql-subscriptions). You can clone the project with this:

```sh
git clone git@github.com:theianjones/egghead-graphql-subscriptions.git
# or
git clone https://github.com/theianjones/egghead-graphql-subscriptions.git
cd egghead-graphql-subscriptions
```

When the repository is cloned, you'll want to work out of the `20-commentHistory` directory.

```sh
cd 20-commentHistory
```

Now you'll need to install package dependencies:

```sh
yarn
# or
npm install
```

## Build the Issue Query in the graphiql editor

First, we need to navigate to [OneGraph](https://onegraph.com). Log in. Now select an existing app or create a new one.

Head over to the data explorer tab. This is where OneGraph's GraphiQL editor lives. We're going to build out our query to get all of the issues associated with the [egghead-graphql-subscriptions github repo](https://github.com/theianjones/egghead-graphql-subscriptions).

Heres what our GraphQL query will look like:

```graphql
query IssueList(
  $name: String = "egghead-graphql-subscriptions" // these are GraphQL Query parameters
  $owner: String = "theianjones"                  // this is how we can pass variables to our GraphQL query
) {
  gitHub {
    repository(name: $name, owner: $owner) {     // this is the part of the query that needs the variables we declared
      id                                         // We grab the id of the repository for urql to do better caching
      issues(
        first: 10
        orderBy: { field: CREATED_AT, direction: DESC } // we can order our query be a specific field
      ) {
        edges {
          cursor                 // cursors allow you to paginate your query results
          node {
            id
            title
            comments(last: 1) {  // we want the last comment to display under our issue title
              totalCount
              nodes {
                id
                bodyText
              }
            }
          }
        }
      }
    }
  }
}
```

Pro tip: when you hover over the `$name` and `$owner` you can have the editor paramiterize the query for you:

![image link](https://res.cloudinary.com/dzsq0psas/image/upload/v1605928546/blog/Screen_20Recording_202020-11-19_20at_2005.31_20PM_b0aluc.gif)

Before you run the query, you are going to have to authorize your editor with GitHub. To do this, click the `Authentication` drop down and select "Log in with GitHub"

![image link](https://res.cloudinary.com/dzsq0psas/image/upload/v1605928568/blog/Image_202020-11-19_20at_205.33.27_20PM_yyh8bg.png)

When you run the query, you should get some data back!

Now that we have a query, it's time to generate our code. OneGraph has a code snippet generation tool that will create the react and urql code for us 🤯 You'll notice there's quite a few options to choose from so if you want to quickly try out Apollo or even ReasonML with GraphQL, you can!

Click "Code Exporter". Now, in the two drop downs, select `JavaScript` in the first and `react-urql` in the second. Click the copy button to grab all the code that the exporter generated for us.

![image link](https://res.cloudinary.com/dzsq0psas/image/upload/v1605928590/blog/Image_202020-11-19_20at_205.36.57_20PM_gy2wyq.png)

## Integrate OneGraph generated snippet

We are going to create an `IssueList` component. Create a file in our components directory: `src/components/IssueList.js`.

```sh
touch src/components/IssueList.js
```

Paste the snippet we generated in the last step. You'll notice theres urql client code that we already have present in `src/index.js` so we can go ahead and delete all of that code.

Heres what we have left:

```js
import React from "react";
import { useQuery } from 'urql'

const ISSUE_LIST = `
  query IssueQuery($name: String = "egghead-graphql-subscriptions", $owner: String = "theianjones") {
    gitHub {
      repository(owner: $owner, name: $name) {
        id
        issues(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
          edges {
            cursor
            node {
              id
              number
              title
              comments(last: 1) {
                totalCount
                nodes {
                  id
                  bodyText
                }
              }
            }
          }
        }
      }
    }
  }
`;

const IssueList = (props) => {
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
      query: ISSUE_LIST,
      variables: {"name": props.name, "owner": props.owner}});

    if (fetching) return <pre>Loading...</pre>;

    const dataEl = data ? <pre>{JSON.stringify(data, null, 2)}</pre> : null;
    const errorEl = error ? (
      <div className="error-box">
        Error in IssueQuery. <br />
        {error.message && error.message.startsWith('[Network]') ? <span>Make sure <strong>{window.location.origin}</strong> is in your CORS origins on the <a href={`https://www.onegraph.com/dashboard/app/${APP_ID}?add-cors-origin=${window.location.origin}`}>OneGraph dashboard for your app</a>.</span> : null}
        <pre>
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    ) : null;

    const needsLoginService = auth.findMissingAuthServices(error)[0];

    return (
      <div>
        {dataEl}
        {errorEl}
        <br />
        <button
          onClick={async () => {
            if (!needsLoginService) {
              reexecuteQuery({requestPolicy: 'cache-and-network'});
            } else {
              await auth.login(needsLoginService);
              const loginSuccess = await auth.isLoggedIn(needsLoginService);
              if (loginSuccess) {
                console.log("Successfully logged into " + needsLoginService);
                reexecuteQuery({requestPolicy: 'cache-and-network'});
              } else {
                console.log("The user did not grant auth to " + needsLoginService);
              }
            }
          }}>
            {needsLoginService ? `Log in to ${needsLoginService}` : 'Run query: IssueQuery'}
          </button>
        </div>
      );
};
```

First, we need to add `export default IssueList` at the bottom of the file. To get things rendering, lets import `APP_ID` and `auth` from `../utils/auth`

```js
import {APP_ID, auth} from '../utils/auth'
```


Now we can import our `IssueList` component in `src/App.js`. Add it right above the div:

```js
//...
+import IssueList from './components/IssueList'

function App() {
  const {login, status} = React.useContext(AuthContext)

  if (!status || !status.github) {
    return (
      <div>
        <h1>Log in to github</h1>
        <p>In order to see your profile, you'll have to log in with Github.</p>
        <button onClick={() => login('github')}>Log in with Github</button>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
+        <IssueList/>
        <div style={{minWidth: 400}}>
          <Comments />
          <Input />
        </div>
      </header>
    </div>
  )
}
//...
```

The result isn't pretty, but we have the data we need to start rendering JSX!

## Display JSON Data In a List

In the previous section, we were displaying the raw json in the ui. This is great to make sure everything is working but most people would be confused if we left JSON on the screen like that. Lets render some JSX 🤩

Back in our `IssueList` component, we can see the structure of our data that we will need to map over: `data.gitHub.repository.issues.edges`.

Lets create a view component that takes each issue node, and renders it as an `li`:

```js
const IssueListItem = ({issue}) => (
  <li key={issue.id}>
    <h3>{issue.title}</h3>
    <p>{issue.comments.nodes[0].bodyText}</p>
    <hr/>
  </li>
)
```

Then we can change the `dataEl` variable to be a `ul` that maps the issues as its children:

```js
-const dataEl = data ? <pre>{JSON.stringify(data, null, 2)}</pre> : null;
+const dataEl = data ? (
+    <ul>
+      {data.gitHub.repository.issues.edges.map(({node}) => (
+        <IssueListItem issue={node} />
+      ))}
+    </ul>
+  ) : null

```

Notice that we are destructuring `node` off in the map function.

## Style Issue List

First we are going to remove the defualt padding `ul`'s have:

```js
const dataEl = data ? (
-   <ul>
+   <ul style={{padding: 0}}>
     {data.gitHub.repository.issues.edges.map(({node}) => (
       <IssueListItem issue={node} key={node.id} />
     ))}
   </ul>
) : null
```

Next we want to add some styles to our `IssueListItem` component. We want the title of the issue to stand out. We have the first message of our issue as well so we should dim it but make it visible.

```js
<li
  key={issue.id}
  style={{
    paddingLeft: 3,
    paddingRight: 3,
    listStyle: 'none',
    textAlign: 'justify',
  }}
>
  <h3 style={{marginBottom: 0, marginTop: 10, fontSize: 24}}>
    {issue.title}
  </h3>
  <p
    style={{
      marginTop: 5,
      marginBottom: 10,
      fontSize: 16,
      fontWeight: 400,
      opacity: 0.8,
      color: 'rgb(102, 102, 106)',
    }}
  >
   {issue.comments.nodes[0].bodyText}
  </p>
  <hr />
</li>
```

It would be nice to have the background color change when we hover over a list item. We dont want to pull in a whole css library to do this, so lets make a `useHover` hook to keep track of that state.

```js
const useHover = (styles) => {
  const [hover, setHover] = React.useState(false)

  const onMouseEnter = () => {
    setHover(true)
  }

  const onMouseLeave = () => {
    setHover(false)
  }

  const hoverStyle = hover
    ? {
        transition: 'all .2s ease-in-out',
        ...styles,
      }
    : {
        transition: 'all .2s ease-in-out',
      }

  return [hoverStyle, {onMouseEnter, onMouseLeave}]
}
```

With this hook, you pass in the styles you want applied when the mouse is over our element. We put in a transition to make the hover a little nicer.

Now we can get the hover styles and the props we need to apply to our list items by destructuring the return array.

```js
const IssueListItem = ({issue}) => {
+  const [hoverStyle, hoverProps] = useHover({
+    background: 'rgb(67, 67, 67)',
+    cursor: 'pointer',
+  })
  return (
    <li
      key={issue.id}
+      {...hoverProps}
      style={{
        paddingLeft: 3,
        paddingRight: 3,
        listStyle: 'none',
        textAlign: 'justify',
+        ...hoverStyle,
      }}
    >
```

We apply the styles that are returned to the style prop on our `li`. Then we take the `hoverProps` object that contains the `onMouse` events and we add those functions to our `li` as well. Last thing we'll do in this component is remove the run query button.

```js
//...
<div>
  {dataEl}
  {errorEl}
  <br />
- <button
-   onClick={async () => {
-     if (!needsLoginService) {
-       reexecuteQuery({requestPolicy: 'cache-and-network'});
-     } else {
-       await auth.login(needsLoginService);
-       const loginSuccess = await auth.isLoggedIn(needsLoginService);
-       if (loginSuccess) {
-         console.log("Successfully logged into " + needsLoginService);
-         reexecuteQuery({requestPolicy: 'cache-and-network'});
-       } else {
-         console.log("The user did not grant auth to " + needsLoginService);
-       }
-     }
-   }}>
-     {needsLoginService ? `Log in to ${needsLoginService}` : 'Run query: IssueQuery'}
-   </button>
</div>
```
Now, we can head over to `src/App.js` and get the message list rendering on the side.

```js
- <div className="App">
-   <header className="App-header">
<div
+   style={{
+     display: 'flex',
+     flexDirector: 'column',
+     background: '#181d1f',
+     minHeight: '100vh',
+     fontSize: 'calc(10px + 2vmin)',
+     color: 'white',
+     padding: 10,
+   }}
 >
   <IssueList />
- <div style={{minWidth: 400}}>
+ <div style={{marginLeft: 20, maxWidth: 600, minWidth: 400}}>
     <Comments />
     <Input />
   </div>
</div>
- </header>
- </div>
```

Since we've made some changes to how our widths and heights are working in this component, we need to adjust the styles in `<Comments/>` and `<Input/>`.

We need to adjust the `ul` in `<Comments/>`:

```js
<ul
  style={{
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    overflowY: 'scroll',
+   maxHeight: '90vh',
-   maxHeight: 560,
-   width: 400,
    margin: 0,
  }}
>
```

And in `<Input/>` we need to adjust the `button` styles.

```js
<button
 type="submit"
 style={{
   position: 'absolute',
-    right: '-30px',
+    right: '-10px'
   top: '2px',
   borderRadius: 100,
   background: '#0B55DB',
   color: 'white',
   border: 'none',
   padding: 3,
   width: 23,
   fontWeight: 900,
   fontSize: 16,
  }}
>
```

## Switch Conversations on Selection

We have 2 conversations to choose from: "Discuss GraphQL" and "egghead chat". We want to auto select the first conversation that loads in the list. Based on this conversation, we want to load the whole chat history for that conversation.

What this tells me is that we need to add a `onLoaded` prop to the `IssueList` component so that we can store the issue ids in our app component.

In our `src/App.js` component, lets add a hook to hold our issue ids.

```js
function App() {
  const {login, status} = React.useContext(AuthContext)
+  const [issueNumbers, setIssueNumbers] = React.useState([])
// ...
```

We are going to initialize the state to an empty array. Now we need to pass an `onLoaded` prop to our `<IssueList/>` component. This will be a function that takes the result of our query and plucks the issue ids off of the result.


```js
+const handleIssueListLoaded = ({githHub: {repository: issues}}) => {
+  const issueNumber = issues.edges.map(({node: issue})=> issue.number)
+  setIssueNumbers(issueNumberss)
+}

return (
  <div
    style={{
      display: 'flex',
      flexDirector: 'column',
      background: '#181d1f',
      minHeight: '100vh',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
      padding: 10,
    }}
  >
+    <IssueList onLoaded={handleIssueListLoaded} />
-    <IssueList />
```

We need to tell our `<Comments/>` and `<Input/>` components what the `currentIssueNumber` is. Let's create another `React.useState` hook:

```js
function App() {
  const {login, status} = React.useContext(AuthContext)
  const [issueNumbers, setIssueNumbers] = React.useState([])
+ const [currentIssueNumber, setCurrentIssueNumber] = React.useState()
```

It doesn't need an initial value because we dont know what issue number will come back.

First, lets protect our jsx from invalid renders. We need to make sure that `currentIssueNumber` is set before we render `<Comments/>` and `<Input/>`.

```js
return (
  <div
    style={{
      display: 'flex',
      flexDirector: 'column',
      background: '#181d1f',
      minHeight: '100vh',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
      padding: 10,
    }}
  >
    <IssueList onLoaded={handleIssueListLoaded}/>
+   {currentIssueNumber && (
      <div style={{marginLeft: 20, maxWidth: 600, minWidth: 400}}>
        <Comments />
        <Input />
      </div>
+   )}
  </div>
)

```

Now, when the issue list loads, we have an issue number that we can set:

```js
const handleIssueListLoaded = (data) => {
  const issues = data?.gitHub.repository.issues
  const issueNumbers = issues.edges.map(({node: issue})=> issue.number)
  setIssueNumbers(issueNumbers)
  if(issueNumbers.length > 0){
    setCurrentIssueNumber(issueNumbers[0])
  }
}
```
We make sure that there are more than 0 issues before setting the current one. We can pass the current issueNumber down into our components.

```js
return (
  <div
    style={{
      display: 'flex',
      flexDirector: 'column',
      background: '#181d1f',
      minHeight: '100vh',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
      padding: 10,
    }}
  >
    <IssueList onLoaded={handleIssueListLoaded}/>
    {currentIssueNumber && (
      <div style={{marginLeft: 20, maxWidth: 600, minWidth: 400}}>
+        <Comments issueNumber={currentIssueNumber} />
-        <Comments />
         <Input />
      </div>
    )}
  </div>
)
```


Lets head over to `src/components/CommentsSubscription.js` to update our hook thats fetching our comments data.

```js
+function CommentsSubscription({issueNumber}) {
-function CommentsSubscription() {

 const handleSubscription = (comments = [], commentEvent) => {
    if (!commentEvent) {
      return comments
    }
    return [...comments, commentEvent.github.issueCommentEvent.comment]
  }

  const [pauseCommentsHistory, setPauseCommentsHistory] = React.useState(false)

+ const commentsHistory = useCommentsHistory({pause: pauseCommentsHistory, issueNumber})
- const commentsHistory = useCommentsHistory({pause: pauseCommentsHistory})
```

You can see that we are destructuring the `issueNumber` from the props and passing this variable to our `useCommentsHistory` hook. This is the hook that loads the existing comments for the chat. We have to modify it to make sure it's not hard coded anymore.

```js
const useCommentsHistory = (options) => {
+  const {pause = false, issueNumber} = options
-  const {pause = false} = options
   const [result] = useQuery({
    query: COMMENTS_QUERY,
    variables: {
      repoOwner: 'theianjones',
      repoName: 'egghead-graphql-subscriptions',
+     issueNumber,
-     issueNumber: 2
    },
    pause,
  })

```

Now when you load the page, the conversation should be rendering! Lets head back up to our `src/App.js` to update our `<Input />` component. Our input mutation need the `subjectId` which is not the issue number. This means that we need more than the currentIssueNumber and issueNumbers.

Lets refactor our code to set the current issue:

```js
function App() {
  const {login, status} = React.useContext(AuthContext)
+ const [issues, setIssues] = React.useState([])
- const [issueNumbers, setIssueNumbers] = React.useState([])
+ const [currentIssue, setCurrentIssue] = React.useState()
- const [currentIssueNumber, setCurrentIssueNumber] = React.useState()
  if (!status || !status.github) {
    return (
      <div>
        <h1>Log in to github</h1>
        <p>In order to see your profile, you'll have to log in with Github.</p>
        <button onClick={() => login('github')}>Log in with Github</button>
      </div>
    )
  }

  const handleIssueListLoaded = (data) => {
-   const issues = data?.gitHub.repository.issues
-   const issueNumbers = issues.edges.map(({node: issue}) => issue.number)
-   if(issueNumbers.length > 0){
-     setCurrentIssueNumber(issueNumbers[0])
-    }
+    const issues = data?.gitHub.repository.issues.edges.map(e => e.node)
+    setIssues(issues)
+    setCurrentIssue(issues[0])
  }
```

We need to keep track of the whole issue because our two components need different data off of each. This is a good thing to keep in mind when you are designing your state in your components. Lets update our view now:

```js
return (
  <div
    style={{
      display: 'flex',
      flexDirector: 'column',
      background: '#181d1f',
      minHeight: '100vh',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
      padding: 10,
    }}
  >
    <IssueList onLoaded={handleIssueListLoaded}/>
    {currentIssue && (
      <div style={{marginLeft: 20, maxWidth: 600, minWidth: 400}}>
        <Comments issueNumber={currentIssue.number} />
+       <Input subjectId={currentIssue.id} />
-       <Input />
      </div>
    )}
  </div>
)
```

Now we can update our `Input` component:

```js
function NewCommentInput({subjectId}) {
  const [mutationResult, executeMutation] = useMutation(NEW_COMMENT_MUTATION)
  const handleSubmit = (body) => {
+   executeMutation({subjectId, body})
-   executeMutation({subjectId: 'MDU6SXNzdWU2OTQ1MjE0ODM=', body})
 }


  return <Input onSubmit={handleSubmit} />
}
```

And finally, we can add an `onClick` handler to update what current issue we are viewing! Inside of `src/App.js`:

```js
return (
  <div
    style={{
      display: 'flex',
      flexDirector: 'column',
      background: '#181d1f',
      minHeight: '100vh',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
      padding: 10,
    }}
  >
+   <IssueList onLoaded={handleIssueListLoaded} onClick={setCurrentIssue} />
-   <IssueList onLoaded={handleIssueListLoaded} />
    {currentIssue && (
      <div style={{marginLeft: 20, maxWidth: 600, minWidth: 400}}>
        <Comments issueNumber={currentIssue.number} />
        <Input subjectId={currentIssue.id} />
      </div>
    )}
  </div>
)
```

When you test the UI out, you will notice that nothing is changing. Thats because we are pausing our urql query in `Comments`. We can force a render when the `currentIssue` changes by adding a `key` prop to each of the components:

```js
return (
  <div
    style={{
      display: 'flex',
      flexDirector: 'column',
      background: '#181d1f',
      minHeight: '100vh',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
      padding: 10,
    }}
  >
    <IssueList onLoaded={handleIssueListLoaded} onItemClick={(i) => console.log('click') || setCurrentIssue(i)} />
    {currentIssue && (
      <div style={{marginLeft: 20, maxWidth: 600, minWidth: 400}}>
+       <Comments issueNumber={currentIssue.number} key={currentIssue.number} />
+       <Input subjectId={currentIssue.id} key={currentIssue.id} />
-       <Comments issueNumber={currentIssue.number} />
-       <Input subjectId={currentIssue.id} />
      </div>
    )}
  </div>
)
```

This adds the functionality for switching conversations. If you go over to github and create a new issue, when you reload, you'll see it show up!
