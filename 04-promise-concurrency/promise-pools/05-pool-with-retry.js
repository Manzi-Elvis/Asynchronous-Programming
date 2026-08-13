/**
 * 05-pool-with-retry.js
 *
 * Goal: add automatic retry-on-failure to individual tasks WITHIN
 * the pool, before giving up on that task entirely — a very common
 * real-world requirement (transient network errors shouldn't fail
 * an entire batch job).
 *
 * We build a minimal retry helper here; the FULL retry pattern
 * (exponential backoff, jitter, etc.) gets its own dedicated module
 * at 10-async-patterns/retry/ — this is the pool-specific version.
 */

function withRetry(taskFn, maxAttempts) {
  // Wraps a thunk so that calling the WRAPPED thunk automatically
  // retries the underlying task up to maxAttempts times before
  // finally rejecting.
  return async function retryingTask() {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await taskFn();
      } catch (err) {
        lastError = err;
        console.log(`    retry: attempt ${attempt}/${maxAttempts} failed (${err.message})`);
      }
    }
    throw lastError;
  };
}

async function promisePoolSettled(tasks, concurrency) {
  const results = new Array(tasks.length);
  let nextIndex = 0;

  async function runNext() {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex++;
      try {
        const value = await tasks[currentIndex]();
        results[currentIndex] = { status: 'fulfilled', value };
      } catch (reason) {
        results[currentIndex] = { status: 'rejected', reason };
      }
    }
  }

  const workerCount = Math.min(concurrency, tasks.length);
  const workers = Array.from({ length: workerCount }, () => runNext());
  await Promise.all(workers);
  return results;
}

// A task that fails a few times before eventually succeeding —
// simulating a flaky network call.
function flakyTask(id, failuresBeforeSuccess) {
  let attempts = 0;
  return () =>
    new Promise((resolve, reject) => {
      attempts++;
      setTimeout(() => {
        if (attempts <= failuresBeforeSuccess) {
          reject(new Error(`transient failure (attempt ${attempts})`));
          return;
        }
        resolve(`result-${id} (succeeded on attempt ${attempts})`);
      }, 20);
    });
}

async function main() {
  console.log('--- Pool with per-task retry (max 3 attempts each) ---\n');

  const rawTasks = [
    flakyTask('A', 0), // succeeds first try
    flakyTask('B', 1), // fails once, then succeeds
    flakyTask('C', 2), // fails twice, then succeeds
    flakyTask('D', 5), // fails more than maxAttempts allows — will ultimately fail
  ];

  const tasksWithRetry = rawTasks.map((t) => withRetry(t, 3));

  const results = await promisePoolSettled(tasksWithRetry, 2);

  console.log('\nFinal outcomes:');
  results.forEach((r, i) => {
    console.log(`  [${i}]`, r.status === 'fulfilled' ? r.value : `FAILED: ${r.reason.message}`);
  });
}

main();