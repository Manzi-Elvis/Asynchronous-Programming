# Microtask Queue

## What it is

The microtask queue holds callbacks from Promise resolution
(`.then/.catch/.finally`), `queueMicrotask()`, and — under the hood —
`async/await` continuations (every `await` is sugar for a `.then()`).
It has **strictly higher priority** than the task queue: the event loop
drains the *entire* microtask queue before it's allowed to take even one
task from the task queue.

## The draining rule, precisely

> After the currently running piece of code (sync code, or a single
> task/microtask callback) finishes, the engine keeps running microtasks
> — including any NEW ones added during this draining pass — until the
> microtask queue is completely empty. Only then can a task run, or in a
> browser, only then can a frame be painted.

This is different from the task queue, which only takes ONE item per loop
iteration. Microtasks don't get that courtesy — they all run, no matter how
many pile up, before anything else gets a turn.

## Why microtasks exist as a separate, higher-priority queue

Promises need to resolve "as soon as possible" relative to other pending
work, without waiting for a full task-queue round trip (which in a browser
could mean waiting behind a repaint or another event). Microtasks give
Promise chains a way to run eagerly and consistently, right after the
current synchronous execution context, before the browser does anything
else.

## The danger: microtask starvation

Because microtasks can queue MORE microtasks, and all of them get drained
before any task runs, a self-perpetuating chain of `.then()` calls can
starve the task queue indefinitely — timers never fire, I/O callbacks never
run, because the event loop never gets past step 1 (draining microtasks).
See `03-microtask-priority.js` for a demonstration (safely bounded so it
doesn't actually hang).

## Files here

- `01-promise-microtasks.js` — .then/.catch/.finally as microtasks
- `02-queueMicrotask.js` — the explicit microtask-scheduling API
- `03-microtask-priority.js` — microtasks queuing more microtasks, and starvation

## Exercises

- `exercises/01-predict-output.js`
- `exercises/02-microtask-vs-task.js`