---
layout: post
title: "Javascript's <em>this</em> keyword"
date: 2015-10-6 13:12:21
published: true
keywords: []
author: Ian Jones
description: ''
tags: [javascript, fundamentals]
slug: '/javascript-this-keyword'
type: post
---

Javascript's :sparkles:_this_:sparkles: object could very well be one of the most miss understood concept in the language.

The first think that we need to understand is that when all function is Javascript execute, it gets a _this_ property. The
value of this is determined by the value of the object that invoked that function where _this_ is used. The _this_ reference
will always hold the value of a single object! The tricky part about the _this_ reference is that it is not refering to the
object where it is defined. It's value is solely based on the object that invokes the _this_ function.

There are 4 rules that need to be memorized when you think about _this_. These are the rules:

<ol>
    <li>
        Default binding, If 'strict mode isn't being used, <em>this</em> gets bound to the global object. 
        ```js
        var bar = foo(); 
        ```
    </li>
    <li>
        Implicit binding, if the function is bound to an object, <em>this</em> gets the context of that object. 
        ```js 
            var bar = obj.foo();
        ```
    </li>
    <li>
        Explicit binding, <em>this</em> is explicitly specified to an object. 
        ```js
        var bar = foo.call(obj);
// or 
var bar = foo.bind(obj);
    ```
    </li>
    <li>
        New binding, <em>this</em> is the newly constructed object. 
        `var bar = new foo();`
    </li>
    <li>
        Always 'use strict' mode. Polluting the global namespace is a bad idea. 'use strict' prevents <em>this</em> from referring
        to the global context and throws an error.
    </li>
</ol>

Here's a common example of how _this_ can be confused:

```js
function foo() {
  console.log(this.a)
}

function doFoo(fn) {
  fn()
}

var obj = {
  a: 2,
  foo: foo,
}

var a = 'oops, global'
doFoo(obj.foo)

// Whats doFoo(obj.foo) return?
```

Although it looks like the console will log 2, this is not the case, it outputs "oops, global". Since doFoo() is in the global context, _this_ is refering
to the global var a, not obj.foo()'s context. Crazy huh!? It makes my head hurt too.

_This_ can be a powerful too to pass around context but these rules need to be taken into account!

As always, here the MDN documentation on [_this_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this).
