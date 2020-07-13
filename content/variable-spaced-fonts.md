---
title: Variable Spaced Fonts in Doom Emacs
date: 2020-07-09
type: post
tags: [emacs, fonts]
---

You can use the `mixed-pitch` package to manage your variably spaced fonts in [[Doom Emacs]].

```lisp
;; .doom.d/config.el
(use-package mixed-pitch
  :hook
  ;; If you want it in all text modes:
  (text-mode . mixed-pitch-mode)) ;; or org-mode
```

Remember to require the package:

```lisp
;; .doom.d/packages.el
(package! mixed-pitch)
```

## Company

Next you may notice that your company completions are off. This requires installing `company-box`. Doom gives us a flag on company to install and manage this dependency for us.

```lisp
;; .doom.d/init.el
:completion
(company +childframe)
```

Doom will add the `package!` and `add-hook` code for us now.

I had to restart emacs to get this to work.

## Set the Font Height

`@denis631` on the doom discord server needed to set the height of their font and did it like this:

```lisp
(use-package! mixed-pitch
  :hook (org-mode . mixed-pitch-mode)
  :config
  (setq mixed-pitch-set-heigth t)
  (set-face-attribute 'variable-pitch nil :height 180))
```

## Resources

- [github search for +childframe](https://github.com/hlissner/doom-emacs/search?q=%2Bchildframe&unscoped_q=%2Bchildframe)
