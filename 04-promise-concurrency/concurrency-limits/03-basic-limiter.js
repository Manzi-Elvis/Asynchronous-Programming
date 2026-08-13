/**
 * 03-basic-limiter.js
 *
 * Goal: extract the worker-pool idea from 02 into a small, general-
 * purpose, reusable function: `mapWithConcurrencyLimit(items, limit, fn)`.
 * This is the direct precursor to the full "promise pool" utilities
 * built in promise-pools/ — same idea, minimal version.
 */

async function mapWithConcurrencyLimit(items, limit, fn) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex++; // claim this index BEFORE awaiting, so no two
                    // workers ever claim the same item (this line
                    // runs synchronously, so there's no race here
                    // despite multiple workers looping "concurrently")
      results[currentIndex] = await fn(items[currentIndex], currentIndex);
    }
  }

  const workerCount = Math.min(limit, items.length);
  const workers = Array.from({ length: workerCount }, () => worker());
  await Promise.all(workers);

  return results;
}

// --- Demonstration ---

function processItem(item, index) {
  return new Promise((resolve) => {
    const delayMs = 30 + Math.random() * 40;
    setTimeout(() => {
      console.log(`  processed item ${index}: ${item} (took ${Math.round(delayMs)}ms)`);
      resolve(item.toUpperCase());
    }, delayMs);
  });
}

async function main() {
  const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  console.log('--- Processing 8 items with concurrency limit of 3 ---\n');
  const start = Date.now();
  const results = await mapWithConcurrencyLimit(items, 3, processItem);
  console.log(`\nDone in ${Date.now() - start}ms`);
  console.log('Results (order PRESERVED despite concurrent processing):', results);
}

main();

/**
 * Note the key detail that makes this correct: results[currentIndex]
 * = ... uses the ORIGINAL index, captured before any await, so
 * results always end up in the same order as the input `items`
 * array, even though items are processed out of order relative to
 * each other (whichever finishes first, finishes first — but its
 * result still lands in the RIGHT slot). This mirrors Promise.all's
 * order-preservation guarantee, achieved by hand here.
 */