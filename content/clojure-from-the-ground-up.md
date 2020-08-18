---
title: Clojure From the Ground Up
tags: [clojure, programming language]
---

### Table of Contents

1.  [Basic Types](/clojure-from-the-ground-up#org1ff7ef1)
2.  [Functions](/clojure-from-the-ground-up#orge910c2c)
3.  [Sequences](/clojure-from-the-ground-up#org74841b9)
4.  [Macros](/clojure-from-the-ground-up#orgea60d84)
5.  [State](/clojure-from-the-ground-up#org04466ec)


Adventures in learning [[Clojure]] ([source](https://aphyr.com/tags/Clojure-from-the-ground-up))

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


<a id="orgea60d84"></a>

## Macros

Evaluation proceeds from left to right, every element of the list must be evaluated.

You can evaluate code before this process through macroexpansion.

-   **macro-expansion:** code itself is restructured according to some set of rules - rules which you, the programmer, can define.

    (defmacro ignore
      "Cancels the evaluation of an expression"
      [expr]
      nil)
    
    (ignore (+ 1 2))
    
    (ignore (def x 2))
    ; def /always/ gets ran except in this case because the macro expansion runs before and replaces this expression with nil

    (defmacro rev [fun & args]
      (cons fun (reverse args)))
    
    (macroexpand '(rev str "hi" (+ 1 2)))

We then can evaluate this expression:

    (eval (macroexpand '(rev str "hi" (+ 1 2))))

The metalanguage preprocessor was written in clojure itself, giving the full power of the language to restructure itself.

-   **procedural macro system:** a macro system that is written in the language that it performs evaluation on.

He mentions `f-expressions` but this sounds like an advanced topic.

Since lisp macros are running on the expressions, the data structure of code itself, it is easy to reason about the transformation of the code. C preprocessors evaluate on text, which has no inherent structure.

-   **special forms:** encoded special syntatcic forms for defining a function, calling a function, if this then that etc. It cannot be reduced into smller parts

In other languages, you cant define these forms yourself. They are defined for you. In Clojure, a lot of these forms are just macros:

    (source or)
    
    (defmacro or
      "Evaluates exprs one at a time, from left to right. If a form
      returns a logical true value, or returns that value and doesn't
      evaluate any of the other expressions, otherwise it returns the
      value of the last expression. (or) returns nil."
      {:added "1.0"}
      ([] nil)
      ([x] x)
      ([x & next]
          `(let [or# ~x]
             (if or# or# (or ~@next)))))

`` ` `` is called a *syntax-quote* Its like a regular `'`, blocking evaluation but can escaped from the quoting rule with the unquote ( ~ )

    (let [x 2] `(inc x))
    (let [x 2] `(inc ~x))

This code is short for:

    (let [x 2] (list 'clojure.core/inc x))

The ~@ unquote splice works just like ~, except it explodes a list into multiple expressions in the resulting form:

    `(foo ~[1 2 3])
    `(foo ~@[1 2 3])


<a id="org04466ec"></a>

## State

In programming, identities unify different values over time. Identity types are mutable references to immutable values.

Moving from immutable references to concurrent transactions.

We have seen `let` before. It binds immutable values. They never change.

    (let [x [1 2]]
             (prn (conj x :a))
             (prn (conj x :b)))
    
    [1 2 :a]
    [1 2 :b]
    
    (doc prn)
    ; prints objects

Functions close over their arguments, so that they can defer their evaluation.

    (do (prn "Adding") (+ 1 2))
    "Adding"
    3
    
    (def later (fn [] (prn "Adding") (+ 1 2)))
    ; #'user/later
    (later)
    "Adding"
    3

`def` doesnt evaluate the function. It creates a reference that we can evaluate later in the program. This is how concurrency works.. evaluating expressions out side of their normal order.

-   **concurrency:** evaluating expressions outside of their normal order

This is so common in clojure, their is a function for it: `delay`.

    (def later (delay (prn "Adding") (+ 1 2)))
    later
    ; #<Delay@2dd31aac: :pending>
    (deref later)
    "Adding"
    ;; => 3

Delay acts as a normal function because is macro expands into an anonymous function.

    (source delay)
    (defmacro delay
      "Takes a body of expressions and yields a Delay object that will
      invoke the body only the first time it is forced (with force or deref/@), and
      will cache the result and return it on all subsequent force
      calls. See also - realized?"
      {:added "1.0"}
      [& body]
        (list 'new 'clojure.lang.Delay (list* `^{:once true} fn* [] body)))

-   **delay:** an identity that refers to an expression which should be evaluated later

Theres a shortcut operator for (deref): the wormhole operator: `@`.

Delays are lazy. We use delays when we arent ready for something yet. They are good for expensive operations so we dont dereference the value before we need it.

-   **future:** a delay that is evaluated in parallel

    (def x (future (prn "hi") (+ 1 2)))
    (deref x)

Futures are evaluated on a new thread.

evaluation is out of order:

    (dotimes [i 5] (future (prn i)))
    1
    2
    ;; => nil4
    3
    0

Use futures to do CPU-intensive computations.

    (def box (promise))
    box
    (deref box)

-   **Promises:** reference values that we dont have yet

They will hang the process if there is no value available when you `(deref)` it.

    (deliver box :live-scorpians!)
    @box
    (deliver box :puppy)
    @box

Theres no going back once promises evaluate. They will return the first delivered value.

A promise is a concurrency primitive. We can use promises to sync a program evaluated concurrently.

    (def card (promise))
    (def dealer (future
                  (Thread/sleep 5000)
                  (deliver card [(inc (rand-int 13))
                                 (rand-nth [:clubs :spades :hearts :diamonds])])))
    @card

Where delays are lazy, and futures are parallel, promises are concurrent without specifying how the evaluation occurs.

-   **var:** transparent mutable references

    (def x :mouse)
    (def box (fn [] x))
    (box)
    (def x :cat)
    (box)

The `var` x remained unchanged but the value associated with that `var` changed.

-   **global:** A reference which is the same everywhere

-   **dynamic var:** override the value only within the scope of a particular function call
    
        (def ^:dynamic *board* :maple)

There is a convention to use `*` around dynamic vars so that it reminds programmers that they are likely to change.

    (defn cut [] (prn "sawing through" *board*))
    (cut)
    "sawing through" :maple

Note that cut closes over the var **board**, but not the value :maple. Every time the function is invoked, it looks up the current value of **board**.

Closing over a function or variable is a key concept we need to keep in mind.

    (binding [*board* :cedar] (cut))
    "sawing through" :cedar
    (cut)
    "sawing through" :maple

Binding creates a dynamic scope of a value for a name (rather than a immutable *lexical* scope which `fn` and `let` create).

The difference? Lexical scope is constrained to the literal text of the fn or let expression–but dynamic scope propagates through function calls.

So in this example, inside the `binding` expression `*board*` has the value `:cedar` but outside of that scope, it still has the value `:maple`.

What is wrong with this program?

    (def xs #{})
    (dotimes [i 10] (def xs (conj xs i)))
    xs

Its not thread safe!

    (def xs #{})
    (dotimes [i 10] (future (def xs (conj xs i))))
    xs

We need something that supports safe transformation from one state to another.

`atoms` are not transparent. When evaluated, they dont return their value.

    (def xs (atom #{}))
    xs

We must `deref` them.

    @xs

We use `reset!` to modify an atom. Like in ruby, this declares to the programmer that something is about to change.

    (reset! xs :foo)
    @xs

You can safely update an atom with `swap!`. Clojure makes the updates *linearizable*, which means:

1.  all updates to swap complete in what appears to be consecutive order.
2.  the effect of a `swap!` never takes place before calling `swap!`
3.  the effect of `swap!` is visible once it returns.

    (def x (atom 0))
    (swap! x inc)
    (swap! x inc)

Now we can return back to our parallel program from earlier:

    (def xs (atom #{}))
    (dotimes [i 10] (future (swap! xs conj i)))
    @xs

The function that you call with swap must be pure because clojure may call it twice to resolve conflicting threads.

Atoms make updating state on a single item safe but once you start updating multiple atoms at once, you will see similar errors you get with vars.

Enter Ref. It is *serializability* at a global order.

They are dereferencable.

Where you update atoms with `swap!`, you update groups of refs with `dosync`.

    (def x (ref 0))
    (def y (ref 0))
    (dosync
       (ref-set x 1)
       (ref-set y 2))
    [@x @y]

The equivalent of `swap!` is `alter`.

    (dosync
             (alter x + 2)
             (alter y inc))
    [@x @y]

When you want a performance boost and dont care what order your refs update in, you can use `compute`.

-   **commutative:** the same result from all orders. It’s a weaker, but faster kind of safety property
    
    If you want to read a value from one ref and use it to update another, use `ensure` instead of `deref` to perform *strongly consistent read*. Its guaranteed to take place in the same logical order as the dosync transaction.
    
        (dosync
         (alter x + (ensure y)))
    
    Refs give you the power to write complex transactional logic safely.

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<thead>
<tr>
<th scope="col" class="org-left">Type</th>
<th scope="col" class="org-left">Mutability</th>
<th scope="col" class="org-left">Reads</th>
<th scope="col" class="org-left">Updates</th>
<th scope="col" class="org-left">Evaluation</th>
<th scope="col" class="org-left">Scope</th>
</tr>
</thead>

<tbody>
<tr>
<td class="org-left">Symbols</td>
<td class="org-left">Immutable</td>
<td class="org-left">Transparent</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">Lexical</td>
</tr>


<tr>
<td class="org-left">Var</td>
<td class="org-left">Mutable</td>
<td class="org-left">Transparent</td>
<td class="org-left">Unrestricted</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">Global/Dynamic</td>
</tr>


<tr>
<td class="org-left">Delay</td>
<td class="org-left">Mutable</td>
<td class="org-left">Blocking</td>
<td class="org-left">Once only</td>
<td class="org-left">Lazy</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">Future</td>
<td class="org-left">Mutable</td>
<td class="org-left">Blocking</td>
<td class="org-left">Once only</td>
<td class="org-left">Parallel</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">Promise</td>
<td class="org-left">Mutable</td>
<td class="org-left">Blocking</td>
<td class="org-left">Once only</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">Atom</td>
<td class="org-left">Mutable</td>
<td class="org-left">Blocking</td>
<td class="org-left">Linearizable</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">Ref</td>
<td class="org-left">Mutable</td>
<td class="org-left">Nonblocking</td>
<td class="org-left">Serializable</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>
</tbody>
</table>



