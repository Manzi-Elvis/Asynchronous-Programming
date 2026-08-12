/**
 * 01-basic-all.js
 *
 * Goal: the simplest possible Promise.all — three independent
 * "fetches" with different delays, all fulfilling.
 */

function delay(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function main() {
  console.log('Starting three operations concurrently...');
  const start = Date.now();

  const results = await Promise.all([
    delay('result A', 100),
    delay('result B', 50),
    delay('result C', 150),
  ]);

  console.log('All done after', Date.now() - start, 'ms');
  console.log('Results:', results);
  // Total time ~150ms (the SLOWEST one), not 100+50+150=300ms —
  // proof they really ran concurrently, not sequentially.
}

main();

/**
 * Also works with a mix of Promises and plain, already-available
 * values — Promise.all treats non-Promise items as instantly
 * fulfilled with that value.
 */

async function mixedExample() {
  const results = await Promise.all([
    delay('async value', 50),
    'plain value, not a promise at all',
    42,
  ]);
  console.log('\nMixed input results:', results);
}

mixedExample();