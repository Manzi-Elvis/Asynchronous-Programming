# Chaining

## What it is

Chaining is the practice of composing multiple `.then()`/`.catch()`/
`.finally()` calls in sequence, each building on the Promise returned by
the previous one. You've been seeing this throughout `then/` and `catch/`
already — this sub-topic focuses specifically on chaining as a DESIGN
technique for structuring real multi-step async workflows, replacing the
nested pyramid from module 02 entirely.

## The transformation, side by side

```js
// Callback hell (module 02):
step1((err1, r1) => {
  if (err1) return handleError(err1);
  step2(r1, (err2, r2) => {
    if (err2) return handleError(err2);
    step3(r2, (err3, r3) => {
      if (err3) return handleError(err3);
      console.log(r3);
    });
  });
});

// Promise chaining (this module):
step1()
  .then((r1) => step2(r1))
  .then((r2) => step3(r2))
  .then((r3) => console.log(r3))
  .catch(handleError); // ONE error handler for the whole chain
```

Flat, linear, single error handler. Same sequential dependency, none of
the nesting or repeated error-checking.

## Files here

- `01-basic-chain.js` — a simple 3-step chain, contrasted mentally against the pyramid
- `02-transform-values.js` — using chains as data pipelines (map-like transformations)
- `03-chain-async-operations.js` — a realistic multi-step async workflow, fully chained
- `04-chain-errors.js` — where errors can originate in a chain, and where they surface

## Exercises

- `exercises/01-user-profile-chain.js`
- `exercises/02-multi-step-workflow.js`