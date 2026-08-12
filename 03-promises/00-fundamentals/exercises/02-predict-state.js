/**
 * Exercise 02 — Predict the state
 *
 * For each snippet below, without running it, write in a comment:
 *   (a) What state is the Promise in at the moment console.log runs?
 *   (b) What will eventually be logged, and in what order relative
 *       to other logs in the same snippet?
 */

// Snippet 1
const a = new Promise((resolve) => setTimeout(() => resolve('A'), 50));
console.log('snippet 1, immediately after creation:', a);
// Your answer:

// Snippet 2
const b = Promise.resolve('B');
console.log('snippet 2, immediately after creation:', b);
// Your answer:

// Snippet 3
const c = new Promise((resolve, reject) => {
  resolve('first');
  reject(new Error('second, should be ignored'));
});
c.then((v) => console.log('snippet 3 resolved:', v)).catch((e) => console.log('snippet 3 rejected:', e.message));
// Your answer:

// Snippet 4
let resolveLater;
const d = new Promise((resolve) => {
  resolveLater = resolve; // stashing the resolver for later use
});
console.log('snippet 4, state right after creation: still pending');
setTimeout(() => {
  resolveLater('resolved from outside the executor, 100ms later');
}, 100);
d.then((v) => console.log('snippet 4 eventually resolved:', v));
// Your answer: when does d settle, and why is stashing `resolve`
// outside the executor a legitimate, sometimes-useful pattern?

/**
 * Now run the file and check your answers.
 */