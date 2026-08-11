# Task Queue (a.k.a. Macrotask Queue)

## What it is

The task queue holds callbacks from "macrotask" sources: `setTimeout`,
`setInterval`, I/O completion (file reads, network responses handled via
callback-style APIs), and UI events in the browser. The event loop takes
**exactly one** task from this queue per iteration, and only after the
microtask queue has been fully drained.

## FIFO within the queue, but timers add a twist

Tasks are processed first-in-first-out relative to when they become
*eligible* — not necessarily the order they were scheduled in, because
`setTimeout` delays affect eligibility:

```js
setTimeout(() => console.log('A'), 100);
setTimeout(() => console.log('B'), 0);
// B becomes eligible first (shorter delay) -> B, then A
```

But two timers with the *same* delay, scheduled in order, will fire in
that same order:

```js
setTimeout(() => console.log('A'), 0);
setTimeout(() => console.log('B'), 0);
// A, then B — registration order preserved for equal delays
```

## setInterval — a task queue special case

`setInterval` repeatedly enqueues its callback as a task at the given
interval. Important gotcha: if the callback itself takes longer to run
than the interval, or the stack is busy, ticks do NOT queue up and burst —
the environment effectively skips ahead, it doesn't stack up a backlog of
pending intervals waiting to fire back-to-back.

## Files here

- `01-setTimeout-order.js` — delay-based ordering rules, demonstrated
- `02-multiple-tasks.js` — several timers/tasks interleaving with sync code and microtasks

## Exercises

- `exercises/01-predict-order.js`