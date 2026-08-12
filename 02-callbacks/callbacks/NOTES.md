# Callbacks (the basic pattern)

## What it is

A function passed as an argument, invoked later by the function it was
passed to. That's the entire definition — everything else is convention
and discipline built on top of this one idea.

## Files here

- `01-basic-callback.js` — a synchronous callback, to isolate the pattern from async timing
- `02-async-callback.js` — the same shape, made properly asynchronous via setTimeout
- `03-callback-as-argument.js` — the "sometimes sync, sometimes async" trap and why it's dangerous

## Exercises

- `exercises/01-build-callback-api.js`