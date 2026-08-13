# NOTES — Async/Await

## The core mechanical facts

1. **Every `async function` implicitly returns a Promise.** If you
   `return 5`, callers actually receive a Promise that resolves to `5`. If
   you don't explicitly return anything, callers get a Promise that
   resolves to `undefined`.
2. **`throw` inside an async function is equivalent to `reject()`.** The
   returned Promise rejects with whatever you threw, instead of the
   exception propagating synchronously the way it would in regular code.
3. **`await` can only be used inside an `async function`** (with one
   exception: top-level await in ES modules — see `09-top-level-await.js`).
4. **`await expr` pauses the enclosing async function** until `expr`
   (coerced to a Promise if it isn't one already) settles. On fulfillment,
   `await` evaluates to the fulfilled value. On rejection, `await` THROWS
   that rejection reason as a regular JS exception — which is exactly why
   `try/catch` works with it.

## await doesn't block the whole program, only the async function

This is worth stating explicitly because "pause execution" sounds
alarming if you're picturing the call stack. What actually happens: when
an `async function` hits an `await`, it returns control to ITS caller
immediately (this is the moment the async function's own Promise is still
pending) — the call stack unwinds back out, and other code (other
functions, the event loop, other async functions) is free to run. The
"pause" is really "this specific function's execution is suspended and
will resume later, as a microtask, once the awaited value settles" — it's
built entirely on the same microtask-queue machinery from module 00.

## Why async/await feels like it "fixes" callback hell structurally

It doesn't literally fix anything Promises didn't already fix — but it
removes the LAST piece of friction: even chained `.then()` calls require
you to write nested/chained function callbacks. `await` lets you write:

```js
async function run() {
  const a = await stepA();
  const b = await stepB(a);
  const c = await stepC(b);
  return c;
}
```

instead of:

```js
function run() {
  return stepA()
    .then((a) => stepB(a))
    .then((b) => stepC(b));
}
```

Both are equally "correct" and equally free of callback hell's
structural problems (both are built on Promises). The async/await version
just reads like ordinary sequential code, which is a genuine readability
win, especially as the number of steps grows or when steps need
conditionals/loops mixed in (which is often awkward to express in a pure
`.then()` chain but trivial with regular `if`/`for` plus `await`).

## Files here

See `README.md` for the full file list — this NOTES.md is the concept
reference.