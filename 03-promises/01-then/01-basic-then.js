/**
 * 01-basic-then.js
 *
 * Goal: prove .then() always returns a NEW Promise, distinct from
 * the original, by comparing identity directly.
 */

const original = Promise.resolve(10);
const afterThen = original.then((n) => n * 2);

console.log('original === afterThen:', original === afterThen); // false — always a new Promise

original.then((v) => console.log('original resolves to:', v)); // 10, unchanged
afterThen.then((v) => console.log('afterThen resolves to:', v)); // 20, the transformed value

/**
 * The original Promise is completely untouched by .then() — it
 * still resolves to its own original value (10) for anyone else who
 * subscribes to IT. .then() creates an entirely separate Promise
 * that represents "the result of running this handler on the
 * original's value."
 */

console.log('\n--- Chaining relies entirely on this "always new Promise" behavior ---');

Promise.resolve(1)
  .then((n) => {
    console.log('step 1, got:', n);
    return n + 1;
  })
  .then((n) => {
    console.log('step 2, got:', n);
    return n + 1;
  })
  .then((n) => {
    console.log('step 3, got:', n);
    return n + 1;
  })
  .then((n) => {
    console.log('final value:', n); // 4
  });

/**
 * Each .then() in that chain is called on the Promise returned by
 * the PREVIOUS .then(), not on the original Promise.resolve(1). This
 * is what makes it a CHAIN rather than four independent handlers all
 * attached to the same Promise (contrast with fundamentals/04-fulfilled.js,
 * where multiple .then() calls WERE attached to the same shared Promise).
 */