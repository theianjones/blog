---
layout: post
title: XCode's License Issue with Node
date: 2015-11-9 13:12:21
published: true
tags: [xcode]
author: Ian Jones
description: ''
categories: node
slug: '/xcode-licence-issue-with-node'
type: post
---

XCode license issues with node.

It took me a while to figure out the issue to this error:

Agreeing to the Xcode/iOS license requires admin privileges, please re-run as root via sudo.

```bash
gyp ERR! build error
gyp ERR! stack Error: `make` failed with exit code: 69
gyp ERR! stack at ChildProcess.onExit (/Users/ianjones/.nvm/versions/node/v4.2.1/lib/node_modules/npm/node_modules/node-gyp/lib/build.js:270:23)
gyp ERR! stack at emitTwo (events.js:87:13)
gyp ERR! stack at ChildProcess.emit (events.js:172:7)
gyp ERR! stack at Process.ChildProcess._handle.onexit (internal/child_process.js:200:12)
gyp ERR! System Darwin 15.0.0
gyp ERR! command “/Users/ianjones/.nvm/versions/node/v4.2.1/bin/node” “/Users/ianjones/.nvm/versions/node/v4.2.1/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js” “rebuild”
gyp ERR! cwd /Users/ianjones/Desktop/eggheadSeries/github-notetaker-egghead/node_modules/bufferutil
gyp ERR! node -v v4.2.1
gyp ERR! node-gyp -v v3.0.3
gyp ERR! not ok
npm WARN install:bufferutil@1.2.1 bufferutil@1.2.1 install: `node-gyp rebuild`
npm WARN install:bufferutil@1.2.1 Exit status 1
```

After some googling the first line I came to this issue on stack overflow. I had thought there was a problem with nvm but it turns out all I needed to do was agree to the new Xcode/iOS license.
