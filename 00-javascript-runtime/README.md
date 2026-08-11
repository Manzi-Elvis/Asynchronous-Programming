# 00 — JavaScript Runtime

Before any of the async syntax (callbacks, Promises, async/await) makes
sense, you need a mental model of the machine underneath it. JavaScript
itself is single-threaded — one call stack, one thing executing at a time.
Everything that feels "async" is actually the **runtime environment**
(browser or Node) doing work outside that single thread, then handing
results back through queues that the stack drains when it's empty.

## Sub-topics, in order

1. **call-stack/** — how synchronous execution actually works, frame by frame
2. **heap/** — where objects/values live, primitives vs references
3. **web-apis/** — the APIs the *environment* provides that JS itself doesn't have (timers, DOM events, fetch)
4. **event-loop/** — the mechanism that connects the stack to the queues
5. **task-queue/** — the "macrotask" queue (setTimeout, setInterval, I/O)
6. **microtask-queue/** — the higher-priority queue (Promises, queueMicrotask)

## The one diagram that matters

```
   ┌───────────────┐
   │   Call Stack  │  <- synchronous code executes here, LIFO
   └───────┬───────┘
           │ empty?
           ▼
   ┌───────────────────────────────┐
   │         Event Loop            │  <- checks: is the stack empty?
   └───────┬───────────────┬───────┘
           │ yes           │
           ▼               │
 1. Drain ALL microtasks   │
    (Promise .then/.catch, │
     queueMicrotask)       │
           │               │
           ▼               │
 2. Take ONE task from     │
    the task queue         │
    (setTimeout, I/O,      │
     UI events)            │
           │               │
           └───────────────┘
           (repeat forever)

   Web APIs (browser) / libuv (Node) run timers, network calls,
   file I/O OUTSIDE the call stack, then push callbacks into
   the microtask or task queue when the work finishes.
```

The rule that explains almost every "weird" async output you'll ever see:

> **The stack must be completely empty before the event loop touches any
> queue. And ALL microtasks are drained before a single task is taken.**

Everything in this module builds toward being able to predict execution
order for any mix of synchronous code, `setTimeout`, and Promises — that
skill is what the rest of the curriculum is built on.