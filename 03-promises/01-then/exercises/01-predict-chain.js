/**
 * Exercise 01 — Predict the chain's output
 *
 * Write your prediction (values AND order) as a comment before
 * running.
 */

Promise.resolve(5)
  .then((n) => {
    console.log('A:', n);
    return n * 2;
  })
  .then((n) => {
    console.log('B:', n);
    if (n > 5) {
      throw new Error('too big');
    }
    return n;
  })
  .then((n) => {
    console.log('C (should be skipped):', n);
    return n + 1;
  })
  .catch((err) => {
    console.log('D, caught:', err.message);
    return 'recovered';
  })
  .then((v) => {
    console.log('E:', v);
  });

// Your prediction:
// A: ?
// B: ?
// C or D: ?
// E: ?