# 05 — Async/Await

`async`/`await` is syntax sugar over Promises — every `async function`
returns a Promise, and every `await` is mechanically equivalent to
attaching a `.then()`. Nothing new happens under the hood; what changes is
readability: async/await lets you write asynchronous code that LOOKS
sequential and synchronous, without any of the nesting problems from
module 02's callback hell.

## Files here

- `01-async-function.js` — declaring async functions, what they return
- `02-await.js` — pausing execution until a Promise settles
- `03-return-values.js` — how return values become the resolved value of the outer Promise
- `04-try-catch.js` — catching rejected awaits, the callback-hell-free way to handle errors
- `05-finally.js` — cleanup that runs regardless of success/failure
- `06-sequential-await.js` — the default behavior, revisited with async/await syntax specifically
- `07-concurrent-await.js` — combining async/await with Promise.all for real concurrency
- `08-await-promise-all.js` — destructuring multiple awaited results cleanly
- `09-top-level-await.js` — awaiting outside any function, in ES modules
- `10-common-mistakes.js` — the recurring async/await-specific bugs, previewing module 13

## Exercises

- `exercises/01-convert-promises-to-async-await.js`
- `exercises/02-optimize-sequential-await.js`
- `exercises/03-build-async-workflow.js`

## The translation table (memorize this)

| async/await | Equivalent Promise code |
|---|---|
| `async function f() { return 5; }` | `function f() { return Promise.resolve(5); }` |
| `async function f() { throw new Error('x'); }` | `function f() { return Promise.reject(new Error('x')); }` |
| `const x = await promise;` | `promise.then((x) => { /* rest of function */ })` |
| `try { await p; } catch (e) { ... }` | `p.then(...).catch((e) => { ... })` |
| `async function f() { await a(); await b(); }` | `function f() { return a().then(() => b()); }` |

If you can mentally translate between these two forms fluently in both
directions, you understand async/await completely — there is no hidden
extra behavior beyond this translation.