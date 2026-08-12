# Promise.race()

## What it does

Takes an iterable of Promises. Returns a single Promise that settles —
fulfilled OR rejected — matching whichever input Promise settles FIRST,
regardless of whether that first settlement was a success or a failure.

```js
const winner = await Promise.race([slowTask(), fastTask()]);
// resolves/rejects with whatever fastTask() did, since it's faster
// — if fastTask() REJECTS first, Promise.race REJECTS too, even if
// slowTask() would eventually have succeeded
```

## "Race" means literally first-to-settle, win or lose

This trips people up: `Promise.race` does NOT mean "give me the first
success." If the fastest Promise happens to reject, the whole race
rejects — it doesn't wait around to see if a slower one might succeed.
That's what `Promise.any` is for (see `any/`).

## The classic use case: implementing a timeout

Promises have no built-in timeout mechanism. `Promise.race` is how you
build one by hand: race your real operation against a Promise that
rejects after N milliseconds.

```js
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]);
}

await withTimeout(fetchSomething(), 3000); // rejects if fetchSomething takes > 3s
```

This exact pattern gets its own dedicated coverage in
`10-async-patterns/timeout/` — this module introduces the mechanism,
that module builds it into a reusable, production-grade utility.

## The loser doesn't stop either

Same caveat as `Promise.all`: the Promise(s) that didn't win the race
keep running in the background. `Promise.race` just stops listening to
them. If they have side effects, those side effects still happen.

## Files here

- `01-basic-race.js` — fastest wins, shape of the result
- `02-first-completion.js` — a race where the FIRST to settle is a rejection, proving race doesn't wait for a possible success

## Exercises

- `exercises/01-fastest-response.js`