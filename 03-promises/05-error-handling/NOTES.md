# Error Handling

## Why this gets its own dedicated sub-topic

`catch/` covered the `.catch()` method itself. This sub-topic is a full
pass focused specifically on the FAILURE PATH across an entire Promise
system: how rejections happen, how they propagate, how to recover from
them deliberately, and — critically — what happens when NOBODY handles
them (unhandled rejections), which is a real production hazard.

## The full picture of where a rejection can come from

1. **Explicit `reject(reason)` call** inside a `new Promise` executor.
2. **A synchronous `throw`** inside an executor (auto-converted, per
   `creating-promises/04-executor.js`).
3. **A synchronous `throw`** inside a `.then()`/`.catch()`/`.finally()`
   handler (auto-converted into a rejection of the Promise that call
   returns).
4. **Returning a rejected Promise or thenable** from inside a `.then()`
   handler (the resolution procedure propagates the rejection, per
   `resolution/02-resolve-promise.js`).
5. **`Promise.reject(reason)`** — the direct shortcut.

All five of these funnel into the exact same propagation mechanism and
surface at the nearest downstream `.catch()` (or the second argument of a
`.then()`, with the caveats from `consuming-promises/03-rejection-handler.js`).

## Unhandled rejections: what they are and why they matter

If a Promise rejects and NOTHING downstream in its chain ever attaches a
rejection handler before the microtask queue finishes processing, the
runtime fires an `unhandledRejection` event (Node) or logs a console
warning (browsers). This exists because a silently-swallowed rejection
usually means a real bug happened and nobody in your program will ever
find out — the async equivalent of an uncaught exception, and just as
serious.

## Files here

- `01-rejection.js` — the five rejection sources, unified
- `02-throwing-in-then.js` — the specific case of throwing inside a handler, in depth
- `03-error-propagation.js` — tracing a rejection's path through a real multi-step chain
- `04-recovery.js` — deliberate, targeted recovery strategies (revisits and extends catch/03-catch-recovery.js)
- `05-unhandled-rejection.js` — detecting and handling unhandled rejections at the process level

## Exercises

- `exercises/01-error-chain.js`
- `exercises/02-design-error-strategy.js`
