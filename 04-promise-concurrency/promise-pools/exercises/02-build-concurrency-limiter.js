/**
 * Exercise 02 — Build a general concurrency limiter (class-based)
 *
 * Some interviewers ask for this as a reusable CLASS rather than a
 * one-shot function — useful when tasks arrive dynamically over time
 * rather than as one upfront array. Implement a `ConcurrencyLimiter`
 * class:
 *
 *   const limiter = new ConcurrencyLimiter(3); // max 3 concurrent
 *   const result = await limiter.run(() => someAsyncTask());
 *
 * Requirements:
 *   - `run(taskFn)` accepts a thunk, and returns a Promise that
 *     resolves/rejects with that task's own outcome.
 *   - If fewer than `concurrency` tasks are currently running, the
 *     new task starts IMMEDIATELY.
 *   - If `concurrency` tasks are already running, the new task
 *     WAITS in an internal queue until a slot frees up.
 *   - Multiple calls to `run()` can happen at ANY time, not just
 *     upfront — this is the key difference from the array-based
 *     promisePool from exercise 01.
 *   - Add a `pending` getter that returns how many tasks are
 *     currently queued (not yet started).
 *   - Add an `active` getter that returns how many tasks are
 *     currently running.
 */

class ConcurrencyLimiter {
  constructor(concurrency) {
    // your implementation here
  }

  run(taskFn) {
    // your implementation here
  }

  get pending() {
    // your implementation here
  }

  get active() {
    // your implementation here
  }
}

// --- Test harness ---

function delay(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function runTests() {
  const limiter = new ConcurrencyLimiter(2);

  console.log('--- Launching 5 tasks against a limiter of 2 ---');
  const promises = [
    limiter.run(() => delay('A', 50)),
    limiter.run(() => delay('B', 50)),
    limiter.run(() => delay('C', 50)),
    limiter.run(() => delay('D', 50)),
    limiter.run(() => delay('E', 50)),
  ];

  console.log('Immediately after launching: active =', limiter.active, ', pending =', limiter.pending);
  console.log('(expect active=2, pending=3, since only 2 slots exist)');

  const results = await Promise.all(promises);
  console.log('\nAll results:', results);
  console.log('active after completion:', limiter.active, ', pending:', limiter.pending);

  console.log('\n--- Dynamic arrival: adding a task mid-stream ---');
  const first = limiter.run(() => delay('first', 80));
  setTimeout(() => {
    console.log('  adding a task 30ms after the first started, while it is still running');
  }, 30);
  const secondPromise = new Promise((resolve) => {
    setTimeout(async () => {
      const result = await limiter.run(() => delay('second (added late)', 20));
      resolve(result);
    }, 30);
  });

  const [firstResult, secondResult] = await Promise.all([first, secondPromise]);
  console.log('first:', firstResult, '| second:', secondResult);
}

// runTests();