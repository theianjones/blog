---
title: Vim
tags: [vim, evil mode, emacs]
growthStage: seedling
---

I have started using [[Doom Emacs]] which configures [[Evil Mode]]. This is a vim layer on top of emacs.

Heres some things that I've learned along the way:

`i` is your obvious insert mode. Alternitavely, `o` will put you into insert mode but on the next line. This is usually what I want.

`v` sets "visual mode" which means that you want to visually select text and do something with it. Often I want to select specific text to delete it.

Theres the classic `h`, `j`, `k`, and `l` for navigation. Im still getting used to these as my muscle memory is hard coded to arrow keys.

One cool thing is that you can prepend a number to (almost?) any command, and have vim run that command that many times. This is why some people use relative line numbers because it then makes it really easy to jump up 6 lines by typing `6k`.

`d d` will delete a whole line while `d` when selecting text will delete that selection. `x` will delete the current character.

`f` to find a character in front of your cursor. `F` lets you search behind. Then you can use `;` to navigate to each instance and `,` to navigate back.

## Resources

I found this [interactive vim tutorial](https://www.openvim.com/tutorial.html) that has a playground that reminds you of all of the keys. I have been visiting it practicing different commands.
