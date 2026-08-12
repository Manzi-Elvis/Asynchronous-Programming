# NOTES — Callbacks

## The pattern, precisely

A callback is just a function passed as an argument to another function,
to be invoked at some later point — either synchronously (rare, usually
for things like `Array.prototype.map`) or asynchronously (the common case
for anything involving timers, I/O, or events).

```js
function greetLater(name, callback) {
  setTimeout(() => {
    callback(`Hello, ${name}!`);
  }, 100);
}

greetLater('Elvis', (message) => {
  console.log(message); // runs ~100ms later, when the callback is invoked
});
```

There's no special syntax here — `callback` is just a regular function
value, stored, and called later. This is only possible because JavaScript
has **first-class functions**: functions can be assigned to variables,
passed as arguments, and returned from other functions, exactly like any
other value.

## Two flavors: synchronous callbacks vs asynchronous callbacks

- **Synchronous callback**: called immediately, before the outer function
  returns. Example: `[1,2,3].map(x => x * 2)` — the callback runs
  synchronously for each element, no queue involved at all.
- **Asynchronous callback**: called later, after the outer function has
  already returned, via the task or microtask queue. Example:
  `setTimeout(callback, 100)`.

Mixing these up is a real bug source — a function that SOMETIMES calls its
callback synchronously and SOMETIMES asynchronously (depending on a
branch, e.g. cache hit vs cache miss) creates unpredictable ordering bugs.
The fix is to always be consistently one or the other — see
`callbacks/03-callback-as-argument.js` for a demonstration of this trap.

## Where this module goes

1. `callbacks/` builds the basic pattern up from nothing.
2. `error-first-callbacks/` introduces the Node.js `(err, data)` convention
   for handling failure without `try/catch` (which doesn't work across
   async boundaries with plain callbacks — that's WHY the convention
   exists).
3. `callback-hell/` shows what happens when you need several async steps
   in sequence, each depending on the last.
4. `inversion-of-control/` names the trust problem underneath the mess:
   once you hand a callback to someone else's function, you no longer
   control HOW, WHEN, or HOW MANY TIMES it gets called.