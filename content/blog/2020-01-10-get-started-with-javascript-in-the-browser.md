---
slug: get-started-js
date: 2020-02-10
title: 'Get Started with JavaScript in the Browser'
description: 'A gentle introduction to the DOM and JavaScript in the browser'
categories: []
keywords: ['DOM', 'JavaScript']
published: true
author: 'Ian Jones'
---

## What is the DOM?

DOM stands for Document Object Model. It's the interface that JavaScript uses to interact with the current HTML page. The DOM is a tree 🌲This means there is a root node that everything is nested under. In this example, you can see that we have a single paragraph tag with `Peanut Butter Falcon` in this inner text.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>WTF is the DOM?</title>
  </head>
  <body>
    <p>Peanut Butter Falcon</p>
  </body>
</html>
```

You can access this element with `document.body.firstElementChild`. JavaScript can change the text, appearance, and just about anything you would want to do to this page.

You can see this by adding a script tag to our html.

```html
<script>
  document.body.firstElementChild.innerText = 'Knives Out'
</script>
```

When you save and reload the page in the browser, you'll see that our JavaScript has actually changes the text value in our HTML.

## Select an Element with document.querySelector

You may not always want to select the first child of an element. `document.querySelector` will match elements based on a pattern you give it. Say we have a page that looks like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Select an Element with document.querySelector</title>
  </head>
  <body>
    <ul>
      <li>Peanut Butter Falcon</li>
      <li>Knives Out</li>
    </ul>
  </body>
</html>
```

Instead of accessing the first `li` element with `firstElementChild` you can use `document.querySelector('li')`.

If you guessed `<li>Peanut Butter Falcon</li>` you were right. Don't feel bad if you got it wrong though, you weren't supposed to know the answer!

How do we get the element with the inner text of 'Knives out' with `document.querySelector` though?

Right now we can't. We need to assign id's to the elements like this:

```html
<ul>
  <li id="movie-1">Peanut Butter Falcon</li>
  <li id="movie-2">Knives Out</li>
</ul>
```

Now we can call `document.querySelector('#movie-2')` to get our `<li id="movie-2">Knives Out</li>` element. The `#` is how we tell `querySelector` we are looking for an id on an element.

Note that this id should be unique in this DOM tree. You never want to give two elements the same id. This will cause some frustrating bugs!

## select an element with document.getElementById

Getting an element by id is so common that the `document` object has a helper function for us to use.

Given this html:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Select an Element with document.querySelector</title>
  </head>
  <body>
    <ul>
      <li id="movie-1">Peanut Butter Falcon</li>
      <li id="movie-2">Knives Out</li>
    </ul>
  </body>
</html>
```

We can grab our `<li id="movie-2">Knives Out</li>` by calling `document.getElementById('movie-2')`.
