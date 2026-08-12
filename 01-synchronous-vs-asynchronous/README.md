# 01 — Synchronous vs Asynchronous

Module 00 gave you the machine (stack, heap, queues, event loop). This
module names the distinction that machine exists to support: **synchronous**
code runs immediately, in order, blocking everything else until it's done.
**Asynchronous** code kicks off work and lets the rest of the program
continue, picking the result back up later via the queues you just learned
about.

## Files here

- `01-synchronous.js` — a fully synchronous program, top to bottom
- `02-asynchronous.js` — the same shape of program, made async
- `03-blocking-operation.js` — what "blocking" costs you, concretely
- `04-non-blocking-operation.js` — the non-blocking equivalent, side by side
- `05-timing.js` — measuring the actual wall-clock difference

## Exercises

- `exercises/01-convert-sync-to-async.js`
- `exercises/02-predict-execution.js`

## The core distinction, in one table

| | Synchronous | Asynchronous |
|---|---|---|
| Execution | Line by line, each line waits for the previous to finish | Some lines kick off work and return immediately; the result arrives later |
| Blocks the stack? | Yes, for its entire duration | No — the waiting happens off-stack, in the environment |
| Order of completion | Always matches source order | Can differ from source order |
| Example | `const x = 2 + 2;` | `setTimeout(...)`, `fetch(...)`, `fs.readFile(...)` |

Everything from here forward — callbacks, Promises, async/await — is a
different *syntax* for writing asynchronous code. The underlying behavior
(non-blocking, queue-based, order not guaranteed to match source order)
never changes; only how readable it is to write and reason about changes.