
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