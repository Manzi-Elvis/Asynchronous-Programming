/**
 * Exercise 01 — Recover from error, correctly
 *
 * Build `fetchWithRetryOnce(operation)` — takes a function
 * `operation` that returns a Promise (simulating some flaky network
 * call). Your job:
 *   - Call operation()
 *   - If it rejects, catch the error and try calling operation() ONE
 *     more time
 *   - If the retry ALSO fails, propagate the final error (don't
 *     swallow it) — but wrap it in a new Error with a message like
 *     'Operation failed after retry: <original message>'
 *   - If either the first or second attempt succeeds, resolve with
 *     that result
 *
 * Test it against a function that fails the first time but succeeds
 * on retry, AND against one that fails both times.
 *
 * Hint: this is a great use case for .catch() returning ANOTHER
 * Promise (the retry attempt) rather than a plain value — refer back
 * to then/03-return-promise.js if needed.
 */

function makeFlakyOperation(failTimes) {
  // Returns a function that fails the first `failTimes` calls, then
  // succeeds. Useful for testing your retry logic.
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
      }, 20);
    });
  };
}

function fetchWithRetryOnce(operation) {
  // your implementation here
}

// --- Your tests below ---

const succeedsOnRetry = makeFlakyOperation(1); // fails once, then succeeds
fetchWithRetryOnce(succeedsOnRetry)
  .then((result) => console.log('succeedsOnRetry ->', result))
  .catch((err) => console.log('succeedsOnRetry unexpectedly failed ->', err.message));

const alwaysFails = makeFlakyOperation(Infinity);
fetchWithRetryOnce(alwaysFails)
  .then((result) => console.log('alwaysFails unexpectedly succeeded ->', result))
  .catch((err) => console.log('alwaysFails ->', err.message));