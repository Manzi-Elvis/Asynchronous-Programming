# Call Stack

## What it is

The call stack is a LIFO (last-in, first-out) data structure the JS engine
uses to track "where am I in the program right now." Every time a function
is called, a **stack frame** is pushed. When that function returns, its
frame is popped.

```js
function a() { b(); }
function b() { c(); }
function c() { console.log('here'); }
a();
```

Stack over time:
```
push a
  push b
    push c
      log 'here'
    pop c
  pop b
pop a
```

## Key properties

- **Single-threaded**: one stack, one frame executing at a time.
- **Synchronous by nature**: the stack only grows/shrinks through direct
  function calls and returns — nothing "waits" on the stack.
- **Bounded**: the stack has a fixed size. Recursion without a base case
  causes a `RangeError: Maximum call stack size exceeded` — a stack
  overflow.
- **Blocks everything**: while the stack has frames on it, the event loop
  cannot process the task or microtask queues. A long-running synchronous
  function freezes timers, network callbacks, UI rendering — everything.

## Why this matters for async code

Async code doesn't get "its own thread." A Promise callback or a
`setTimeout` callback can only run once the call stack is **completely
empty**. This is why a blocking `while` loop can delay a `setTimeout(fn, 0)`
indefinitely — the stack never clears, so the event loop never gets a
chance to push `fn` onto it.

## Files here

- `01-basic-stack.js` — watch frames push and pop
- `02-function-execution.js` — nested calls and return values through the stack
- `03-stack-overflow.js` — triggering and understanding a real stack overflow