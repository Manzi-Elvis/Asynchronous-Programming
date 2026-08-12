/**
 * 01-basic-allSettled.js
 *
 * Goal: see the exact shape of allSettled's result array, with both
 * a fulfilled and a rejected input side by side.
 */

function succeed(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function fail(reason, ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(reason)), ms));
}

async function main() {
  const results = await Promise.allSettled([
    succeed('value A', 50),
    fail('reason B', 30),
    succeed('value C', 70),
  ]);

  console.log('Full results array:');
  console.log(JSON.stringify(results, null, 2));

  console.log('\nNote: unlike Promise.all, this ALWAYS resolves, never');
  console.log('rejects, no matter how many inputs failed.');

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      console.log(`  [${i}] fulfilled with:`, result.value);
    } else {
      console.log(`  [${i}] rejected with:`, result.reason.message);
    }
  });
}

main();