# Web APIs (the Environment, not the Language)

## What it is

`setTimeout`, `fetch`, DOM events, `console.log` itself — none of these are
part of the JavaScript *language* (ECMAScript spec). They're provided by the
**host environment**: the browser (Web APIs) or Node.js (via libuv and its
C++ bindings). The JS engine (V8, SpiderMonkey, etc.) just executes ECMAScript;
it doesn't know how to set a timer or make a network request on its own.

This distinction matters because it explains WHERE the "waiting" for async
operations actually happens: **outside the call stack, in the environment**,
not inside your JS code.

## The handoff sequence

1. JS calls a Web API function, e.g. `setTimeout(callback, 1000)`.
2. The environment (not JS) takes over: it starts a timer on its own thread.
3. JS's call stack is now free — `setTimeout` returned immediately (it just
   registered the timer, it didn't wait 1000ms).
4. Once the timer's real-world delay elapses, the environment doesn't run
   `callback` directly — it places `callback` into the **task queue**.
5. The event loop later moves `callback` from the queue onto the (now
   empty) call stack.

```js
console.log('1');
setTimeout(() => console.log('2'), 0); // handed to environment, NOT run inline
console.log('3');
// Output: 1, 3, 2  <- even with a 0ms delay!
```

Why does `2` print last even with `0ms`? Because step 3 in the sequence
above still applies: the callback can only enter the task queue and then the
stack once the current synchronous code (`console.log('3')`) has finished
and the stack is empty.

## Common Web APIs you'll meet in this curriculum

| API | What it hands to the environment | Comes back via |
|---|---|---|
| `setTimeout` / `setInterval` | A timer | Task queue |
| `fetch` | A network request | Microtask queue (Promise-based) |
| DOM events (`click`, `input`, ...) | Event listener registration | Task queue |
| `XMLHttpRequest` | A network request (older API) | Task queue (callback-based) |
| `queueMicrotask` | A callback to run ASAP | Microtask queue directly |

Note the split: **fetch resolves through the microtask queue** (because
it returns a Promise) while **setTimeout and DOM events use the task
queue**. This distinction is exactly why Promise callbacks tend to run
before `setTimeout` callbacks even when scheduled "at the same time" — see
`04-nested-promises.js` in module 06 for the full breakdown.

## Files here

- `01-setTimeout.js` — the canonical example of environment hand-off
- `02-dom-events.js` — event-driven (not queue-polled) async, conceptually explained for a Node context
- `03-fetch.js` — a Promise-returning Web API, previewing module 07

## Exercises

- `exercises/01-identify-runtime.js`