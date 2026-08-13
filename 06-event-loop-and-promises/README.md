# 06 — Event Loop + Promises

Module 00 introduced the event loop, task queue, and microtask queue in
general terms. This module goes deep specifically on how PROMISES
interact with that machinery — the precise ordering rules that make async
code's execution order predictable (even when it looks confusing at
first glance), and the one real danger (microtask starvation) that comes
from misusing that machinery.

By the end of this module you should be able to look at ANY mix of
synchronous code, `setTimeout`, and Promise chains, and correctly predict
the exact output order without running it.

## Files here

- `01-promise-microtask.js` — the baseline: one Promise, one microtask, traced precisely
- `02-then-vs-setTimeout.js` — the classic head-to-head ordering comparison
- `03-multiple-microtasks.js` — several Promise chains interleaving
- `04-nested-promises.js` — Promises that resolve to other Promises, and how that affects timing
- `05-async-await-event-loop.js` — proving async/await follows the exact same rules as raw .then()
- `06-microtask-starvation.js` — a bounded, safe demonstration of the danger from module 00, revisited with full context

## Exercises

- `exercises/01-predict-output-01.js`
- `exercises/02-predict-output-02.js`
- `exercises/03-predict-output-03.js`
- `exercises/04-explain-execution-order.js`

## The rules, restated precisely (memorize these)

1. All currently-executing synchronous code runs to completion before
   anything queued gets a turn.
2. Once the call stack is empty, the ENTIRE microtask queue drains —
   including microtasks that get added WHILE draining is in progress —
   before anything else happens.
3. Only after the microtask queue is completely empty does the event loop
   take exactly ONE callback from the task (macrotask) queue and run it.
4. After that one task callback finishes, go back to step 2 — drain
   microtasks again — before taking the next task.
5. `async function`/`await` follows these same rules exactly, because
   `await` is built on `.then()` under the hood (module 05). There is no
   separate "async/await queue" — it's the same microtask queue.

If you can apply these five rules mechanically to any code sample, you
will get the correct output order every time — this module is entirely
about building that mechanical fluency through repetition.