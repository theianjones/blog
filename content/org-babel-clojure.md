---
title: Org Babel Clojure
aliases: [ob-clojure]
tags: [emacs, org-mode, clojure]
---

You can run a [[Clojure]] REPL inside of [[Org Mode]] with Cider. You will need to add this code block to your `config.el`:

```lisp
    (require 'ob-clojure)
    (setq org-babel-clojure-backend 'cider)
    (require 'cider)
```

I am using [[Doom Emacs]], so I have the `clojure` flag uncommented in `init.el`. This flag loads Cider for you.

Now when you are in a `.org` file, you can create a block with arbitrary clojure code. You can run `M-x cider-jack-in` or `C-c C-c` inside the code block and choose `cider-jack-in` to create a cider repl. It will compile and run your clojure code.

```
#+BEGIN_SRC clojure

(defn duplicate-entries [s] (apply concat (map (fn [e] [e e]) s)))
(duplicate-entries [1 2 3])
#+END_SRC

#+RESULTS:
| #'user/duplicate-entries |
| (1 1 2 2 3 3)            |
```

You can even run code from earlier blocks inside new blocks.

```
#+BEGIN_SRC clojure
  (duplicate-entries [[1] [2] [1 2 3]])
#+END_SRC

#+RESULTS:
| 1 |   |   |
| 1 |   |   |
| 2 |   |   |
| 2 |   |   |
| 1 | 2 | 3 |
| 1 | 2 | 3 |
```

## References

- [Org Babel Clojure Documentation](https://orgmode.org/worg/org-contrib/babel/languages/ob-doc-clojure.html)
