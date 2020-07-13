---
slug: faunadb-notes
date: 2019-09-23
title: '📝 The Complete Guide to FaunaDB'
description: ''
tags: ['faunadb']
published: true
author: 'Ian Jones'
type: post
---

These are notes on [Chris Biscardi's FaunaDB playlist](https://egghead.io/playlists/the-complete-guide-to-faunadb-74bef44b).

### [An Introduction to FaunaDB](https://egghead.io/lessons/egghead-an-introduction-to-faunadb?pl=the-complete-guide-to-faunadb-74bef44b)

Fauna is a document store. Uses a lambda calculus query language.

Key terms:

- snap shot isolation
- strict serializable

FaunaDB implements [Calvin](https://blog.acolyer.org/2019/03/29/calvin-fast-distributed-transactions-for-partitioned-database-systems/): a transactional protocol optimized for geographic replication.

> Calvin [is] a transaction processing and replication layer designed to transform a generic, non-transactional, un-replicated data store into a fully ACID, consistently replicated distributed database system. Calvin supports horizontal scalability of the database and unconstrained ACID-compliant distributed transactions while supporting both asynchronous and Paxos-based synchronous replication, both within a single data center and across geographically separated data centers.

[Jespson report](https://jepsen.io/analyses/faunadb-2.5.4) goes over different aspects of this database.

### [Creating your first FaunaDB database](https://egghead.io/lessons/egghead-creating-your-first-faunadb-database?pl=the-complete-guide-to-faunadb-74bef44b)

Use FQL to query the document store.

### [Overview of the FaunaDB Query Language](https://egghead.io/lessons/egghead-overview-of-the-faunadb-query-language?pl=the-complete-guide-to-faunadb-74bef44b)

- everything returns a value
- no changes are committed if something goes wrong

Each of the drivers implement FQL slightly differently.

`Ref` is how you access documents or sets of documents.

`Event` is a special object that represents everything that has happened in the database.

There is a temporal aspect to fauna because it creates events.

### [Refs and Get in FaunaDB](https://egghead.io/lessons/egghead-refs-and-get-in-faunadb?pl=the-complete-guide-to-faunadb-74bef44b)

`Get` will retrieve the value of the ref. When you pass a `Ref` to `Get`, `Get` will retrieve the value.

### [FQL Page objects can be arguments to array functions](https://egghead.io/lessons/egghead-fql-page-objects-can-be-arguments-to-array-functions?pl=the-complete-guide-to-faunadb-74bef44b)

`Page` objects allow you to paginate your data. You can pass `Page` objects directly to functions like `Drop` and `Take`.

### [Using FQL Lambdas in Array Functions](https://egghead.io/lessons/egghead-using-fql-lambdas-in-array-functions?pl=the-complete-guide-to-faunadb-74bef44b)

`Lambda`s can be passed to functions like `Map` or `Filter`.

When using `Lambda`s in FQL, you all ways have to give the variable a name. This variable is a string. Inside of the `Lambda`, you reference that variable with `Var`.

### [Accessing fields through Refs with Select](https://egghead.io/lessons/egghead-accessing-fields-through-refs-with-select?pl=the-complete-guide-to-faunadb-74bef44b)

This lesson shows us how to map over an array of data and select on property off of the resulting data (the first name). We use `Select`, passing the path of the attribute we want to access, to grab the `firstName` of the user. This function is passed to `Lambda` which is used to `Map` over the paginated `all_customers` index.

### [FaunaDB + Netlify Livestream](https://www.twitch.tv/videos/484133337)

You have to use the CLI to add the FaunaDB add on.

Consistent transactions over geo-distributed graphs.

Chris looks for what issues Jepson test finds and sees if that service acknowledges the flaws and goes back and fixes them.
