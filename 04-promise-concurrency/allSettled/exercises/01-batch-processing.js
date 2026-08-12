/**
 * Exercise 01 — Batch processing report
 *
 * Write a function `processBatch(items, processFn)` that:
 *   - Runs `processFn(item)` for every item in `items`, concurrently,
 *     using Promise.allSettled internally.
 *   - Returns an object: { successful: [...values], failed: [{item, error}] }
 *   - `successful` should contain the VALUES from fulfilled promises
 *     (not the raw allSettled result objects).
 *   - `failed` should contain, for each rejected promise, the
 *     ORIGINAL item that failed plus the error message.
 *
 * Test it with the provided `riskyDouble` function, which rejects
 * for negative numbers and fulfills with double the value otherwise.
 */

function riskyDouble(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (n < 0) {
        reject(new Error(`Cannot double a negative number: ${n}`));
        return;
      }
      resolve(n * 2);
    }, 20);
  });
}

function processBatch(items, processFn) {
  // your implementation here
}

async function runTest() {
  const numbers = [1, 2, -3, 4, -5, 6];
  const result = await processBatch(numbers, riskyDouble);

  console.log('Successful:', result.successful); // expect [2, 4, 8, 12]
  console.log('Failed:', result.failed);
  // expect [{ item: -3, error: '...' }, { item: -5, error: '...' }]
}

// runTest();