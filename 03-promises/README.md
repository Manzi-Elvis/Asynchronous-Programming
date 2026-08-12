# 03 — Promises

Everything in module 02 built up the case for a better primitive than raw
callbacks. Promises are that primitive: an object representing the
eventual result (or failure) of an async operation, with structural
guarantees callbacks never had — resolved/rejected exactly once, errors
that propagate automatically, callbacks that are always invoked
asynchronously.

This is the largest module in the curriculum because Promises are the
foundation everything after this module builds on, including async/await
(module 05, which is really just syntax sugar over what you learn here).

## Sub-topics, in order

1. **fundamentals/** — what a Promise actually is: states, pending/fulfilled/rejected/settled
2. **creating-promises/** — the `new Promise(executor)` constructor, resolve/reject
3. **consuming-promises/** — `.then()` basics, receiving success and failure
4. **then/** — `.then()` in depth: return values, chaining, async guarantees
5. **catch/** — `.catch()`: propagation and recovery
6. **finally/** — `.finally()`: cleanup that runs regardless of outcome
7. **chaining/** — composing multiple async steps without nesting
8. **thenables/** — objects that behave like Promises without being one
9. **resolution/** — the resolution procedure: what "resolving" actually does with different value types
10. **error-handling/** — rejection, propagation, recovery, and the danger of unhandled rejections
11. **promise-internals/** — the engine machinery underneath: capability, reactions, jobs

## The mental model to hold going in

A Promise is a **state machine** with exactly three states:

```
        resolve(value)
pending ───────────────► fulfilled
   │
   │ reject(reason)
   └───────────────────► rejected
```

Once it leaves `pending`, it can NEVER change state again — not to the
other outcome, not back to pending. This single guarantee (settle exactly
once, permanently) is the structural fix for the "called too many times"
inversion-of-control problem from module 02.
