# Promise.any()

## What it does

Takes an iterable of Promises. Returns a single Promise that:

- **Fulfills** with the value of the FIRST Promise to fulfill — ignoring
  any rejections along the way.
- **Rejects** ONLY if EVERY input Promise rejects, with a special
  `AggregateError` containing all the individual rejection reasons.

```js
const result = await Promise.any([taskA(), taskB(), taskC()]);
// resolves with whichever of A/B/C succeeds FIRST — individual
// rejections among the others are simply ignored, as long as AT
// LEAST ONE succeeds
```

## The precise contrast with Promise.race

`Promise.race` cares about "first to settle, whatever that is" —
including a fast failure. `Promise.any` specifically waits past
rejections, looking only for the first SUCCESS, and only gives up if
literally everything failed.

| | `Promise.race` | `Promise.any` |
|---|---|---|
| A fast rejection among slower successes | race REJECTS immediately | any KEEPS WAITING for a possible success |
| All inputs reject | race rejects with the FIRST rejection reason | any rejects with an `AggregateError` containing ALL reasons |
| All inputs fulfill | race resolves with the fastest | any resolves with the fastest |

## AggregateError

When every input rejects, `Promise.any`'s rejection reason is an
`AggregateError` — a real Error subclass with an `.errors` array property
holding every individual rejection reason, in input order:

```js
try {
  await Promise.any([fail1(), fail2(), fail3()]);
} catch (err) {
  console.log(err instanceof AggregateError); // true
  console.log(err.errors); // [reason1, reason2, reason3]
}
```

## When to reach for it

Use `Promise.any` for redundant sources where you only need ONE to
succeed: trying several CDN mirrors, several DNS resolvers, several
authentication providers — any scenario where failure of some sources is
expected and fine, as long as at least one comes through.

## Files here

- `01-basic-any.js` — first success wins, rejections along the way are ignored
- `02-all-rejected.js` — the AggregateError case, when every input fails

## Exercises

- `exercises/01-first-success.js`