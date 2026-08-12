/**
 * Exercise 01 — Predict the resolution behavior
 *
 * For each snippet, predict WITHOUT RUNNING:
 *   (a) Does the outer Promise end up fulfilled or rejected?
 *   (b) What is the final value/reason?
 * Then run and check yourself.
 */

// Snippet 1
const s1 = new Promise((resolve) => {
  resolve(Promise.resolve('nested value'));
});
s1.then((v) => console.log('s1:', v)).catch((e) => console.log('s1 rejected:', e));
// Your prediction:

// Snippet 2
const s2 = new Promise((resolve) => {
  resolve(Promise.reject(new Error('nested rejection')));
});
s2.then((v) => console.log('s2:', v)).catch((e) => console.log('s2 rejected:', e.message));
// Your prediction:

// Snippet 3
const s3 = new Promise((resolve, reject) => {
  reject(Promise.resolve('a fulfilled Promise passed to reject'));
});
s3.then((v) => console.log('s3:', v)).catch((e) => {
  console.log('s3 rejected with (check: is it unwrapped or still a Promise?):', e);
});
// Your prediction:

// Snippet 4
const thenable = {
  then(onFulfilled) {
    onFulfilled('thenable value');
  },
};
const s4 = Promise.resolve(thenable);
s4.then((v) => console.log('s4:', v));
// Your prediction:

// Snippet 5 (trickier — a thenable that calls onFulfilled TWICE)
const misbehavingThenable = {
  then(onFulfilled) {
    onFulfilled('first call');
    onFulfilled('second call — should this be honored?');
  },
};
const s5 = Promise.resolve(misbehavingThenable);
s5.then((v) => console.log('s5:', v));
// Your prediction, and WHY (refer to resolution/03-resolve-thenable.js):
