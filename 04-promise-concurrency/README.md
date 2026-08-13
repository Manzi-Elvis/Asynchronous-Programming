# 04 — Promise Concurrency

Module 03 gave you Promises as individual units and chains. This module is
about running MULTIPLE Promises together — deciding whether they should
run one-after-another or all-at-once, and how to combine their results
(or failures) once they're all in flight.

## Sub-topics, in order

1. **all/** — `Promise.all()`: wait for every Promise, fail fast on the first rejection
2. **allSettled/** — `Promise.allSettled()`: wait for every Promise, never fails, gives you outcomes for all
3. **race/** — `Promise.race()`: settle as soon as the FIRST Promise settles, win or lose
4. **any/** — `Promise.any()`: settle as soon as the FIRST Promise fulfills, ignore rejections unless all reject
5. **sequential/** — deliberately running async steps one after another, and why you'd want to
6. **concurrent/** — starting multiple independent operations at once
7. **concurrency-limits/** — why "just run everything at once" breaks down at scale
8. **promise-pools/** — the production pattern: bounded concurrency with ordered results

## The four combinators, side by side

| Combinator | Settles when | Settles how | Use when |
|---|---|---|---|
| `Promise.all` | all fulfill, OR the first one rejects | fulfilled with array of values, or rejected with first error | you need EVERY result, and any single failure should abort the whole thing |
| `Promise.allSettled` | all have settled (fulfilled or rejected) | always fulfilled, with an array of `{status, value/reason}` | you want every outcome regardless of individual failures |
| `Promise.race` | the FIRST one settles (fulfill or reject) | matches whichever settled first | you only care about "whoever's fastest," including timeouts |
| `Promise.any` | the FIRST one fulfills, or ALL reject | fulfilled with first success, or rejected with an AggregateError | you want the first SUCCESS, and individual failures are expected/acceptable |

## Sequential vs concurrent — the one habit this module builds

```js
// Sequential: each await blocks the next from starting. Total time
// = sum of all individual times. Use when step N genuinely needs
// step N-1's result.
const a = await taskA();
const b = await taskB(a);

// Concurrent: all started before any is awaited. Total time = the
// SLOWEST one. Use when tasks are independent.
const [a, b] = await Promise.all([taskA(), taskB()]);
```

Module 01's `05-timing.js` already showed the raw timing difference.
This module goes deeper: which combinator to reach for, how to bound
concurrency so you don't overwhelm a downstream service, and the
production-grade "promise pool" pattern that shows up in real codebases
constantly (batch API calls, parallel file processing, rate-limited
scraping, etc).
