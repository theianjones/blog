---
title: 4Clojure
tags: [clojure, programming language]
---


# Table of Contents

1.  [Problem 14](/4clojure#org5a45a7a)
2.  [Problem 27 Palindrom Detector](/4clojure#orgeb074c0)
3.  [Problem 39 Interleave](/4clojure#org64eb0d1)

[[Clojure]] problems. ([source](http://www.4clojure.com/problems)) 


<a id="org5a45a7a"></a>

## Problem 14

4 different ways to create a function:

    (fn add-five [x] (+ x 5))
    (fn [x] (+ x 5))
    #(+ % 5)
    (partial + 5)
    
    (defn f [s] (clojure.string/join (re-seq #"[A-Z]+" s)))
    
    ["wow"]
    
    (f "Wow This Extracts The Capitals")


<a id="orgeb074c0"></a>

## Problem 27 Palindrom Detector

    (fn [s] (loop [x s]
              (if (= (first x) (first (reverse x)))
                ()
                false
                )
              ))


<a id="org64eb0d1"></a>

## Problem 39 Interleave

Heres the input: `[1 2 3] [:a :b :c]`

This is a map, When you pass two sequences to map, it will pass [1, :a] together, [2, :b] together etc. Basically it zips the columns together.

    (map (fn [x y] (list [x y]) ) [1 2 3] [:a :b :c])

Now we need to put all of these together and flatten the list.

    (flatten(map (fn [x y] (list [x y]) ) [1 2 3] [:a :b]))
    
    (defn my-zip [a b]
      (flatten(map (fn [x y] (list [x y]) ) a b)))
    
    (my-zip [1 2 3] [:a :b :c])

Now we need to get this case to work:

    (def a [1 2])
    (def b [3 4 5 6])
    
    (my-zip a b)

Now for this case:

    (def a [1 2 3 4])
    (def b [5])
    
    (my-zip a b)

