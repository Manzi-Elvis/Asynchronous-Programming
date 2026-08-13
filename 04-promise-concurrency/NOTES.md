# NOTES — Promise Concurrency

## "Concurrency" in JS means "in flight together," not "running in parallel"

As established in module 01: JS has one call stack. When we say two
Promises are running "concurrently," we mean their underlying async
operations (network requests, timers, file reads) are all in progress at
the same time IN THE ENVIRONMENT, not that JS is executing two things at
once. Your `.then()` callbacks for each of them still run one at a time,
on the one stack — they just get INTERLEAVED as each operation's result
becomes available.

## Why the four combinators exist as separate methods

Each answers a genuinely different question:

- `Promise.all` — "give me everything, and if ANYTHING fails, I don't
  want any of it." (all-or-nothing)
- `Promise.allSettled` — "tell me what happened to everything, success or
  failure, I'll handle each individually." (best-effort, partial success
  is fine)
- `Promise.race` — "whichever one finishes first, tell me immediately,
  win or lose." (classic use: implementing a timeout by racing the real
  operation against a rejecting timer)
- `Promise.any` — "give me the first SUCCESS; only tell me if literally
  everything failed." (classic use: trying several redundant servers/
  mirrors, taking whichever responds successfully first)

Picking the wrong one is a real, common bug source: using `Promise.all`
when you actually wanted partial-success semantics means one failed
optional request kills a whole batch that should have mostly succeeded.

## Concurrency limits are not optional in production

Firing off `Promise.all(urls.map(fetchUrl))` for 10,000 URLs at once will:
- exhaust file descriptors / socket limits
- get you rate-limited or IP-banned by the target server
- spike memory (10,000 in-flight response buffers)
- often finish SLOWER than a bounded approach, due to connection
  contention

`concurrency-limits/` and `promise-pools/` cover the standard fix: cap how
many Promises are in flight at once, processing the rest as slots free up.

## Files here

See each sub-topic's own NOTES.md — this file is the conceptual map.
