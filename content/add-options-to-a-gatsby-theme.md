---
slug: gatsby-theme-options
date: 2019-09-26
title: 'Add Options To A Gatsby Theme'
description: 'Chris Biscardi posted 3 different blog posts going over how to add options to a gatsby theme. '
categories: []
tags: ['gatsby', 'gatsby themes']
published: true
author: 'Ian Jones'
type: post
---

[Chris Biscardi](https://www.christopherbiscardi.com) posted 3 different blog posts going over how to add options to a gatsby theme.

## [Applying theme options using React Context](https://www.christopherbiscardi.com/post/applying-theme-options-using-react-context/)

This option seems the most straight forward if you don't know Gatsby but you are familiar with React Context.

Chris goes over how you can use `gatsby-browser.js` and `gatsby-ssr.js` to get the context to a consumer of your theme and to the theme itself.

One question I had was how do you set the value of the context as an option to the theme? It seems like this can create a default but then you make the consumer of your theme have to set the context value in react. My desired api is to pass an option to the theme in `gatsby-config.js`.

## [Applying theme options using webpack's defineplugin](https://www.christopherbiscardi.com/post/applying-theme-options-using-webpacks-defineplugin/)

Option number 2 is to use a webpack feature 🤯

You can use webpacks `DefinePlugin` to create a feature flag. This flag is then available in the rest of your app.

I'm less of a fan of this approach purely because setting the global webpack flags feels a little bit like magic and might be hard for newer people on the project or yourself when you comeback to it in a couple months.

## [Applying theme options using custom configuration nodes](https://www.christopherbiscardi.com/post/applying-theme-options-using-custom-configuration-nodes/)

This is the option that I went with. I like it because it adds your config in the GraphQL layer of gatsby.

This approach keeps all your configuration options in one spot. It also documents all the options in `graphql` if you want to explore them there and you dont have to know the magic global variable name.
