/**
 * 01-basic-any.js
 *
 * Goal: see Promise.any ignore a fast REJECTION and wait for the
 * first SUCCESS instead — the exact opposite behavior from
 * Promise.race in the equivalent scenario (see race/02-first-completion.js).
 */

function succeed(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function fail(reason, ms) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      console.log(`  (rejected: "${reason}" at ${ms}ms — Promise.any ignores this)`);
      reject(new Error(reason));
    }, ms);
  });
}

async function main() {
  console.log('--- Fast rejection (30ms) vs slower success (120ms) ---\n');

  const result = await Promise.any([
    fail('fast failure', 30),
    succeed('slower success', 120),
  ]);

  console.log('\nPromise.any result:', result);
  console.log('(waited PAST the fast rejection for the eventual success —');
  console.log(' Promise.race would have rejected immediately at 30ms instead)');
}

main();