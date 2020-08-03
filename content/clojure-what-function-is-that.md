---
title: What Clojure function is that?
tags: [clojure, programming language]
---

[[Clojure]] give you the `doc` and `source` methods to look up functions. It is a really great way to explore APIs. Especially when you are learning Clojure in the REPL.

I wanted to know what `comp` did so I ran, heres what the doc string says:

```clojure
(doc comp)
-------------------------
clojure.core/comp
([] [f] [f g] [f g & fs])
  Takes a set of functions and returns a fn that is the composition
  of those fns.  The returned fn takes a variable number of args,
  applies the rightmost of fns to the args, the next
  fn (right-to-left) to the result, etc.
nil
```

Next I was interested in how it was implemented. Surprisingly, you'll see anonymous parameter matching:

```clojure
user=> (source comp)
(defn comp
  "Takes a set of functions and returns a fn that is the composition
  of those fns.  The returned fn takes a variable number of args,
  applies the rightmost of fns to the args, the next
  fn (right-to-left) to the result, etc."
  {:added "1.0"
   :static true}
  ([] identity)
  ([f] f)
  ([f g]
     (fn
       ([] (f (g)))
       ([x] (f (g x)))
       ([x y] (f (g x y)))
       ([x y z] (f (g x y z)))
       ([x y z & args] (f (apply g x y z args)))))
  ([f g & fs]
     (reduce1 comp (list* f g fs))))
nil
```

Most of Clojure is made up of smaller Clojure function. This is such a cool way to learn a language.
