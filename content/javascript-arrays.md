---
layout: post
title: 'Javascript Arrays'
date: 2015-07-27 13:12:21
published: true
keywords: []
author: Ian Jones
description: ''
tags: [javascript, fundamentals]
slug: '/javascript-arrays'
type: post
---

Array’s are the foundation of everything that you do in Javascript. They are one of the main ways that you can store data.

The syntax for arrays in Javascript is simple.

```js
var foo = []
```

What goes in an array?

Arrays can hold any type of value: boolean, number, string, object, another array, or even a function. An interesting thing about Javascript arrays is that they can hold multiple types of values at the same time:

```js
var randomArray = ['string', 42, [(Function: doStuff)]]
```

Array Methods

There are a many operations that can be performed on an array. There are a couple that are popular and every Javascript developer should know them.To start with the basics, Array.push() is a simple way to add data to an array. Using the blank array foo that was declared above we can do the following:

```js
foo.push('bar')
// ['bar']
foo.push('This is easy')
// ['bar', 'This is easy']
```

As you can see, there isn't much to Array.push() but you would be surprised how much you actually use this method.

To get the values that you put into the array, you need to loop over the array and display them one by one. The old fashioned way to do this would be to use a for loop like this:

```js
for (i = 0; i < foo.length; i++) {
  console.log(foo[i])
}
// 'bar'
// 'This is easy'
```

There are many advantages to using the forEach() method. Using this method allows us to code in a functional programming style. This is important because when you are looping over data, you dont always have all of the data that you need right away. For more on the advantages of forEach() I would highly recommend @jhusain’s LearnRx.
