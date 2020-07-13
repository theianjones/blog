---
slug: dotfiles
date: 2020-05-28
title: Track Your Dotfiles
description: Use a Git Bare repository to track your dotfiles.
categories: []
tags: [dotfiles, git]
published: true
author: 'Ian Jones'
type: post
---

First create a `.cfg` git directory. This is where you git files will live. Because of reasons, you should init a git repo in your home directory.

```sh
git init --bare $HOME/.cfg
```

Now we have to alias a command that will reference this git repo with our dotfiles in our home directory. You can type this out every time buy I've put this alias in my `.zshrc`.

```sh
alias config='/usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME'
```

We don't want to track every file in this directory by default. We can tell git to only track the files we have explicitly added to git.

```sh
config config --local status.showUntrackedFiles no
```

## Resources

- [Atlassian tutorial](https://www.atlassian.com/git/tutorials/dotfiles)
- [dotbare](https://github.com/kazhala/dotbare)
