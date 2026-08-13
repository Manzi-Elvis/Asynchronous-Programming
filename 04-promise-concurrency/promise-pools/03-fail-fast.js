/**
 * 03-fail-fast.js
 *
 * Goal: a promise pool variant that STOPS launching new tasks as
 * soon as one fails, and rejects overall with that error — mirroring
 * Promise.all's fail-fast semantics, but concurrency-bounded.
 *
 * This is genuinely trickier than the basic pool: we need a way to
 * signal ALL workers to stop pulling new tasks the instant one fails,
 * not just let the failing worker stop.
 */

async function promisePoolFailFast(tasks, concurrency) {
  const results = new Array(tasks.length);
  let nextIndex = 0;
  let stopped = false;
  let firstError = null;

  async function runNext() {
    while (nextIndex < tasks.length && !stopped) {
      const currentIndex = nextIndex++;
      try {
        results[currentIndex] = await tasks[currentIndex]();
      } catch (err) {
        // Signal every other worker to stop claiming new work.
        // Existing in-flight tasks in OTHER workers still finish
        // naturally (we don't forcibly cancel them — plain Promises
        // can't be cancelled, see module 09 for AbortController),
        // but no NEW tasks will be started after this point.
        stopped = true;
        if (!firstError) {
          firstError = err; // keep only the FIRST error, like Promise.all
        }
        return;
      }
    }
  }

  const workerCount = Math.min(concurrency, tasks.length);
  const workers = Array.from({ length: workerCount }, () => runNext());
  await Promise.all(workers);

  if (firstError) {
    throw firstError;
  }

  return results;
}

function task(id, delayMs, shouldFail = false) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          console.log(`  task ${id} FAILED`);
          reject(new Error(`Task ${id} failed`));
          return;
        }
        console.log(`  task ${id} succeeded`);
        resolve(`result-${id}`);
      }, delayMs);
    });
}

async function main() {
  console.log('--- Pool of 10 tasks, concurrency 3, task 4 fails fast (20ms) ---\n');

  const tasks = [
    task(0, 60),
    task(1, 70),
    task(2, 80),
    task(3, 90),
    task(4, 20, true), // fails quickly
    task(5, 100),
    task(6, 110),
    task(7, 120),
    task(8, 130),
    task(9, 140),
  ];

  try {
    await promisePoolFailFast(tasks, 3);
    console.log('This should not print');
  } catch (err) {
    console.log('\nPool rejected with:', err.message);
    console.log('Notice how few tasks beyond the failure point got to start —');
    console.log('workers stopped claiming NEW work as soon as `stopped` flipped,');
    console.log('though a couple already-in-flight tasks may still finish above.');
  }
}

main();