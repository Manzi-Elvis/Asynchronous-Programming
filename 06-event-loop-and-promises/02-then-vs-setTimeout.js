/**
 * 02-then-vs-setTimeout.js
 *
 * Goal: the classic, most commonly asked interview question about
 * this topic — why does a .then() callback always run before a
 * setTimeout(fn, 0) callback, even when the setTimeout is written
 * FIRST in the source code?
 */

console.log('1: sync start');

setTimeout(() => {
  console.log('4: setTimeout callback (task queue)');
}, 0);

Promise.resolve().then(() => {
  console.log('3: .then callback (microtask queue)');
});

console.log('2: sync end');

/**
 * Trace:
 *
 * SYNCHRONOUS PASS:
 *   logs '1'
 *   setTimeout(...) called -> environment starts a 0ms timer; once
 *     it elapses, the callback will be placed in TASKS (not
 *     immediately, and not into MICROTASKS)
 *   Promise.resolve().then(...) called -> callback scheduled
 *     directly into MICROTASKS
 *   logs '2'
 *   stack now empty
 *
 *   State:
 *     MICROTASKS: [ -> logs '3' ]
 *     TASKS: [ -> logs '4' ]  (assuming the 0ms elapsed essentially
 *                                instantly, which for a 0ms delay it
 *                                effectively has by this point)
 *
 * EVENT LOOP:
 *   drain microtasks first, ALWAYS, regardless of how "ready" a task
 *   might be -> run -> logs '3'
 *   microtasks empty -> take ONE task -> run -> logs '4'
 *
 * Final order: 1, 2, 3, 4
 *
 * The core reason, restated: microtasks are a COMPLETELY SEPARATE,
 * HIGHER-PRIORITY queue from tasks. It doesn't matter that the timer
 * was registered first, or that 0ms is the shortest possible delay —
 * the event loop's rule is "always fully drain microtasks BEFORE
 * touching the task queue at all," with no exceptions.
 */

// --- Proving this holds even with a much later setTimeout call ---

console.log('\n--- Registering .then() and setTimeout in REVERSED order ---');

setTimeout(() => console.log('7: task (registered FIRST this time)'), 0);
Promise.resolve().then(() => console.log('6: microtask (registered SECOND this time)'));

console.log('5: sync');

// Still: 5, 6, 7 — REGISTRATION ORDER DOES NOT MATTER between the
// two different queue types. Only QUEUE TYPE matters (microtask
// always beats task), and only REGISTRATION order matters WITHIN
// the same queue type.