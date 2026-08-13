# NOTES — Event Loop + Promises

## Why this deserves its own module, beyond module 00

Module 00 taught the mechanism in the abstract, using generic
`Promise.resolve().then()` and `queueMicrotask()` calls. This module
applies that mechanism specifically to the shapes of code you actually
write with real Promises and async/await — chained `.then()` calls,
Promises that resolve to other Promises, async functions calling other
async functions — where the ordering gets genuinely non-obvious without
a precise mental model.

## The trace method (use this on every exercise in this module)

For any code sample, maintain three lists on paper (or in comments) as
you read top to bottom:

```
STACK:      <- what's executing right now
MICROTASKS: <- queued, not yet run
TASKS:      <- queued, not yet run
```

Walk through the code once for the "synchronous pass" (everything that
runs before the stack first empties), noting what gets added to each
queue. THEN walk through the event loop's actual draining behavior:
microtasks fully drain (in FIFO order, including new ones added during
draining), then exactly one task runs, then microtasks drain again, then
the next task, and so on.

This is tedious by hand at first — that's the point. Doing it by hand
repeatedly is what builds the intuition to eventually skip the paper
trace and "just see it."

## The one thing async/await changes about HOW you read the trace, not the rules

With raw `.then()` chains, every scheduled callback is visually a
separate function, making it obvious where a "new microtask" gets queued.
With `async/await`, the queuing is implicit: every single `await`
statement is a point where the function suspends and its CONTINUATION
(the rest of the function, after the await) gets scheduled as a
microtask once the awaited value settles. `05-async-await-event-loop.js`
makes this explicit by walking through an async function's execution as
if it were manually written with `.then()`.

## Files here

See `README.md` for the full file list.