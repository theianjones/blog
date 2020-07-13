---
slug: get-started-js
date: 2020-02-10
title: 'Get Started with JavaScript in the Browser'
description: 'A gentle introduction to the DOM and JavaScript in the browser'
categories: []
tags: ['dom', 'javascript']
published: true
author: 'Ian Jones'
banner: './assets/client-side-web-apis/01.jpg'
bannerCredit: 'Photo by [Arnaud Mesureur](https://unsplash.com/photos/7EqQ1s3wIAI)'
type: post
---

## What is the DOM?

If you would prefer to watch this post, you can do so with this [community resource lesson on egghead.io](https://egghead.io/lessons/javascript-wtf-is-the-dom?pl=introduction-to-client-side-web-apis-72d0&af=ay44db).

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

If you would prefer to watch this post, you can do so with this [community resource lesson on egghead.io](https://egghead.io/lessons/javascript-select-an-html-element-with-document-queryselector?pl=introduction-to-client-side-web-apis-72d0&af=ay44db)

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

If you would prefer to watch this post, you can do so with this [community resource lesson on egghead.io](https://egghead.io/lessons/javascript-select-a-dom-element-with-document-getelementbyid?pl=introduction-to-client-side-web-apis-72d0&af=ay44db)

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

## Add a node to the HTML document

If you would prefer to watch this post, you can do so with this [community resource lesson on egghead.io](https://egghead.io/lessons/javascript-add-a-node-to-your-html-with-document-appendchild?pl=introduction-to-client-side-web-apis-72d0&af=ay44db)

Given the current state of our HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Select an Element with document.querySelector</title>
  </head>
  <body>
    <ul id="movies">
      <li id="movie-1">Peanut Butter Falcon</li>
      <li id="movie-2">Knives Out</li>
    </ul>
  </body>
</html>
```

To add a movie to this list, we will need to first get the surrounding parent ul node from the document.

`const moviesElem = document.getElementById('movies')`

Now we need to actually create the element that we want to append to this list.

```js
const uncutGems = document.createElement('li')

uncutGems.textContent = 'Uncut Gems'
```

We've created an element but it is not actually been added to our HTML. To do so we will call `moviesElem.appendChild(uncutGems)`

In the browser, you will see that our movie has been added to our list.

```html
<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8" />
    <title>Select an Element with document.querySelector</title>
  </head>
  <body>
    <ul id="movies">
      <li id="movie-1">Peanut Butter Falcon</li>
      <li id="movie-2">Knives Out</li>
    </ul>

    <script>
      const moviesElem = document.getElementById('movies')
      const uncutGems = document.createElement('li')
      uncutGems.textContent = 'Uncut Gems'
      moviesElem.appendChild(uncutGems)
    </script>
  </body>
</html>
```

We don't want to hard code adding a movie in this script though. Lets create a button that will add a list element when we click it.

```html
<body>
  <ul id="movies">
    <li id="movie-1">Peanut Butter Falcon</li>
    <li id="movie-2">Knives Out</li>
  </ul>

  <button>Add Uncut Gems</button>
</body>
```

Now we can create a function in our script tag. We'll move the code we currently have into the body of that function.

```html
<script>
  const addMovie = () => {
    const moviesElem = document.getElementById('movies')
    const uncutGems = document.createElement('li')
    uncutGems.textContent = 'Uncut Gems'
    moviesElem.appendChild(uncutGems)
  }
</script>
```

Now we have to tell the browser to run our function anytime a user clicks our button. We do this by adding an `onclick` attribute to our button element.

```html
<button onclick="addMovie()">Add Uncut Gems</button>
```

The other way to do this is to add an onclick attribute through our javascript. We would have to grab our button and and assign our function to `onclick` directly (If you added the `onclick` attribute to you button in the html, you will want to remove it before trying this way).

```html
<body>
  <ul id="movies">
    <li id="movie-1">Peanut Butter Falcon</li>
    <li id="movie-2">Knives Out</li>
  </ul>

  <button>Add Uncut Gems</button>
  <script>
    const addMovieButton = document.querySelector('button')
    addMovieButton.onclick = () => {
      const moviesElem = document.getElementById('movies')
      const uncutGems = document.createElement('li')
      uncutGems.textContent = 'Uncut Gems'
      moviesElem.appendChild(uncutGems)
    }
  </script>
</body>
```

## Remove a node from the HTML document

What if we wanted to remove an element from the document? What do you think needs to happen first?
We always need to find the element we are operating on first. Lets remove "Knives out" from our list.

`const knivesOut = document.getElementById('movie-2')`

Now that we have a reference to the element we want to remove, we just need to call `knivesOut.remove()`.

```html
<script>
  const knivesOut = document.getElementById('movie-2')
  knivesOut.remove()
</script>
```

Now when you reload the page, knives out won't be included in the list!
