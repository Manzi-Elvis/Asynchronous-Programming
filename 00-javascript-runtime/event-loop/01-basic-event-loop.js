/**
 * 01-basic-event-loop.js
 *
 * Goal: see all three priority levels (sync, microtask, macrotask)
 * interleave in the correct, predictable order.
 *
 * PREDICT the full output order before running.
 */

console.log('1: sync - start');

setTimeout(() => {
  console.log('6: macrotask - setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('4: microtask - first .then');
});

Promise.resolve().then(() => {
  console.log('5: microtask - second .then');
});

console.log('2: sync - middle');

queueMicrotask(() => {
  console.log('3: microtask - queueMicrotask (but scheduled after the two .then above, so...)');
});

console.log('2.5: sync - end');

/**
 * Actual order will be:
 *   1: sync - start
 *   2: sync - middle
 *   2.5: sync - end
 *   4: microtask - first .then
 *   5: microtask - second .then
 *   3: microtask - queueMicrotask   <- note: queued AFTER the two .then
 *                                       calls in source order, so it
 *                                       runs after them too. Microtasks
 *                                       run in the order they were
 *                                       ENQUEUED, not some fixed priority
 *                                       between .then and queueMicrotask.
 *   6: macrotask - setTimeout
 *
 * The numbered comments in the log strings above describe the
 * INTENDED conceptual order, but note '3' actually prints after '4'
 * and '5' — that's the whole point of this exercise: source-code
 * order does NOT dictate execution order once you're scheduling
 * things.
 */