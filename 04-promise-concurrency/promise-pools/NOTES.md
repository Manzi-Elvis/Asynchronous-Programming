# Promise Pools

## What it is

A **promise pool** is the production-grade, generalized version of the
concurrency limiter built in `concurrency-limits/03-basic-limiter.js`: a
reusable utility that processes a list of tasks with a fixed number of
concurrent "slots," preserving result order, and — in fuller versions —
supporting fail-fast vs collect-all-errors semantics, retries, and
per-task timeouts.

This is one of the highest-value patterns to have fully internalized for
technical interviews: "implement a function that runs N async tasks with
a concurrency limit of K" is an extremely common systems/async interview
question, precisely because it touches queue management, closures, Promise
composition, and error handling all at once.

## The canonical implementation, annotated

```js
async function promisePool(tasks, concurrency) {
  const results = new Array(tasks.length);
  let nextIndex = 0;

  async function runNext() {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex++; // claim index synchronously
      results[currentIndex] = await tasks[currentIndex]();
      // ^ tasks are THUNKS (functions returning promises), not
      // already-started promises — see "thunks vs promises" below
      // for why this distinction matters
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, tasks.length) },
    () => runNext()
  );
  await Promise.all(workers);

  return results;
}
```

## Critical detail: tasks must be FUNCTIONS (thunks), not Promises

This is the single most common mistake building a promise pool. If you
pass an array of ALREADY-CREATED Promises (`fetch(url)` already called
for every url), they've ALL already started the instant you created the
array — there's no "pool" left to limit, the concurrency already
happened before your pool code even runs.

```js
// WRONG — all 100 fetches start immediately, pool does nothing useful
const promises = urls.map((url) => fetch(url));
await promisePool(promises, 5);

// RIGHT — each thunk only starts its fetch when the pool CALLS it
const thunks = urls.map((url) => () => fetch(url));
await promisePool(thunks, 5);
```

This is why the implementation above calls `tasks[currentIndex]()` — it
invokes the thunk to START the async work only when a worker slot is
actually free, which is the entire point of a pool.

## Files here

- `01-basic-pool.js` — the annotated implementation above, exercised directly
- `02-preserve-order.js` — proving results land in input order despite out-of-order completion
- `03-fail-fast.js` — a pool variant that aborts remaining work on the first error
- `04-all-settled-pool.js` — a pool variant that collects every outcome instead of failing fast
- `05-pool-with-retry.js` — retrying a failed task within the pool before giving up
- `06-pool-with-timeout.js` — bounding how long any single task in the pool is allowed to take

## Exercises

- `exercises/01-build-promise-pool.js`
- `exercises/02-build-concurrency-limiter.js`
- `exercises/03-process-100-urls.js` — the "FAANG interview" version, combining everything in this folder