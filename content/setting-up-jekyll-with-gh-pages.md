---
layout: post
title: 'Setting Up Jekyll With Github Pages'
date: 2015-08-14 13:12:21
published: true
tags: [jekyll, ruby]
author: Ian Jones
description: ''
categories: jekyll
slug: '/setting-up-jekyll-with-gh-pages'
type: post
---

![alt text](../../../../images/blog/host-jekyll-blog-github.jpg 'Jekyll')

I thought that setting up my own custom blog was going to be hard. Turn out I couldn't
have been more wrong! [Jekyll](http://jekyllrb.com/) is a static page Ruby framework.
The cool thing about this framework is that you don't need to know any Ruby to get
it up and running. To truly customize it you might have to dive in and learn some Ruby.

Jekyll lets you start blogging in 4 simple commands:

```bash
gem install jekyll
jekyll new myAwesomeNewBlog
cd myAwesomeNewBlog
jekyll serve
```

These commands get your local instance of Jekyll running. But the real question is:
how do I get this awesome new blog hosted and available to see on the interwebs? This
is where [Github Pages](https://pages.github.com/) comes in.

Github Pages hosts static files for you for free. Given that you have a Github account,
they give you a default domain of {GITHUB ACCOUNT}.github.io. To get your Jekyll blog up
on Github Pages, to set up a Gemfile like this (code provided from [github-pages docs](https://help.github.com/articles/using-jekyll-with-pages/)):

```bash
source 'https://rubygems.org'
gem 'github-pages'
```

Next you need to run:

```bash
bundle install
```

Next comes creating the github repository that your code will live in. Creating a repository
with the name of your github account name tells github that you want to use Github Pages.
To get your awesome new blog on Github Pages, all you need to do is push your code up
to the master branch.

Now that your blog is all set up on GH-pages, you can play around with it. There are a
lot of gems that let you easily customize your blog. An example gem that I have installed are
[jemoji](https://github.com/jekyll/jemoji), which allows you to put emojis on your page
:+1: :gem:.

Almost anything you want to customize can be done in your \_config.yml file.

Jekyll is super easy to set up and use! For more support I would look at [Jekyll's docs](http://jekyllrb.com/docs/home/)
and [Github Page's set-up docs](https://help.github.com/articles/using-jekyll-with-pages/).

There are other frameworks that also work well. [Octopress](http://octopress.org/) is built on top of Jekyll and
abstracts some tasks away from you so you can do things in the command line. [Middleman](https://middlemanapp.com/) is
another popular static content framework that is a little more flexible than Jekyll.

In the end, they all allow you to get your thoughts out there in an extremely hackable way!
