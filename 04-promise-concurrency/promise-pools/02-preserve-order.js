/**
 * 02-preserve-order.js
 *
 * Goal: rigorously prove the pool's results array always matches
 * INPUT order, even when tasks complete in a completely different
 * order (deliberately randomized delays here to make this obvious).
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

function task(id, delayMs) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log(`  task ${id} completed (delay was ${delayMs}ms)`);
        resolve(`result-${id}`);
      }, delayMs);
    });
}

async function main() {
  // Deliberately scrambled delays: id order does NOT match delay
  // order, so completion order will be scrambled too.
  const delays = [120, 20, 90, 10, 150, 40, 70, 30];
  const tasks = delays.map((ms, i) => task(i, ms));

  console.log('Input order (by id): 0, 1, 2, 3, 4, 5, 6, 7');
  console.log('Delays:              120, 20, 90, 10, 150, 40, 70, 30');
  console.log('Watch completion order below (will NOT match input order):\n');

  const results = await promisePool(tasks, 3);

  console.log('\nFinal results array (MUST match input order 0-7):');
  console.log(results);

  const expected = delays.map((_, i) => `result-${i}`);
  const matches = JSON.stringify(results) === JSON.stringify(expected);
  console.log('\nOrder preserved correctly:', matches);
}

main();