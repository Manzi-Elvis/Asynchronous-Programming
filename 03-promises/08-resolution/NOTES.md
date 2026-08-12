# Resolution (the Resolution Procedure)

## What it is

"Resolving" a Promise is more nuanced than just "putting a value into it."
When you call `resolve(x)`, the engine runs what the spec calls
**[[Resolve]](x)** — a specific procedure that behaves differently
depending on WHAT `x` is:

| What you pass to resolve(x) | What actually happens |
|---|---|
| A plain value (number, string, object, etc. — not thenable) | The Promise becomes fulfilled with x directly |
| Another Promise | The Promise "adopts" that Promise's eventual state — waits for it, then mirrors whatever it does |
| A thenable (any object with a callable .then) | Same as above — the Promise waits for the thenable to settle, then mirrors it |
| The SAME Promise, resolving itself | TypeError — a Promise cannot resolve to itself, this throws |

## Why "resolve" doesn't mean "fulfill"

This is a genuinely important distinction: calling `resolve(somePromise)`
does NOT immediately fulfill the outer Promise with "a Promise" as its
value. It puts the outer Promise into a kind of waiting state, tied to the
inner Promise. If the inner Promise later REJECTS, the outer Promise
rejects too — "resolve" was never a guarantee of success, just a signal
that "this is now determined by that other thing."

```js
const inner = new Promise((_, reject) => setTimeout(() => reject(new Error('inner failed')), 50));

const outer = new Promise((resolve) => {
  resolve(inner); // NOT fulfilled yet! Outer now "follows" inner.
});

outer.catch((err) => console.log(err.message)); // 'inner failed' — outer REJECTED, not fulfilled
```

## Resolution vs fulfillment, precisely

- **Fulfillment** is a final state — the value is locked in, done.
- **Resolution** is the ACT of calling `resolve(x)` — what happens next
  depends entirely on `x`. Resolving with a plain value leads immediately
  to fulfillment. Resolving with a Promise/thenable leads to a period of
  waiting, followed EVENTUALLY by fulfillment or rejection, matching
  whatever the inner thing does.

## Files here

- `01-resolve-value.js` — resolving with a plain value (the simple, common case)
- `02-resolve-promise.js` — resolving with another Promise, and the "adoption" behavior
- `03-resolve-thenable.js` — resolving with a thenable, same adoption behavior
- `04-resolution-vs-fulfillment.js` — the self-resolution TypeError, and the resolve-with-rejecting-Promise case explicitly

## Exercises

- `exercises/01-predict-resolution.js`
