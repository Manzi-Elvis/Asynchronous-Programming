# Inversion of Control

## What it is

When you pass a callback into someone else's function, you hand over
control of a piece of YOUR code — you no longer decide when it runs, how
many times it runs, what arguments it receives, or even whether it runs at
all. You're trusting the function you called to behave correctly. This is
"inversion of control": normally your code calls the shots; here, control
is inverted, and the other function calls yours.

This is the DEEPER problem callback hell is a symptom of. Flattening the
pyramid (as in the previous exercise) fixes the visual mess, but it does
NOT fix inversion of control — you're still trusting every function in the
chain to call your callback correctly.

## The specific trust problems, named

1. **Called too many times.** As seen in `error-first-callbacks/02-success-and-error.js`
   — a missing `return` calls your callback twice. Your code has to be
   defensively written to survive that, or it breaks.
2. **Called too few times (never).** If the function you called has a bug,
   throws before reaching the callback, or silently swallows an error, your
   callback simply never fires — your code hangs forever with no error and
   no result.
3. **Called too early (synchronously) or too late.** As seen in
   `callbacks/03-callback-as-argument.js` — inconsistent timing breaks
   assumptions about program state.
4. **Called with the wrong arguments**, or arguments in the wrong order,
   especially with untyped/third-party callback APIs that don't strictly
   follow the error-first convention.
5. **Swallowed exceptions.** If your callback itself throws, and the
   function calling it doesn't handle that (most don't), the exception can
   propagate somewhere completely disconnected from where you'd expect to
   catch it — or worse, get silently swallowed by a `try/catch` deep
   inside the library you're using.

## Why Promises fix this structurally, not just cosmetically

A Promise makes several of these guarantees IMPOSSIBLE to violate, by
construction, at the language level:

- A Promise can only ever resolve or reject **once** — calling `resolve()`
  a second time is silently a no-op. Problem #1 above literally cannot
  happen with Promises.
- `.then()` callbacks are **always** invoked asynchronously via the
  microtask queue, never synchronously — problem #3 above is structurally
  prevented.
- Errors (including thrown exceptions inside a `.then()`) propagate down
  the chain automatically to the nearest `.catch()` — you don't have to
  manually check `if (err)` at every step, and errors can't "escape" the
  chain unnoticed the way problem #5 describes (they instead become
  unhandled rejections, which Node/browsers actively warn you about).

Callbacks give you NONE of these guarantees — they're just a convention,
enforced by nothing but the discipline of whoever wrote the function you
called. This is the real reason the industry moved to Promises: not
prettier syntax, but actual structural guarantees.

## Files here

- `01-control-problems.js` — demonstrating "called too many/too few times" concretely
- `02-callback-contracts.js` — writing (and testing) a defensive callback-based API that documents and partially guards its contract

## Exercises

- `exercises/01-identify-ioc.js`