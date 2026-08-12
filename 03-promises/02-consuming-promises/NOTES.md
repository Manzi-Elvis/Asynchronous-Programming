# Consuming Promises

## The basic shape

```js
promise.then(
  (value) => { /* fulfilled handler */ },
  (reason) => { /* rejected handler */ }
);
```

`.then()` actually accepts TWO arguments: an onFulfilled handler and an
onRejected handler. In practice, almost nobody uses the second argument —
`.catch(handler)` (covered in its own sub-topic) is preferred for handling
rejections, because it also catches errors thrown INSIDE the onFulfilled
handler, which the second `.then()` argument does not. But it's worth
knowing the two-argument form exists, since you'll see it in older code.

## Files here

- `01-consume-promise.js` — the basic .then() shape, both arguments
- `02-success-handler.js` — the onFulfilled path, isolated
- `03-rejection-handler.js` — the onRejected path via .then()'s second argument, and why .catch() is usually better

## Exercises

- `exercises/01-consume-api.js`