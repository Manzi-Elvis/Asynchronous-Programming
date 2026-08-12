# NOTES — Synchronous vs Asynchronous

## Definitions that actually hold up

**Synchronous**: each operation must complete before the next one starts.
The call stack grows and shrinks strictly in the order operations appear in
your code, with nothing else able to run in between.

**Asynchronous**: an operation is *started*, control returns to the caller
immediately (without the result), and the result — if any — arrives later
via a callback, Promise, or await, scheduled through the task or microtask
queue.

## "Async" doesn't mean "parallel"

This is the single most common misunderstanding coming into this topic.
JavaScript has ONE call stack. Asynchronous code in JS is **concurrent**,
not **parallel** — multiple operations can be *in flight* at once (e.g.
three fetch requests all waiting on the network simultaneously), but your
JS code itself never executes two statements at the exact same instant.
The concurrency comes from the environment doing the actual waiting
(network, disk, timers) outside the JS thread; your JS callbacks that
handle the results still run one at a time, on the one stack, one at a
time — see `03-blocking-operation.js` for proof that async code is not
immune to blocking.

## Why bother with async at all, if it's not parallel?

Because most real work an app does is **waiting**, not **computing**:
waiting for a network response, waiting for a disk read, waiting for a
timer, waiting for user input. If JS blocked the entire program during
every wait, a single slow network request would freeze your whole UI or
stall your entire server, unable to serve any other request in the
meantime. Async lets JS say "start this, come back to it when it's ready,
and do other useful work (or nothing, idling cheaply) in the meantime."

## Blocking vs non-blocking, precisely

- **Blocking operation**: occupies the call stack for its full duration.
  Nothing else — no other code, no queued callbacks, no timers — can run
  until it finishes. Example: a synchronous `while` loop, a huge
  synchronous JSON.parse, Node's `fs.readFileSync`.
- **Non-blocking operation**: hands the actual waiting off to the
  environment and returns control to the stack immediately. Example:
  `setTimeout`, `fetch`, Node's `fs.readFile` (callback or Promise-based).

The function names are your biggest hint in Node's standard library:
anything ending in `Sync` (`readFileSync`, `writeFileSync`, `execSync`) is
blocking on purpose, and should almost never be used in a server's request
path — see module 08 for the non-blocking alternatives.

## Files here

See `README.md` for the file list — this NOTES.md is the concept
reference; the numbered files are the hands-on demonstrations.