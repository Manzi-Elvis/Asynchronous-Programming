# Thenables

## What it is

A "thenable" is ANY object with a `.then(onFulfilled, onRejected)` method
— it doesn't have to be a real `Promise` instance. The Promise spec
(and native JS engines) treat anything with a callable `.then` method as
"Promise-like" and will automatically interoperate with it — most notably,
`Promise.resolve()` and the resolution procedure inside `.then()` handlers
will "unwrap" a thenable exactly the same way they unwrap a real Promise.

```js
const thenable = {
  then(onFulfilled, onRejected) {
    setTimeout(() => onFulfilled('value from a thenable, not a real Promise'), 50);
  },
};

Promise.resolve(thenable).then((v) => console.log(v));
// works exactly as if thenable were a real Promise
```

## Why this exists

This was a deliberate interoperability decision baked into the Promise
spec: it allows different Promise IMPLEMENTATIONS (jQuery's `$.Deferred`,
older libraries like Q or Bluebird, or entirely custom async wrapper
objects) to all interoperate with native Promises seamlessly, as long as
they expose a `.then()` method with the right shape. You almost never need
to WRITE a custom thenable yourself in modern code (native Promises cover
essentially everything), but you need to understand the concept because:

1. It explains some genuinely surprising native Promise behavior (see
   `resolution/03-resolve-thenable.js`).
2. You may still encounter thenables from older libraries or unusual APIs.
3. It's the concept module 14 (Build Your Own Promise) needs, since your
   own hand-built Promise implementation needs to correctly interoperate
   with thenables to pass conformance tests.

## Files here

- `01-what-is-thenable.js` — the minimal definition, demonstrated
- `02-custom-thenable.js` — building your own simple thenable object
- `03-thenable-assimilation.js` — native Promises automatically "assimilating" a thenable into their own chain

## Exercises

- `exercises/01-create-thenable.js`
