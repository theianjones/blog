---
layout: post
slug: '/basics-of-functional-javascript-foreach'
title: 'Basics of Functional Javascript: Array.forEach'
date: 2015-10-5 13:12:21
published: true
keywords: []
author: Ian Jones
description: ''
tags: [functional programming, javascript]
type: post
---

Understanding JavaScript's Array.forEach method is essential to getting a grasp of functional programming in Javascript.
The forEach method allows you to iterate over an array just like you could with a for-loop.

```js
const array = ['foo', 'bar', 'baz']

for (let i = 0; i < array.length(); i += 1) {
  console.log(array[i])
}

// => 'foo'
// => 'bar'
// => 'baz'

// The same code written with a forEach

array.forEach(function (item) {
  console.log(item)
})

// => 'foo'
// => 'bar'
// => 'baz'
```

ForEach() takes a callback function to be executed once per item in the array. No more writing for-loops to iterate over
an array! Learning forEach() is the first step to learning how to use functional programming in JavaScript because many methods
such as .map(), .reduce(), .concatAll(), and .filter() all use .forEach() under the hood. To really understand this look
at @jhusain's [introduction to functional programming](http://reactivex.io/learnrx/)! He takes your through building 5 functions (map, filter, concatAll,
reduce, zip) from the group up!

Also, take a look at the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
for Array.prototype.forEach() on MDN.
