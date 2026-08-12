/**
 * 01-rejection.js
 *
 * Goal: exercise all five rejection sources named in NOTES.md,
 * proving they all funnel into the same .catch() mechanism.
 */

async function demonstrateAll() {
  console.log('--- 1. Explicit reject() in an executor ---');
  await new Promise((_, reject) => reject(new Error('explicit reject')))
    .catch((e) => console.log('  caught:', e.message));

  console.log('\n--- 2. Synchronous throw in an executor ---');
  await new Promise(() => {
    throw new Error('thrown in executor');
  }).catch((e) => console.log('  caught:', e.message));

  console.log('\n--- 3. Synchronous throw inside a .then() handler ---');
  await Promise.resolve('start')
    .then(() => {
      throw new Error('thrown in .then()');
    })
    .catch((e) => console.log('  caught:', e.message));

  console.log('\n--- 4. Returning a rejected Promise from .then() ---');
  await Promise.resolve('start')
    .then(() => Promise.reject(new Error('rejected Promise returned from .then()')))
    .catch((e) => console.log('  caught:', e.message));

  console.log('\n--- 5. Promise.reject() directly ---');
  await Promise.reject(new Error('direct Promise.reject()')).catch((e) => console.log('  caught:', e.message));
}

demonstrateAll();

/**
 * Every one of these five distinct SOURCES of failure is caught by
 * an ordinary .catch() with identical-looking code. This uniformity
 * is deliberate and is one of the biggest ergonomic wins of Promises
 * — you write your error handling ONCE, at the right point in the
 * chain, and it doesn't matter which of these five things actually
 * caused the failure underneath.
 */
