---
title: Datalog
tags: [clojure, datalog, datascript]
---

Query language written in extensible data notation (edn) used in [[Clojure]] applications.

A basic query:

    [:find ?title
     :where
     [_ :movie/title ?title]]

Datomic is based on atoms called `datoms`.

-   **datom:** 4-tuple consisting of `entity-id`, `attribute`, `value`, `transaction-id`

    [<e-id>  <attribute>      <value>          <tx-id>]
    ;; ...
    [ 167    :person/name     "James Cameron"    102  ]
    [ 234    :movie/title     "Die Hard"         102  ]
    [ 234    :movie/year      1987               102  ]
    [ 235    :movie/title     "Terminator"       102  ] ;; shares the same enitity id as :movie/director
    [ 235    :movie/director  167                102  ]

Querying with edn is like pattern matching or logical programming:

    ;; Find all entity ids where the :person/name is "Ridley Scott"
    [:find ?e
     :where
     [?e :person/name "Ridley Scott"]]

-   **data pattern:** a datom with some parts replaced with pattern variables.

`_` can be used as a wild card for parts of the data you wish to ignore.

    ;; find the entity ids for the movie with the year of 1987
    [:find ?e
     :where
     [?e :movie/year 1987]]
    
    ;; find the entity id and title for all movies
    [:find ?e ?title
     :where
     [?e :movie/title ?title]]
    
    ;; find the name for all the people in the database:
    [:find ?name
     :where
     [?p :person/name ?name]]

You can have many different patterns in a where clause.

    ;; find all movie titles in 1987
    [:find ?title
     :where
     [?e :movie/title ?title]
     [?e :movie/year 1987]]

the `?e` must refer to the same thing in each where clause.

You can share variables across patterns:

    ;; Find the name of the people a part of Lethal Weapon
    [:find ?name
     :where
     [?m :movie/title "Lethal Weapon"]
     [?m :movie/cast ?p]
     [?p :person/name ?name]]
    
    ;; find all the movie titles where the year is 1985
    [:find ?title
     :where
     [?m :movie/title ?title]
     [?m :movie/year 1985]]
    
    ;; find what year "Alien" was released
    [:find ?year
     :where
     [?m :movie/title "Alien"]
     [?m :movie/year ?year]]
    
    ;; find the name of the director of "RoboCop"
    [:find ?name
     :where
     [?m :movie/title "RoboCop"]
     [?m :movie/director ?p]
     [?p :person/name ?name]]
    
    ;; find the people who have directed "Arnold Schwarsenegger"
    [:find ?name
     :where
     [?p :person/name "Arnold Schwarzenegger"]
     [?m :movie/cast ?p]
     [?m :movie/director ?d]
     [?d :person/name ?name]]

You can paramiterize a query with `:in`.

    [:find ?title
     :where
     [?p :person/name "Sylvester Stallone"]
     [?m :movie/cast ?p]
     [?m :movie/title ?title]]
    ;; becomes
    [:find ?title
     :in $ ?name
     :where
     [?p :person/name ?name]
     [?m :movie/cast ?p]
     [?m :movie/title ?title]]
    ;; where name is the param

`$` is the database. This is implicitly passed if no other parameter is declared.

There are four different kinds of inputs to a query: `scalars`, `tuples`, `collections` and `relations`.

A `query` is a 5 tuple:

    [<database> <entity-id> <attribute> <value> <transaction-id>]

The database is implicit in the where query clause:

    ;; functionally equivilent to the previous paramiterized query
    [:find ?title
     :in $ ?name
     :where
     [$ ?p :person/name ?name]
     [$ ?m :movie/cast ?p]
     [$ ?m :movie/title ?title]]

    ;; tuple input
    ;; find the movie title where a director and actor were part of the same movie
    [:find ?title
     :in $ [?director ?actor]
     :where
     [?d :person/name ?director]
     [?a :person/name ?actor]
     [?m :movie/director ?d]
     [?m :movie/cast ?a]
     [?m :movie/title ?title]]

    ;; pass a collection
    [:find ?title
     :in $ [?director ...]
     :where
     [?p :person/name ?director]
     [?m :movie/director ?p]
     [?m :movie/title ?title]]

You can look up what attributes your database contains:

    [:find ?attr
     :where
     [?p :person/name]
     [?p ?a]
     [?a :db/ident ?attr]]

We know that `:person/name` is an attribute on the `:person` identity, so we can query what other attributes are on that person as well.

    ;; What attributes are associated with a given movie?
    [:find ?attr
     :in $ ?title
     :where
     [?m :movie/title ?title]
     [?m ?a]
     [?a :db/ident ?attr]]
    
    ;; Find the names of all people associated with a particular movie (i.e. both the actors and the directors)
    [:find ?name
     :in $ ?title [?attr ...]
     :where
     [?m :movie/title ?title]
     [?m ?attr ?p]
     [?p :person/name ?name]]

You can pass predicates to the where clause:

    [:find ?name
     :where
     [?p :person/name ?name]
     [(.startsWith ?name "M")]]

You can use any clojure function you want, it just needs to return a truthy value for the datoms you want. You have to use your fully quallified function names in these predicate functions.

    ;; find the movie title for every movie with the release year greater than ?y
    [:find ?title
     :in $ ?y
     :where
     [?m :movie/year ?year]
     [?m :movie/title ?title]
     [(<= ?year ?y)]]

