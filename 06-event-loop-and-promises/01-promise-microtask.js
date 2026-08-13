/**
 * 01-promise-microtask.js
 *
 * Goal: the simplest possible trace — one Promise, one microtask —
 * done with full "STACK / MICROTASKS / TASKS" bookkeeping shown in
 * comments, to establish the trace method this whole module uses.
 */

console.log('A');

Promise.resolve().then(() => {
  console.log('C');
});

console.log('B');

/**
 * Trace:
 *
 * SYNCHRONOUS PASS:
 *   STACK: [console.log('A')] -> runs immediately, logs 'A', pops
 *   STACK: [Promise.resolve().then(...)] -> schedules the callback
 *          into MICROTASKS, this line itself finishes synchronously
 *   STACK: [console.log('B')] -> runs immediately, logs 'B', pops
 *   STACK: [] (empty, synchronous pass complete)
 *
 *   State after synchronous pass:
 *     MICROTASKS: [ -> logs 'C' ]
 *     TASKS: []
 *
 * EVENT LOOP:
 *   Stack is empty -> drain microtasks
 *     run the one microtask -> logs 'C'
 *   Microtask queue now empty. No tasks to run either.
 *
 * Final order: A, B, C
 */