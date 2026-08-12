# Promise.allSettled()

## What it does

Takes an iterable of Promises. Returns a single Promise that **always
fulfills** (never rejects) once EVERY input Promise has settled — whether
each one individually fulfilled or rejected. The result is an array of
outcome objects, one per input, in input order:

```js
const results = await Promise.allSettled([taskA(), taskB(), taskC()]);
// results = [
//   { status: 'fulfilled', value: <result of taskA> },
//   { status: 'rejected', reason: <error from taskB> },
//   { status: 'fulfilled', value: <result of taskC> },
// ]
```

## The key difference from Promise.all

`Promise.all` treats any single failure as total failure (fail-fast,
reject the whole thing). `Promise.allSettled` treats failure as just
ANOTHER kind of outcome you get to inspect — nothing aborts early, nothing
throws. You always get a result for every single input, and you decide
what to do with each one afterward.

```js
const results = await Promise.allSettled([task1(), task2(), task3()]);

const succeeded = results.filter((r) => r.status === 'fulfilled').map((r) => r.value);
const failed = results.filter((r) => r.status === 'rejected').map((r) => r.reason);

console.log(`${succeeded.length} succeeded, ${failed.length} failed`);
```

## When to reach for it

Use `allSettled` when partial success is USEFUL — e.g. sending
notifications to 50 users where a few bounced emails shouldn't stop the
other 47 from being sent, or running a batch of independent health
checks where you want a full report of what's up and what's down.

## Files here

- `01-basic-allSettled.js` — the shape of the result array
- `02-success-and-failure.js` — a realistic mixed-outcome batch, filtered afterward

## Exercises

- `exercises/01-batch-processing.js`