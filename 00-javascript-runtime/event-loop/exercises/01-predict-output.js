/**
 * Exercise 01 — Predict the output
 *
 * Write your full predicted order as a numbered comment BEFORE
 * running this file. Then run it and compare.
 */

console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve()
  .then(() => console.log('3'))
  .then(() => {
    console.log('4');
    setTimeout(() => console.log('5'), 0);
  });

queueMicrotask(() => console.log('6'));

console.log('7');

// Your prediction:
// order: __________________