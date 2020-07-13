---
title: Org Pomodoro
aliases: [org-pomodoro]
type: post
tags: [emacs, org-mode, pomodoro]
date: 2020-06-15
---

When you are on a header, you can call `M-x org-pomodoro`. This kicks off a 25 minute timer and calls `org-clock-in` on the current header.

I keep track of my tasks during the day in [[Org Journal]] so when Im finished with the day, I can run `M-x org-clock-report` and it will generate:

```
#+BEGIN: clocktable :scope file :maxlevel 2
#+CAPTION: Clock summary at [2020-06-12 Fri 10:04]
| Headline                                  | Time   |      |
|-------------------------------------------+--------+------|
| *Total time*                              | *2:12* |      |
|-------------------------------------------+--------+------|
| \_  08:49 looking at...                   |        | 1:01 |
| \_  Look at...                            |        | 0:11 |
| \_  14:00 Rails Book Club                 |        | 1:00 |
#+END:
```

Still figuring out how to scope the table to include my project file todos.
