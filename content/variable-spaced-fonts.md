---
title: Variable Spaced Fonts in Doom Emacs
date: 2020-06-23
type: post
---

You can use the `mixed-pitch` package to manage your variably spaced fonts in [[Doom Emacs]].

```lisp
;; .doom.d/config.el
(use-package mixed-pitch
  :hook
  ;; If you want it in all text modes:
  (text-mode . mixed-pitch-mode))
```

Remember to require the package:

```lisp
;; .doom.d/packages.el
(package! mixed-pitch)
```

Next you may notice that your company completions are off. This requires installing `company-box`. Doom gives us a flag on company to intall and manage this dependency for us.

```lisp
;; .doom.d/init.el
:completion
(company +childframe)
```

Doom will add the `package!` and `add-hook` code for us now.

I had to restart emacs to get this to work.

## Resources

- [github search for +childframe](https://github.com/hlissner/doom-emacs/search?q=%2Bchildframe&unscoped_q=%2Bchildframe)
