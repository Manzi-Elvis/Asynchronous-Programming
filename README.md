    # Asynchronous Programming

A hands-on, ground-up curriculum for mastering asynchronous JavaScript — from
how the runtime actually schedules work, up through callbacks, Promises,
async/await, cancellation, patterns used in production systems, and a final
project that ties everything together.

Every topic folder follows the same shape:

```
topic/
├── NOTES.md          <- concepts, mental models, gotchas
├── 01-*.js ...        <- runnable demonstration files
└── exercises/         <- problems to solve yourself, no solutions given
```

Run any file with:

```bash
node path/to/file.js
```

## How to use this repo

1. Read `NOTES.md` in a folder first.
2. Run each numbered demo file and **predict the output before you run it**.
   This is the single highest-leverage habit for learning the event loop.
3. Attempt the exercises without looking at the demo files again.
4. Move to the next folder in order — later modules assume earlier ones.

## Curriculum map

| # | Module | What it builds |
|---|--------|-----------------|
| 00 | JavaScript Runtime | Call stack, heap, Web APIs, event loop, task queue, microtask queue |
| 01 | Sync vs Async | The core distinction, blocking vs non-blocking |
| 02 | Callbacks | Callback style, error-first convention, callback hell, inversion of control |
| 03 | Promises | States, creation, consumption, chaining, error handling, internals |
| 04 | Promise Concurrency | all/allSettled/race/any, sequential vs concurrent, pools, limits |
| 05 | Async/Await | Syntax sugar over Promises, try/catch, common mistakes |
| 06 | Event Loop + Promises | Microtask vs macrotask ordering in depth |
| 07 | Fetch & Web APIs | fetch, XHR, geolocation, clipboard, file API |
| 08 | Node.js Async | fs, timers, EventEmitter, streams, http |
| 09 | Cancellation | AbortController / AbortSignal, timeouts |
| 10 | Async Patterns | retry, timeout, polling, queues, schedulers, rate limiting |
| 11 | Testing | Testing promises, rejections, timeouts, retries |
| 12 | Debugging | Unhandled rejections, async stack traces, race conditions |
| 13 | Common Mistakes | The 10 mistakes almost everyone makes |
| 14 | Build Your Own Promise | Implement Promises/A+ from scratch |
| 15 | Projects | 5 progressively harder projects + a final capstone |

## Status

- [x] Scaffolding for all 16 modules
- [x] Module 00 — JavaScript Runtime (complete)
- [x] Module 01 — Sync vs Async
- [x] Module 02 — Callbacks
- [x] Module 03 — Promises
- [x] Module 04 — Promise Concurrency
- [x] Module 05 — Async/Await
- [x] Module 06 — Event Loop + Promises
- [x] Module 07 — Fetch & Web APIs
- [ ] Module 08 — Node.js Async
- [ ] Module 09 — Cancellation
- [ ] Module 10 — Async Patterns
- [ ] Module 11 — Testing
- [ ] Module 12 — Debugging
- [ ] Module 13 — Common Mistakes
- [ ] Module 14 — Build Your Own Promise
- [ ] Module 15 — Projects

I'm building this one module at a time so each one is actually complete
rather than thin.

## PROJECT STRUCTURE
```
Asynchronous Programming/
│
├── README.md
├── package.json
├── .gitignore
├── LICENSE
│
├── 00-javascript-runtime/
│   │
│   ├── README.md
│   ├── NOTES.md
│   │
│   ├── call-stack/
│   │   ├── NOTES.md
│   │   ├── 01-basic-stack.js
│   │   ├── 02-function-execution.js
│   │   ├── 03-stack-overflow.js
│   │   └── exercises/
│   │       ├── 01-predict-output.js
│   │       └── 02-trace-stack.js
│   │
│   ├── heap/
│   │   ├── NOTES.md
│   │   ├── 01-primitives-vs-references.js
│   │   ├── 02-objects-and-memory.js
│   │   └── exercises/
│   │       └── 01-reference-tracing.js
│   │
│   ├── web-apis/
│   │   ├── NOTES.md
│   │   ├── 01-setTimeout.js
│   │   ├── 02-dom-events.js
│   │   ├── 03-fetch.js
│   │   └── exercises/
│   │       └── 01-identify-runtime.js
│   │
│   ├── event-loop/
│   │   ├── NOTES.md
│   │   ├── 01-basic-event-loop.js
│   │   ├── 02-stack-and-queue.js
│   │   ├── 03-blocking.js
│   │   └── exercises/
│   │       ├── 01-predict-output.js
│   │       └── 02-event-loop-tracing.js
│   │
│   ├── task-queue/
│   │   ├── NOTES.md
│   │   ├── 01-setTimeout-order.js
│   │   ├── 02-multiple-tasks.js
│   │   └── exercises/
│   │       └── 01-predict-order.js
│   │
│   └── microtask-queue/
│       ├── NOTES.md
│       ├── 01-promise-microtasks.js
│       ├── 02-queueMicrotask.js
│       ├── 03-microtask-priority.js
│       └── exercises/
│           ├── 01-predict-output.js
│           └── 02-microtask-vs-task.js
│
├── 01-synchronous-vs-asynchronous/
│   ├── README.md
│   ├── NOTES.md
│   ├── 01-synchronous.js
│   ├── 02-asynchronous.js
│   ├── 03-blocking-operation.js
│   ├── 04-non-blocking-operation.js
│   ├── 05-timing.js
│   └── exercises/
│       ├── 01-convert-sync-to-async.js
│       └── 02-predict-execution.js
│
├── 02-callbacks/
│   │
│   ├── README.md
│   ├── NOTES.md
│   │
│   ├── callbacks/
│   │   ├── NOTES.md
│   │   ├── 01-basic-callback.js
│   │   ├── 02-async-callback.js
│   │   ├── 03-callback-as-argument.js
│   │   └── exercises/
│   │       └── 01-build-callback-api.js
│   │
│   ├── error-first-callbacks/
│   │   ├── NOTES.md
│   │   ├── 01-node-style-callback.js
│   │   ├── 02-success-and-error.js
│   │   └── exercises/
│   │       └── 01-create-error-first-api.js
│   │
│   ├── callback-hell/
│   │   ├── NOTES.md
│   │   ├── 01-nested-callbacks.js
│   │   ├── 02-real-world-example.js
│   │   └── exercises/
│   │       └── 01-refactor-callback-hell.js
│   │
│   └── inversion-of-control/
│       ├── NOTES.md
│       ├── 01-control-problems.js
│       ├── 02-callback-contracts.js
│       └── exercises/
│           └── 01-identify-ioc.js
│
├── 03-promises/
│   │
│   ├── README.md
│   ├── NOTES.md
│   │
│   ├── fundamentals/
│   │   ├── NOTES.md
│   │   ├── 01-what-is-a-promise.js
│   │   ├── 02-promise-states.js
│   │   ├── 03-pending.js
│   │   ├── 04-fulfilled.js
│   │   ├── 05-rejected.js
│   │   ├── 06-settled.js
│   │   └── exercises/
│   │       ├── 01-promise-lifecycle.js
│   │       └── 02-predict-state.js
│   │
│   ├── creating-promises/
│   │   ├── NOTES.md
│   │   ├── 01-new-promise.js
│   │   ├── 02-resolve.js
│   │   ├── 03-reject.js
│   │   ├── 04-executor.js
│   │   ├── 05-synchronous-executor.js
│   │   ├── 06-throw-in-executor.js
│   │   └── exercises/
│   │       ├── 01-create-delay.js
│   │       └── 02-wrap-callback.js
│   │
│   ├── consuming-promises/
│   │   ├── NOTES.md
│   │   ├── 01-consume-promise.js
│   │   ├── 02-success-handler.js
│   │   ├── 03-rejection-handler.js
│   │   └── exercises/
│   │       └── 01-consume-api.js
│   │
│   ├── then/
│   │   ├── NOTES.md
│   │   ├── 01-basic-then.js
│   │   ├── 02-return-values.js
│   │   ├── 03-return-promise.js
│   │   ├── 04-missing-handler.js
│   │   ├── 05-then-is-always-async.js
│   │   └── exercises/
│   │       ├── 01-predict-chain.js
│   │       └── 02-build-chain.js
│   │
│   ├── catch/
│   │   ├── NOTES.md
│   │   ├── 01-basic-catch.js
│   │   ├── 02-catch-propagation.js
│   │   ├── 03-catch-recovery.js
│   │   └── exercises/
│   │       └── 01-recover-from-error.js
│   │
│   ├── finally/
│   │   ├── NOTES.md
│   │   ├── 01-basic-finally.js
│   │   ├── 02-cleanup.js
│   │   ├── 03-finally-return.js
│   │   └── exercises/
│   │       └── 01-resource-cleanup.js
│   │
│   ├── chaining/
│   │   ├── NOTES.md
│   │   ├── 01-basic-chain.js
│   │   ├── 02-transform-values.js
│   │   ├── 03-chain-async-operations.js
│   │   ├── 04-chain-errors.js
│   │   └── exercises/
│   │       ├── 01-user-profile-chain.js
│   │       └── 02-multi-step-workflow.js
│   │
│   ├── thenables/
│   │   ├── NOTES.md
│   │   ├── 01-what-is-thenable.js
│   │   ├── 02-custom-thenable.js
│   │   ├── 03-thenable-assimilation.js
│   │   └── exercises/
│   │       └── 01-create-thenable.js
│   │
│   ├── resolution/
│   │   ├── NOTES.md
│   │   ├── 01-resolve-value.js
│   │   ├── 02-resolve-promise.js
│   │   ├── 03-resolve-thenable.js
│   │   ├── 04-resolution-vs-fulfillment.js
│   │   └── exercises/
│   │       └── 01-predict-resolution.js
│   │
│   ├── error-handling/
│   │   ├── NOTES.md
│   │   ├── 01-rejection.js
│   │   ├── 02-throwing-in-then.js
│   │   ├── 03-error-propagation.js
│   │   ├── 04-recovery.js
│   │   ├── 05-unhandled-rejection.js
│   │   └── exercises/
│   │       ├── 01-error-chain.js
│   │       └── 02-design-error-strategy.js
│   │
│   └── promise-internals/
│       ├── NOTES.md
│       ├── 01-promise-capability.js
│       ├── 02-reactions.js
│       ├── 03-promise-jobs.js
│       ├── 04-reaction-queue.js
│       ├── 05-settlement.js
│       └── exercises/
│           └── 01-trace-promise-internals.js
│
├── 04-promise-concurrency/
│   │
│   ├── README.md
│   ├── NOTES.md
│   │
│   ├── all/
│   │   ├── NOTES.md
│   │   ├── 01-basic-all.js
│   │   ├── 02-ordering.js
│   │   ├── 03-failure.js
│   │   └── exercises/
│   │       └── 01-fetch-all.js
│   │
│   ├── allSettled/
│   │   ├── NOTES.md
│   │   ├── 01-basic-allSettled.js
│   │   ├── 02-success-and-failure.js
│   │   └── exercises/
│   │       └── 01-batch-processing.js
│   │
│   ├── race/
│   │   ├── NOTES.md
│   │   ├── 01-basic-race.js
│   │   ├── 02-first-completion.js
│   │   └── exercises/
│   │       └── 01-fastest-response.js
│   │
│   ├── any/
│   │   ├── NOTES.md
│   │   ├── 01-basic-any.js
│   │   ├── 02-all-rejected.js
│   │   └── exercises/
│   │       └── 01-first-success.js
│   │
│   ├── sequential/
│   │   ├── NOTES.md
│   │   ├── 01-sequential-await.js
│   │   ├── 02-reduce-chain.js
│   │   └── exercises/
│   │       └── 01-sequential-pipeline.js
│   │
│   ├── concurrent/
│   │   ├── NOTES.md
│   │   ├── 01-start-together.js
│   │   ├── 02-promise-all.js
│   │   ├── 03-measuring-concurrency.js
│   │   └── exercises/
│   │       └── 01-sequential-vs-concurrent.js
│   │
│   ├── concurrency-limits/
│   │   ├── NOTES.md
│   │   ├── 01-why-limits.js
│   │   ├── 02-worker-model.js
│   │   ├── 03-basic-limiter.js
│   │   └── exercises/
│   │       ├── 01-limit-concurrency.js
│   │       └── 02-build-worker-pool.js
│   │
│   └── promise-pools/
│       ├── NOTES.md
│       ├── 01-basic-pool.js
│       ├── 02-preserve-order.js
│       ├── 03-fail-fast.js
│       ├── 04-all-settled-pool.js
│       ├── 05-pool-with-retry.js
│       ├── 06-pool-with-timeout.js
│       └── exercises/
│           ├── 01-build-promise-pool.js
│           ├── 02-build-concurrency-limiter.js
│           └── 03-process-100-urls.js
│
├── 05-async-await/
│   ├── README.md
│   ├── NOTES.md
│   ├── 01-async-function.js
│   ├── 02-await.js
│   ├── 03-return-values.js
│   ├── 04-try-catch.js
│   ├── 05-finally.js
│   ├── 06-sequential-await.js
│   ├── 07-concurrent-await.js
│   ├── 08-await-promise-all.js
│   ├── 09-top-level-await.js
│   ├── 10-common-mistakes.js
│   └── exercises/
│       ├── 01-convert-promises-to-async-await.js
│       ├── 02-optimize-sequential-await.js
│       └── 03-build-async-workflow.js
│
├── 06-event-loop-and-promises/
│   ├── README.md
│   ├── NOTES.md
│   ├── 01-promise-microtask.js
│   ├── 02-then-vs-setTimeout.js
│   ├── 03-multiple-microtasks.js
│   ├── 04-nested-promises.js
│   ├── 05-async-await-event-loop.js
│   ├── 06-microtask-starvation.js
│   └── exercises/
│       ├── 01-predict-output-01.js
│       ├── 02-predict-output-02.js
│       ├── 03-predict-output-03.js
│       └── 04-explain-execution-order.js
│
├── 07-fetch-and-web-apis/
│   ├── README.md
│   ├── NOTES.md
│   ├── fetch/
│   │   ├── 01-basic-fetch.js
│   │   ├── 02-response.js
│   │   ├── 03-json.js
│   │   ├── 04-http-errors.js
│   │   └── exercises/
│   │       └── 01-api-client.js
│   │
│   ├── xhr/
│   │   ├── NOTES.md
│   │   ├── 01-xhr.js
│   │   ├── 02-ready-state.js
│   │   ├── 03-xhr-to-promise.js
│   │   └── exercises/
│   │       └── 01-wrap-xhr.js
│   │
│   ├── web-apis/
│   │   ├── NOTES.md
│   │   ├── 01-geolocation.js
│   │   ├── 02-clipboard.js
│   │   └── 03-file-api.js
│   │
│   └── exoplanet-explorer/
│       ├── README.md
│       ├── NOTES.md
│       ├── 01-fetch-planets.js
│       ├── 02-display-planets.js
│       ├── 03-fetch-details.js
│       ├── 04-error-handling.js
│       └── 05-parallel-requests.js
│
├── 08-nodejs-async/
│   ├── README.md
│   ├── NOTES.md
│   ├── fs/
│   │   ├── 01-callback-api.js
│   │   ├── 02-fs-promises.js
│   │   └── 03-read-write.js
│   ├── timers/
│   │   ├── 01-setTimeout.js
│   │   ├── 02-setImmediate.js
│   │   └── 03-timers-promises.js
│   ├── events/
│   │   ├── 01-event-emitter.js
│   │   ├── 02-events-vs-promises.js
│   │   └── 03-converting-events.js
│   ├── streams/
│   │   ├── 01-readable-stream.js
│   │   ├── 02-pipeline.js
│   │   └── 03-stream-promises.js
│   └── http/
│       ├── 01-http-request.js
│       ├── 02-http-server.js
│       └── 03-async-api.js
│
├── 09-cancellation/
│   ├── README.md
│   ├── NOTES.md
│   ├── AbortController/
│   │   ├── 01-basic-abort.js
│   │   ├── 02-abort-fetch.js
│   │   └── exercises/
│   │       └── 01-cancel-request.js
│   ├── AbortSignal/
│   │   ├── 01-signal.js
│   │   ├── 02-aborted-state.js
│   │   └── 03-abort-event.js
│   └── timeouts/
│       ├── 01-timeout-race.js
│       ├── 02-abort-timeout.js
│       └── exercises/
│           └── 01-build-timeout.js
│
├── 10-async-patterns/
│   │
│   ├── README.md
│   ├── NOTES.md
│   │
│   ├── retry/
│   │   ├── NOTES.md
│   │   ├── 01-basic-retry.js
│   │   ├── 02-retry-count.js
│   │   ├── 03-exponential-backoff.js
│   │   └── exercises/
│   │       └── 01-build-retry.js
│   │
│   ├── timeout/
│   │   ├── NOTES.md
│   │   ├── 01-promise-timeout.js
│   │   ├── 02-timeout-with-abort.js
│   │   └── exercises/
│   │       └── 01-build-timeout.js
│   │
│   ├── polling/
│   │   ├── NOTES.md
│   │   ├── 01-basic-poll.js
│   │   ├── 02-poll-until.js
│   │   └── exercises/
│   │       └── 01-job-poller.js
│   │
│   ├── queues/
│   │   ├── NOTES.md
│   │   ├── 01-basic-queue.js
│   │   ├── 02-async-queue.js
│   │   └── exercises/
│   │       └── 01-task-queue.js
│   │
│   ├── schedulers/
│   │   ├── NOTES.md
│   │   ├── 01-basic-scheduler.js
│   │   ├── 02-delayed-tasks.js
│   │   └── exercises/
│   │       └── 01-build-scheduler.js
│   │
│   └── rate-limiting/
│       ├── NOTES.md
│       ├── 01-request-limit.js
│       ├── 02-token-bucket.js
│       ├── 03-sliding-window.js
│       └── exercises/
│           └── 01-build-rate-limiter.js
│
├── 11-testing/
│   ├── README.md
│   ├── NOTES.md
│   ├── 01-testing-promises.test.js
│   ├── 02-testing-rejections.test.js
│   ├── 03-testing-async.test.js
│   ├── 04-testing-concurrency.test.js
│   ├── 05-testing-timeouts.test.js
│   ├── 06-testing-retries.test.js
│   └── 07-testing-abort.test.js
│
├── 12-debugging/
│   ├── README.md
│   ├── NOTES.md
│   ├── 01-unhandled-rejection.js
│   ├── 02-debug-async-stack.js
│   ├── 03-debug-promise-chain.js
│   ├── 04-debug-concurrency.js
│   └── exercises/
│       ├── 01-find-the-race.js
│       └── 02-find-the-leak.js
│
├── 13-common-mistakes/
│   ├── README.md
│   ├── NOTES.md
│   ├── 01-forEach-with-async.js
│   ├── 02-forgotten-return.js
│   ├── 03-unnecessary-promise.js
│   ├── 04-await-in-loop.js
│   ├── 05-swallowed-errors.js
│   ├── 06-unhandled-rejections.js
│   ├── 07-promise-all-misuse.js
│   ├── 08-race-condition.js
│   ├── 09-too-many-concurrent-requests.js
│   └── 10-mixed-callback-promise.js
│
├── 14-build-your-own-promise/
│   ├── README.md
│   ├── NOTES.md
│   ├── 00-requirements.md
│   ├── 01-basic-state.js
│   ├── 02-resolve-reject.js
│   ├── 03-then.js
│   ├── 04-chaining.js
│   ├── 05-error-propagation.js
│   ├── 06-thenables.js
│   ├── 07-resolution-procedure.js
│   ├── 08-catch.js
│   ├── 09-finally.js
│   ├── 10-all.js
│   ├── 11-allSettled.js
│   ├── 12-race.js
│   ├── 13-any.js
│   ├── 14-complete-promise.js
│   ├── tests/
│   │   ├── basic.test.js
│   │   ├── chaining.test.js
│   │   ├── errors.test.js
│   │   ├── thenables.test.js
│   │   └── static-methods.test.js
│   └── final/
│       ├── MyPromise.js
│       ├── README.md
│       └── tests.test.js
│
├── 15-projects/
│   │
│   ├── 01-callback-to-promise/
│   │   ├── README.md
│   │   ├── NOTES.md
│   │   ├── starter/
│   │   ├── solution/
│   │   └── tests/
│   │
│   ├── 02-api-client/
│   │   ├── README.md
│   │   ├── NOTES.md
│   │   ├── starter/
│   │   ├── solution/
│   │   └── tests/
│   │
│   ├── 03-exoplanet-explorer/
│   │   ├── README.md
│   │   ├── NOTES.md
│   │   ├── starter/
│   │   ├── solution/
│   │   └── tests/
│   │
│   ├── 04-concurrency-limited-downloader/
│   │   ├── README.md
│   │   ├── NOTES.md
│   │   ├── starter/
│   │   ├── solution/
│   │   └── tests/
│   │
│   ├── 05-async-job-processor/
│   │   ├── README.md
│   │   ├── NOTES.md
│   │   ├── starter/
│   │   ├── solution/
│   │   └── tests/
│   │
│   └── FINAL-PROJECT/
│       ├── README.md
│       ├── REQUIREMENTS.md
│       ├── ARCHITECTURE.md
│       ├── NOTES.md
│       ├── starter/
│       │   ├── src/
│       │   └── tests/
│       ├── solution/
│       │   ├── src/
│       │   └── tests/
│       └── docs/
│           ├── architecture.md
│           ├── concurrency.md
│           ├── error-handling.md
│           └── decisions.md
│
└── docs/
    ├── learning-roadmap.md
    ├── glossary.md
    ├── promise-cheatsheet.md
    ├── event-loop-cheatsheet.md
    ├── concurrency-cheatsheet.md
    └── interview-questions.md