/**
 * 02-return-values.js
 *
 * Goal: exercise every row of the "what .then() returns" table from
 * NOTES.md, one at a time.
 */

console.log('--- Returns a plain value ---');
Promise.resolve('start')
  .then(() => 'a plain returned value')
  .then((v) => console.log('  result:', v));

console.log('\n--- Returns nothing (undefined) ---');
Promise.resolve('start')
  .then(() => {
    console.log('  handler ran, returning nothing');
    // no return statement at all
  })
  .then((v) => console.log('  result:', v)); // undefined

console.log('\n--- Returns another Promise (flattening) ---');
Promise.resolve('start')
  .then(() => {
    return new Promise((resolve) => {
      setTimeout(() => resolve('resolved from a NESTED Promise'), 30);
    });
  })
  .then((v) => console.log('  result (already unwrapped, not a Promise-of-a-Promise):', v));

console.log('\n--- Throws ---');
Promise.resolve('start')
  .then(() => {
    throw new Error('thrown inside .then()');
  })
  .then((v) => console.log('  this .then() is SKIPPED entirely:', v))
  .catch((err) => console.log('  caught by .catch() further down the chain:', err.message));

console.log('\n--- Omitted onFulfilled argument (pass-through) ---');
Promise.resolve('passed straight through')
  .then() // no argument at all — legal!
  .then((v) => console.log('  result, unchanged:', v));

/**
 * That last case — .then() with no arguments — is a real, if
 * uncommon, technique for "waiting one more microtask tick" without
 * transforming the value at all. You'll see the SAME idea used more
 * meaningfully in error-handling: .catch() with no matching .then()
 * afterward passes a FULFILLED value straight through too, since
 * .catch() only intercepts REJECTIONS.
 */