/**
 * 01-consume-promise.js
 *
 * Goal: the basic .then(onFulfilled, onRejected) two-argument shape.
 */

function randomOutcome() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('success value');
      } else {
        reject(new Error('failure reason'));
      }
    }, 20);
  });
}

// Two-argument .then() form: BOTH outcomes handled in one call.
randomOutcome().then(
  (value) => console.log('onFulfilled:', value),
  (reason) => console.log('onRejected:', reason.message)
);

/**
 * This works, but has a real limitation demonstrated in
 * 03-rejection-handler.js: the onRejected argument here ONLY catches
 * a rejection of THIS SPECIFIC Promise. If the onFulfilled handler
 * itself throws, that throw is NOT caught by the onRejected argument
 * of the SAME .then() call — it produces a new, separately-rejected
 * Promise instead. This is the core reason .catch() (chained
 * separately) is the idiomatic choice — see the catch/ sub-topic.
 */

console.log('\n--- Explicit fulfilled/rejected Promises, immediately consumed ---');

Promise.resolve('fulfilled value').then(
  (v) => console.log('resolved path:', v),
  (r) => console.log('rejected path (should not run):', r)
);

Promise.reject(new Error('rejected value')).then(
  (v) => console.log('resolved path (should not run):', v),
  (r) => console.log('rejected path:', r.message)
);