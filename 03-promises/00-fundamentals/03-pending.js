/**
 * 03-pending.js
 *
 * Goal: create a Promise that NEVER settles, and understand why this
 * is a real and dangerous bug pattern — any code awaiting it hangs
 * forever, silently, with no error and no crash.
 */

const foreverPending = new Promise((resolve, reject) => {
  // Neither resolve nor reject is ever called. This is legal JS —
  // nothing forces an executor to eventually settle.
  console.log('  executor ran, but will never call resolve or reject');
});

console.log('Created a Promise that will never settle.');
console.log('promise:', foreverPending); // Promise { <pending> } — forever

foreverPending.then(() => {
  console.log('This will NEVER print.');
});

console.log('Script continues normally — an unsettled Promise does not');
console.log('block anything by itself (it is not the same as a blocking');
console.log('call). It just silently never delivers a result.');

/**
 * Where this becomes a REAL bug: if you `await` a Promise like this
 * inside an async function, that function's execution simply pauses
 * forever at that line. No error, no timeout, no crash — just a
 * permanently suspended function. This is a common cause of "my
 * request hangs forever" bugs: a code path inside some async
 * function fails to call resolve/reject on one branch (very similar
 * to the missing-`return`-after-callback bug from module 02, but for
 * Promise executors instead).
 *
 * Real-world triggers for accidentally-pending Promises:
 *   - An executor with an if/else where one branch forgets to call
 *     resolve() or reject()
 *   - A .then() callback that returns a Promise from ANOTHER source
 *     that itself never settles (e.g. a hung network request with no
 *     timeout — see 10-async-patterns/timeout/ for the fix)
 *   - Manually implementing a Promise-returning function and
 *     forgetting to handle a specific error path
 *
 * The defensive pattern (previewed here, covered properly in
 * 10-async-patterns/timeout/) is to race a potentially-hanging
 * Promise against a timeout:
 */

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]);
}

withTimeout(foreverPending, 200)
  .then((v) => console.log('resolved:', v))
  .catch((err) => console.log('\nCaught via timeout guard:', err.message));