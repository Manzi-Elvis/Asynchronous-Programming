/**
 * 05-timing.js
 *
 * Goal: directly measure and compare sequential-blocking, sequential-
 * async (awaited one at a time), and concurrent-async (started
 * together) timing for the "same" three fake I/O operations, so the
 * cost/benefit of each approach is visible in real numbers rather
 * than just theory. (Full concurrency patterns are module 04 — this
 * is just the timing preview.)
 */

function simulateIO(label, ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${label} done`), ms);
  });
}

async function sequentialBlockingStyle() {
  // Blocking equivalent: three busy-waits back to back on the stack.
  const start = Date.now();
  function busyWaitMs(ms) {
    const end = Date.now() + ms;
    while (Date.now() < end) {}
  }
  busyWaitMs(100);
  busyWaitMs(100);
  busyWaitMs(100);
  return Date.now() - start;
}

async function sequentialAsync() {
  // Awaiting one at a time: each await waits for the previous to
  // fully finish before starting the next. Total time = sum of all.
  const start = Date.now();
  await simulateIO('task A', 100);
  await simulateIO('task B', 100);
  await simulateIO('task C', 100);
  return Date.now() - start;
}

async function concurrentAsync() {
  // Starting all three at once, THEN awaiting: total time = the
  // SLOWEST one, not the sum, because they're all in flight
  // simultaneously (the environment is doing 3 timers at once, not
  // JS doing 3 things at once — the concurrency is in the environment).
  const start = Date.now();
  const promiseA = simulateIO('task A', 100);
  const promiseB = simulateIO('task B', 100);
  const promiseC = simulateIO('task C', 100);
  await Promise.all([promiseA, promiseB, promiseC]);
  return Date.now() - start;
}

async function main() {
  const blockingTime = await sequentialBlockingStyle();
  console.log(`Blocking (3x busy-wait, back to back):     ~${blockingTime}ms`);

  const sequentialTime = await sequentialAsync();
  console.log(`Async, sequential (await one at a time):   ~${sequentialTime}ms`);

  const concurrentTime = await concurrentAsync();
  console.log(`Async, concurrent (all started together):  ~${concurrentTime}ms`);

  console.log('\nNotice: blocking and sequential-async take roughly the SAME');
  console.log('total time (~300ms) — being "async" alone does not speed');
  console.log('anything up if you still await everything one at a time.');
  console.log('Concurrent-async is the ~3x win, because the environment');
  console.log('runs all three timers in parallel while JS just waits once.');
}

main();

/**
 * This is the single most important practical takeaway of this
 * module: async/await syntax by itself does not create concurrency.
 * `await x(); await y();` is STILL sequential — y doesn't start until
 * x resolves. Real concurrency requires deliberately starting
 * multiple operations before awaiting any of them, which is exactly
 * what module 04-promise-concurrency is dedicated to.
 */