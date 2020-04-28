---
title: Doom Emacs Zaistre Programming Tutorial
aliases: [Zaistre Programming tutorial]
---

[Link to youtube video series](https://www.youtube.com/watch?v=BRqjaN4-gGQ&list=PLhXZp00uXBk4np17N39WvB80zgxlZfVwj&index=10)

### Table of Contents

1.  [Emacs Doom E02 - Projects with Projectile, File Explorer with Treemacs & EShell](#org4ac4b5c)
2.  [Emacs Doom E03 - A short intro to Dired](#orgfbeca60)
3.  [Emacs Doom E04 - Buffers, Windows and Basic Navigation](#orga0e3bc8)
4.  [Emacs Doom E05: Installing Packages with org-super-agenda as an example](#orgeb9e23a)
5.  [Emacs Doom E06: Quick, horizontal movements with evil-snipe](#org41669d4)
6.  [Emacs Doom E07: Moving around the screen with Avy](#org1f3cb9f)
7.  [Emacs Doom E08: Multiple cursor in Emacs with evil-multiedit](#org26d6407)
8.  [Emacs Doom E09: Org Mode, Basic Outlines](#org8f58826)
9.  [Emacs Doom E10: Org Mode, - Links, Hyperlinks and more](#orgce81094)

- **tags:** [[Emacs]], [[Doom Emacs]], [[Notes]], [[Productivity]]

<a id="org4ac4b5c"></a>

### Emacs Doom E02 - Projects with [[Projectile]], File Explorer with Treemacs & EShell

- `SPC p p` to open a project
- `SPC SPC` to open a file in a project
- `SPC o p` to open the file explorer
- `SPC o e` to open the shell in fullscreen
- `SPC o E` to open the shell in a popup window
- `SPC f r` recently visited files
- `SPC f R` recently visited files in a project
- `M-x projectile-discover-projects-in-directory` to find projects within given folder using Projectile
- `M-x projectile-discover-projects-in-search-path` to find projects in the folder defined by the `projectile-project-search-path` variable using Projectile

<a id="orgfbeca60"></a>

### Emacs Doom E03 - A short intro to [[Dired]]

- Dired is how you interfaces with a directory
- Directory Editor
- Move with h,j,k,l
- toggle `(` for simple view
- `enter` to go into a directory
- `-` to go back up
- `+` and enter a file name to create a directory
- `d` to mark for deletion, `x` to delete
- `space .` to create or find a file
- `\*/` to select all directories, `t` to switch between files and directories
- `U` to unselect all
- `m` to mark a specific file or directory
- `CTRL + w + v` window split vertically
- `CTRL + w + w` to switch windows
- `C` copy to another window
- `R` move to another window
- `dired-do-what-i-mean-target` set to true
- `i` to edit file/dir name

<a id="orga0e3bc8"></a>

### Emacs Doom E04 - Buffers, Windows and Basic Navigation

- Buffers are a special concept in emacs
  they can be terminals, files, directories, etc
- `space b b` to open another buffer
  - workspace buffer
- `space b B` you can see all the buffer
- `space ,` to switch buffers (its an alias)
- `space shift ,` to switch to all buffers
- `space b X` You can create a scratch buffer and `space b s` to save and name it
- `CTRL w v` window split vertically
- `CTRL w w` to switch windows
- `CTRL w s` window split horizonal
- you can use the vim motion keys to navigate between open windows
- Windows are panes in your screen
- `CTLR + =` to make the windows equal size

<a id="orgeb9e23a"></a>

### Emacs Doom E05: Installing Packages with org-super-agenda as an example

- `space f p` to open the config.
- to add a package, add the package to `.doom.d/package.el`
- then close and `doom refresh`
- then go to `.doom.d/config.el` to configure the package
- `def-package!` is a macro you can use to configure packages
  - `space h help` you can look up method man pages
  - `:init` is used for setting the package up
  - `:config` to set configuration after the package has been initialized
  - `:after` lets you set which package it should load after
- you can use `:after!` to configure packages that are already there

<a id="org41669d4"></a>

### Emacs Doom E06: Quick, horizontal movements with [[evil-snipe]]

- enables vim navigation
- `f` and then the letter you want to navigate to. `,` will go backward and `;` will go forward after that &ldquo;find&rdquo;
- `t`is the same thing except for a character you want to jump to before the one you insert
- evil snipe lets you go to all the occuranses in your document
- `s` to do a double character search
- `F` or `T` to go backwards
- evil snipe will remember your last search so `,` and `;` will navigate
- `v` puts you in visual mode. You can select text by with `v f some-char-you-navigate-to`

<a id="org1f3cb9f"></a>

### Emacs Doom E07: Moving around the screen with [[Avy]]

- `avy` for long distance movement.
- `g s space` and then select the letter that avy gives you to nagivage to that spot
  - these letters are on your home row so they are easy to click
- `space h v` for variable, to set the avy variable to search all open windows
- `avy-all-windows` lets you search in all windows open.
- you can remove a word with `g s space select-one-letter x select-the-removal-spot`
  - you can use `X` to stay in your original spot of search
- you can go `g s space select-one-letter i select-the-correction-spot` to correct the spelling of the search
  - brew install ispell
- you can `yank` a word from one place to another with `g s space select-one-letter y select-the-correction-spot-to-paste`
- use `t` to &ldquo;teleport&rdquo; the word from one place to another

<a id="org26d6407"></a>

### Emacs Doom E08: Multiple cursor in Emacs with [[evil-multiedit]]

- make selections and then edit those selections interactively
- `meta d` will select the current word, and again will find another occurance
- `meta D` will find the occurence upward
- you can use a visual selection to select multiple words. `R` will select all occurances
- `crtl n` for next selection `ctrl p` for previous
- exclude matches with `enter`
- you can make an edit and the changes will be reflected in all the selection

<a id="org8f58826"></a>

### Emacs Doom E09: [[Org Mode]], Basic Outlines

- org mode gives you structure to your document
- `\*` for a h1 `\*\*` for an h2 etc
- you can `tab` a section to fold a subtree (hide it)
- you can use `shift tab` to cycle through folded states
- `ctrl return` to create a headline of the same type
- `meta arrow up` lets you shift the position of the section
- `meta h` promotes a headline to the next level
- `meta l` demotes
- you can create lists
  1.  onw
  2.  2
  3.  wooo
  4.  3

<a id="orgce81094"></a>

### Emacs Doom E10: [[Org Mode]], - Links, Hyperlinks and more

- <https://www.youtube.com/watch?v=BRqjaN4-gGQ&list=PLhXZp00uXBk4np17N39WvB80zgxlZfVwj&index=10>
