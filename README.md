
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

## NOTES.MD STRUCTURE:

```
# Topic

## 1. What is it?

Explain the concept in your own words.

## 2. Why does it exist?

What problem does it solve?

## 3. Mental model

Draw a diagram.

## 4. Syntax

Show the basic syntax.

## 5. Example

Give a minimal example.

## 6. Under the hood

Explain what the runtime is doing.

## 7. Common mistakes

Document things that are easy to get wrong.

## 8. When to use it

Explain practical applications.

## 9. When NOT to use it

Explain alternatives.

## 10. Interview questions

Questions you should be able to answer.

## 11. Exercises

List exercises completed.

## 12. Key takeaways

Summarize the concept.


# What each section should teach

## 00-javascript-runtime

 *** You should understand: ***
 ```
 JavaScript code
      ↓
Call Stack
      ↓
Runtime APIs
      ↓
Queues
      ↓
Event Loop
      ↓
Call Stack
```

 ### Core questions: 

#### You should eventually be able to answer:
1. What is the call stack?
2. What is the heap?
3. What does the JavaScript engine execute?
4. What does the browser/Node runtime provide?
5. What is the event loop?
6. What's a task?
7. What's a microtask?
8. Why do Promise callbacks run before setTimeout(..., 0)?

## 01-synchronous-vs-asynchronous

Teach the fundamental distinction.
```js 
const result = calculate();
console.log(result);
```
versus:
```js
const result = await calculateAsync();
console.log(result);
```
But don't stop at syntax.

Teach:
- Blocking
- Non-blocking
- Waiting
- Scheduling
- Latency
- Concurrency
- Why asynchronous programming exists

## 02-callbacks

This answers:
What did JavaScript use before Promises?

Build from:
```
callback
   ↓
async callback
   ↓
error-first callback
   ↓
nested callbacks
   ↓
callback hell
   ↓
inversion of control
   ↓
Promises
```
The important lesson:

Promises weren't created because callbacks were impossible. They were created because managing complex asynchronous control flow with callbacks becomes difficult.

## 03-promises

This is the core of the repository.
You should spend the most time here.
The conceptual progression should be:

```
What is a Promise?
       ↓
Promise states
       ↓
Creating
       ↓
Consuming
       ↓
then()
       ↓
catch()
       ↓
finally()
       ↓
Chaining
       ↓
Error propagation
       ↓
Thenables
       ↓
Resolution
       ↓
Internals
```

## 04-promise-concurrency

This is your senior-level section.
Teach the difference between:

Sequential
``` A → B → C → D ``` 
Concurrent
```
A ──────┐
B ──────┤
C ──────┤
D ──────┘
```

Limited concurrency
```
A ────────┐
B ────────┤
C ────────┤
D ────────┤
E ────────┘
            ↓
F ──────────┐
G ──────────┤
H ──────────┤
```

Then:
```js
Promise.all()
Promise.allSettled()
Promise.race()
Promise.any()
        ↓
Concurrency
        ↓
Concurrency limits
        ↓
Promise Pool ⭐
```
## 05-async-await
Now introduce the nicer syntax.
But teach an important point:

**async/await** does not replace Promises.

It provides a different way of working with them.

For example:
```js
async function getUser() {
    const response = await fetch("/user");
    return response.json();
}
```
is still Promise-based.

## 06-event-loop-and-promises

This should be one of the most important sections.
Give yourself lots of output-prediction challenges.

For example:
```js
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

Promise.resolve().then(() => {
    console.log("3");
});

console.log("4");
```

You should be able to explain:
```
1
4
3
2
```
without guessing.

## 07-fetch-and-web-apis

This connects theory to real development.

Teach:
```
XHR
 ↓
Promise wrapper
 ↓
Fetch
 ↓
Response
 ↓
JSON
 ↓
Promise chain
 ↓
Error handling
```

The Exoplanet Explorer becomes a great project here because it forces you to combine:

Fetch
Promises
chaining
arrays
parallel requests
errors
UI updates
08-nodejs-async

This answers:

"How does asynchronous JavaScript work outside the browser?"

Cover:

fs/promises
HTTP
EventEmitter
Streams
timers
Node's event loop
asynchronous filesystem operations
09-cancellation

Very important advanced concept.

Teach:

Promise
  ≠
Cancellation

A Promise represents an eventual result.

Cancellation is generally handled separately.

Introduce:

AbortController
AbortSignal

Then combine them with:

fetch
timeouts
promise pools
retry
10-async-patterns

This is your production engineering section.

You should learn how to build:

retry()
timeout()
poll()
queue()
scheduler()
rateLimiter()

Then combine them.

For example:

API request
    │
    ├── timeout
    │
    ├── retry
    │
    ├── cancellation
    │
    └── concurrency limit

That's much closer to real backend engineering.

11-testing

Don't consider an async feature complete until you can test it.

Test:

resolved Promises
rejected Promises
async functions
concurrency
retries
timeouts
cancellation
race conditions
ordering
12-debugging

Teach yourself to answer:

"Why did this asynchronous operation execute in this order?"

and:

"Why did this Promise never resolve?"

and:

"Why are 100 requests running simultaneously?"

13-common-mistakes

This folder should be interview gold.

Especially:

Mistake #1
items.forEach(async item => {
    await process(item);
});

Why is this usually wrong?

Mistake #2
const a = await getA();
const b = await getB();
const c = await getC();

when the operations don't depend on each other.

Mistake #3
const promises = items.map(item => process(item));

await Promise.all(promises);

when items contains 100,000 operations and the API has a concurrency limit.

Mistake #4
function getData() {
    return new Promise(resolve => {
        resolve(fetch("/api"));
    });
}

when no Promise wrapper is necessary.

14-build-your-own-promise

This is where the knowledge becomes deep.

Don't immediately try to implement the entire ECMAScript specification.

Build it incrementally:

Step 1
Promise state
       ↓
Step 2
resolve / reject
       ↓
Step 3
then()
       ↓
Step 4
asynchronous reactions
       ↓
Step 5
chaining
       ↓
Step 6
error propagation
       ↓
Step 7
thenables
       ↓
Step 8
resolution procedure
       ↓
Step 9
catch()
       ↓
Step 10
finally()
       ↓
Step 11
Promise.all()
       ↓
Step 12
Promise.race()
       ↓
Step 13
Promise.any()
       ↓
Complete MyPromise

This should be one of the hardest sections.

15-projects

I'd make the difficulty progressively increase.

Project 1 — Callback → Promise

Convert a callback-based API into a Promise API.

Teaches:

callbacks
error-first callbacks
Promise construction
resolve/reject
error propagation
Project 2 — API Client

Build a reusable Promise-based API client.

API Client
├── GET
├── POST
├── error handling
├── retries
└── timeout
Project 3 — Exoplanet Explorer

This reproduces and extends the course project.

Require:

Fetch
Promise chains
parallel requests
error handling
rendering
loading states
Project 4 — Concurrency-Limited Downloader ⭐

Process:

100 resources
maximum 5 active

Requirements:

concurrency limit
preserve ordering
success results
failures
retry
timeout
Project 5 — Async Job Processor

Build a miniature job-processing system:

                 ┌──────────────┐
Jobs ───────────►│    Queue     │
                 └──────┬───────┘
                        ↓
              ┌─────────────────┐
              │ Worker Pool (5) │
              └────────┬────────┘
                       ↓
              ┌─────────────────┐
              │ Retry / Timeout │
              └────────┬────────┘
                       ↓
                    Results
⭐ FINAL PROJECT

This should be significantly harder than the individual projects.

I'd call it:

AsyncFlow — JavaScript Async Job Orchestrator

The final project should combine everything you've learned.

The problem

You're building a system that receives hundreds or thousands of asynchronous jobs.

Example:

const jobs = [
    () => fetchUser(1),
    () => fetchUser(2),
    () => fetchUser(3),
    // ...
];

The system must execute them safely and efficiently.

Required features
1. Concurrency control
const pool = new AsyncPool({
    concurrency: 5
});

Never allow more than 5 active jobs.

2. Promise-based execution

Every job must return a Promise.

3. Result ordering

If jobs are:

A B C D E

and finish:

C A E B D

the final results should still be:

A B C D E
4. Retry
{
    retries: 3
}

Failed jobs should optionally retry.

5. Exponential backoff
attempt 1 → 100ms
attempt 2 → 200ms
attempt 3 → 400ms
6. Timeout
{
    timeout: 5000
}
7. Cancellation
const controller = new AbortController();

pool.run(jobs, {
    signal: controller.signal
});

controller.abort();
8. Error strategies

Support:

fail-fast

and:

all-settled
9. Progress reporting

Something like:

Completed: 37 / 100
Active:     5
Queued:    58
Failed:     2
Retried:    4
10. Rate limiting

For example:

Maximum:
5 concurrent requests

AND

100 requests / minute

This forces you to understand the difference between:

concurrency limiting and rate limiting.

11. Queue management

Jobs should exist in:

QUEUED
   ↓
RUNNING
   ↓
SUCCESS
   │
   └── FAILURE
          │
          ↓
        RETRY
12. Graceful shutdown

If the system is stopped:

Running jobs
    ↓
finish

Queued jobs
    ↓
cancel
Final project architecture

I'd aim for:
```
FINAL-PROJECT/
│
├── src/
│   │
│   ├── pool/
│   │   ├── AsyncPool.js
│   │   ├── Worker.js
│   │   └── scheduler.js
│   │
│   ├── queue/
│   │   └── AsyncQueue.js
│   │
│   ├── retry/
│   │   └── retry.js
│   │
│   ├── timeout/
│   │   └── timeout.js
│   │
│   ├── cancellation/
│   │   └── cancellation.js
│   │
│   ├── rate-limit/
│   │   └── rateLimiter.js
│   │
│   ├── jobs/
│   │   └── Job.js
│   │
│   └── index.js
│
├── tests/
│   ├── pool.test.js
│   ├── queue.test.js
│   ├── retry.test.js
│   ├── timeout.test.js
│   ├── cancellation.test.js
│   ├── rate-limiter.test.js
│   ├── ordering.test.js
│   └── integration.test.js
│
├── README.md
├── REQUIREMENTS.md
├── ARCHITECTURE.md
├── NOTES.md
└── docs/
    ├── architecture.md
    ├── concurrency.md
    ├── error-handling.md
    └── decisions.md
    ```