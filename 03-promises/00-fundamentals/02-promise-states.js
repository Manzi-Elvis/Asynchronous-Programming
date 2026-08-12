/**
 * 02-promise-states.js
 *
 * Goal: watch a Promise move through pending -> fulfilled (or
 * rejected) with explicit logging around the transition, to make the
 * otherwise-invisible state change visible in program output.
 */

function makeObservablePromise(shouldSucceed, delayMs) {
  console.log(`  [state: pending] Promise created, will settle in ${delayMs}ms`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        console.log('  [state: pending -> fulfilled] resolving now');
        resolve({ status: 'ok', data: 42 });
      } else {
        console.log('  [state: pending -> rejected] rejecting now');
        reject(new Error('something went wrong'));
      }
    }, delayMs);
  });
}

console.log('--- Successful path ---');
const successPromise = makeObservablePromise(true, 50);
successPromise
  .then((result) => console.log('  .then() received:', result))
  .catch((err) => console.log('  .catch() received:', err.message));

setTimeout(() => {
  console.log('\n--- Failing path ---');
  const failPromise = makeObservablePromise(false, 50);
  failPromise
    .then((result) => console.log('  .then() received:', result))
    .catch((err) => console.log('  .catch() received:', err.message));
}, 100);

/**
 * Notice the ORDER: the "[state: pending]" log always happens
 * synchronously, immediately, when the Promise is constructed. The
 * "[state: pending -> X]" log happens later, inside the executor's
 * setTimeout. And the .then()/.catch() logs happen LATER STILL —
 * they're scheduled as microtasks in response to the state
 * transition, not the instant the transition itself happens.
 *
 * This three-phase timing (construct synchronously -> settle later
 * -> handlers run even later, as microtasks) is true for EVERY
 * Promise, no exceptions.
 */