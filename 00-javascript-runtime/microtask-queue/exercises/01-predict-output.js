/**
 * Exercise 01 — Predict the output
 *
 * Write your prediction as a comment before running.
 */

console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve()
  .then(() => {
    console.log('3');
    return Promise.resolve('4');
  })
  .then((val) => console.log(val));

queueMicrotask(() => console.log('5'));

Promise.resolve().then(() => console.log('6'));

console.log('7');

// Your prediction:
// order: __________________