---
layout: post
title: Getting Started With react-rails
date: 2016-07-03 13:12:21
published: true
keywords: []
author: Ian Jones
description: ''
tags: [rails, react]
slug: '/getting-started-with-react-rails'
type: post
---

As Rails developers, we know that Rails will always _just works_. :sparkles:The Rails Way:sparkles: has been
well established by @DHH and cohorts to make a wonderful framework. There is no question
that you can get things up and running fast with Rails. Across the pond there has
been a bit of turmoil or churn in JavaScript frameworks. It looks like the dust has
settled on a component based system like React. This post is going to go over how to get
started with [React](https://facebook.github.io/react/) in Rails with the
[react-rails gem](https://github.com/reactjs/react-rails).

I am learning Rails through the [Firehose Project](https://www.thefirehoseproject.com).
It is an awesome way to go from 0 to productive in Rails/Web development in general. I just
completed the first project: building a simple Rails app that displays quotes called [Splurty](https://splurty-ian-jones.herokuapp.com/)
(the code for it is [here](https://github.com/ijones16/firehose-splurty)). I thought it would
be fun to change out the ERB templates with React components!

The first thing that we need to do is install the react-rails gem.

```ruby
# /Gemfile
gem 'react-rails'
```

Of course we will need to make sure to `bundle install` after this. Following the `react-rails`
documentation, we need to `rails g react:install`. This should create the components directory
and add the correct requirements to `application.js` but make sure all of this has been done:

We should have a `components.js` manifest file, and a `app/assets/javascript/components/` directory.
This is where all of our React components will live. Next, In `application.js` should have the following:

```js
//= require react
//= require react_ujs
//= require components
```

Lets test this out!

First lets add a simple React component.

```js
// /app/assets/javascripts/components/_hello_world.js.jsx

var HelloWorld = React.createClass({
  render: function() {
    return(
      <div>Hello Rails!</div>
    );
  }
});
```

Then, our index file:

```html
<h2>
  <span>Splurty / No. <%= @quote.id %></span>
  Here's the <u>best advice about the universe</u> you can get!
</h2>

<h1><%= @quote.saying %></h1>
<h2 class="pull-right">- <%= @quote.author %></h2>

<%= react_component('HelloWorld') %>

<br class="clear" />
<br />
<br />
<br />
```

That was easy! One thing that I had problems with was getting react-rails to recognize
my component. If you want to use JSX, It is important to have the .jsx extension on the
file name.

Lets replace the whole index page with a React component! We can see that we use a the quote
object in rails to render information that is held in the database. We will want to pass this
object down into the component for it to use it as props.

This component will be called `QuotesIndex`:

```js
// /app/assets/javascripts/components/_quotes_index.js.jsx

var QuotesIndex = React.createClass({
  render: function(){
    return(
      <div>
        <h2>
          <span>Splurty / No. {this.props.quote.id}</span>
          Here's the <u>best advice about the universe</u> you can get!
        </h2>

        <h1>{this.props.quote.saying}</h1>
        <h2> {this.props.author}</h2>

        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
});
```

Now, add the React component to the Rails view:

```html
<%= react_component('QuotesIndex') %>
```

If you reload the page, You will notice that the component is broken. We did not pass
the quotes object to React.

```html
<%= react_component('QuotesIndex', {quote: @ quote}) %>
```

We should add `propTypes` to our React component to let the ourselves know, in the future, that
this component requires a quote object as props to render correctly.

```js
// /app/assets/javascripts/components/_quotes_index.js.jsx

var QuotesIndex = React.createClass({
  propTypes: {
    quote: React.PropTypes.object
  },

  render: function(){
    return(
      <div>
        <h2>
          <span>Splurty / No. {this.props.quote.id}</span>
          Here's the <u>best advice about the universe</u> you can get!
        </h2>

        <h1>{this.props.quote.saying}</h1>
        <h2> {this.props.author}</h2>

        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
});
```

There is one more thing that needs to be added to this component: *Styles*! Since
we already have styles defined, we can just add them to our components with reacts
`className`.

```js
// /app/assets/javascripts/components/_quotes_index.js.jsx

var QuotesIndex = React.createClass({
  propTypes: {
    quote: React.PropTypes.object
  },

  render: function(){
    return(
      <div>
        <h2>
          <span>Splurty / No. {this.props.quote.id}</span>
          Here's the <u>best advice about the universe</u> you can get!
        </h2>

        <h1>{this.props.quote.saying}</h1>
        <h2 className='pull-right'> {this.props.author}</h2>

        <br className='clear'/>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
});
```

Awesome. We have successfully replaced our ERB template with a React component. Lets take a stab
at replacing the quotes `about.html.erb` page. This one is inherently more complex because it is
using the asset pipeline.

The key thing with this component is in the name of the file itself. Lets add `_quotes_about.js.jsx.erb`
to our `/components` directory.

```js
// /assets/javascripts/components/_quotes_about.js.jsx.erb

var QuotesAbout = React.createClass({
  propTypes: {
    imgUrl: React.PropTypes.string
  },
  render: function(){
    return(
      <div>
        <div className="col-xs-10 col-xs-offset-1 about">
          <h1>About Splurty</h1>

          <p>
            Splurty was built by <a target="_blank" href="https://github.com/ijones16">Ian</a>
          </p>
          <br />
          <p>
            I build stuff!
          </p>
          <p>
            If you want to learn more, go to my blog <a target="_blank" href="http://iantjones.com">iantjones.com</a>
          </p>
          <br />
          <br />
          <div className="col-xs-12 col-sm-4">
            <img className="img-responsive" src="<%= asset_url('ian.jpeg') %>" alt="ian.png"/>

          </div>
          <div className="col-xs-12 col-sm-5 col-sm-offset-1">
            <h2>Ian Jones</h2>
            <br />
            <p>
              Ian Jones is a web developer. He is planning on traveling the world this year.
            </p>
          </div>

        </div>

        <br className="clear" />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
});

```

The reason we needed to add the .erb extension to this file is that we need to access
Rails' asset pipeline. We can do this by inserting `src="<%= asset_url('ian.jpeg') %>"`
for the src url of our image tag. The extensions on the file tell Rails what preprocessor
to run on the file.

There are other ways to solve this problem. You can add a build to your JavaScript. I found
this solution in the [Github issue](https://github.com/reactjs/react-rails/issues/211) on react-rails page.


That is it! Getting started with React in a Rails enviroment is super easy. Future goals would
be to look into server rendered React so the browser does not need to process all of the React.
Another goal would be to convert all of the Railsiness to Rails API so that React would just consume
the API. This would make React more interchangeable. In future posts, I will convert the header, footer,
and form into React!

As always, any feedback or comments are welcome.

Cheers!
