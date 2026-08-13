/**
 * 06-pool-with-timeout.js
 *
 * Goal: bound how long any SINGLE task in the pool is allowed to
 * run, using the Promise.race timeout pattern from
 * race/02-first-completion.js — a task that hangs shouldn't be able
 * to hold a worker slot forever.
 */

function withTimeout(taskFn, ms) {
  // Wraps a thunk so calling the wrapped version races the real
  // task against a timeout, rejecting if the task takes too long.
  return function timeBoundedTask() {
    return Promise.race([
      taskFn(),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Task timed out after ${ms}ms`)), ms);
      }),
    ]);
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

function task(id, delayMs) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(`result-${id} (took ${delayMs}ms)`), delayMs);
    });
}

async function main() {
  console.log('--- Pool with a 100ms timeout per task ---\n');

  const rawTasks = [
    task(0, 50),  // fine
    task(1, 200), // will time out
    task(2, 30),  // fine
    task(3, 150), // will time out
    task(4, 80),  // fine
  ];

  const timeBoundedTasks = rawTasks.map((t) => withTimeout(t, 100));

  const results = await promisePoolSettled(timeBoundedTasks, 2);

  console.log('Results:');
  results.forEach((r, i) => {
    console.log(`  [${i}]`, r.status === 'fulfilled' ? r.value : `FAILED: ${r.reason.message}`);
  });

  console.log('\nImportant caveat: the timed-out task is NOT actually cancelled —');
  console.log('its setTimeout is still running in the background, it just no');
  console.log('longer holds up the WORKER (the worker moved on to the next item).');
  console.log('True cancellation requires AbortController — see module 09.');
}

main();

/**
 * Combining withRetry + withTimeout is exactly how a production
 * batch-processing pool typically looks: bound how long each attempt
 * can take, and retry a few times before giving up entirely. Try
 * composing both wrappers together as a bonus:
 *   withRetry(withTimeout(task, 100), 3)
 */