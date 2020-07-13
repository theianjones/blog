---
title: Org Roam Server
aliases: [org roam server]
tags: [org roam]
---

- **tags:** [[Org Roam]], [[Org Mode]], [[Doom Emacs]]

Org Roam Server gives you a clickable graph to explore your notes. It has a "Current Buffer" view that shows the notes that are linked from or to your current note in emacs. With [[Org Roam Protocol]] you can click the node to open up that note.

# Installation

Clone the org-roam-server to your desktop.

`git clone https://github.com/org-roam/org-roam-server`

Then add the `simple-httpd` and `org-roam-server` config to your `.doom.d/config.el`.

```lisp
;; Interactive Org Roam Server Graph
(require 'simple-httpd)
(setq httpd-root "/var/www")
(httpd-start)

(use-package org-roam-server
  :ensure nil
  :load-path "~/Desktop/01-projects/org-roam-server")
```

To start the graph server, run this command:

`M-x org-roam-server-mode RET`
