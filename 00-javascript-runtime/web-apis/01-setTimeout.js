/**
 * 01-setTimeout.js
 *
 * Goal: prove that setTimeout hands work OFF the call stack, and that
 * even a 0ms delay does not mean "run immediately."
 */

console.log('A: synchronous, runs first');

setTimeout(() => {
  console.log('C: runs AFTER all sync code, even with 0ms delay');
}, 0);

console.log('B: synchronous, runs second');

// Output order: A, B, C — never A, C, B.

/**
 * Why:
 * setTimeout(callback, 0) does NOT mean "run callback in 0
 * milliseconds." It means "the environment will make callback
 * ELIGIBLE to run after at least 0ms AND after the current call
 * stack is completely empty." Since 'B' is still synchronous code on
 * the stack when setTimeout is called, it always finishes first.
 */

console.log('\n--- Proving the delay is a MINIMUM, not a guarantee ---');

const start = Date.now();

setTimeout(() => {
  console.log(`Scheduled for 100ms, actually fired after ${Date.now() - start}ms`);
}, 100);

// Block the stack synchronously for ~300ms with a busy loop.
// This proves the timer can't fire until the stack is free, no
// matter what the requested delay was.
function blockFor(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    // intentionally burning CPU synchronously
  }
}

blockFor(300);
console.log('Blocking loop finished, stack about to clear...');

// The 100ms timer will report firing at ~300ms+, NOT 100ms, because
// the stack was busy the whole time and the event loop had no chance
// to run it earlier.