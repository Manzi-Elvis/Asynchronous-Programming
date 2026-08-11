/**
 * Exercise 02 — Full trace, in writing
 *
 * For the code below, produce a WRITTEN trace (as comments) modeled
 * after the trace in 02-stack-and-queue.js: show the STACK,
 * MICROTASKS, and TASKS lists changing over time, not just the final
 * output order. This is the skill that actually transfers to
 * debugging real code.
 */

function a() {
  console.log('a: start');
  b();
  console.log('a: end');
}

function b() {
  console.log('b: start');
  setTimeout(() => console.log('b: timeout'), 0);
  Promise.resolve().then(() => console.log('b: microtask'));
  console.log('b: end');
}

a();

Promise.resolve().then(() => console.log('top-level microtask'));

console.log('top-level sync');

/**
 * Your trace here:
 *
 * SYNCHRONOUS PASS:
 *   STACK: ...
 *   MICROTASKS: ...
 *   TASKS: ...
 *
 * EVENT LOOP:
 *   step 1: ...
 *   step 2: ...
 *   ...
 *
 * Final order: ...
 */