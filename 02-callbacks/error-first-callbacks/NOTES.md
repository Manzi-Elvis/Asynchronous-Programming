# Error-First Callbacks (the Node.js convention)

## What it is

A convention — not a language feature — where an async callback's FIRST
argument is always reserved for an error (or `null` if there wasn't one),
and subsequent arguments carry the actual result:

```js
function doSomething(callback) {
  // callback(error, result)
}

doSomething((err, result) => {
  if (err) {
    // handle error
    return;
  }
  // use result
});
```

This is the standard shape for nearly every callback-based Node.js core
API (`fs.readFile`, `fs.writeFile`, etc.) and most callback-style npm
packages predating widespread Promise adoption.

## Why not just use try/catch?

Because `try/catch` cannot catch an error thrown inside an asynchronous
callback that runs later, on a different turn of the event loop — by the
time the callback executes, the `try` block has already finished and
exited.

```js
try {
  setTimeout(() => {
    throw new Error('this escapes the try/catch entirely');
  }, 100);
} catch (err) {
  // NEVER reached — the throw happens in a totally separate stack
  // frame, long after this try/catch block already completed.
  console.log('caught:', err.message);
}
```

The error-first convention exists specifically to solve this: since you
can't rely on exceptions crossing an async boundary, you pass the error as
DATA through the same channel you get your result through.

## The discipline this convention demands

1. **Always check `err` first**, before touching `result`. Forgetting this
   is one of the most common real-world Node bugs — code that assumes
   `result` is valid when actually an error occurred and `result` is
   `undefined`.
2. **Never call the callback more than once.** (This is actually a general
   callback rule, but error-first APIs are especially prone to violating
   it if you're not careful with early returns — see
   `02-success-and-error.js`.)
3. **Always call the callback exactly once**, on every code path — don't
   let an error silently swallow the callback and leave the caller
   waiting forever.

## Files here

- `01-node-style-callback.js` — the shape, with a real-feeling example (reading a "file")
- `02-success-and-error.js` — both paths exercised, plus the double-callback bug

## Exercises

- `exercises/01-create-error-first-api.js`