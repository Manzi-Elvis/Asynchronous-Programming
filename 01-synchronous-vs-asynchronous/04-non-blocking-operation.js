/**
 * 04-non-blocking-operation.js
 *
 * Goal: the non-blocking counterpart to 03 — show that when the
 * "slow" work is genuinely I/O (or simulated I/O via setTimeout,
 * standing in for network/disk), the stack stays free and other
 * things run right on schedule.
 */

console.log('Scheduling a timer for 100ms...');

const timerStart = Date.now();
setTimeout(() => {
  console.log(`Timer fired after ${Date.now() - timerStart}ms (requested: 100ms) — right on time!`);
}, 100);

console.log('Now doing "slow work" the NON-BLOCKING way...');

function nonBlockingFibonacciStep(n, onDone) {
  // A deliberately silly but illustrative technique: instead of
  // computing everything synchronously in one go, we chunk the work
  // and yield back to the event loop between chunks using
  // setTimeout(fn, 0). This keeps the stack from ever being occupied
  // for long, at the cost of the overall computation taking longer
  // wall-clock time (there's no free lunch — CPU work is still CPU
  // work; we're trading total speed for NOT blocking anything else).
  function fib(k) {
    if (k <= 1) return k;
    return fib(k - 1) + fib(k - 2);
  }

  // Simulate "chunking": compute a smaller piece each tick.
  let current = 10;
  const target = n;
  let lastResult = 0;

  function step() {
    if (current > target) {
      onDone(lastResult);
      return;
    }
    lastResult = fib(current);
    current++;
    // Yield back to the event loop before continuing — this is the
    // whole trick. Any pending timer/microtask gets a chance to run
    // between each chunk.
    setTimeout(step, 0);
  }

  step();
}

const fibStart = Date.now();
nonBlockingFibonacciStep(30, (result) => {
  console.log(`Chunked fibonacci finished: ${result}, took ${Date.now() - fibStart}ms`);
});

console.log('This line runs immediately — nonBlockingFibonacciStep returned right away');

/**
 * Compare the timer's reported delay here vs in 03-blocking-operation.js:
 * here it should report close to 100ms, because the chunked Fibonacci
 * computation keeps yielding the stack back to the event loop between
 * pieces, giving the timer's callback repeated chances to run once its
 * delay has elapsed.
 *
 * The tradeoff: the TOTAL time to finish the chunked Fibonacci
 * computation is now LONGER than doing it all synchronously in one
 * shot (each setTimeout(fn, 0) adds real scheduling overhead). This
 * is the fundamental tradeoff of "chunking" CPU work: you sacrifice
 * total throughput to preserve responsiveness. For genuinely
 * heavy CPU work, worker threads (Node's worker_threads module) are
 * the better tool — they get a SEPARATE thread and stack entirely,
 * so there's no tradeoff needed. That's outside this curriculum's
 * scope, but worth knowing the term.
 */