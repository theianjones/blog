---
slug: reasonml-async-await
date: 2020-03-17
title: '📝 ReasonML Applications for the React Developer egghead Collection Notes'
tags: [reasonml, react]
published: true
author: 'Ian Jones'
type: post
---

## [Use BuckleScript to get up and running in a new ReasonReact project](https://egghead.io/lessons/reason-use-bucklescript-to-get-up-and-running-in-a-new-reasonreact-project?pl=reasonml-applications-for-the-react-developer-684c095f)

- `bsb -init name-of-app -theme react` to init a Reason React app
- `npm install && npm run start`
- We will also need to run `webpack -w`

## [Implement a Sticky Footer within a ReasonReact App Using the bs-css BuckleScript Package](https://egghead.io/lessons/reason-implement-a-sticky-footer-within-a-reasonreact-app-using-the-bs-css-bucklescript-package?pl=reasonml-applications-for-the-react-developer-684c095f)

- `yarn add bs-css`
- add `bs-css` to `bs-dependencies` in `bsconfig.json`
- `open Css` to access the functions in that module
- `open Styles;` in any component file you want to access the style modules we defined

## [Create a Layout Component for Displaying Child Components Inside of a ReasonReact App](https://egghead.io/lessons/reason-create-a-layout-component-for-displaying-child-components-inside-of-a-reasonreact-app?pl=reasonml-applications-for-the-react-developer-684c095f)

- use the`[@react.component]` decorator
- use named arguments to access props `~children`
- `ReasonReact.string` to render a string to the page.

## [Up and Running with React Hooks inside of a ReasonML](https://egghead.io/lessons/egghead-up-and-running-with-react-hooks-inside-of-a-reasonml?pl=reasonml-applications-for-the-react-developer-684c095f)

- `npm i -g bs-platform`
- `bsb -init` generates a bucklescript project
- `bsb -init reason-react-app -theme react-hooks`

## [Migrate an Existing BuckleScript Project to bs-platform v7](https://egghead.io/lessons/reason-migrate-an-existing-bucklescript-project-to-bs-platform-v7?pl=reasonml-applications-for-the-react-developer-684c095f)

- from version 5 to 7, theres no code in the video that you need to change

## [Use ReasonMLs Variant & Record types with ReasonReact's useReducer hook to Manage State](https://egghead.io/lessons/reason-use-reasonmls-variant-record-types-with-reasonreact-s-usereducer-hook-to-manage-state?pl=reasonml-applications-for-the-react-developer-684c095f)

```js
type state = {
  count: int,
  incrementValue: int,
}

type action = Click | UpdateIncrementValue | AddIncrementValue
```

- You can use Reacts `useReducer` method with these types

```js
let (state, dispatch) =
  React.useReducer(
    (state, action) =>
      switch (action) {
      | Click => {...state, count: state.count + 1}
      | UpdateIncrementValue => {
          ...state,
          incrementValue: state.incrementValue + 1,
        }
      | AddMany => {
          count: state.count + state.incrementValue,
          incrementValue: 0,
        }
      },
    {count: 0, incrementValue: 0},
  );
```
