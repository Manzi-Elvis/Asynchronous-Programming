/**
 * 01-why-limits.js
 *
 * Goal: simulate what happens with an unbounded "fire everything at
 * once" approach against a fake service that has a REAL concurrency
 * cap — the fake service starts rejecting requests once too many are
 * in flight simultaneously, standing in for a real API's rate
 * limiting or a server's max-connections limit.
 */

let currentlyInFlight = 0;
let maxObservedInFlight = 0;
const SERVICE_CAPACITY = 5; // the fake service can only handle 5 at once

function callFakeService(id) {
  return new Promise((resolve, reject) => {
    currentlyInFlight++;
    maxObservedInFlight = Math.max(maxObservedInFlight, currentlyInFlight);

    if (currentlyInFlight > SERVICE_CAPACITY) {
      currentlyInFlight--;
      reject(new Error(`Request ${id} rejected: service overloaded (${currentlyInFlight + 1} concurrent requests, capacity is ${SERVICE_CAPACITY})`));
      return;
    }

    setTimeout(() => {
      currentlyInFlight--;
      resolve(`Request ${id} succeeded`);
    }, 50 + Math.random() * 50);
  });
}

async function unboundedAttempt() {
  console.log(`--- Firing 20 requests at once against a service with capacity ${SERVICE_CAPACITY} ---\n`);

  const ids = Array.from({ length: 20 }, (_, i) => i + 1);
  const results = await Promise.allSettled(ids.map((id) => callFakeService(id)));

  const succeeded = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  console.log(`Succeeded: ${succeeded}/20`);
  console.log(`Failed (overloaded): ${failed}/20`);
  console.log(`Max concurrent requests observed: ${maxObservedInFlight}`);
  console.log('\nThis is exactly what happens against a real rate-limited API:');
  console.log('most requests fail, not because the DATA was bad, but because');
  console.log('too many were sent at once. The fix is bounding concurrency,');
  console.log('demonstrated next in 02-worker-model.js and 03-basic-limiter.js.');
}

unboundedAttempt();