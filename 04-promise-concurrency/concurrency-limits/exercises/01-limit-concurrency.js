/**
 * Exercise 01 — Limit concurrency
 *
 * Using `mapWithConcurrencyLimit` from 03-basic-limiter.js (copy the
 * implementation below, or import your own), process 15 "download"
 * tasks with a concurrency limit of 4, and verify — by tracking
 * currently-in-flight count yourself — that it NEVER exceeds 4 at
 * once.
 */

async function mapWithConcurrencyLimit(items, limit, fn) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex++;
      results[currentIndex] = await fn(items[currentIndex], currentIndex);
    }
  }

  const workerCount = Math.min(limit, items.length);
  const workers = Array.from({ length: workerCount }, () => worker());
  await Promise.all(workers);
  return results;
}

// --- Your task: instrument this to track and assert max concurrency ---

let currentlyInFlight = 0;
let maxObserved = 0;

function downloadFile(fileId) {
  // TODO: increment currentlyInFlight, update maxObserved, simulate
  // a delay with setTimeout, then decrement currentlyInFlight and
  // resolve with a result string.
  return new Promise((resolve) => {
    // your implementation here
  });
}

async function runTest() {
  const fileIds = Array.from({ length: 15 }, (_, i) => `file-${i + 1}`);
  const CONCURRENCY_LIMIT = 4;

  await mapWithConcurrencyLimit(fileIds, CONCURRENCY_LIMIT, downloadFile);

  console.log('Max concurrent downloads observed:', maxObserved);
  console.log(
    maxObserved <= CONCURRENCY_LIMIT
      ? 'PASS: never exceeded the limit'
      : 'FAIL: exceeded the concurrency limit!'
  );
}

// runTest();