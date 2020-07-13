---
layout: post
title: 'Javascript Closures'
date: 2015-08-04 13:12:21
published: true
keywords: []
author: Ian Jones
description: ''
tags: [javascript, fundamentals]
slug: '/javascript-closures'
type: post
---

Closures are critical to the success to any Javascript application. Simply put, a closure in Javascript is a way to keep data private, scoped on an object. Lets say you created an function called person:

```js
var person = function person() {
  var fName = 'Ian',
    getFirstName
  getFirstName = function getFirstName() {
    return fName
  }
  return {
    getFirstName: getFirstName,
  }
}
```

This function has two members: a variable and a method. The variable is not accessible to anything outside of this function. What creates the closure is that you are returning the method getFirstName(). So, if you called person.getFirstName() it would return “Ian”.

Closures are possible because functions that are defined inside of a function, and then returned or passed into another functions (lots of functions) have access to the outer functions variables. These inner functions have access to these variables even after the outer function is done executing.

This concept of using closures to hide data and access them with privileged methods is called the module pattern. This pattern keeps non-essential methods and variables out of the global namespace (a topic for a later post).
