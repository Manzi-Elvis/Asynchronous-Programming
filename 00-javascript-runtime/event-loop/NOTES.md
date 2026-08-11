# Event Loop

## What it is

The event loop is the mechanism that connects the call stack to the task
and microtask queues. It is NOT part of the JS language — it's part of the
runtime (V8's embedder, i.e. the browser or Node). Conceptually it runs this
loop forever:

```js
while (true) {
  if (callStack.isEmpty()) {
    // 1. Drain the ENTIRE microtask queue, one at a time,
    //    even if new microtasks are added while draining.
    while (microtaskQueue.hasItems()) {
      run(microtaskQueue.dequeue());
    }

    // 2. Take exactly ONE task from the task (macrotask) queue.
    if (taskQueue.hasItems()) {
      run(taskQueue.dequeue());
    }

    // (browser only) possibly render a frame here
  }
}
```

## The single most important rule

> **Microtasks always fully drain before the next macrotask runs — even if
> microtasks keep scheduling MORE microtasks.**

This means a chain of `.then()` calls can, in theory, starve the task queue
entirely if each `.then()` keeps queuing another one (this is called
**microtask starvation**, covered in `microtask-queue/03-microtask-priority.js`
and `06-event-loop-and-promises/06-microtask-starvation.js`).

## Order of priority (highest to lowest)

1. **Currently executing synchronous code** (the call stack) — always finishes first
2. **Microtask queue** — Promise `.then/.catch/.finally`, `queueMicrotask`, `async/await` continuations
3. **Macrotask / task queue** — `setTimeout`, `setInterval`, I/O callbacks, UI events

Only one macrotask is processed per full loop iteration, and the *entire*
microtask queue is drained before and after it.

## Node-specific nuance (worth knowing, detailed in module 08)

Node's event loop has more phases than the browser's simplified model
(timers, pending callbacks, poll, check, close callbacks), plus its own
`process.nextTick` queue which runs with even higher priority than regular
microtasks. We don't need that complexity yet — the simplified
stack/microtask/task model above is enough for 95% of async reasoning, and
we revisit the Node-specific phases in module 08.

## Files here

- `01-basic-event-loop.js` — the loop mechanism made visible via logs
- `02-stack-and-queue.js` — tracing exactly what sits where, when
- `03-blocking.js` — what happens when the stack never empties

## Exercises

- `exercises/01-predict-output.js`
- `exercises/02-event-loop-tracing.js`