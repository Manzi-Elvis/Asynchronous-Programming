/**
 * 03-failure.js
 *
 * Goal: see fail-fast behavior in action — the whole Promise.all
 * rejects the instant ANY input rejects, without waiting for the
 * others — and confirm the other Promises keep running regardless.
 */

function delay(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function delayReject(reason, ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(reason)), ms);
  });
}

async function main() {
  console.log('One of these three will reject quickly (50ms), the others are slower...');
  const start = Date.now();

  try {
    const results = await Promise.all([
      delay('slow success (300ms)', 300),
      delayReject('fast failure (50ms)', 50),
      delay('medium success (150ms)', 150),
    ]);
    console.log('Results:', results); // never reached
  } catch (err) {
    console.log(`Promise.all rejected after ${Date.now() - start}ms with:`, err.message);
    // ~50ms, NOT 300ms — Promise.all didn't wait for the slow ones
  }

  console.log('\n--- But the other two promises are STILL running in the background ---');
  console.log('(they were never cancelled, Promise.all just stopped listening)');
}

main();

/**
 * Real-world implication: if you use Promise.all for, say, three
 * independent database writes and one fails fast, the OTHER TWO
 * writes still complete in the background even though your code has
 * already moved into the catch block. If those writes have side
 * effects (they usually do), you can end up with a "partial write"
 * situation that Promise.all's fail-fast behavior doesn't protect
 * you from — it only fails FAST, it does not roll back or cancel
 * anything. Designing for this (e.g. using database transactions, or
 * explicit compensating actions) is a real production concern that
 * Promise.all alone does not solve.
 */