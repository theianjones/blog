---
slug: reasonml-async-await
date: 2020-03-11
title: '📝 Making an HTTP server in ReasonML egghead Collection Notes'
categories: []
tags: [reasonml]
published: true
author: 'Ian Jones'
type: post
---

## [Async / Await in ReasonML](https://egghead.io/lessons/reason-async-await-in-reasonml?pl=making-an-http-server-in-reasonml-on-top-of-node-js-dab086a2)

- `npm install bs-let`
- add `'ppx-flags': ['bs-let/ppx']` to your bsconfig.json to extend the bucklescript compiler
- this lets us go `let%Async person = Swapi.getPerson()`
- `let%Async` is an extension of `let` that we have to define ourselves.

```reason
module Async = {
let let* = (prom, cb) => Js.Promise.then*(cb, prom)
}
```

- `let_` is what the `bs-let` extension is expecting in the Async module to make this work.

## [Automatically decode JSON into records in ReasonML using Decco](https://egghead.io/lessons/reason-automatically-decode-json-into-records-in-reasonml-using-decco?pl=making-an-http-server-in-reasonml-on-top-of-node-js-dab086a2)

- We need a type to turn json into

```reason
type person = {
  name: string
}
```

- `npm install decco`
- add `decco` to `bs-dependencies` array in `bsconfig.json`
- add `decco/ppx` to `ppx-flags` array in `bsconfig.json`
- Now we add a decorator to our type:

```reason
[@decco]
type person {
  name: string
}
```

- `>showppx` in [[VS Code]] to view the compiled version of the decorator
- This shows how decco is giving us a decode and encode function to turn our json string into a record.
- `decode` will return an `Ok` or an `Error`

```reason
open Async;

[@decco]
type person = {firstName: string};

let go = () => {
  Js.log("Here's some JSON of a person");
  let%Async json = Swapi.getPerson();
  let result = person_decode(json);
  switch (result) {
  | Ok(luke) => Js.log2("Here is the name", luke.firstName)
  | Error(msg) => Js.log2("Our decoding failed", msg)
  };
  resolve();
};

go();
```

## [Write a simple custom JSON decoder for Decco in ReasonML](https://egghead.io/lessons/reason-write-a-simple-custom-json-decoder-for-decco-in-reasonml?pl=making-an-http-server-in-reasonml-on-top-of-node-js-dab086a2)

- Decco doesnt have support for js dates so we have to write our own "codec"
- decco expects us to define a `type t`, `t_encode` and `t_decode`

```reason
module DateAsFloat = {
  let t_decode = json => {
    Decco.floatFromJson(json)->Belt.Result.map(Js.Date.fromFloat);
  };
  let t_encode = date => Js.Date.getTime(date)->Decco.floatToJson;

  type t = Js.Date.t;
};
```

- Now we can use this special type:

```reason
[@decco]
type data = {date: DateAsFloat.t};
```

- example:

```reason
let go = () => {
  let json = Data.data;
  Js.log2("Json", json);
  switch (data_decode(json)) {
  | Ok(data) => Js.log2("data", data)
  | Error(msg) => Js.log2("failed", msg)
  };
  Js.log2("Data", data_decode(json));
  Js.log2("Json again", data_encode({date: Js.Date.make()}));
};
```

## [Working with cryptic error messages from ReasonML when writing custom Decco decoders.](https://egghead.io/lessons/reason-working-with-cryptic-error-messages-from-reasonml-when-writing-custom-decco-decoders?pl=making-an-http-server-in-reasonml-on-top-of-node-js-dab086a2)

- When you get weird compiler errors, start adding type signatures to your code to see specifically whats going on.`
- **Type Level Debugging**

## [Make a basic server with ReasonML and Node.js](https://egghead.io/lessons/node-js-make-a-basic-server-with-reasonml-and-node-js?pl=making-an-http-server-in-reasonml-on-top-of-node-js-dab086a2)

- `serbet` wraps express in reasonML
- install `decco` and `bs-let` with `serbet`
- `open Serbet.Endpoint` to get access to `Serbet` functionality.
- We create a module `HelloEndpoint` to create an endpoint on our server
- call `Serbet.endpoint` and pass it a record with `{verb, path, handler}`
- `handler` must return a promise, so `Serbet` has an `Async` module we use to lift our string into a promise.
- Now you call `Serbet.application` with a list of endpoints to create the server.

```reason
open Async;

open Serbet.Endpoint;

module HelloEndpoint = {
[@decco.decode]
type params = {name: string};

let endpoint =
  Serbet.endpoint({
    verb: GET,
    path: "/hello/:name",
    handler: req => {
      let%Async params = req.requireParams(params_decode);
      OkString("Hello, " ++ params.name ++ "!!!!!")->async;
    },
  });
};

let app = Serbet.application([HelloEndpoint.endpoint]);
```

## [Handle JSON request bodies and send JSON responses from a Node.js server using ReasonML](https://egghead.io/lessons/node-js-handle-json-request-bodies-and-send-json-responses-from-a-node-js-server-using-reasonml?pl=making-an-http-server-in-reasonml-on-top-of-node-js-dab086a2)

- **Field Punning** -> makes it so you don't have to go `{body_in_encode: body_in_encode}` and can just go `{body_in_encode}`
- a POST endpoint expects a `body_in_decode` and `body_out_encode` functions to be passed to it so it knows how to handle the json coming in and out.

```reason
module HelloJsonEndpoint = {
  [@decco.decode]
  type body_in = {name: string};

  [@decco.encode]
  type body_out = {greeting: string};

  let endpoint =
  Serbet.jsonEndpoint({
    verb: GET,
    path: "/hello/:name",
    body_in_decode,
    body_out_encode,
    handler: (body, \_req) => {
      {greeting: "Hey there, " ++ body.name}->async;
    },
  });
};
```
