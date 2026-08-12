/**
 * 03-blocking-operation.js
 *
 * Goal: prove that async code is NOT magically immune to blocking —
 * if a blocking (synchronous) operation runs, it blocks EVERYTHING,
 * including already-in-flight Promises and timers, regardless of how
 * "async" the rest of your program is.
 */

console.log('Scheduling a timer for 100ms...');

const timerStart = Date.now();
setTimeout(() => {
  console.log(`Timer fired after ${Date.now() - timerStart}ms (requested: 100ms)`);
}, 100);

console.log('Now doing a large SYNCHRONOUS blocking operation...');

function blockingFibonacci(n) {
  // Deliberately the slow, naive recursive Fibonacci — O(2^n) — to
  // create real, meaningful blocking time on the call stack.
  if (n <= 1) return n;
  return blockingFibonacci(n - 1) + blockingFibonacci(n - 2);
}

const fibStart = Date.now();
const result = blockingFibonacci(38); // adjust down if this feels too slow on your machine
console.log(`blockingFibonacci(38) = ${result}, took ${Date.now() - fibStart}ms`);
console.log('(the timer above could not fire during ANY of that time)');

/**
 * The 100ms timer will report firing WAY later than 100ms —
 * typically however long blockingFibonacci(38) actually took (often
 * several hundred ms to a few seconds depending on your machine),
 * because the call stack was 100% occupied by synchronous recursion
 * the whole time. The event loop literally cannot check the task
 * queue while the stack has ANY frames on it.
 *
 * This is the single most important practical lesson from this
 * module: "using async code" and "never blocking the event loop" are
 * NOT the same thing. You can write async/await everywhere and still
 * freeze your entire program with one bad synchronous function
 * sitting in the middle of it. The fix for genuinely CPU-heavy work
 * isn't "make it async" (async doesn't remove the CPU cost) — it's
 * offloading it to a worker thread/process, or restructuring it to
 * yield control periodically (see 10-async-patterns and note on
 * CPU-bound vs I/O-bound work below).
 *
 * --- CPU-bound vs I/O-bound, a distinction worth internalizing ---
 * I/O-bound work (network, disk, timers) benefits enormously from
 * async: the WAITING happens off-stack, for free. CPU-bound work
 * (heavy computation, like the Fibonacci above) gets NO benefit from
 * being wrapped in a Promise or awaited — the computation itself
 * still has to run somewhere on SOME thread, occupying it fully.
 * Async only helps you avoid blocking while WAITING, not while
 * COMPUTING.
 */