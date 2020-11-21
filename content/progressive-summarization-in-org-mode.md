---
title: Progressive Summarization in Org Mode
type: post
date: 2020-06-17
tags: [progsum, org mode, emacs]
---

Tiago Fortes progressive summarization is a way to make notes progressively more useful as you come back to them.

For your level 2 notes, you can use the `*` to bold text. I found [this blog post](https://tasshin.com/blog/implementing-a-second-brain-in-emacs-and-org-mode/) that recommented the `smart-parens` package. If you are using [[Doom Emacs]] smart parens will be loaded for you. You will want to add some config so that org mode will wrap text in `*` when you highlight and hit `*` key.

```lisp
(sp-with-modes '(org-mode)
    (sp-local-pair "*" "*"))
```

Next, you need to be able to highlight text for your level 3 notes. Out of the box, emacs won't do this for you. I don't need to export my notes anywhere so I just want org mode to highlight text for me.

Enter `org-emphasis-alist`. In doom emacs, you can customize variables with `SPC h v`. Next enter `org-emphasis-alist`. I choose to use the `=` for my highlights. To cusomize this character, hit the value menu key of the character you want to cusomize. Next hit `INS` key. This will produce two fields: `Key` and `Value`. You can add the key of `:background` and the value of `"Yellow"`. I want to make sure that my text is black so hit `INS` again to add `Key: :foreground, Value: "black"`.

Now you'll want to hit apply and save. [[Org Mode]] will need to be restarted with `M-x org-mode-restart`. Now you should see your highlights showing up.

I added `=` to my smartparens list:

```lisp
(sp-with-modes '(org-mode)
    (sp-local-pair "*" "*")
    (sp-local-pair "=" "="))
```

I dont like looking at the emphasis markers so I've opted to have org-mode hide them from me: `SPC h v` then type `org-hide-emphasis-markers` and set it to `t`
