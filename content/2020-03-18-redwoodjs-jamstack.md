---
slug: rw
date: 2020-03-18
title: 'RedwoodJS: a full-stack framework for JAMstack'
description: ''
tags: ['javascript', 'jamstack', 'redwoodjs']
keywords: []
published: true
author: 'Ian Jones'
banner: './2020-03-18-redwoodjs-jamstack/banner.jpg'
bannerCredit: 'Photo by [Vera Gorbunova](https://unsplash.com/photos/kEBAWaFk7qE)'
type: post
---

## Generate a Redwood Project

[Watch "Generate a Redwood Project" on egghead.io.](https://egghead.io/lessons/redwoodjs-generate-a-redwood-project?pl=introduction-to-redwoodjs-full-stack-jamstack-framework-2b10&af=ay44db)

First, you need to make sure your Node version is > 12. We're going to run `yarn create redwood-app ./my-redwood-project`

Redwood will generate a project for us with this file structure.

```
├── LICENSE
├── README.md
├── api
│   ├── jsconfig.json
│   ├── package.json
│   ├── prisma
│   │   ├── schema.prisma
│   │   └── seeds.js
│   ├── src
│   │   ├── functions
│   │   │   └── graphql.js
│   │   ├── graphql
│   │   └── services
│   └── tsconfig.json
├── babel.config.js
├── netlify.toml
├── package.json
├── prettier.config.js
├── redwood.toml
├── web
│   ├── jsconfig.json
│   ├── package.json
│   ├── public
│   │   ├── README.md
│   │   ├── favicon.png
│   │   └── robots.txt
│   └── src
│       ├── Routes.js
│       ├── components
│       ├── index.css
│       ├── index.html
│       ├── index.js
│       ├── layouts
│       └── pages
│           ├── FatalErrorPage
│           │   └── FatalErrorPage.js
│           └── NotFoundPage
│               └── NotFoundPage.js
└── yarn.lock
```

Redwood gives you an `api/` folder where your `prisma` `GraphQL` api will live. `web/` is where your web client is generated. The Redwood team named it this way because they plan to support CLI's and other native platforms in a single app.

To run our app, you can write `yarn redwood dev`. RedwoodJS will start a server on `http://localhost:8910`.
