/**
 * Exercise 01 — Build a promise pool from scratch
 *
 * This is the exact "implement bounded concurrency" interview
 * question. Do NOT copy from 01-basic-pool.js — implement it fresh
 * to prove you actually understand the mechanism, not just that you
 * can transcribe it.
 *
 * Implement `promisePool(tasks, concurrency)`:
 *   - `tasks`: array of THUNKS (functions with no args, each
 *     returning a Promise) — not already-started promises.
 *   - `concurrency`: max number of tasks running at once.
 *   - Returns a Promise resolving to an array of results, IN INPUT
 *     ORDER, once all tasks have completed.
 *   - Behavior on failure: fail-fast, like Promise.all (reject the
 *     whole pool with the first error encountered; you do not need
 *     to stop already-in-flight tasks, but don't START new ones
 *     after a failure).
 *
 * Test with the provided harness below — do not modify the tests,
 * only your implementation.
 */

function promisePool(tasks, concurrency) {
  // your implementation here
}

// --- Test harness (do not modify) ---

function task(id, delayMs, shouldFail = false) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error(`task ${id} failed`));
          return;
        }
        resolve(`result-${id}`);
      }, delayMs);
    });
}

async function runTests() {
  console.log('--- Test 1: basic correctness, order preserved ---');
  const tasks1 = [task(0, 50), task(1, 10), task(2, 30), task(3, 20)];
  const results1 = await promisePool(tasks1, 2);
  console.log('Results:', results1);
  console.log(
    'PASS:',
    JSON.stringify(results1) === JSON.stringify(['result-0', 'result-1', 'result-2', 'result-3'])
  );

  console.log('\n--- Test 2: concurrency limit respected ---');
  let inFlight = 0;
  let maxInFlight = 0;
  const trackedTasks = Array.from({ length: 10 }, (_, i) => () => {
    inFlight++;
    maxInFlight = Math.max(maxInFlight, inFlight);
    return new Promise((resolve) => {
      setTimeout(() => {
        inFlight--;
        resolve(i);
      }, 20);
    });
  });
  await promisePool(trackedTasks, 3);
  console.log('Max concurrent observed:', maxInFlight);
  console.log('PASS:', maxInFlight <= 3);

  console.log('\n--- Test 3: fail-fast on error ---');
  const tasks3 = [task(0, 10), task(1, 10, true), task(2, 50)];
  try {
    await promisePool(tasks3, 2);
    console.log('FAIL: expected rejection');
  } catch (err) {
    console.log('PASS: rejected with', err.message);
  }

  console.log('\n--- Test 4: concurrency >= tasks.length behaves like Promise.all ---');
  const tasks4 = [task(0, 10), task(1, 5), task(2, 8)];
  const results4 = await promisePool(tasks4, 100);
  console.log('Results:', results4);
  console.log('PASS:', results4.length === 3);
}

// runTests();