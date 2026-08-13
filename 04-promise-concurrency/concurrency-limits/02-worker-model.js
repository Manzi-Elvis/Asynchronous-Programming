/**
 * 02-worker-model.js
 *
 * Goal: implement the SAME "call fake service" scenario as 01, but
 * using a small number of "worker" loops instead of firing
 * everything at once — each worker pulls the next item from a shared
 * queue only once it's finished its current one. This is the
 * conceptual model behind every concurrency limiter, made explicit
 * before 03 shows a more compact/generalized implementation.
 */

const SERVICE_CAPACITY = 5;
let currentlyInFlight = 0;
let maxObservedInFlight = 0;

function callFakeService(id) {
  return new Promise((resolve, reject) => {
    currentlyInFlight++;
    maxObservedInFlight = Math.max(maxObservedInFlight, currentlyInFlight);

    if (currentlyInFlight > SERVICE_CAPACITY) {
      currentlyInFlight--;
      reject(new Error(`Request ${id} rejected: overloaded`));
      return;
    }

    setTimeout(() => {
      currentlyInFlight--;
      resolve(`Request ${id} succeeded`);
    }, 50 + Math.random() * 50);
  });
}

async function runWithWorkerPool(ids, concurrency) {
  const queue = [...ids]; // shared mutable queue every worker pulls from
  const results = [];

  async function worker(workerId) {
    while (queue.length > 0) {
      const id = queue.shift(); // claim the next item — no two workers get the same one
      try {
        const result = await callFakeService(id);
        results.push({ id, status: 'fulfilled', value: result });
      } catch (err) {
        results.push({ id, status: 'rejected', reason: err.message });
      }
      // loop continues: as soon as THIS worker's current item is
      // done, it immediately grabs the next one from the queue —
      // this is the "slot frees up, next item takes it" behavior
    }
  }

  // Launch exactly `concurrency` workers, all pulling from the same
  // queue concurrently. This is the entire mechanism — no more than
  // `concurrency` items are ever in flight at once, because there
  // are only `concurrency` workers to hold them.
  const workers = Array.from({ length: concurrency }, (_, i) => worker(i + 1));
  await Promise.all(workers);

  return results;
}

async function main() {
  const ids = Array.from({ length: 20 }, (_, i) => i + 1);
  const CONCURRENCY = 4; // stay comfortably under the service's capacity of 5

  console.log(`--- Running 20 requests with a worker pool of ${CONCURRENCY} ---\n`);

  const results = await runWithWorkerPool(ids, CONCURRENCY);
  const succeeded = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  console.log(`Succeeded: ${succeeded}/20`);
  console.log(`Failed (overloaded): ${failed}/20`);
  console.log(`Max concurrent requests observed: ${maxObservedInFlight}`);
  console.log('\nWith concurrency capped below the service capacity, EVERY');
  console.log('request should succeed — compare this to 01-why-limits.js,');
  console.log('where firing all 20 at once caused most to fail.');
}

main();