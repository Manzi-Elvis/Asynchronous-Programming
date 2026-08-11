/**
 * 01-promise-microtasks.js
 *
 * Goal: see that EVERY .then/.catch/.finally callback is scheduled
 * as a microtask, even when the Promise is already resolved.
 */

console.log('1: sync start');

const alreadyResolved = Promise.resolve('value');

alreadyResolved.then((val) => {
  // Even though the Promise was ALREADY resolved the instant it was
  // created, this callback does NOT run synchronously. It's still
  // deferred to the microtask queue.
  console.log('3: .then callback ran (a microtask):', val);
});

console.log('2: sync end');

// Output: 1, 2, 3 — never 1, 3, 2, no matter how "instant" the
// Promise's resolution was.

console.log('\n--- .catch and .finally are ALSO microtasks ---');

Promise.reject(new Error('boom'))
  .catch((err) => {
    console.log('catch ran as a microtask:', err.message);
    return 'recovered';
  })
  .finally(() => {
    console.log('finally ran as a microtask too, after catch resolved it');
  });

console.log('this sync line still runs before any of the above');

/**
 * Practical rule: NOTHING attached with .then/.catch/.finally ever
 * runs synchronously, even for an instantly-resolved or
 * instantly-rejected Promise. This guarantees consistent, predictable
 * async behavior — you never have to wonder "will this callback run
 * now or later?" The answer is always "later, but before the next task."
 */