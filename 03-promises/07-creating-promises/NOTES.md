# Creating Promises

## The constructor

```js
new Promise((resolve, reject) => {
  // executor function — runs SYNCHRONOUSLY, immediately, right here
});
```

`resolve` and `reject` are functions provided TO you by the Promise
constructor — you don't define them, you just call one of them (at most
once, effectively) when your async work finishes.

## The executor runs synchronously

This surprises people: the function you pass to `new Promise(...)` starts
running IMMEDIATELY, on the current call stack, before `new Promise(...)`
even finishes returning. Anything synchronous inside the executor runs
right away, not deferred.

```js
console.log('before');
new Promise((resolve) => {
  console.log('inside executor — this runs SYNCHRONOUSLY, right now');
  resolve('done');
});
console.log('after');
// Output: before, inside executor..., after
```

Only the actual settling (resolve/reject call) is typically deferred —
because it's usually wrapped in something async like `setTimeout` or a
network call INSIDE the executor. But if you call `resolve()` directly and
synchronously inside the executor (no timer, no async call), the Promise
becomes fulfilled immediately — it just still delivers that value to
`.then()` handlers via a microtask, per the guarantee from module 00/03.

## When do you actually need `new Promise(...)`?

Almost never, in modern code, EXCEPT for one specific job: **wrapping a
callback-based API to make it Promise-based.** This is called
"promisifying." If you're already working with something that returns a
Promise (like `fetch`), you should chain/await it directly — reaching for
`new Promise(...)` around an already-Promise-returning operation is a
common and unnecessary anti-pattern (sometimes called the "Promise
constructor anti-pattern").

```js
// GOOD: wrapping a genuinely callback-based API
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// BAD: wrapping something that's already a Promise, for no reason
function badFetchWrapper(url) {
  return new Promise((resolve, reject) => {
    fetch(url).then(resolve).catch(reject); // pointless — just `return fetch(url)`
  });
}
```

## Files here

- `01-new-promise.js` — the constructor shape, executor timing
- `02-resolve.js` — calling resolve with various value types
- `03-reject.js` — calling reject, and rejecting with non-Error values (and why you shouldn't)
- `04-executor.js` — the executor's synchronous-start behavior in detail
- `05-synchronous-executor.js` — an executor that resolves with zero async work at all
- `06-throw-in-executor.js` — a thrown exception inside the executor becomes a rejection automatically

## Exercises

- `exercises/01-create-delay.js`
- `exercises/02-wrap-callback.js`