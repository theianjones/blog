---
title: Doom Emacs
aliases: [doom emacs]
tags: [emacs]
---

## Installation

These are a little outdate, take a look at [my blog post](https://www.ianjones.us/2020-05-05-doom-emacs/) for a better guide!

```bash
brew install git ripgrep

`brew  install coreutils fd`

xcode-select --install

brew tap d12frosted/emacs-plus
brew install emacs-plus

git clone https://github.com/hlissner/doom-emacs ~/.emacs.d

~/.emacs.d/bin/doom install
```

add doom to your command line

```
~/.zshrc
# Doom Emacs
export PATH=$PATH:~/.emacs.d/bin
```

start emacs

space-f-p and select config.el

add

```
(use-package! org-roam
  :commands (org-roam-insert org-roam-find-file org-roam)
  :init
  (setq org-roam-directory "~/Desktop/03-resources/org-roam")
  (setq org-roam-graph-viewer "/usr/bin/open")
  (map! :leader
        :prefix "n"
        :desc "Org-Roam-Insert" "i" #'org-roam-insert
        :desc "Org-Roam-Find"   "/" #'org-roam-find-file
        :desc "Org-Roam-Buffer" "r" #'org-roam)
  :config
  (org-roam-mode +1))


(use-package deft
  :after org
  :bind
  ("C-c n d" . deft)
  :custom
  (deft-recursive t)
  (deft-use-filter-string-for-filename t)
  (deft-default-extension "org")
  (deft-directory "~/Desktop/03-resources/org-roam"))

```

update `~/.doom.d/packages.el` with:

```
(package! org-roam
  :recipe (:host github :repo "jethrokuan/org-roam" :branch "develop"))

```

Fleeting notes with org-journal

```
(use-package org-journal
  :bind
  ("C-c n j" . org-journal-new-entry)
  :custom
  (org-journal-dir "~/Desktop/03-resources/org-roam/")
  (org-journal-date-prefix "#+TITLE: ")
  (org-journal-file-format "%Y-%m-%d.org"))
```
