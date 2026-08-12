# Callback Hell

## What it is

When you need several async operations to happen IN SEQUENCE, where each
one depends on the result of the last, plain callbacks force you to nest
them — because the only place you have access to a previous step's result
is inside its callback. Nest enough of these and you get the infamous
"pyramid of doom":

```js
step1((err1, result1) => {
  if (err1) return handleError(err1);
  step2(result1, (err2, result2) => {
    if (err2) return handleError(err2);
    step3(result2, (err3, result3) => {
      if (err3) return handleError(err3);
      step4(result3, (err4, result4) => {
        if (err4) return handleError(err4);
        console.log('finally done:', result4);
      });
    });
  });
});
```

## Why it's genuinely bad, not just "ugly indentation"

The indentation is a symptom, not the disease. The real problems:

1. **Error handling is repeated at every level** and easy to get wrong or
   forget at any one of them (miss `if (err) return` once, and errors from
   a deep step can silently propagate into code that assumes success).
2. **Reading order stops matching execution order** as the nesting grows —
   you have to hold the whole pyramid in your head to trace what happens
   when.
3. **Variable scope gets tangled**: each nested callback closes over
   everything above it, making it easy to accidentally reference a stale
   or wrong-scope variable.
4. **Adding, removing, or reordering a step means re-indenting everything
   below it** — small logical changes cause large, noisy diffs.
5. **Parallelizing independent steps is awkward** — nesting implies
   sequential dependency even when two steps don't actually depend on each
   other, so people either accept unnecessary slowness or hand-roll
   counters to track "have all N callbacks fired yet."

## Files here

- `01-nested-callbacks.js` — a minimal, deliberately deep pyramid to feel the pain directly
- `02-real-world-example.js` — a realistic "user signup" flow (validate → create account → send email → log analytics) in full callback hell

## Exercises

- `exercises/01-refactor-callback-hell.js` — flatten a pyramid using named functions (the "poor man's fix," before Promises properly solve it in module 03)