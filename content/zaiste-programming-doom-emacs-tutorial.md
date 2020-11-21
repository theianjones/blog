---
title: Doom Emacs Zaiste Programming Tutorial
aliases: [Zaiste Programming tutorial]
type: post
tags: [emacs, org mode, magit, evil mode]
---

[Link to youtube video series](https://www.youtube.com/watch?v=BRqjaN4-gGQ&list=PLhXZp00uXBk4np17N39WvB80zgxlZfVwj&index=10)

## Table of Contents

1.  [Command Abbreviations](/zaiste-programming-doom-emacs-tutorial#org32a295d)
2.  [Emacs Doom E02 - Projects with Projectile, File Explorer with Treemacs & EShell](/zaiste-programming-doom-emacs-tutorial#org9728dc5)
3.  [Emacs Doom E03 - A short intro to Dired](/zaiste-programming-doom-emacs-tutorial#org102ed70)
4.  [Emacs Doom E04 - Buffers, Windows and Basic Navigation](/zaiste-programming-doom-emacs-tutorial#org7ad2452)
5.  [Emacs Doom E05: Installing Packages with org-super-agenda as an example](/zaiste-programming-doom-emacs-tutorial#orgb0e106f)
6.  [Emacs Doom E06: Quick, horizontal movements with evil-snipe](/zaiste-programming-doom-emacs-tutorial#orgb647fee)
7.  [Emacs Doom E07: Moving around the screen with Avy](/zaiste-programming-doom-emacs-tutorial#org388daa2)
8.  [Emacs Doom E08: Multiple cursor in Emacs with evil-multiedit](/zaiste-programming-doom-emacs-tutorial#org30b5cf6)
9.  [Emacs Doom E09: Org Mode, Basic Outlines](/zaiste-programming-doom-emacs-tutorial#org81c82b8)
10. [Emacs Doom E10: Org Mode, - Links, Hyperlinks and more](/zaiste-programming-doom-emacs-tutorial#org7e04976)
11. [Emacs Doom E11: Org Mode - Custom Link Types](/zaiste-programming-doom-emacs-tutorial#orgb701a40)
12. [Emacs Doom E12: Org Mode - Linking to words & Bookmarks](/zaiste-programming-doom-emacs-tutorial#orgffe76a2)
13. [Emacs Doom E13: Org Mode, Code Snippets 101](/zaiste-programming-doom-emacs-tutorial#orgb827f37)
14. [Emacs Doom E14: Org Mode, Getting Organized with Tasks](/zaiste-programming-doom-emacs-tutorial#orgf45e9cc)
15. [Emacs Doom E15: Org Mode, Priorities for Tasks](/zaiste-programming-doom-emacs-tutorial#org749da92)
    1.  [buy strawberries](/zaiste-programming-doom-emacs-tutorial#orgdf410b3)
16. [Emacs Doom E16: Org Mode, Marking Tasks with Tags](/zaiste-programming-doom-emacs-tutorial#orgc34243a)
    1.  [play more games](/zaiste-programming-doom-emacs-tutorial#orgab01491):fun:
17. [Emacs Org Mode - Using Checkboxes - Emacs Doom 17](/zaiste-programming-doom-emacs-tutorial#org5121008)
    1.  [You can see how many are done with a &ldquo;cookie&rdquo; <code>[1/2]</code>](/zaiste-programming-doom-emacs-tutorial#org96c5c45)
18. [Emacs Magit - Getting Started - Emacs Doom 18](/zaiste-programming-doom-emacs-tutorial#org5c14b98)
19. [Emacs Magit - The Git Commit Flow in More Detail - Emacs Doom 19](/zaiste-programming-doom-emacs-tutorial#org95ea852)
20. [Emacs Magit with Forge for Issuing Pull Requests - Emacs Doomcasts 20](/zaiste-programming-doom-emacs-tutorial#org8c30753)

- **tags:** [[Doom Emacs]], [[Emacs]], [[Productivity]]

<a id="org32a295d"></a>

## Command Abbreviations

- `C` - &ldquo;Control&rdquo; key
- `M` - &ldquo;Meta&rdquo; or &ldquo;option/alt&rdquo; key
- `s` - &ldquo;Command&rdquo; key
- `SPC` - &ldquo;Space&rdquo; key

<a id="org9728dc5"></a>

## Emacs Doom E02 - Projects with Projectile, File Explorer with Treemacs & EShell

- Common commands for [[Projectile]] Projects
- `SPC p p` to open a project
- `SPC SPC` to open a file in a project
- `SPC o p` to open the file explorer
- `SPC o e` to open the shell in fullscreen
- `SPC o E` to open the shell in a popup window
- `SPC f r` recently visited files
- `SPC f R` recently visited files in a project
- `M-x projectile-discover-projects-in-directory` to find projects within given folder using Projectile
- `M-x projectile-discover-projects-in-search-path` to find projects in the folder defined by the `projectile-project-search-path` variable using Projectile

<a id="org102ed70"></a>

## Emacs Doom E03 - A short intro to [[Dired]]

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

<a id="org7ad2452"></a>

## Emacs Doom E04 - Buffers, Windows and Basic Navigation

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

<a id="orgb0e106f"></a>

## Emacs Doom E05: Installing Packages with org-super-agenda as an example

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

<a id="orgb647fee"></a>

## Emacs Doom E06: Quick, horizontal movements with [[evil-snipe]]

- enables vim navigation
- `f` and then the letter you want to navigate to. `,` will go backward and `;` will go forward after that &ldquo;find&rdquo;
- `t`is the same thing except for a character you want to jump to before the one you insert
- evil snipe lets you go to all the occuranses in your document
- `s` to do a double character search
- `F` or `T` to go backwards
- evil snipe will remember your last search so `,` and `;` will navigate
- `v` puts you in visual mode. You can select text by with `v f some-char-you-navigate-to`

<a id="org388daa2"></a>

## Emacs Doom E07: Moving around the screen with [[Avy]]

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

<a id="org30b5cf6"></a>

## Emacs Doom E08: Multiple cursor in Emacs with [[evil-multiedit]]

- make selections and then edit those selections interactively
- `meta d` will select the current word, and again will find another occurance
- `meta D` will find the occurence upward
- you can use a visual selection to select multiple words. `R` will select all occurances
- `crtl n` for next selection `ctrl p` for previous
- exclude matches with `enter`
- you can make an edit and the changes will be reflected in all the selection

<a id="org81c82b8"></a>

## Emacs Doom E09: [[Org Mode]], Basic Outlines

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

<a id="org7e04976"></a>

## Emacs Doom E10: [[Org Mode]], - Links, Hyperlinks and more

- <https://www.youtube.com/watch?v=BRqjaN4-gGQ&list=PLhXZp00uXBk4np17N39WvB80zgxlZfVwj&index=10>
- `SPC m l` to add a link to an org page
- you can add `::` to specify a heading or a line number
- you can paste http links as well
- you can &ldquo;link&rdquo; some text with specific code
  `SPC m l`
  elisp: [(+ 2 2)]((+ 2 2))
  when you click the link, emacs will evaluate the expression
- Show [My Agenda](org-agenda)
- [List Files](ls) in directory

<a id="orgb701a40"></a>

## Emacs Doom E11: [[Org Mode]] - Custom Link Types

- [Whats the video about custom links](https://youtube.com/watch?v=Febe4lUK5G4)

<a id="orgffe76a2"></a>

## Emacs Doom E12: [[Org Mod]]e - Linking to words & Bookmarks

- `SPC n l` stores a link to a particular headline

<a id="orgb827f37"></a>

## Emacs Doom E13:[[ Org Mode]], Code Snippets 101

- `<s TAB` is a snippet for ##+BEGIN<sub>SRC</sub> ##+END<sub>SRC</sub>

  (+ 2 3 4 5)
  (defun great (name)
  (concat "Hello " name))

  function great(name){
  console.log("Hello ", name)
  return "Hello " + name
  }
  great("Zac")

- `SPC m &rsquo;` opens the code snipped in a separate buffer
  - press `C-c C-c` to exit the buffer and include the changes
  - abort the snippet change with `C-c C-k`
- Execute the code snippet with `C-c C-c`
  Results will show up in a ##+RESULTS header
- This feature is called Babel
- One snippet can consume the output of another snippet
- Zaiste uses [[Kulfon]] to generate static html from his notes.

<a id="orgf45e9cc"></a>

## Emacs Doom E14: [[Org Mode]], Getting Organized with Tasks

- Create a task by prefixing any heading with `TODO`
- `DONE` means the task is done
- You can create your custom key words by changes a variable: `org-todo-keywords`

  - remember you can get to your variables through `SPC h v` (M-x counsel-describe-variable)
  - these values are already set with [[Doom Emacs]]

           ((sequence "TODO(t)" "PROJ(p)" "STRT(s)" "WAIT(w)" "HOLD(h)" "|" "DONE(d)" "KILL(k)")
        (sequence "[ ](T)" "[-](S)" "[?](W)" "|" "[X](D)"))

- `SPC m t` to change a status of a todo
- If you close the task with a command, org mode will add a date that you &ldquo;closed&rdquo; the task
- `SPC o a t` to open the agenda -> todo list
- q to quit
- org-agenda-files is a variable you can set so you filter which files agenda searches todos in.

<a id="org749da92"></a>

## Emacs Doom E15: [[Org Mode]], Priorities for Tasks

- `SHIFT up` will toggle the priority of tasks

<a id="orgdf410b3"></a>

### TODO buy strawberries

- org-fancy-priorities gives you fancy looking priorities

<a id="orgc34243a"></a>

## Emacs Doom E16:[[ Org Mode]], Marking Tasks with Tags

- tags can be attached to any headlines
- `SPC m q` to tag a headline

<a id="orgab01491"></a>

### TODO play more games :fun:

- tags are hierarchical so nested headings will be tagged with the parent header tag
- org-tag-sparce-tree will search for headings that only have a specific tag

<a id="org5121008"></a>

## Emacs [[Org Mode]] - Using Checkboxes - Emacs Doom 17

- two types of lists, ordered and unordered lists
- you can change an unorded list by changing the first item to 1. and then typing `CTRL c CTRL c`
- [ ] This is still todo
- [-] this is in progress
- [x] this is a done task

<a id="org96c5c45"></a>

### You can see how many are done with a &ldquo;cookie&rdquo; <code>[1/2]</code>

- [-] task 1
- [x] task 2
- you can do this by adding <code>[0/0]</code> and pressing `CTRL c CTRL c`
- you cant assign a tag or a priority

<a id="org5c14b98"></a>

## Emacs [[Magit]] - Getting Started - Emacs Doom 18

- magit is configured for you
- `SPC g g` to show Magit status Page
- most commands are done from the status page
- press `?` to see what you can do
- `git add -p` lets you stage in hunks
- Open and close with the `TAB`
- Open diff view for a file with `TAB`
- `s` to stage a change
- `u` to undo a change
- `c` to commit
- `b s` for branch and spinoff to create another branch, rewinding the commits you made to master
- `b b` to switch branches

<a id="org95ea852"></a>

## Emacs [[Magit]] - The Git Commit Flow in More Detail - Emacs Doom 19

- `t t` to create a tag, default place is the commit you are currently selecting
- `V` to select a change in a diff and `x` to discard that change.
- `s` to stage
- `c` to commit, you can `q` to quit the commit screen
- `P` to push and then `p` to your remote or `u` to a another remote

<a id="org8c30753"></a>

## Emacs [[Magit]] with Forge for Issuing Pull Requests - Emacs Doomcasts 20

- forge is installed in emacs doom
- `@` for forge
- set up forge with `M x forge-pull`
  - the first time you will get a token from github
- `@ c p` to create a pull request with forge
  - select the base branch
  - then select the target branch
  - then provide a short description
  - `CTRL c CTRL c` to finish the pull request
- now there will be a `pull requests` tab
