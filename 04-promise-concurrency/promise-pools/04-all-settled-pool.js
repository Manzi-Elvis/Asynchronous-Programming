/**
 * 04-all-settled-pool.js
 *
 * Goal: the allSettled-flavored pool — never aborts early, always
 * runs every task, and returns a full outcome report (mirroring
 * Promise.allSettled's shape) rather than throwing on first failure.
 */

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
      // No early exit here — every task always runs, regardless of
      // earlier failures. This is the whole difference from
      // promisePoolFailFast in 03.
    }
  }

  const workerCount = Math.min(concurrency, tasks.length);
  const workers = Array.from({ length: workerCount }, () => runNext());
  await Promise.all(workers);

  return results;
}

function task(id, delayMs, shouldFail = false) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error(`Task ${id} failed`));
          return;
        }
        resolve(`result-${id}`);
      }, delayMs);
    });
}

async function main() {
  console.log('--- Pool of 8 tasks, concurrency 3, tasks 2 and 5 fail ---\n');

  const tasks = [
    task(0, 40),
    task(1, 60),
    task(2, 20, true),
    task(3, 80),
    task(4, 50),
    task(5, 30, true),
    task(6, 70),
    task(7, 90),
  ];

  const results = await promisePoolSettled(tasks, 3);

  console.log('Full outcome report, in input order:');
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      console.log(`  [${i}] fulfilled: ${r.value}`);
    } else {
      console.log(`  [${i}] rejected: ${r.reason.message}`);
    }
  });

  const succeeded = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;
  console.log(`\n${succeeded} succeeded, ${failed} failed — ALL 8 tasks ran to completion`);
  console.log('(compare with 03-fail-fast.js, where later tasks never even started)');
}

main();