---
title: Developing Athens Research in Emacs
date: 2020-09-20
tags: [emacs, clojure, athens research]
---

### Overview of my set up
I am using [[Doom Emacs]] with [[Cider]], [[clj-kondo]], [[clj-refactor]] and the [[clojure-lsp]].

Follow my [[Doom Emacs]] installation guide here: [[Install Doom Emacs]]. 

## Open the project

I have athens saved as a [[Projectile]] project. I can `SPC TAB n` to add a new workspace and then `SPC p p` to open my local athens project.

## Start the app

The first thing I do is open a terminal `SPC o T` (I have vterm installed) and I run `lein dev`. This starts our development servers. You should see output like this when everything is done building:

```
❯ lein dev
shadow-cljs - HTTP server available at http://localhost:3000
shadow-cljs - server version: 2.10.22 running at http://localhost:9630
shadow-cljs - nREPL server started on port 8777
shadow-cljs - watching build :main
shadow-cljs - watching build :renderer
[:main] Configuring build.
[:renderer] Configuring build.
[:main] Compiling ...
[:renderer] Compiling ...
[:main] Build completed. (78 files, 0 compiled, 0 warnings, 1.96s)
[:renderer] Build completed. (6391 files, 4 compiled, 0 warnings, 20.12s)
```

This tells us that our [[nRepl]] server is on port 8777. Since this server is already running, we just need to `connect` to it. You dont need to `jack in`, this would start a server for us. So `SPC m C` or ciders default emacs chord `C-c C-x c s`. Then select `:shadow-select`, enter port 8777. <SideNote idName={1}>the prompt shows me a random port to select, I never select it and always enter 8777</SideNote>

Before our repl will work <SideNote idName={2}>You'll get this error `No available JS runtime.
See https://shadow-cljs.github.io/docs/UsersGuide.html#repl-troubleshooting`</SideNote>, you need to run electron. An easy way to do this is start it with `npx`: In the root of your project `npx electron .`
