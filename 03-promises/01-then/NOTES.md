# .then() In Depth

## The core rule: .then() ALWAYS returns a new Promise

This is the single fact that explains everything else about chaining.
Every `.then()` call, no matter what its handler does, returns a brand new
Promise — never the original, never `undefined`. What that new Promise
resolves/rejects with depends entirely on what the handler does:

| Handler behavior | Resulting new Promise |
|---|---|
| Returns a plain value | Fulfills with that value |
| Returns nothing (`undefined`) | Fulfills with `undefined` |
| Returns another Promise | "Adopts" that Promise's eventual state (see resolution/) |
| Throws | Rejects with the thrown value |
| Is omitted (no onFulfilled passed) | Passes the value straight through, unchanged |

## Files here

- `01-basic-then.js` — the fundamental transform-and-return-new-Promise behavior
- `02-return-values.js` — every row of the table above, demonstrated
- `03-return-promise.js` — returning a Promise from inside .then() (the "flattening" behavior)
- `04-missing-handler.js` — .then() with no onFulfilled argument, value pass-through
- `05-then-is-always-async.js` — reinforcing the microtask-deferral guarantee one more time, in the .then() context specifically

## Exercises

- `exercises/01-predict-chain.js`
- `exercises/02-build-chain.js`