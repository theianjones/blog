---
date: 2020-11-06
title: Pathom 🕸
tags: [clojure, clojurescript]
---
I've been learning Clojure/ClojureScript lately and this library is super cool:

https://twitter.com/_jonesian/status/1324827802785456131?s=20

It is fairly similar to GraphQL with some notable differences... GraphQL makes you define a static schema on which you query the types you defined.

Pathom you define resolvers which are functions that define their input and output. Pathom will take a query and try to find a path through your resolvers to the data you asked for. Its 🤯