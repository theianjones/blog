---
title: Re-frame
tags: [clojure, react]
---


### Table of Contents

1.  [Notes on Docs](/re-frame#orgd12e346)
    1.  [Homoiconic](/re-frame#org43c3bb1)
    2.  [The data loop](/re-frame#orga1afac2)
    3.  [Six Dominoes](/re-frame#org15a5523)
        1.  [Event Dispatch](/re-frame#org2363518)
        2.  [Event Handling](/re-frame#orgdfa8bd1)
        3.  [Effect Handling](/re-frame#orgc9d95e8)
        4.  [Application state](/re-frame#org4edbc8c)
        5.  [Query](/re-frame#org0ed5bbf):ATTACH:
        6.  [View](/re-frame#org994c452)
        7.  [DOM](/re-frame#orgedaa013)
    4.  [Application State](/re-frame#org34f1394)
    5.  [Code](/re-frame#orgadfb00b)
        1.  [Event Dispatch](/re-frame#org72068f1)
        2.  [Event Handling](/re-frame#org5ce009e)
        3.  [Effect Handling](/re-frame#org7f2e203)
        4.  [Query](/re-frame#orga506c8c)
        5.  [View](/re-frame#org13dd80a)
        6.  [DOM](/re-frame#orgd7b6002)
2.  [Building my first Re-frame project](#orgcb6d3bd)

[Clojure](clojure.md) framework that leverages [React](react.md).


<a id="orgd12e346"></a>

# Notes on Docs


<a id="org43c3bb1"></a>

## Homoiconic

You program **in data** when you are programming in lisp.

*data is the ultimate in late binding*.

Re-frame is a data orienter design.

Everything is data:

-   events
-   effects
-   DOM

Interceptors (data) are preferred to middleware (higher order functions).


<a id="orga1afac2"></a>

## The data loop

Re-frame implements a perpetual loop.

You provide transforming functions to reframe on this loop.

tag line for re-frame: *derived values, flowing*

Data flows around this loop like water flows around the rain cycle.


<a id="org15a5523"></a>

## Six Dominoes

There are 6 stages in the re-frame loop:

1.  Event dispatch
2.  Event handling
3.  Effect handling
4.  Query
5.  View
6.  DOM


<a id="org2363518"></a>

### Event Dispatch

-   **event:** sent when something happens

User clicks a button, websocket receives a message

Nothing occures without this first event.

**reframe- is event driven**


<a id="orgdfa8bd1"></a>

### Event Handling

We must know what to do when a certain event comes in. Event handler functions will take the event and affect the world some how. This is also called as computing side effects.

Most of the time, the event will cause side effects to &ldquo;application state&rdquo;.


<a id="orgc9d95e8"></a>

### Effect Handling

The side effects calculated in the previous step are actioned.

Data -> Action -> Mutate the world


<a id="org4edbc8c"></a>

### Application state

re-frames state is held in a central in memory database.

any changes in state will trigger dominoes 4-5-6.

`v = f(s)`. The view is a function of application state. This is where [React](react.md) comes in.


<a id="org0ed5bbf"></a>

### Query     :ATTACH:

![img](https://res.cloudinary.com/dzsq0psas/image/upload/v1597759425/blog/Image_2020-08-18_at_10.03.41_AM_d7aess.png)

This is where data is extracted from app state and given to the view functions in domino 5. This produces a **signal graph** thats passed to the view.


<a id="org994c452"></a>

### View

aka ViewFunctions - Reagent components.

uses the [Hiccup](hiccup.md) format to represent the DOM.

The ViewFunctions `subscribe` to the signal graph from domino 4&#x2026;reactively delivering state.


<a id="orgedaa013"></a>

### DOM

This is handled by Reagent/React for us.


<a id="org34f1394"></a>

## Application State

This is called the `app-db`.

> Well-formed Data at rest is as close to perfection in programming as it gets. All the crap that had to happen to put it there however&#x2026;
> 
> — Fogus (@fogus) April 11, 2014

`app-db` is `(reagent/atom {})`.

-   **ratom:** A [[Reagent]] atom

Ratoms contained structured data. The db is the value (clojure map) stored inside the Ratom.

the `app-db` is created for you by re-frame

You can use any in memory database you&rsquo;d like. If you want to use a [Datascript](datascript.md) database, you can use [Posh](posh.md).

When you store your data in one place, theres a single source of truth, rather than having a bunch of stateful components.

You can give your db a schema that validates all the data coming in.

Undo/redo is almost trivial to implement because the we can store a bunch of snapshots of the data. The snapshots use structural sharing so that memory is concerved.

`app-db` is primarily used as a local caching point for remote databases.

This feels a lot like Redux in flavor. It will be interesting to see how a different language could change my opinion on this pattern.


<a id="orgadfb00b"></a>

## Code


<a id="org72068f1"></a>

### Event Dispatch

You use `re-frame.core/dispatch` to dispatch an event. You pass a vector to the dispatch function `[:delete-item item-id]`.


<a id="org5ce009e"></a>

### Event Handling

You register event handlers using `re-frame.core/reg-event-fx`.

    (re-frame.core/reg-event-fx
     :delete-item
     h) ;; the actual event handler function.

`h` will take 2 arguments:

1.  a `coeffects` map, the data describing the current state of the world.
2.  the `event`, which contains the event name and other info in a vector.

`h` could be implemented like this:

    (defn h                          ;; maybe choose a better name like `delete-item`
     [coeffects event]               ;; `coeffects` holds the current state of the world
     (let [item-id  (second event)   ;; extract id from event vector
           db       (:db coeffects)  ;; extract the current application state
           new-db   (dissoc-in db [:items item-id])]   ;; new app state
       {:db new-db}))                ;; a map of the necessary effects

You take the coeffects, and event and return a new coeffects, updated with your changes.

1.  obtain the state in the coeffects
2.  compute modified application state
3.  return modified application state in an effects map

Destructure the args for `h`:

    (defn h
      [{:keys [db]} [_ item-id]]    ;; <--- new: obtain db and item-id directly
      {:db  (dissoc-in db [:items item-id])})    ;;


<a id="org7f2e203"></a>

### Effect Handling

Register effects with `re-frame.core/reg-fx`.

The event handler from above returned a map with only 1 key: `:db`. so it is specifying just one effect. If there are 2 keys returned, then you will have to register 2 effect handlers to handle those changes.

This is how you register the effect handlers for the `:db`:

    (re-frame.core/reg-fx       ;; part of the re-frame API
      :db                       ;; the effects key
      (fn [val]                 ;; the handler function for the effect
        (reset! app-db val)))   ;; put the new value into the ratom app-db

This is mutating `app-db`. This is what effect handlers do. re-frame does not supply standard effect handlers, so you have to write them yourself.


<a id="orga506c8c"></a>

### Query

updating the db in the effect handler will trigger 4, 5, and 6 dominoes.

In this case, theres not a lot of data to extract. It is just plucking `:items` out of the db.

We use `re-frame.core/reg-sub` to register the query function.

The query function will take the database and the query vector as arguments:

    (defn query-fn
      [db v]
      (:items db))
    
    (re-frame.core/reg-sub
     :query-items
     query-fn)


<a id="org13dd80a"></a>

### View

This is where we subscribe to these query functions:

    (defn items-view
      []
      (let [items (subscribe [:query-items])]
        [:div (map item-render @items)]))

This is the [Hiccup](hiccup.md) format. `subscrib` queries can be parameterized:

`(subscribe [:items "blue"])` You would have to write a more sophisticated query function to allow for querying by color.


<a id="orgd7b6002"></a>

### DOM

DOM is generated from hiccup into Reagent/React.


<a id="orgcb6d3bd"></a>

# Building my first Re-frame project

    lein new re-frame <app-name> +cider

We use `lein deps` to install dependencies and `lein watch` to start the app.

Its not apprent how to create an on-click handler for hiccup.

It was some sort of formatting issue.


