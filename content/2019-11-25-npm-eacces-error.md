---
slug: npm-eaccess
date: 2019-11-25
title: 'Dont run npm with sudo'
description: 'Running npm with sudo means you downloaded node with root permissions.'
categories: []
type: post
keywords: ['npm', 'error']
tags: [npm]
published: true
author: 'Ian Jones'
---

If you install node with root access, npm will ask you to run the `sudo` command every time you try to install a global package.

The [npm docs](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) suggest that you either reinstall npm with a node version manager or change npm's default directory.

It is better, in my opinion, to stay with the default and reinstall with nvm (or your preferred version manager; [n is a popular option](https://github.com/tj/n)).

You can run this bash command ([as per the documentation](https://github.com/nvm-sh/nvm)) to download nvm:

```bash
# you can use curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
# or wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
```
