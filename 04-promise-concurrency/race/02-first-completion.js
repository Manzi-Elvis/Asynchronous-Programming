/**
 * 02-first-completion.js
 *
 * Goal: prove Promise.race truly means "first to settle" — including
 * when the first to settle is a REJECTION, even though a later
 * Promise in the race would have succeeded.
 */

function succeed(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function fail(reason, ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(reason)), ms));
}

async function main() {
  console.log('--- Race where the FASTEST settler is a REJECTION ---');
  console.log('(a slower success is racing against it, but loses)\n');

  try {
    const result = await Promise.race([
      succeed('this would have succeeded, but too slowly (150ms)', 150),
      fail('fast failure (40ms)', 40),
    ]);
    console.log('Result:', result); // never reached
  } catch (err) {
    console.log('Race rejected with:', err.message);
    console.log('(even though a successful result was on the way at 150ms)');
  }

  console.log('\n--- The timeout pattern this enables ---');

  function withTimeout(promise, ms) {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms);
    });
    return Promise.race([promise, timeoutPromise]);
  }

  const slowOperation = succeed('slow operation result', 300);

  try {
    const result = await withTimeout(slowOperation, 100);
    console.log('Got result within timeout:', result);
  } catch (err) {
    console.log('withTimeout correctly rejected:', err.message);
    // The 300ms operation is STILL running in the background even
    // though we've moved on — race doesn't cancel it, it just stops
    // waiting for it. Real cancellation needs AbortController,
    // covered in module 09.
  }
}

main();