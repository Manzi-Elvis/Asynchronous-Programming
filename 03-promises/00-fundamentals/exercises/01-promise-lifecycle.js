/**
 * Exercise 01 — Promise lifecycle
 *
 * Build a function `flakyOperation(failureRate)` that returns a
 * Promise which:
 *   - Is pending immediately after being created
 *   - After a random delay between 20-80ms, settles:
 *     - rejects with an Error (message: 'Operation failed') with
 *       probability `failureRate` (a number between 0 and 1)
 *     - otherwise resolves with the string 'Operation succeeded'
 *
 * Then:
 *   1. Call it 5 times with failureRate = 0.5, logging each outcome
 *      (resolved value or caught error message) as it settles.
 *   2. Prove settling is permanent: take ONE of the Promises you
 *      created, and after it has already settled (use a setTimeout
 *      to wait long enough), attach ANOTHER .then()/.catch() to it
 *      and confirm you still get the same original outcome.
 */

function flakyOperation(failureRate) {
  // your implementation here
}

// --- Your test code below ---