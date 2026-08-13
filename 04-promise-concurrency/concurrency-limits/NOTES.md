# Concurrency Limits

## Why "just run everything at once" breaks down

`Promise.all(items.map(processItem))` looks clean, but if `items` has
thousands of entries, you're launching thousands of operations
SIMULTANEOUSLY. In practice, this causes real problems:

- **Resource exhaustion**: each in-flight HTTP request holds an open
  socket/file descriptor. Operating systems and Node itself cap how many
  can be open at once (Node's default HTTP agent limits concurrent
  sockets per host too).
- **Rate limiting / bans**: most real APIs rate-limit by IP or API key.
  Firing 5,000 requests at once gets you `429 Too Many Requests` or an
  outright ban, not 5,000 successful responses.
- **Memory spikes**: every in-flight operation holds state in memory
  (response buffers, closures, pending promise machinery) until it
  resolves. Thousands at once can spike memory usage dramatically.
- **Paradoxically SLOWER**: too much simultaneous contention for network
  bandwidth, CPU (parsing/serializing responses), or a downstream
  service's own capacity can make the unbounded version finish LATER
  than a properly bounded one, not faster.

## The fix: bound the number in flight at once

Instead of "all N at once" or "one at a time" (sequential), do "K at a
time" — a fixed, tunable number of operations in flight simultaneously,
with the next one starting as soon as a slot frees up. This is called a
**concurrency limit**, and the data structure that implements it is
typically called a **worker pool** (workers = concurrent execution slots)
or, when applied specifically to Promises, a **promise pool** — covered
in full in `promise-pools/`.

## The core idea, conceptually

```
K = 3 (concurrency limit)

Time ->
Slot 1: [item1]---[item4]------[item7]--
Slot 2: [item2]------[item5]---[item8]--
Slot 3: [item3]---[item6]---------------

At most 3 items are ever "in flight" at once. As soon as one slot's
item finishes, the next queued item takes that slot.
```

## Files here

- `01-why-limits.js` — simulating resource exhaustion with an unbounded run
- `02-worker-model.js` — the conceptual worker-pool model, explained with a simulation
- `03-basic-limiter.js` — a minimal, from-scratch concurrency limiter implementation

## Exercises

- `exercises/01-limit-concurrency.js`
- `exercises/02-build-worker-pool.js`