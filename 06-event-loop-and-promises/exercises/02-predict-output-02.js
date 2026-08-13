/**
 * Exercise 02 — Predict the output (nested + async/await mix)
 *
 * Harder: mixes async/await with raw .then() and nested promises.
 * Write your prediction before running.
 */

async function asyncFn() {
  console.log('1');
  await null;
  console.log('3');
  await Promise.resolve();
  console.log('5');
}

console.log('start');

asyncFn();

Promise.resolve()
  .then(() => {
    console.log('2');
    return Promise.resolve();
  })
  .then(() => console.log('4'));

setTimeout(() => console.log('6'), 0);

console.log('end');

// Your prediction:
// order: __________________

/**
 * Hint for checking your work: 'start' and '1' and 'end' are all
 * synchronous (asyncFn runs to its first await, then control
 * returns). Everything else is a microtask race — trace carefully
 * which continuation gets queued at which exact point, using the
 * technique from 04-nested-promises.js and 05-async-await-event-loop.js.
 */
