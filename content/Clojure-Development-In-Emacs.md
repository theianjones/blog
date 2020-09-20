---
title: Clojure Development In Emacs
date: 2020-09-20
tags: [emacs, clojure]
---

This is a guide for setting up [[Clojure]] development via [[Cider]] in [[Doom Emacs]].

First things first, if you havent [[Install Doom Emacs]]. 

In your `.doom.d/init.el` file, head down the the `:lang` section and uncomment `clojure`. The Clojure module adds these <SideNote idName={1}>[github link](https://github.com/hlissner/doom-emacs/tree/develop/modules/lang/clojure)</SideNote> packages to your emacs:

- [[Cider]]
- [[clj-refactor]]

## Enable Linting
This is done via [[flycheck-clj-kondo]]. Enabling [[clj-kondo]] requires that you have `syntax` under `:checkers` in your init file enabled.

## Enabling Auto Complete (Laguage Server Protocol or LSP)

In your `.doom.d/init.el`, pass your `clojure` option a `+lsp` like so:

```elisp
(clojure +lsp)
```

Under `:tools` you must un-comment `lsp`. Next, and this was the part that I didnt realize at first, you must install `clojure-lsp` <SideNote idName={2}>[github link](https://github.com/snoe/clojure-lsp)</SideNote> on your machine. You can do this via brew <SideNote idName={3}>[brew link](https://formulae.brew.sh/formula/clojure-lsp#default)</SideNote> if you are on MacOS:

```sh
brew install clojure-lsp
```

Another option would be to add an alias to your `~/.clojure/deps.edn`:

```clojure
{:aliases
 {:lsp {:extra-deps {snoe/clojure-lsp {:git/url "https://github.com/snoe/clojure-lsp" :sha "a90836ce5a50147347a55001505cc29bbe171dc1"}}
        :main-opts ["-m" "clojure-lsp.main"]
        :jvm-opts ["-Xmx1g" "-server"]}}}
```

And then you can run the lsp server with `clojure -A:lsp`.  <SideNote idName={4}>[Github Link](https://github.com/snoe/clojure-lsp/issues/1#issuecomment-481108547)</SideNote>