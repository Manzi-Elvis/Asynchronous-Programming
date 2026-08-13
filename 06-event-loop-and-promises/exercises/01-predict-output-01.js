/**
 * Exercise 01 — Predict the output (basic)
 *
 * Write your full predicted order as a numbered comment BEFORE
 * running. Use the STACK/MICROTASKS/TASKS trace method if needed.
 */

console.log('a');

setTimeout(() => console.log('b'), 0);

Promise.resolve().then(() => console.log('c'));

console.log('d');

Promise.resolve()
  .then(() => console.log('e'))
  .then(() => console.log('f'));

setTimeout(() => console.log('g'), 0);

console.log('h');

// Your prediction:
// order: __________________
