---
title: Clojure From the Ground Up
tags: [clojure, programming language]
---

### Table of Contents

1. [Basic Types](/clojure-from-the-ground-up/#org2c24b52)
2. [Functions](/clojure-from-the-ground-up/#org2486c7b)
3. [Sequences](/clojure-from-the-ground-up/#org31174a7)
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

<a id="org31174a7"></a>

## Sequences

Use `cons` to build a list.

Use `map` to change every value in a list. If you pass map multiple sequences, it will fold together corresponding elements of each collection.

          (map + [1 2 3]
                  [4 5 6]
                  [7 8 9])
    ; => (12 15 18)
    ; this adds 1 + 4 + 7, 2 + 5 + 8, and 7 + 8 + 9

We can use `map-indexed` to transform elements together with their indices.

    (map (fn [index element] (str index ". " element))
                (iterate inc 0)
                ["erlang" "ruby" "haskell"])
    ; vs

    (map-indexed (fn [index element] (str index ". " element))
                        ["erlang" "ruby" "haskell"])

We use recursion to work with lists. It has two parts:

1.  Some part of the problem which has a known solution
2.  A relationship which connects one part of the problem to the next

The base case is the ground to build on. Our inductive or recurrence relation is how we brake the problem up.

`iterate` will create an infinetely long list. We use `take` to pull values out of that list.

    (defn fib
      ([n]
       (fib [1, 1] n))
      ([xs, n]
       (if (= (count xs) n)
         xs
         (fib (conj xs (+ (last xs) (nth xs (- (count xs) 2))))
              n))))
    ;; or
    (defn fib2 [n] (take n (map first (iterate (fn [[a b]] (vector b (+ a b))) [1 1]))))

    (defn fib3 [n] (->> [1 1]
                        (iterate (fn [[a b]] (vector b (+ a b))))
                        (map first)
                        (take n)))

`repeat` will construct a sequence with every element being the same.

`repeatedly` will call a function f without any relationship to the elements.

`concat` will add multiple sequences to the first sequence you pass it.

`interleave` will create one sequence where it shuffles two sequences together.

`interpose` will add an element between every element in a sequence.

`reverse` reverses a sequence. You can reverse a string but a sequence of characters will be returned.

    (reverse "wolf") ; => (\f \l \o \w)
    (apply str (reverse "wolf")) ; => "flow"

`take` can pull a subsequence out.

`drop` will drop `n` values and return the remaining sequence.

`take-last` and `drop-last` will do the same but in reverse.

`take-while` accepts a function that returns a bool and takes until its false.

`split-at` will split a sequence at a specific index.

`filter` is like javascript filter

`remove` will remove on a truthy value.

`reduce` is like javascript reduce. you can use `reduced` to indicate that you have completed your reduction early.

`reductions` will return a list of all the intermitten states that reduce calculates.

Reduce elements into a collection with `into`.

use `realized?` to check if an infinite series has been realized.
