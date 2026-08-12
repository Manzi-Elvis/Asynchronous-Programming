# Promise Internals

## Why this sub-topic exists

Everything so far covered the Promise API — what you call and what
happens. This sub-topic is optional-but-valuable deeper context on WHAT
THE ENGINE IS ACTUALLY DOING underneath `new Promise`, `.then()`, and
`resolve`/`reject` — using the vocabulary the actual ECMAScript
specification uses. You don't need this to use Promises effectively day
to day, but it removes any remaining "magic," and it's genuinely useful
preparation for module 14 (Build Your Own Promise), where you'll
implement a working, spec-compliant Promise from scratch.

## The spec's internal machinery, in plain language

- **PromiseCapability**: an internal record bundling together a Promise
  object plus its own private `resolve` and `reject` functions. When you
  write `new Promise(executor)`, the engine creates a PromiseCapability
  first, THEN calls your executor with that capability's resolve/reject
  functions as arguments.
- **PromiseReaction**: a record created every time you call `.then()`. It
  bundles: which handler to call (onFulfilled or onRejected), and which
  OUTPUT Promise's capability to resolve/reject with the handler's result.
  This is the internal object that makes `.then()` always return a NEW
  Promise — every `.then()` call creates a fresh PromiseReaction tied to a
  fresh PromiseCapability.
- **PromiseReactionJob**: the actual microtask that gets queued when a
  Promise settles. For EVERY reaction registered on a Promise (i.e. every
  `.then()` call attached to it), one PromiseReactionJob is queued as a
  microtask once that Promise settles. This is the literal mechanism
  behind "every `.then()` callback runs as a microtask" — it's not a
  convention, it's built directly into how reactions are processed.
- **The resolution procedure ([[Resolve]])**: the algorithm covered in
  `resolution/` — checks if the value being resolved with is thenable,
  and if so, calls its `.then()` to chain onto it instead of fulfilling
  immediately.

## Files here

- `01-promise-capability.js` — simulating the capability record concept in plain JS
- `02-reactions.js` — simulating how multiple .then() calls each create independent reactions
- `03-promise-jobs.js` — connecting reactions to the microtask queue explicitly
- `04-reaction-queue.js` — a Promise with many reactions attached, all firing in registration order
- `05-settlement.js` — a from-scratch mini simulation of the full settle-then-notify-all-reactions sequence

## Exercises

- `exercises/01-trace-promise-internals.js`

## A note on module 14

Module 14 (Build Your Own Promise) will have you implement all of this for
real — a working `MyPromise` class with its own state, its own reaction
queue, its own resolution procedure. This sub-topic's files are simplified
CONCEPTUAL simulations meant to build intuition first; they are NOT
spec-accurate implementations (no error handling, no edge cases). Treat
them as diagrams made of code, not as reference implementations.
