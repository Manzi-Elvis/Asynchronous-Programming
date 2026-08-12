# .finally()

## What it is

`.finally(onFinally)` attaches a callback that runs regardless of whether
the chain fulfilled or rejected — same idea as a `finally` block in
`try/catch/finally`. It's for cleanup: closing a connection, hiding a
loading spinner, releasing a lock — anything that needs to happen either
way.

```js
promise
  .then(onSuccess)
  .catch(onError)
  .finally(() => {
    console.log('this always runs, success or failure');
  });
```

## Key differences from .then()/.catch()

1. **`onFinally` receives NO arguments.** It doesn't get the fulfilled
   value or the rejection reason — by design, because "cleanup" logic
   usually shouldn't need to know the outcome, only that the operation is
   OVER.
2. **`.finally()` passes its INPUT through unchanged**, whether that input
   was a fulfillment or a rejection — the next link in the chain sees the
   same value/error that would have reached it if `.finally()` weren't
   there at all. `.finally()` is transparent to the chain's data flow.
3. **If `onFinally` itself throws (or returns a rejected Promise), that
   DOES override the outcome** — a throw inside `.finally()` becomes the
   new rejection reason for the chain going forward, same as any other
   handler.

## Files here

- `01-basic-finally.js` — runs on both success and failure paths
- `02-cleanup.js` — a realistic resource-cleanup example (opening/closing a "connection")
- `03-finally-return.js` — proving .finally() is transparent to values, but not to throws

## Exercises

- `exercises/01-resource-cleanup.js`