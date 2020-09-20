---
title: 'Install Doom Emaces'
date: 2020-09-20
tags: [emacs]
growthStage: evergreen
---

[[Doom Emacs]] is a [[Emacs]] distribution that allows to you install modules of functionality. There are a set number of default modules configured for you, most prominently, [[Evil Mode]]: the vi layer in emacs.

These are instructions for Mac/Linux, if you're on windows I recommend looking at [ervingad's window instructions here](https://github.com/earvingad/configfiles/blob/master/emacs/DoomEmacsWindows.org).

First things first, you need to install [Homebrew](https://brew.sh/). I try to install as many programs from homebrew as I can. This way I can reduce the overhead of keeping all my dependencies up to date.

Once homebrew is installed, there are a couple utils you need for doom emacs.

```sh
brew install git ripgrep coreutils fd
```

I am on MacOS so I have to install the XCode developer tools

```sh
xcode-select --install
```

Some people have ran into issues directly installing emacs from brew ([Youtube explanation link](https://www.youtube.com/watch?v=Lg61ocfxk3c)) so we are going to use install it a slightly different way:

```sh
brew tap d12frosted/emacs-plus
brew install emacs-plus
```

Now we need to actually install doom emacs. This is down through cloneing the git repo into your `~/.emacs.d` file that installing `emacs-plus` gave you.

```sh
git clone https://github.com/hlissner/doom-emacs ~/.emacs.d
```

After this, we want to run `doom install`. This command can be run from the recently cloned `doom-emacs` project.

```sh
~/.emacs.d/bin/doom install
```

You will want to add this doom command to your path because any time you update the config, you will need to run `doom refresh` to sync those changes.

```sh
# inside your .zshrc or .bash_profile
    export PATH=$PATH:~/.emacs.d/bin
```

Finally, run `emacs` in your terminal and you should see the doom homepage.

### Resources
- [Lauro Silva's Excellent Installation Guide](https://laurosilva.com/tutorials/install-and-configure-doom-emacs)
- [Daniels Doom Emacs Notes](https://www.dschapman.com/notes/doom-emacs)