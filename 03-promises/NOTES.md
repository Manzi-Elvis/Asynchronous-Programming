# NOTES — Promises

## What a Promise actually is

A Promise is an object that wraps an eventual value. It doesn't hold the
value yet (usually) — it holds a PROMISE that a value (or an error) will
show up later, plus a mechanism for registering callbacks to run when that
happens.

```js
const promise = new Promise((resolve, reject) => {
  // "executor" — runs IMMEDIATELY, synchronously, right here
  setTimeout(() => resolve(42), 100);
});
// promise is a Promise object RIGHT NOW, even though 42 doesn't exist yet
```

## The three states

- **pending**: initial state, neither fulfilled nor rejected
- **fulfilled**: the operation completed successfully, a value is available
- **rejected**: the operation failed, a reason (usually an Error) is available

Fulfilled and rejected are collectively called **settled** — once settled,
a Promise's state and value/reason are permanently locked in. This is
non-negotiable at the language level: calling `resolve()` twice, or
`resolve()` then `reject()`, silently does nothing the second time.

## Why this module supersedes module 02 rather than just adding to it

Every structural problem named in `02-callbacks/inversion-of-control/` has
a direct, load-bearing fix inside the Promise spec itself:

| Callback problem | Promise's structural fix |
|---|---|
| Called more than once | Settling is permanent; further resolve/reject calls are no-ops |
| Called synchronously sometimes, async other times | `.then()` callbacks are ALWAYS scheduled as microtasks, never synchronous |
| Errors thrown inside a callback get lost | Any throw inside a `.then()`/executor becomes a rejection, caught by the nearest `.catch()` |
| No way to "wait" for the result outside the callback | `await` (module 05) lets you write Promise-based async code that reads top-to-bottom like sync code |
| Nesting required for sequential steps | `.then()` returns a new Promise, so steps CHAIN instead of NEST |

## How this module is organized

Read the sub-topics in listed order — each builds directly on assumed
knowledge from the previous one. `fundamentals/` and `creating-promises/`
establish the object and its states; `consuming-promises/` through
`chaining/` cover the day-to-day API; `thenables/` and `resolution/` go one
level deeper into spec behavior that explains some "surprising" edge
cases; `error-handling/` is a full pass focused specifically on failure
paths; `promise-internals/` is the optional deep dive into the actual
mechanism (PromiseCapability, PromiseReactionJob) for anyone who wants to
understand precisely what the engine is doing, not just what the API does.
