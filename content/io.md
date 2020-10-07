---
title: 'Io: the "simplest" programming language on the block'
date: 2020-06-30
type: post
tags: [programming language, io]
---

Io ([website link](http://iolanguage.com/)) is a pure [[Prototype Language]]. Io feels like a brain child of [[Ruby]] and [[JavaScript]]. It has the least amount of syntax that I&rsquo;ve experience in a language. You use `=` to assign a value to a slot on an object. `:=` to assign a value on a slot or create a new value. `::=` to assign a value to a slot, create setters for that slot or assign a new value.

I mentioned the concept of a slot here. This is a crucial feature of Io. It&rsquo;s quite similar to Ruby. You can send a message to an Io object and it will do 1 of a couple things:

1.  Compute the arguments
2.  Get the name, target, and sender of the message
3.  Read the name of the slot on them object that its sent to
4.  If the slot exists, return the data or invoke the method inside
5.  If the slot doesn’t exist, forward the message to the prototype

It looks like this in the code:

    duck := Object clone
    duck quack := writeln("quack quack")
    duck quack
    // => quack quack

Here we are defining an `duck` `Object`. `Object` is the base prototypical object in Io. Say we sent a message to the duck object to figure out what kind of animal it was.

    duck := Object clone
    duck type
    // => Object

You can see that we get `Object` back. We didn&rsquo;t actually assign this slot to duck so where did Io get this value? This is where [[Prototypal Inheritance]] comes in. If that message isn&rsquo;t on the object, Io will pass that message to its parent object to see if it exists. So if we change the object that duck inherits from, that will be the first object that Io passes messages to.

    Animal := Object clone
    duck := Animal clone
    duck type
    // => Animal

This is how we can share behavior between objects:

    Animal := Object clone
    Animal meow := writeln("meow")
    duck := Animal clone
    duck meow
    // => meow

Ducks shouldn&rsquo;t meow, but you get the idea.

A special feature of Io is how it treats evaluating its messages. Most languages will evaluate the parameters passed to values and assign those values to memory ahead of time. Io doesnt do this and it is an important destinction. An example that Bruce Tate uses in 7 Programming Languages in 7 weeks is defining an `unless` method.

    unless := method(
    (call sender doMessage(call message argAt(0))) ifFalse(
    call sender doMessage(call message argAt(1))) ifTrue(
    call sender doMessage(call message argAt(2)))
    )
    duck := Object clone
    duck isABird := true
    unless(duck isABird, write("Oh No, Im not a bird\n"), write("Yay, I am a bird\n"))

Theres a lot going on here but the key point is you can pass any message into the first parameter of unless and this function will delay the execution of the parameters. You can see that a duck is a bird, so the `ifTrue` block gets called, writing out `Yay, I am a bird`. If Io was evaluating all the parameters, `Oh No, Im not a bird` would have been written out.

One useful feature of Io is it&rsquo;s concurrency model. It implements [[Co-Routine]], [[Actors (programming concept)]], and Futures.

Co-routines are useful for suspending your progams execution so that the thread can do something else. This is useful when you have to make some sort of asyncronous request or expensive task. You can `yield` so that the asyncronous opertion happens and will be available when your program comes back to your function.

[Bruce Tate](bruce_tate.md) gave a nice example in his book:

    vizzini := Object clone
    vizzini talk := method(
                "Fezzik, are there rocks ahead?" println
                yield
                "No more rhymes now, I mean it." println
                 yield)

    fezzik := Object clone

    fezzik rhyme := method(
    			yield
                "If there are, we'll all be dead." println
                yield
                "Anybody want a peanut?" println)

    vizzini @@talk; fezzik @@rhyme

    Coroutine currentCoroutine pause

    // =>
    Fezzik, are there rocks ahead?
    If there are, we'll all be dead.
    No more rhymes now, I mean it.
    Anybody want a peanut?
    Scheduler: nothing left to resume so we are exiting
    ---------
    Coroutine callStack                  A4_Exception.io 244
    Coroutine backTraceString            A4_Exception.io 274
    Coroutine showStack                  A4_Exception.io 177
    Coroutine pause                      Actor.io 150
    Object actorProcessQueue             Actor.io 115

Here we define two regular objects both with methods that print things. You&rsquo;ll notice the `yield` syntax. This is how you tell Io where your program will halt its execution and let other operations happen. The other important syntax is the `@@`. This tells Io to execute that message in its own thread. As you can see the strings being printed are alternating from `vizzini` to `fezzik` back to `vizzini` and then `fezzik`. We have to through in `Coroutine currentCoroutine pause` so our program doesnt exit before the threads are done.

Heres what happens when you run the code regularly:

    vizzini := Object clone
    vizzini talk := method(
                "Fezzik, are there rocks ahead?" println
                yield
                "No more rhymes now, I mean it." println
                 yield)

    fezzik := Object clone

    fezzik rhyme := method(
    			yield
                "If there are, we'll all be dead." println
                yield
                "Anybody want a peanut?" println)

    vizzini talk; fezzik rhyme
    // =>
    : Fezzik, are there rocks ahead?
    : No more rhymes now, I mean it.
    : If there are, we'll all be dead.
    : Anybody want a peanut?

You can see that Io ignores the `yield` completely and runs the code synchonously. How cool is it that you can turn concurrency on and off that easily!? Theres no comparable concept that I have used in Ruby or Javascript. I know JavaScript generators have a similar yielding functionality but the concurrency piece is missing.

Io has an extremely small footprint and flexible enough to describe an domain specific language. It&rsquo;s really cool to see how such different programming languages work.
