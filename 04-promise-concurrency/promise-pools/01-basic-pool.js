/**
 * 01-basic-pool.js
 *
 * Goal: the canonical promise pool implementation, exercised
 * directly, with the "thunks not promises" rule proven both ways.
 */

async function promisePool(tasks, concurrency) {
  const results = new Array(tasks.length);
  let nextIndex = 0;

  async function runNext() {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex++;
      results[currentIndex] = await tasks[currentIndex]();
    }
  }

  const workerCount = Math.min(concurrency, tasks.length);
  const workers = Array.from({ length: workerCount }, () => runNext());
  await Promise.all(workers);

  return results;
}

function fakeDownload(id) {
  return new Promise((resolve) => {
    const ms = 30 + Math.random() * 50;
    console.log(`  [started] download ${id}`);
    setTimeout(() => {
      console.log(`  [finished] download ${id} (${Math.round(ms)}ms)`);
      resolve(`data-${id}`);
    }, ms);
  });
}

async function main() {
  const ids = Array.from({ length: 10 }, (_, i) => i + 1);

  console.log('--- CORRECT: thunks, work starts only when the pool calls them ---\n');
  const thunks = ids.map((id) => () => fakeDownload(id));
  const start = Date.now();
  const results = await promisePool(thunks, 3);
  console.log(`\nDone in ${Date.now() - start}ms with concurrency 3`);
  console.log('Results:', results);

  console.log('\n\n--- WRONG: pre-started promises defeat the pool entirely ---\n');
  const preStarted = ids.map((id) => fakeDownload(id));
  // Notice: by the time promisePool even gets called below, ALL 10
  // "[started]" logs have ALREADY printed — the pool has nothing
  // left to limit, because every download began the instant
  // fakeDownload(id) was called in the .map() above.
  await promisePool(
    preStarted.map((p) => () => p), // wrapping in a thunk here is too late
    3
  );
}

main();