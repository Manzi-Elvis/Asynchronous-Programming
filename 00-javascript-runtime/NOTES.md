# NOTES — JavaScript Runtime

## JS is single-threaded, the runtime is not

JavaScript the *language* has one call stack and one memory heap. It cannot
do two things "at once" in the language itself. But the environment running
your JS (V8 in Chrome/Node, plus the browser or libuv) has many threads
under the hood — network threads, timer threads, disk I/O threads. Those
threads do work *outside* JS, and hand results back to JS through queues.

This is why `setTimeout(fn, 0)` never runs `fn` immediately: the timer is
handed off to the environment, counted down elsewhere, and only queued for
the stack once the delay elapses AND the stack is empty.

## The four runtime pieces

| Piece | What it holds | Analogy |
|---|---|---|
| Call Stack | Frames of functions currently executing | A stack of plates — last on, first off |
| Heap | Objects, arrays, closures — anything reference-typed | A big warehouse of shelves, referenced by address |
| Web APIs / libuv | Work handed off by JS (timers, network, fs, DOM) | Kitchen staff doing prep work off to the side |
| Queues (task + microtask) | Callbacks waiting for the stack to be empty | A line waiting at the host stand |

## Why this matters for async programming

Every async primitive you'll learn — callbacks, Promises, async/await — is
ultimately just **a different way of scheduling a function to run later,
once the stack is clear**. `setTimeout` schedules into the task queue.
`.then()` schedules into the microtask queue. `await` internally does the
same as `.then()`. None of them create real parallelism in JS itself; they
create *deferred, queued* execution.

## Common misconception to kill early

> "`setTimeout(fn, 1000)` guarantees `fn` runs after 1000ms."

False. It guarantees `fn` runs **no earlier than** 1000ms from now, AND only
once the call stack is empty at that point. If something else is blocking
the stack (a long synchronous loop, or a huge queue of microtasks ahead of
it), `fn` waits longer. Timers are a minimum delay, not a guarantee.

Go into each sub-folder's `NOTES.md` for the deep dive on that piece.