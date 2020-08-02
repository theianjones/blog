---
title: Clojure From the Ground Up
tags: [clojure, programming language]
---

### Table of Contents

1.  [Basic Types](/clojure-from-the-ground-up/#org2c24b52)
2.  [Functions](/clojure-from-the-ground-up/#org2486c7b)

Adventures in learning [[Clojure]](source)

<a id="org2c24b52"></a>

## Basic Types

Extract a substing with regex.

    (rest (re-matches #"(.+):(.+)" "mouse:treat"))

Symbols are used to refer to things. Their values looked up and replaced. Symbols have short names and `fully qualified` names.

    (= str clojure.core/str) ;; => true

`:keywords` are like symbols in ruby. They are used as labels and they represent their own value. Nothing is looked up.

Vectors are stored as trees. So even in a large vector, getting the `nth` value is only a couple hops.

Because vectors are intended for looking up elements by index, we can also use them directly as verbs:

    ([:a :b :c] 1) ;; :b

<a id="org2486c7b"></a>

## Functions

The let expression first takes a vector of bindings: alternating symbols and values that those symbols are bound to, within the remainder of the expression.

Let bindings apply only within the let expression itself.

You can bind existing sybols with let

    (let [+ -] (+ 2 3)) ;; -1
    (+ 2 3) ;; 5

Let bindings are evaluated in order when multiple are given.

`(inc i)` is like `(let [x 1] (+ x 1))`

We can think about `inc` as a let without values being provided. `(let [x] [+ x 1])`&#x2026; This is what a function is.

- **function:** an expression with unbound symbols.

Functions represent unrealized computations

    (inc 2) ;; 3
    ((fn [x] (+ x 1)) 2) ;; 3

We use functions to compact redundant expressions.

You can handle multiple arities of functions by defining what params you expect:

    (defn half
      ([] 1/2)
      ([x] (/ x 2)))

to capture any number of args, you can use `&` which &ldquo;slurps&rdquo; up all the remaining arguments. This is like `...` in [[JavaScript]]

    (defn vargs
        [x y & more-args]
        {:x    x
         :y    y
         :more more-args})

You can leave a doc string to help users of your functions out.

    (defn launch
      "Launches a spacecraft into the given orbit by initiating a
       controlled on-axis burn. Does not automatically stage, but
       does vector thrust, if the craft supports it." ;; docstring
      [craft target-orbit]
      "OK, we don't know how to control spacecraft yet.")

Inspect metadata of a function with:

    (meta #'launch)
    ; {:arglists ([craft target-orbit]), :doc "Launches a spacecraft into the given orbit by initiating a\n   controlled on-axis burn. Does not automatically stage, but\n   does vector thrust, if the craft supports it.", :line 1, :column 1, :file "/private/var/folders/zq/t7wnjk690n9bdjvctqkrkfdm0000gn/T/form-init16026031377669751718.clj", :name launch, :ns #object[clojure.lang.Namespace 0x2c389dd7 "user"]}

[Clojure Cheatsheets](https://clojure.org/api/cheatsheet)

<a id="orgb4518ce"></a>
