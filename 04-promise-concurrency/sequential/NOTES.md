# Sequential Execution

## What it is

Running async operations one after another, each waiting for the
previous to fully complete before starting. With `async/await`, this is
simply what you get by default when you `await` each call on its own
line:

```js
const a = await stepA(); // stepB doesn't even START until this resolves
const b = await stepB(a);
const c = await stepC(b);
```

## When sequential is actually CORRECT, not just "the easy way"

Sequential execution is the RIGHT choice whenever a later step genuinely
needs an earlier step's result to even begin — you can't fetch a user's
orders before you know the user's ID, so `fetchUser()` must complete
before `fetchOrders(user.id)` can start. This is a real dependency, not
laziness.

The mistake (covered fully in `13-common-mistakes/04-await-in-loop.js`)
is using sequential execution when the steps DON'T actually depend on
each other — that's just leaving performance on the table for no reason.

## The `reduce` pattern for a dynamic sequential pipeline

When you don't know the number of steps ahead of time (e.g. processing an
array where each item must be handled one at a time, in order — such as
appending to a file that must preserve write order), `Array.prototype.reduce`
is the standard way to chain a dynamic list of async steps sequentially:

```js
const results = await items.reduce(async (accPromise, item) => {
  const acc = await accPromise; // wait for all previous items first
  const result = await processItem(item);
  return [...acc, result];
}, Promise.resolve([]));
```

## Files here

- `01-sequential-await.js` — the basic case, dependency between steps
- `02-reduce-chain.js` — the reduce pattern for a dynamic-length sequential pipeline

## Exercises

- `exercises/01-sequential-pipeline.js`