---
layout: post
slug: '/basics-of-functional-javascript-reduce'
title: 'Basics of Functional Javascript: Array.reduce'
date: 2015-08-29 13:12:21
published: true
keywords: []
author: Ian Jones
description: ''
tags: [functional programming, javascript]
type: post
---

Reduce is one of the most powerful functions that you can use on an array. When you
call reduce on an array, you have to give reduce a callback function.

```js
var array = [1, 2]
array.reduce(function () {})
// this will return nothing
```

A simple reduce function would look something like this:

```js
array.reduce(function (prevItem, currItem, index, array) {
  return prevItem + currItem
})

// => 3
```

In this case, reduce takes the contents of array and adds each one
together. To understand how reduce does this, you have to understand its arguments and how they reference the array. In this case, prevItem is equal to the first
index of the array while currItem is equal to the second element in the array.

Consider this case:

```js
var array = [1, 2, 3, 4]

array.reduce(function (prevItem, currItem, index, array) {
  console.log(prevItem, currItem)
  return prevItem + currItem
})

// 1 2
// 3 3
// 6 4
// => 10
```

When reduce is called on the first element of the array, prevItem is 1 and currItem is 2.
The next time throuhg, prevItem is equal to the last return value of the callback so,
prevItem is equal to 3 (1+2) and currItem is equal to 3 (the next item in the array).
Reduce repeats this process until there are no more items in the array, returning 10 as
the sum of this array.

Reduce also has an optional argument that allows you to set the initial value of
prevItem:

```js
var array = [1, 2, 3, 4]

array.reduce(function (prevItem, currItem, index, array) {
  console.log(prevItem, currItem)
  return prevItem + currItem
}, 10)

// 10 1
// 11 2
// 13 3
// 16 4
// => 20
```

10 is the initial value for this reduce call. This changes the value of prevItem to
be the initial value of 10. CurrValue now changes to be the first element of the
array.

The initial value of reduce can be any value. You can set it to 0, {}, [], or any other desired value.

An example of this from [Nodeschool's functional-javascript-workshop](https://github.com/timoxley/functional-javascript-workshop):

```js
function countWords(inputWords) {
  return inputWords.reduce(function (countMap, word) {
    countMap[word] = ++countMap[word] || 1
    return countMap
  }, {})
}
```

This function will take an array of words, inputWords, and return an object that counts each
word in that array. CountMap is set to the initial value of {}.

```js
var inputWords = [
  'Reduce',
  'is',
  'awesome',
  'It',
  'is',
  'something',
  'that',
  'every',
  'developer',
  'should',
  'know!',
]

countWords(inputWords)

// =>{ Reduce: 1,
//  is: 2,
//  awesome: 1,
//  It: 1,
//  is: 1,
//  something: 1,
//  that: 1,
//  every: 1,
//  developer: 1,
//  should: 1,
//  'know!': 1 }
```

Be sure to read the [MDN doc's on reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).
