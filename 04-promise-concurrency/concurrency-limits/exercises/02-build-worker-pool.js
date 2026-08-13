/**
 * Exercise 02 — Build a worker pool from scratch (no peeking at 03!)
 *
 * Without looking back at 03-basic-limiter.js, implement your OWN
 * version of a concurrency-limited mapper called
 * `runWithLimit(items, limit, asyncFn)`.
 *
 * Requirements:
 *   - Never more than `limit` calls to asyncFn in flight at once.
 *   - Returns a Promise resolving to results in the SAME ORDER as
 *     the input `items`, regardless of completion order.
 *   - If `limit` is greater than or equal to items.length, it should
 *     behave equivalently to Promise.all.
 *   - If any asyncFn call rejects, decide (and document your choice
 *     in a comment) whether runWithLimit should:
 *       (a) fail-fast like Promise.all, or
 *       (b) continue processing remaining items and collect errors
 *           like Promise.allSettled
 *     Implement whichever you choose, clearly.
 *
 * Test with the provided `flakyTask`.
 */

function flakyTask(item, index) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (item === 'poison') {
        reject(new Error(`Task ${index} failed: poisoned item`));
        return;
      }
      resolve(`processed-${item}`);
    }, 20 + Math.random() * 30);
  });
}

function runWithLimit(items, limit, asyncFn) {
  // your implementation here
}

async function runTests() {
  console.log('--- Test: 10 items, limit 3, all succeed ---');
  const items = Array.from({ length: 10 }, (_, i) => `item-${i}`);
  const results = await runWithLimit(items, 3, flakyTask);
  console.log('Results:', results);

  console.log('\n--- Test: one poison item ---');
  const itemsWithPoison = ['a', 'b', 'poison', 'c'];
  try {
    const results2 = await runWithLimit(itemsWithPoison, 2, flakyTask);
    console.log('Results (allSettled-style):', results2);
  } catch (err) {
    console.log('Rejected (fail-fast style):', err.message);
  }
}

// runTests();

// Your design decision, explained:
// (a) fail-fast / (b) collect-all-errors — and why: