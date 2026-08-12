/**
 * Exercise 01 — Create a thenable
 *
 * Build `createRetryingThenable(operation, maxAttempts)` — a
 * THENABLE (a plain object with a .then method, NOT a real Promise)
 * that:
 *   - Calls `operation()` (a function returning a Promise)
 *   - If it rejects, retries up to `maxAttempts` total attempts
 *   - Calls onFulfilled with the eventual success value, or
 *     onRejected with the LAST error if all attempts fail
 *
 * Then prove it interoperates correctly with native Promises by:
 *   1. Wrapping it in Promise.resolve(yourThenable) and chaining
 *      .then()/.catch() on the result
 *   2. Returning it from inside a NATIVE Promise's .then() handler
 *      and confirming the chain correctly flattens/waits for it
 *
 * Hint: your thenable's .then(onFulfilled, onRejected) method will
 * need to internally call operation(), catch failures, and retry —
 * you can use real Promises INSIDE your thenable's implementation,
 * the requirement is only that the thenable ITSELF is a plain object
 * exposing .then(), not something created via `new Promise(...)`.
 */

function createRetryingThenable(operation, maxAttempts) {
  return {
    then(onFulfilled, onRejected) {
      // your implementation here
    },
  };
}

// --- Test helpers ---

function makeFlakyOperation(failTimes) {
  let attempts = 0;
  return function operation() {
    attempts++;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (attempts <= failTimes) {
          reject(new Error(`attempt ${attempts} failed`));
        } else {
          resolve(`succeeded on attempt ${attempts}`);
        }
      }, 15);
    });
  };
}

// --- Your tests below ---

const thenable1 = createRetryingThenable(makeFlakyOperation(2), 5);
Promise.resolve(thenable1)
  .then((v) => console.log('test 1 (via Promise.resolve):', v))
  .catch((e) => console.log('test 1 unexpectedly failed:', e.message));

Promise.resolve('start')
  .then(() => createRetryingThenable(makeFlakyOperation(1), 3))
  .then((v) => console.log('test 2 (returned from .then()):', v))
  .catch((e) => console.log('test 2 unexpectedly failed:', e.message));
