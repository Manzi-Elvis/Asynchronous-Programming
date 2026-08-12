# .catch()

## What it is

`.catch(onRejected)` is exactly equivalent to `.then(undefined, onRejected)`
— it's syntactic sugar, nothing more. It exists purely for readability: a
dedicated method name that makes error-handling intent explicit in a
chain, rather than always writing `undefined` as a placeholder first
argument.

```js
promise.catch(fn) // sugar for:
promise.then(undefined, fn)
```

## Why .catch() "reaches back" further than .then()'s second argument

Because `.catch()` is chained SEPARATELY, as its own link after whatever
came before it, it can catch a rejection that originated from ANY earlier
link in the chain — including errors thrown inside a `.then()` handler
several steps back. This was demonstrated concretely in
`consuming-promises/03-rejection-handler.js`; this sub-topic explores it
further, plus the equally important idea of **recovery**: a `.catch()` can
return a normal value and let the chain continue as if nothing went wrong.

## Files here

- `01-basic-catch.js` — the sugar-for-.then(undefined, fn) equivalence, shown directly
- `02-catch-propagation.js` — catching an error from several links back in a long chain
- `03-catch-recovery.js` — returning a value from .catch() to "heal" the chain and continue

## Exercises

- `exercises/01-recover-from-error.js`